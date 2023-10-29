import { UnstyledButton } from 'core/unstyledButton';
import React, {
  ButtonHTMLAttributes,
  ForwardedRef,
  forwardRef,
  MouseEvent,
} from 'react';

import { Box } from 'core/box';

type ButtonProps = {
  className?: string;
  buttonTitle: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef(
  (
    { buttonTitle, className, ...buttonProps }: ButtonProps,
    ref?: ForwardedRef<HTMLButtonElement>
  ) => {
    // --- CALLBACKS ---

    const handleWaveAnimation = (event: MouseEvent<HTMLDivElement>) => {
      const wavesWrapper = event.currentTarget;

      const { clientX, clientY } = event;

      // Calculate the relative position within waveWrapper div.
      const rect = wavesWrapper.getBoundingClientRect();
      const size = rect.width;

      const posX = clientX - rect.left - size / 2;
      const posY = clientY - rect.top - size / 2;

      const wave = document.createElement('div');

      wave.style.setProperty('top', `${posY}px `);
      wave.style.setProperty('left', `${posX}px `);

      wave.classList.add('wave');

      wavesWrapper.appendChild(wave);

      setTimeout(() => {
        if (buttonProps.onClick) {
          buttonProps.onClick();
        }
        wavesWrapper.removeChild(wave);
      }, 400);
    };

    // --- RENDER ---
    return (
      <UnstyledButton
        className={`button ${className}`}
        ref={ref}
        {...buttonProps}
      >
        <Box className="button-content">{buttonTitle}</Box>

        <Box className="wave-wrapper" onClick={handleWaveAnimation} />
      </UnstyledButton>
    );
  }
);
