import React from 'react';

function Button({ children, className, onClick }) {
  return (
    <button className={`cursor-pointer ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
