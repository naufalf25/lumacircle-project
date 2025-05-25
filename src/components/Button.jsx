import React from 'react';
import PropTypes from 'prop-types';

function Button({ children, type = '', className, onClick, disabled = false }) {
  return (
    <button
      type={type}
      className={`${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  /** The inner HTML of the button or value of the button */
  children: PropTypes.node.isRequired,
  /** The type of the button */
  type: PropTypes.string,
  /** Add class to the button */
  className: PropTypes.string.isRequired,
  /** Action when button is clicked */
  onClick: PropTypes.func.isRequired,
  /** Status disable of the button */
  disabled: PropTypes.bool,
};

export default Button;
