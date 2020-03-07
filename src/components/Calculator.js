import React, { useState, useEffect, useRef } from 'react';

import ListButton from './ListButton';

import './Calculator.css';

//- listen the 'keyboard' event
function useEventListener(eventName, handler, element = window) {
  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(
    () => {
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;
      
      const eventListener = event => savedHandler.current(event);
      
      element.addEventListener(eventName, eventListener);
      
      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element]
  );
}

function Calculator() {
  const [content, setContent] = useState('0');
  const [result, setResult] = useState('0');

  //- listener of remove event
  useEventListener('keydown', onHandleKeyBoard);

  function onResetResult() {
    setContent('0');
    setResult('0');
  }
  function onHandleKeyBoard(evt) {
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
        onInputCalculator(evt.key);
        break;
      case 'Backspace':
        onInputCalculator('clear');
        break;
      case 'Enter':
        onInputCalculator('=');
        break;
    }
  }

  function onInputCalculator(val) {
    let _result = '0';
    let preState = content;
    console.log("preState", preState)
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
      if(result === _result) return;
      
      setResult(_result ? _result : '0');
      return;
    }

    //- the input is valid
    // let re = RegExp(/^([-+]?)(\d*)([-+*\/]?$)|(^\s*([-+]?)(\d+)(?:\s*([-+*\/])\s*((?:\s[-+])?\d+)\s*(?:[-+*\/]?))+$)/, 'g');
    let re = RegExp(/((^([-,+]))(\d+)(([-+*\/]?$))$)|(^(([-]?)(\d*))$|(^(\d{0,})+([-+*\/]?$)$)$)|(^\s*([-+]?)(\d+)(?:\s*([-+*\/])\s*((?:\s[-+])?\d+)\s*(?:[-+*\/]?))+$)/, 'g');

    if(!re.test(futureState)) return;

    setContent(futureState);
    setResult(_result);
  }

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
        <ListButton content={content} onInput={onInputCalculator} onClearAll={onResetResult} />
      </div>
    </div>
  );
}

export default Calculator;