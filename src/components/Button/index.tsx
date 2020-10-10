import React, { MouseEventHandler } from 'react';

import { buttonStyle } from './styles';

interface ButtonProps {
  label?: string | null | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  closeModal?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, closeModal }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      data-close-modal={closeModal}
      css={buttonStyle}
    >
      {label}
    </button>
  );
};

export default Button;
