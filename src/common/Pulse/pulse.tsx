import { useEffect, useRef } from 'react';

import { Box } from 'common/box';
import { Span } from 'common/span';
import { BasePulse } from 'common/Pulse/Utils/pulseHelpers';
import { BaseObejct } from 'common/Pulse/Utils/pulseTypes';

type PulseProps = { isAnimating: boolean };

let baseObject: BaseObejct;

export const Pulse = ({ isAnimating }: PulseProps) => {
  // --- STATE ---

  const waveOneRef = useRef<HTMLSpanElement>(null);
  const waveTwoRef = useRef<HTMLSpanElement>(null);
  const waveThreeRef = useRef<HTMLSpanElement>(null);
  const waveFourRef = useRef<HTMLSpanElement>(null);

  // --- HELPERS ---

  const isAnimationsPlayState = (playState: Animation['playState']) => {
    return (
      baseObject?.animationOne?.playState === playState &&
      baseObject?.animationTwo?.playState === playState &&
      baseObject?.animationThree?.playState === playState &&
      baseObject?.animationFour?.playState === playState
    );
  };
  // --- EFFECT ---

  useEffect(() => {
    if (
      waveOneRef.current &&
      waveTwoRef.current &&
      waveThreeRef.current &&
      waveFourRef.current
    ) {
      baseObject = new BasePulse({
        waveFourRef,
        waveOneRef,
        waveThreeRef,
        waveTwoRef,
      });

      baseObject?.initializeAnimation();
    }
  }, []);

  useEffect(() => {
    if (isAnimating && isAnimationsPlayState('idle')) {
      baseObject?.executeStartPulsing();
    }
  }, [isAnimating]);

  useEffect(() => {
    if (isAnimating && isAnimationsPlayState('finished')) {
      baseObject.executeRestartPulsing();
    }
  }, [isAnimating]);

  useEffect(() => {
    if (!isAnimating && isAnimationsPlayState('running')) {
      baseObject?.executeStopPulsing();
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
