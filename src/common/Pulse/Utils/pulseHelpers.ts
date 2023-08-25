/* eslint-disable no-param-reassign */
import { RefObject } from 'react';

import {
  PULSE_ANIMATION_DISTANCE_IN_MS,
  PULSE_ANIMATION_DURATION,
} from 'common/Pulse/Utils/pulseConstants';
import { AnimationPlayState } from 'common/Pulse/Utils/pulseTypes';

class AnimationController {
  animation: Animation | undefined;

  timeoutId: ReturnType<typeof setTimeout> | number = 0;

  state: AnimationPlayState = AnimationPlayState.IDLE;

  waveRef: RefObject<HTMLSpanElement>;

  constructor(waveRef: RefObject<HTMLSpanElement>) {
    this.waveRef = waveRef;
  }

  initializeAnimation(
    keyframes: Keyframe[],
    timing: number | KeyframeAnimationOptions
  ) {
    this.animation = this.waveRef.current?.animate(keyframes, timing);
    this.cancel();
  }

  play() {
    this.animation?.play();
  }

  reverse() {
    this.animation?.reverse();
  }

  cancel() {
    this.animation?.cancel();
  }

  finish() {
    this.animation?.finish();
  }

  set currenTimeoutId(id: ReturnType<typeof setTimeout>) {
    this.timeoutId = id;
  }

  set currenState(state: AnimationPlayState) {
    this.state = state;
  }
}

export class PulseAnimation {
  animationControllers: AnimationController[];

  constructor({
    waveOneRef,
    waveTwoRef,
    waveThreeRef,
  }: {
    waveOneRef: RefObject<HTMLSpanElement>;
    waveTwoRef: RefObject<HTMLSpanElement>;
    waveThreeRef: RefObject<HTMLSpanElement>;
  }) {
    this.animationControllers = [
      new AnimationController(waveOneRef),
      new AnimationController(waveTwoRef),
      new AnimationController(waveThreeRef),
    ];

    this.initializeAnimations();
  }

  initializeAnimations() {
    this.animationControllers.forEach((controller, index) => {
      const keyframes = [{ opacity: 0, transform: 'scale(1.5)' }];
      const timing = {
        delay: index * PULSE_ANIMATION_DISTANCE_IN_MS,
        duration: PULSE_ANIMATION_DURATION,
        easing: 'linear',
        iterations: Infinity,
      };

      controller.initializeAnimation(keyframes, timing);
    });
  }

  executeStartPulsing() {
    this.animationControllers.forEach((controller) => {
      controller.play();

      controller.currenState = AnimationPlayState.RUNNING;
    });
  }

  executeReverseStartPulsing() {
    let smallestIterationProgress: number | null | undefined;
    let animationDistanceInMs = 0;

    this.animationControllers.forEach((controller) => {
      const iterationProgress =
        controller.animation?.effect?.getComputedTiming().progress;

      if (
        iterationProgress &&
        (!smallestIterationProgress ||
          iterationProgress < smallestIterationProgress)
      ) {
        smallestIterationProgress = iterationProgress;
      }
    });

    const smallestIterationAnimationTime =
      (smallestIterationProgress || 0) * PULSE_ANIMATION_DURATION;

    this.animationControllers.forEach((controller) => {
      clearTimeout(controller.timeoutId);

      if (controller.state === AnimationPlayState.FINISHED) {
        animationDistanceInMs += PULSE_ANIMATION_DISTANCE_IN_MS;

        controller.animation?.effect?.updateTiming({
          delay: Math.abs(
            smallestIterationAnimationTime - animationDistanceInMs
          ),
        });
      }

      controller.reverse();
      controller.play();

      controller.currenState = AnimationPlayState.RUNNING;
    });
  }

  executeRestartPulsing() {
    this.animationControllers.forEach((controller) => {
      controller.reverse();
      controller.play();
      controller.currenState = AnimationPlayState.RUNNING;
    });
  }

  executeStopPulsing() {
    this.animationControllers.forEach((controller) => {
      const iterationProgress =
        controller.animation?.effect?.getComputedTiming().progress;

      const iterationAnimationTime =
        (iterationProgress || 0) * PULSE_ANIMATION_DURATION;

      controller.reverse();
      controller.currenState = AnimationPlayState.REVERSING;

      controller.currenTimeoutId = setTimeout(() => {
        controller.finish();
        controller.currenState = AnimationPlayState.FINISHED;
      }, iterationAnimationTime);
    });
  }
}
