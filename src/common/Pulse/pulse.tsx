import { Box } from 'common/box';
import { Span } from 'common/span';
import { useEffect, useRef } from 'react';
import { executeStopPulsing } from 'common/Pulse/Utils/pulseHelpers';
import {
  PULSE_ANIMATION_DURATION,
  PULSE_ANIMATION_FOUR_DELAY,
  PULSE_ANIMATION_THREE_DELAY,
  PULSE_ANIMATION_TWO_DELAY,
} from 'common/Pulse/Utils/pulseConstants';

type PulseProps = { isAnimating: boolean };

let animationOne: Animation;
let animationTwo: Animation;
let animationThree: Animation;
let animationFour: Animation;

export const Pulse = ({ isAnimating }: PulseProps) => {
  // --- STATE ---

  const waveOneRef = useRef<HTMLSpanElement>(null);
  const waveTwoRef = useRef<HTMLSpanElement>(null);
  const waveThreeRef = useRef<HTMLSpanElement>(null);
  const waveFourRef = useRef<HTMLSpanElement>(null);

  const startDateRef = useRef<Date>();

  // --- EFFECT ---

  useEffect(() => {
    if (
      waveOneRef.current &&
      waveTwoRef.current &&
      waveThreeRef.current &&
      waveFourRef.current
    ) {
      const keyframes = [{ opacity: 0, transform: 'scale(2)' }];
      const timing = {
        duration: PULSE_ANIMATION_DURATION,
        easing: 'ease-out',
        iterations: 10,
      };

      animationOne = waveOneRef.current.animate(keyframes, {
        delay: 0,
        ...timing,
      });

      animationTwo = waveTwoRef.current.animate(keyframes, {
        delay: PULSE_ANIMATION_TWO_DELAY,
        ...timing,
      });

      animationThree = waveThreeRef.current.animate(keyframes, {
        delay: PULSE_ANIMATION_THREE_DELAY,
        ...timing,
      });

      animationFour = waveFourRef.current.animate(keyframes, {
        delay: PULSE_ANIMATION_FOUR_DELAY,
        ...timing,
      });

      animationOne.pause();
      animationTwo.pause();
      animationThree.pause();
      animationFour.pause();
    }
  }, []);

  useEffect(() => {
    if (
      isAnimating &&
      animationOne.playState === 'paused' &&
      animationTwo.playState === 'paused' &&
      animationThree.playState === 'paused' &&
      animationFour.playState === 'paused'
    ) {
      startDateRef.current = new Date();

      animationOne.play();
      animationTwo.play();
      animationThree.play();
      animationFour.play();
    }
  }, [isAnimating]);

  useEffect(() => {
    if (
      isAnimating &&
      animationOne.effect?.getTiming().direction === 'reverse' &&
      animationTwo.effect?.getTiming().direction === 'reverse' &&
      animationThree.effect?.getTiming().direction === 'reverse' &&
      animationFour.effect?.getTiming().direction === 'reverse'
    ) {
      animationOne.effect?.updateTiming({
        direction: 'normal',
        iterationStart: 1,
        iterations: Infinity,
      });
      animationTwo.effect?.updateTiming({
        direction: 'normal',
        iterationStart: 1,
        iterations: Infinity,
      });
      animationThree.effect?.updateTiming({
        direction: 'normal',
        iterationStart: 1,
        iterations: Infinity,
      });
      animationFour.effect?.updateTiming({
        direction: 'normal',
        iterationStart: 1,
        iterations: Infinity,
      });
    }
  }, [isAnimating]);

  useEffect(() => {
    if (
      !isAnimating &&
      animationOne.playState === 'running' &&
      animationTwo.playState === 'running' &&
      animationThree.playState === 'running' &&
      animationFour.playState === 'running'
    ) {
      executeStopPulsing({
        animationFour,
        animationOne,
        animationThree,
        animationTwo,
      });
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
