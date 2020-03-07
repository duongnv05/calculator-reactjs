import React, { Component } from 'react';

import ListButton from './ListButton';

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

    this.onHandleKeyBoard = this.onHandleKeyBoard.bind(this);
    this.onResetResult = this.onResetResult.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onHandleKeyBoard);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onHandleKeyBoard);
  }

  onResetResult() {
    this.setState({
      content: '0',
      result: '0'
    })
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

  onClearButton() {
    if(this.state.content == '0') return;

    let temp = this.state.content.slice(0, this.state.content.length - 1);
    this.setState({
      content: (temp == '' ? '0' : temp)
    })
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
          <ListButton content={content} onInput={this.onInputCalculator} onClearAll={this.onResetResult} />
        </div>
      </div>
    )
  }
}