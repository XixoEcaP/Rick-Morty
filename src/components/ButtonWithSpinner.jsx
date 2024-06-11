import React from 'react';

const ButtonWithSpinner = ({ id, onClick, disabled, altText, buttonText }) => (
    <button id={id} onClick={onClick} disabled={disabled} className="button-with-spinner">
        <span className="button-text">{buttonText}</span>
        <img src="https://static1.squarespace.com/static/570413982eeb8114b6631016/59cffa294c0dbf7579528461/59cffc5937c5819421e5d541/1506803258457/Portal.gif" alt={altText} />
    </button>
);

export default ButtonWithSpinner;
