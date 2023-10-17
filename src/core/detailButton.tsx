import { MouseEvent, ReactElement, ReactNode, useRef } from 'react';

import { UnstyledButton } from 'core/unstyledButton';
import { Row } from 'core/row';
import { Span } from 'core/span';

type DetailButtonProps = {
  inlineCenterLeft: string;
  inlineStart: ReactElement;
  inlineEnd?: ReactNode;
  className?: string;
  onClick?: () => void;
};

export const DetailButton = ({
  inlineCenterLeft,
  inlineStart,
  inlineEnd,
  className,
  onClick,
}: DetailButtonProps) => {
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
      className={`detail-button ${className}`}
      handleMouseDown={handleMouseDown}
      key={inlineCenterLeft}
      onClick={handleClick}
    >
      <Row className="detail-button-text">
        <Span>{inlineStart}</Span>
        <Span>{inlineCenterLeft}</Span>
      </Row>

      <Span>{inlineEnd}</Span>
    </UnstyledButton>
  );
};
