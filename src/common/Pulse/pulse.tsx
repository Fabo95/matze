import { useEffect, useRef } from 'react';

import { Box } from 'common/box';
import { Span } from 'common/span';
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

  // --- HELPERS ---

  const isAnimationsPlayState = (playState: Animation['playState']) =>
    animationOne.playState === playState &&
    animationTwo.playState === playState &&
    animationThree.playState === playState &&
    animationFour.playState === playState;

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
        iterations: Infinity,
      };

      // eslint-disable-next-line no-param-reassign
      animationOne = waveOneRef.current.animate(keyframes, {
        delay: 0,
        ...timing,
      });

      // eslint-disable-next-line no-param-reassign
      animationTwo = waveTwoRef.current.animate(keyframes, {
        delay: PULSE_ANIMATION_TWO_DELAY,
        ...timing,
      });

      // eslint-disable-next-line no-param-reassign
      animationThree = waveThreeRef.current.animate(keyframes, {
        delay: PULSE_ANIMATION_THREE_DELAY,
        ...timing,
      });

      // eslint-disable-next-line no-param-reassign
      animationFour = waveFourRef.current.animate(keyframes, {
        delay: PULSE_ANIMATION_FOUR_DELAY,
        ...timing,
      });

      animationOne.cancel();
      animationTwo.cancel();
      animationThree.cancel();
      animationFour.cancel();
    }
  }, []);

  useEffect(() => {
    if (isAnimating && isAnimationsPlayState('idle')) {
      animationOne.play();
      animationTwo.play();
      animationThree.play();
      animationFour.play();
    }
  }, [isAnimating]);

  useEffect(() => {
    if (isAnimating && isAnimationsPlayState('finished')) {
      animationOne.reverse();
      animationTwo.reverse();
      animationThree.reverse();
      animationFour.reverse();

      animationOne.play();
      animationTwo.play();
      animationThree.play();
      animationFour.play();
    }
  }, [isAnimating]);

  useEffect(() => {
    if (!isAnimating && isAnimationsPlayState('running')) {
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
