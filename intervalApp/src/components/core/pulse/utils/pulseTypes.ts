import { RefObject } from "react";

export type PulseAnimationProps = {
    animationControllers: {
        animation?: Animation;
        finish: () => void;
        initializeAnimation: (keyframes: Keyframe[], timing: number | KeyframeAnimationOptions) => void;
        play: () => void;
        reverse: () => void;
        state: AnimationPlayState;
        waveRef: RefObject<HTMLSpanElement>;
    }[];
    executeRestartPulsing: () => void;
    executeReverseStartPulsing: () => void;
    executeStartPulsing: () => void;
    executeStopPulsing: () => void;
};

export enum AnimationPlayState {
    FINISHED = "finished",
    IDLE = "idle",
    REVERSING = "reversing",
    RUNNING = "running",
}
