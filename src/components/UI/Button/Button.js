import React from 'react';

export const ContainedButton = props => {
  let classess = [props.classess, 'button', 'button--contained'].join(' ');
  return (
    <button
      {...props}
      disabled={props.disabled}
      onClick={props.onClick}
      className={classess}>
      <span className="button__text">{props.children}</span>
    </button>
  );
}

export const DangerButton = props => {
  let classess = [props.classess, 'button', 'button--danger'].join(' ');
  return (
    <button
      {...props}
      disabled={props.disabled}
      onClick={props.onClick}
      className={classess}>
      <span className="button__text">{props.children}</span>
    </button>
  );
}

export const GrayButton = props => {
  let classess = [props.classess, 'button', 'button--grey'].join(' ');
  return (
    <button {...props} disabled={props.disabled} onClick={props.onClick} className={classess}>
      <span className="button__text">{props.children}</span>
    </button>
  );
}


export const TextButton = props => {
  return (
    <button className='button text-button'>
      {props.children}
    </button>
  );
}

export const OutlinedButton = props => {
  let classess = [props.classess, 'button', 'button--outlined'].join(' ');

  return (
    <button {...props} className={classess} onClick={props.onClick}>
      <span className='button__text'>{props.children}</span>
    </button>
  );
}

export const TableButton = props => {
  return (
    <button disabled={props.disabled} onClick={props.onClick} className={props.className}>
      <span className="button__text--small">{props.children}</span>
    </button>
  );
}
