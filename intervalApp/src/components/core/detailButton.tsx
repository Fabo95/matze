import {
  ButtonHTMLAttributes,
  MouseEvent,
  ReactElement,
  ReactNode,
  useRef,
} from 'react';

import { Row } from '@Interval/components/core/row';
import { Span } from '@Interval/components/core/span';
import { UnstyledButton } from '@Interval/components/core/unstyledButton';

type DetailButtonProps = {
  inlineCenterLeft: string;
  inlineEnd?: ReactNode;
  inlineStart: ReactElement;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const DetailButton = ({
  className,
  inlineCenterLeft,
  inlineEnd,
  inlineStart,
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
