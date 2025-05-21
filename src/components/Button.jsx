import PropTypes from 'prop-types';
import React from 'react';

function Button({ children, type, className, onClick, disabled = false }) {
  return (
    <button
      type={type}
      className={`cursor-pointer ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Button;
