import {
  PULSE_ANIMATION_DURATION,
  PULSE_ANIMATION_FOUR_DELAY,
  PULSE_ANIMATION_THREE_DELAY,
  PULSE_ANIMATION_TWO_DELAY,
} from 'common/Pulse/Utils/pulseConstants';
import { RefObject } from 'react';

export const BasePulse = class {
  animationOne: Animation | undefined;

  animationTwo: Animation | undefined;

  animationThree: Animation | undefined;

  animationFour: Animation | undefined;

  waveOneRef: RefObject<HTMLSpanElement>;

  waveTwoRef: RefObject<HTMLSpanElement>;

  waveThreeRef: RefObject<HTMLSpanElement>;

  waveFourRef: RefObject<HTMLSpanElement>;

  constructor({
    waveOneRef,
    waveTwoRef,
    waveThreeRef,
    waveFourRef,
  }: {
    waveOneRef: RefObject<HTMLSpanElement>;
    waveTwoRef: RefObject<HTMLSpanElement>;
    waveThreeRef: RefObject<HTMLSpanElement>;
    waveFourRef: RefObject<HTMLSpanElement>;
  }) {
    this.waveOneRef = waveOneRef;
    this.waveTwoRef = waveTwoRef;
    this.waveThreeRef = waveThreeRef;
    this.waveFourRef = waveFourRef;
  }

  initializeAnimation() {
    const keyframes = [{ opacity: 0, transform: 'scale(2)' }];
    const timing = {
      duration: PULSE_ANIMATION_DURATION,
      easing: 'ease-out',
      iterations: Infinity,
    };

    // eslint-disable-next-line no-param-reassign
    this.animationOne = this.waveOneRef.current?.animate(keyframes, {
      delay: 0,
      ...timing,
    });

    // eslint-disable-next-line no-param-reassign
    this.animationTwo = this.waveTwoRef.current?.animate(keyframes, {
      delay: PULSE_ANIMATION_TWO_DELAY,
      ...timing,
    });

    // eslint-disable-next-line no-param-reassign
    this.animationThree = this.waveThreeRef.current?.animate(keyframes, {
      delay: PULSE_ANIMATION_THREE_DELAY,
      ...timing,
    });

    // eslint-disable-next-line no-param-reassign
    this.animationFour = this.waveFourRef.current?.animate(keyframes, {
      delay: PULSE_ANIMATION_FOUR_DELAY,
      ...timing,
    });

    this.animationOne?.cancel();
    this.animationTwo?.cancel();
    this.animationThree?.cancel();
    this.animationFour?.cancel();
  }

  executeStartPulsing() {
    this.animationOne?.play();
    this.animationTwo?.play();
    this.animationThree?.play();
    this.animationFour?.play();
  }

  executeRestartPulsing() {
    this.animationOne?.reverse();
    this.animationTwo?.reverse();
    this.animationThree?.reverse();
    this.animationFour?.reverse();

    this.animationOne?.play();
    this.animationTwo?.play();
    this.animationThree?.play();
    this.animationFour?.play();
  }

  executeStopPulsing() {
    const currentTimeOne = this.animationOne?.currentTime;
    const currentTimeTwo = this.animationTwo?.currentTime;
    const currentTimeThree = this.animationThree?.currentTime;
    const currentTimeFour = this.animationFour?.currentTime;

    const timeoutTimeAnimationOne =
      Number(currentTimeOne) % PULSE_ANIMATION_DURATION;
    const timeoutTimeAnimationTwo =
      (Number(currentTimeTwo) - PULSE_ANIMATION_TWO_DELAY) %
      PULSE_ANIMATION_DURATION;
    const timeoutTimeAnimationThree =
      (Number(currentTimeThree) - PULSE_ANIMATION_THREE_DELAY) %
      PULSE_ANIMATION_DURATION;
    const timeoutTimeAnimationFour =
      (Number(currentTimeFour) - PULSE_ANIMATION_FOUR_DELAY) %
      PULSE_ANIMATION_DURATION;

    this.animationOne?.reverse();
    this.animationTwo?.reverse();
    this.animationThree?.reverse();
    this.animationFour?.reverse();

    setTimeout(() => {
      this.animationOne?.finish();
    }, timeoutTimeAnimationOne);

    setTimeout(() => {
      this.animationTwo?.finish();
    }, timeoutTimeAnimationTwo);

    setTimeout(() => {
      this.animationThree?.finish();
    }, timeoutTimeAnimationThree);

    setTimeout(() => {
      this.animationFour?.finish();
    }, timeoutTimeAnimationFour);
  }
};
