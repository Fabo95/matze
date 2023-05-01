import { UnstyledButton } from 'base/unstyledButton';
import React from 'react';

type ButtonProps = {
  onClick: () => void;
  className: string;
  buttonTitle: string;
};

export const Button = ({ onClick, className, buttonTitle }: ButtonProps) => (
  <UnstyledButton
    className={`rounded bg-white-full p-4 text-xl font-semibold ${className}`}
    onClick={onClick}
  >
    {buttonTitle}
  </UnstyledButton>
);
