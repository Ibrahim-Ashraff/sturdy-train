import React from 'react';

const overlay = props => {
  return props.show ? <div className="overlay" onClick={props.closeModal}></div> : null;
}

export default overlay;