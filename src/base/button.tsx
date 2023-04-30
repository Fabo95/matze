import { ReactElement } from 'react';
import { UnstyledButton } from 'base/unstyledButton';
import { Row } from 'base/row';

type ButtonProps = {
  title: string;
  icon: ReactElement;
  intensity: string | number;
  className?: string;
  onClick?: () => void;
};

export const Button = ({
  title,
  icon,
  intensity,
  className,
  onClick,
}: ButtonProps) => (
  <UnstyledButton
    className={`${className} mb-4 flex w-full max-w-full items-center justify-between rounded-2xl p-4 text-xl font-semibold`}
    key={title}
    onClick={onClick}
  >
    <Row className="items-center text-black-dark">
      {icon}
      {title}
    </Row>

    {intensity}
  </UnstyledButton>
);
