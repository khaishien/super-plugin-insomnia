import React from 'react';

import { containerStyle, inputStyle, labelStyle } from './styles';

type InputOnChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => void;

interface InputProps {
  label?: string | null | undefined;
  value?: string | null | undefined;
  onChange?: InputOnChangeEvent;
}

const Input: React.FC<InputProps> = ({ id, label, value, onChange }) => {
  return (
    <div css={containerStyle}>
      <label htmlFor={id} css={labelStyle}>
        {label}
      </label>
      <input
        id={id}
        css={inputStyle}
        type="text"
        value={value || ''}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
