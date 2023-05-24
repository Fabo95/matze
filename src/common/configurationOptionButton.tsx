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
    className={`configuration-option-button ${className}`}
    key={inlineCenterLeft}
    onClick={onClick}
  >
    <Row className="configuration-option-button-text">
      <Span>{inlineStart}</Span>
      <Span>{inlineCenterLeft}</Span>
    </Row>

    <Span>{inlineEnd}</Span>
  </UnstyledButton>
);
