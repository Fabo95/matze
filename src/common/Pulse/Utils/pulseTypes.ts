import { RefObject } from 'react';

export type PulseAnimationProps = {
  executeStopPulsing: () => void;
  executeRestartPulsing: () => void;
  executeStartPulsing: () => void;
  executeReverseStartPulsing: () => void;
  animationControllers: {
    animation?: Animation;
    waveRef: RefObject<HTMLSpanElement>;
    initializeAnimation: (
      keyframes: Keyframe[],
      timing: number | KeyframeAnimationOptions
    ) => void;
    play: () => void;
    reverse: () => void;
    finish: () => void;
    state: string;
  }[];
};
