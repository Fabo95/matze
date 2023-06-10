import { UnstyledButton } from 'common/unstyledButton';
import React, { MouseEvent } from 'react';

import { Box } from 'common/box';

type ButtonProps = {
  onClick: () => void;
  className?: string;
  buttonTitle: string;
};

export const Button = ({ onClick, className, buttonTitle }: ButtonProps) => {
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
      onClick();
      wavesWrapper.removeChild(wave);
    }, 400);
  };

  // --- RENDER ---
  return (
    <UnstyledButton className={`button ${className}`}>
      <Box className="button-content">{buttonTitle}</Box>

      <Box className="wave-wrapper" onClick={handleWaveAnimation} />
    </UnstyledButton>
  );
};
