import React from 'react';

const slider = (props) => {

    return (
        <label className="switch">
            <input type="checkbox" onClick={props.onClick} />
            <span className="slider round" />
        </label>
    )
}

export default slider