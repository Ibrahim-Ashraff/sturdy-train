import React from 'react';

const card = props => {
  return (
    <div style={props.styles} className='card card--transparent'>
      {props.image && <div className='card-image-container'>{props.image}</div>}
      {props.promptMessage && <span className='card-prompt-message'>{props.promptMessage}</span>}
      {props.icon && <div className='card-icon'><img alt="card-icon" src={props.icon} /></div>}
      <div className="card-header">
        {props.title && <h3 className='card-header-title'>{props.title}</h3>}
        {props.subtitle && <h4 className='card-header-subtitle'>{props.subtitle}</h4>}
        {props.instruction && <p className="card-instruction">{props.instruction}</p>}
      </div>
      <div className="card-content">
        {props.children}
      </div>
    </div>
  );
}

export default card;