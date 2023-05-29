import { MouseEvent, ReactElement, useRef } from 'react';

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
}: ButtonProps) => {
  // --- STATE ---

  const startXPositionRef = useRef(0);

  // --- CALLBACKS ---

  const handleMouseDown = (event: MouseEvent<HTMLButtonElement>) => {
    startXPositionRef.current = event.clientX;
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    // Needed because otherwise the button gets clicks while swiping.
    if (Math.abs(event.clientX - startXPositionRef.current) < 5) {
      onClick?.();
    }
  };

  // --- RENDER ---
  return (
    <UnstyledButton
      className={`configuration-option-button ${className}`}
      handleMouseDown={handleMouseDown}
      key={inlineCenterLeft}
      onClick={handleClick}
    >
      <Row className="configuration-option-button-text">
        <Span>{inlineStart}</Span>
        <Span>{inlineCenterLeft}</Span>
      </Row>

      <Span>{inlineEnd}</Span>
    </UnstyledButton>
  );
};
