import { RefObject } from 'react';

import {
  PULSE_ANIMATION_DURATION,
  PULSE_ANIMATION_FOUR_DELAY,
  PULSE_ANIMATION_THREE_DELAY,
  PULSE_ANIMATION_TWO_DELAY,
} from 'common/Pulse/Utils/pulseConstants';

class AnimationController {
  animation: Animation | undefined;

  timeoutId: ReturnType<typeof setTimeout> | number = 0;

  state = 'idle';

  waveRef: RefObject<HTMLSpanElement>;

  constructor(waveRef: RefObject<HTMLSpanElement>) {
    this.waveRef = waveRef;
  }

  initializeAnimation(
    keyframes: Keyframe[],
    timing: number | KeyframeAnimationOptions
  ) {
    this.animation = this.waveRef.current?.animate(keyframes, timing);
    this.animation?.cancel();
  }

  play() {
    this.animation?.play();
  }

  reverse() {
    this.animation?.reverse();
  }

  finish() {
    this.animation?.finish();
  }

  set currenTimeoutId(id: ReturnType<typeof setTimeout>) {
    this.timeoutId = id;
  }

  set currenState(state: string) {
    this.state = state;
  }
}

export class PulseAnimation {
  animationControllers: AnimationController[];

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
    this.animationControllers = [
      new AnimationController(waveOneRef),
      new AnimationController(waveTwoRef),
      new AnimationController(waveThreeRef),
      new AnimationController(waveFourRef),
    ];

    this.initializeAnimations();
  }

  initializeAnimations() {
    this.animationControllers.forEach((controller, index) => {
      const keyframes = [{ opacity: 0, transform: 'scale(2)' }];
      const timing = {
        delay: index * 1000,
        duration: PULSE_ANIMATION_DURATION,
        easing: 'ease-out',
        iterations: Infinity,
      };

      controller.initializeAnimation(keyframes, timing);
    });
  }

  executeStartPulsing() {
    this.animationControllers.forEach((controller) => {
      controller.play();

      controller.currenState = 'running';
    });
  }

  executeReverseStartPulsing() {
    this.animationControllers.forEach((controller) => {
      console.log('RAN==???');
      clearTimeout(controller.currenTimeoutId);

      if (controller.state === 'finished') {
        controller.reverse();
        controller.play();
        controller.currenState = 'running';

        return;
      }

      controller.reverse();
      controller.currenState = 'running';
    });
  }

  executeRestartPulsing() {
    this.animationControllers.forEach((controller) => {
      controller.reverse();
      controller.play();
      controller.currenState = 'running';
    });
  }

  executeStopPulsing() {
    this.animationControllers.forEach((controller, index: number) => {
      // Must be typed because otherwise we can not select values with the index.
      const pulseAnimationDelay: { [index: number]: number } = {
        0: 0,
        1: PULSE_ANIMATION_TWO_DELAY,
        2: PULSE_ANIMATION_THREE_DELAY,
        3: PULSE_ANIMATION_FOUR_DELAY,
      };

      const currentTime = controller.animation?.currentTime;

      const timeoutTime =
        (Number(currentTime) - pulseAnimationDelay[index]) %
        PULSE_ANIMATION_DURATION;

      controller.reverse();
      controller.currenState = 'reversing';

      controller.currenTimeoutId = setTimeout(() => {
        controller.finish();
        controller.currenState = 'finished';
      }, timeoutTime);
    });
  }
}
