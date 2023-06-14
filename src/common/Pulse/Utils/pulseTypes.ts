export type BaseObejct = {
  animationOne?: Animation;
  animationTwo?: Animation;
  animationThree?: Animation;
  animationFour?: Animation;
  initializeAnimation: () => void;
  executeStopPulsing: () => void;
  executeRestartPulsing: () => void;
  executeStartPulsing: () => void;
};
