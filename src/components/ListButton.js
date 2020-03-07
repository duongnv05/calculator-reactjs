import React from 'react';

import { lsButton } from '../config';

let btnClearTimer = null;

function ListButton(props) {
  function onTouchStartClear() {
    btnClearTimer = setTimeout(() => {
      props.onClearAll();
    }, 800)

    props.onInput('clear');
  }

  function onTouchEndClear() {
    if(btnClearTimer) {
      clearTimeout(btnClearTimer);
    }
  }

  return (
    <div className="wrapper">
      { lsButton.map(button => {
        return (
          button._id === 'clear' ?
          <button
            key={button._id} 
            className={'btn-control ' + button.cClass || ''}
            onTouchStart={onTouchStartClear} 
            onTouchEnd={onTouchEndClear}
            onMouseDown={onTouchStartClear} 
            onMouseUp={onTouchEndClear} 
          >{button.label}</button> :
          <button 
            key={button._id} 
            className={'btn-control ' + button.cClass || ''}
            onClick={() => props.onInput(button._id)}
          >{button.label}</button>
        );
      }) }
    </div>
  )
}

export default ListButton;