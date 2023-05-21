import { ReactElement } from 'react';
import { UnstyledButton } from 'common/unstyledButton';
import { Row } from 'common/row';
import { Span } from 'common/span';

type ButtonProps = {
  inlineCenterLeft: string;
  inlineStart: ReactElement;
  inlineEnd?: string | number;
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
    className={`${className} text-size-1-25 margin-bottom-1 width-full align-items-center justify-content-space-between padding-1 configuration-option-button flex font-semibold`}
    key={inlineCenterLeft}
    onClick={onClick}
  >
    <Row className="align-items-center text-color-black-dark">
      <Span>{inlineStart}</Span>
      <Span>{inlineCenterLeft}</Span>
    </Row>

    <Span>{inlineEnd}</Span>
  </UnstyledButton>
);
