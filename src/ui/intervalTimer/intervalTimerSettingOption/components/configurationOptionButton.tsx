import { ReactElement } from 'react';
import { UnstyledButton } from 'base/unstyledButton';
import { Row } from 'base/row';

type ButtonProps = {
  inlineCenterLeft: string;
  inlineStart: ReactElement;
  inlineEnd: string | number;
  className?: string;
  onClick?: () => void;
};

export const ConfigurationOptionButton = ({
  inlineCenterLeft,
  inlineStart,
  inlineEnd,
  className,
  onClick,
}: ButtonProps) => (
  <UnstyledButton
    className={`${className} mb-4 flex w-full items-center justify-between rounded-2xl p-4 text-xl font-semibold`}
    key={inlineCenterLeft}
    onClick={onClick}
  >
    <Row className="items-center text-black-dark">
      {inlineStart}
      {inlineCenterLeft}
    </Row>

    {inlineEnd}
  </UnstyledButton>
);
