import React, { Component } from 'react';

import './Calculator.css';

export default class Calculator extends Component {
  constructor() {
    super();
    this.state = {
      content: '0',
      result: '0'
    };

    this.onInputCalculator = this.onInputCalculator.bind(this);
    this.onClearButton = this.onClearButton.bind(this);

    this.onTouchStartClear = this.onTouchStartClear.bind(this);
    this.onTouchEndClear = this.onTouchEndClear.bind(this);
    this.onHandleKeyBoard = this.onHandleKeyBoard.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onHandleKeyBoard);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onHandleKeyBoard);
  }

  onHandleKeyBoard(evt) {
    switch(evt.key) {
      case '+':
      case '-':
      case '/':
      case '=':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        this.onInputCalculator(evt.key);
        break;
      case 'Backspace':
        this.onInputCalculator('clear');
        break;
      case 'Enter':
        this.onInputCalculator('=');
        break;
    }
  }

  onTouchStartClear() {
    this.btnClearTimer = setTimeout(() => {
      this.setState({
        content: '0',
        result: '0'
      });
    }, 800)

    this.onInputCalculator('clear');
  }

  onTouchEndClear() {
    clearTimeout(this.btnClearTimer);
  }

  onClearButton() {
    if(this.state.content == '0') return;

    let temp = this.state.content.slice(0, this.state.content.length - 1);
    this.setState({
      content: (temp == '' ? '0' : temp)
    })

    // this.onInputCalculator('clear');
  }

  onInputCalculator(val) {
    let _result = '0';
    let preState = this.state.content;
    let futureState;

    if(preState == '0') { preState = '' }

    if(val == 'clear') {
      futureState = preState.slice(0, preState.length - 1);
    } else {
      futureState = preState + val;
    }

    if(futureState == '' 
    //- prevent input '/' first
    || futureState == '/') { preState = '0'; futureState = '0' }

    //- calculate result
    let reResult = RegExp(/^\s*([-+]?)(\d+)$|^\s*([-+]?)(\d+)(?:\s*([-+*\/])\s*((?:\s[-+])?\d+)\s*)+$/, 'g');
    if(reResult.test(futureState)) {
      _result = eval(futureState);
    } else if(reResult.test(preState)) {
      _result = eval(preState);
    } else {
      _result = eval(preState.slice(0, preState.length - 1))
    }

    if(val == '=') {
      //- handle calculating string content
      this.setState({
        // content: _result,
        result: _result ? _result : '0'
      });
      return;
    }

    //- the input is valid
    // let re = RegExp(/^([-+]?)(\d*)([-+*\/]?$)|(^\s*([-+]?)(\d+)(?:\s*([-+*\/])\s*((?:\s[-+])?\d+)\s*(?:[-+*\/]?))+$)/, 'g');
    let re = RegExp(/((^([-,+]))(\d+)(([-+*\/]?$))$)|(^(([-]?)(\d*))$|(^(\d{0,})+([-+*\/]?$)$)$)|(^\s*([-+]?)(\d+)(?:\s*([-+*\/])\s*((?:\s[-+])?\d+)\s*(?:[-+*\/]?))+$)/, 'g');

    if(!re.test(futureState)) return;

    this.setState({
      content: futureState,
      result: _result
    });
  }

  render() {
    const { content, result } = this.state;
    return (
      <div className="_calculator">
        {/* screen control */}
        <div className="screen-control">
          {/* result control */}
          <div className="result" title={result}>
            { result }
          </div>
          <div className="content-calculator">
            { content }
          </div>
        </div>
        {/* button controls */}
        <div className="button-control">
          <div className="wrapper">
            <button className="btn-control merce-3-row clear" 
              onTouchStart={this.onTouchStartClear} 
              onTouchEnd={this.onTouchEndClear} 
              onMouseDown={this.onTouchStartClear} 
              onMouseUp={this.onTouchEndClear} 
              onMouseLeave={this.onTouchEndClear}
            >
              Clear
            </button>
            <button className="btn-control /" onClick={()=>this.onInputCalculator('/')}>/</button>
            <button className="btn-control 7" onClick={()=>this.onInputCalculator('7')}>7</button>
            <button className="btn-control 8" onClick={()=>this.onInputCalculator('8')}>8</button>
            <button className="btn-control 9" onClick={()=>this.onInputCalculator('9')}>9</button>
            <button className="btn-control -" onClick={()=>this.onInputCalculator('-')}>-</button>
            <button className="btn-control 4" onClick={()=>this.onInputCalculator('4')}>4</button>
            <button className="btn-control 5" onClick={()=>this.onInputCalculator('5')}>5</button>
            <button className="btn-control 6" onClick={()=>this.onInputCalculator('6')}>6</button>
            <button className="btn-control +" onClick={()=>this.onInputCalculator('+')}>+</button>
            <button className="btn-control 1" onClick={()=>this.onInputCalculator('1')}>1</button>
            <button className="btn-control 2" onClick={()=>this.onInputCalculator('2')}>2</button>
            <button className="btn-control 3" onClick={()=>this.onInputCalculator('3')}>3</button>
            <button className="btn-control =" onClick={()=>this.onInputCalculator('=')}>=</button>
          </div>
        </div>
      </div>
    )
  }
}