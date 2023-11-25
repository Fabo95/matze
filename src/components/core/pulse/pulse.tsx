import { useCallback, useEffect, useRef } from 'react';

import { Box } from '@Interval/components/core/box';
import { PulseAnimation } from '@Interval/components/core/pulse/utils/pulseHelpers';
import {
  AnimationPlayState,
  PulseAnimationProps,
} from '@Interval/components/core/pulse/utils/pulseTypes';
import { Span } from '@Interval/components/core/span';

type PulseProps = { isAnimating: boolean };

let pulseAnimation: PulseAnimationProps;

export const Pulse = ({ isAnimating }: PulseProps) => {
  // --- STATE ---

  const waveOneRef = useRef<HTMLSpanElement>(null);
  const waveTwoRef = useRef<HTMLSpanElement>(null);
  const waveThreeRef = useRef<HTMLSpanElement>(null);

  // --- CALLBACKS ---

  const isAnimationsPlayState = useCallback((playState: AnimationPlayState) => {
    // We need to check this AnimationPlayState explicit because it is the only state where some animations could be in reversing state and some could be in finished state.
    if (playState === AnimationPlayState.REVERSING) {
      return pulseAnimation.animationControllers.some(
        (controller) => controller.state === playState
      );
    }

    return pulseAnimation.animationControllers.every(
      (controller) => controller.state === playState
    );
  }, []);

  // --- EFFECT ---

  useEffect(() => {
    if (waveOneRef.current && waveTwoRef.current && waveThreeRef.current) {
      pulseAnimation = new PulseAnimation({
        waveOneRef,
        waveThreeRef,
        waveTwoRef,
      });
    }
  }, []);

  useEffect(() => {
    if (isAnimating && isAnimationsPlayState(AnimationPlayState.IDLE)) {
      pulseAnimation?.executeStartPulsing();
    }
  }, [isAnimating, isAnimationsPlayState]);

  useEffect(() => {
    if (isAnimating && isAnimationsPlayState(AnimationPlayState.FINISHED)) {
      pulseAnimation.executeRestartPulsing();
    }
  }, [isAnimating, isAnimationsPlayState]);

  useEffect(() => {
    if (isAnimating && isAnimationsPlayState(AnimationPlayState.REVERSING)) {
      pulseAnimation?.executeReverseStartPulsing();
    }
  }, [isAnimating, isAnimationsPlayState]);

  useEffect(() => {
    if (!isAnimating && isAnimationsPlayState(AnimationPlayState.RUNNING)) {
      pulseAnimation?.executeStopPulsing();
    }
  }, [isAnimating, isAnimationsPlayState]);

  // --- RENDER ---

  return (
    <Box className="pulse">
      <Span className="pulse-wave-one" ref={waveOneRef} />
      <Span className="pulse-wave-two" ref={waveTwoRef} />
      <Span className="pulse-wave-three" ref={waveThreeRef} />
    </Box>
  );
};
