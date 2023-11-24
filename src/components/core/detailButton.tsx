import {
  ButtonHTMLAttributes,
  MouseEvent,
  ReactElement,
  ReactNode,
  useRef,
} from 'react';

import { Row } from 'components/core/row';
import { Span } from 'components/core/span';
import { UnstyledButton } from 'components/core/unstyledButton';

type DetailButtonProps = {
  inlineCenterLeft: string;
  inlineStart: ReactElement;
  inlineEnd?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const DetailButton = ({
  inlineCenterLeft,
  inlineStart,
  inlineEnd,
  className,
  ...detailButtonProps
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
      detailButtonProps.onClick?.(event);
    }
  };

  // --- RENDER ---
  return (
    <UnstyledButton
      className={`detail-button ${className}`}
      handlemousedown={handleMouseDown}
      key={inlineCenterLeft}
      onClick={handleClick}
      {...detailButtonProps}
    >
      <Row className="detail-button-text">
        <Span>{inlineStart}</Span>
        <Span>{inlineCenterLeft}</Span>
      </Row>

      <Span>{inlineEnd}</Span>
    </UnstyledButton>
  );
};
