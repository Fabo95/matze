'use client';

import React, {
  ButtonHTMLAttributes,
  ForwardedRef,
  forwardRef,
  MouseEvent,
} from 'react';

import { Box } from 'components/core/box';
import { UnstyledButton } from 'components/core/unstyledButton';

type ButtonProps = {
  className?: string;
  buttonTitle: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Button_DEPRECATED = forwardRef(
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
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          buttonProps.onClick();
        }
        wavesWrapper.removeChild(wave);
      }, 400);
    };

    // --- RENDER ---
    return (
      <UnstyledButton
        className={`button_DEPRECATED ${className}`}
        ref={ref}
        {...buttonProps}
      >
        <Box className="button-content">{buttonTitle}</Box>

        <Box className="wave-wrapper" onClick={handleWaveAnimation} />
      </UnstyledButton>
    );
  }
);
