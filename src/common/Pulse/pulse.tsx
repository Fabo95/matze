import { useEffect, useRef } from 'react';

import { Box } from 'common/box';
import { Span } from 'common/span';
import { PulseAnimation } from 'common/Pulse/Utils/pulseHelpers';
import { PulseAnimationProps } from 'common/Pulse/Utils/pulseTypes';

type PulseProps = { isAnimating: boolean };

let pulseAnimation: PulseAnimationProps;

export const Pulse = ({ isAnimating }: PulseProps) => {
  // --- STATE ---

  const waveOneRef = useRef<HTMLSpanElement>(null);
  const waveTwoRef = useRef<HTMLSpanElement>(null);
  const waveThreeRef = useRef<HTMLSpanElement>(null);
  const waveFourRef = useRef<HTMLSpanElement>(null);

  // --- HELPERS ---

  const isAnimationsPlayState = (
    playState: 'running' | 'reversing' | 'finished' | 'idle'
  ) => {
    if (playState === 'reversing') {
      return pulseAnimation.animationControllers.some((controller) => {
        return controller.state === playState;
      });
    }
    return pulseAnimation.animationControllers.every((controller) => {
      return controller.state === playState;
    });
  };

  // --- EFFECT ---

  useEffect(() => {
    if (
      waveOneRef.current &&
      waveTwoRef.current &&
      waveThreeRef.current &&
      waveFourRef.current
    ) {
      pulseAnimation = new PulseAnimation({
        waveFourRef,
        waveOneRef,
        waveThreeRef,
        waveTwoRef,
      });
    }
  }, []);

  useEffect(() => {
    if (isAnimating && isAnimationsPlayState('idle')) {
      pulseAnimation?.executeStartPulsing();
    }
  }, [isAnimating]);

  useEffect(() => {
    if (isAnimating && isAnimationsPlayState('finished')) {
      pulseAnimation.executeRestartPulsing();
    }
  }, [isAnimating]);

  useEffect(() => {
    if (!isAnimating && isAnimationsPlayState('running')) {
      pulseAnimation?.executeStopPulsing();
    }
  }, [isAnimating]);

  // --- RENDER ---

  return (
    <Box className="pulse">
      <Span className="pulse-wave-one" ref={waveOneRef} />
      <Span className="pulse-wave-two" ref={waveTwoRef} />
      <Span className="pulse-wave-three" ref={waveThreeRef} />
      <Span className="pulse-wave-four" ref={waveFourRef} />
    </Box>
  );
};
