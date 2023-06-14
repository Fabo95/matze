import {
  PULSE_ANIMATION_DURATION,
  PULSE_ANIMATION_FOUR_DELAY,
  PULSE_ANIMATION_THREE_DELAY,
  PULSE_ANIMATION_TWO_DELAY,
} from 'common/Pulse/Utils/pulseConstants';

export const executeStopPulsing = ({
  animationOne,
  animationTwo,
  animationThree,
  animationFour,
}: {
  animationOne?: Animation;
  animationTwo?: Animation;
  animationThree?: Animation;
  animationFour?: Animation;
}) => {
  const currentTimeOne = animationOne?.currentTime;
  const currentTimeTwo = animationTwo?.currentTime;
  const currentTimeThree = animationThree?.currentTime;
  const currentTimeFour = animationFour?.currentTime;

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

  animationOne?.reverse();
  animationTwo?.reverse();
  animationThree?.reverse();
  animationFour?.reverse();

  setTimeout(() => {
    animationOne?.finish();
  }, timeoutTimeAnimationOne);

  setTimeout(() => {
    animationTwo?.finish();
  }, timeoutTimeAnimationTwo);

  setTimeout(() => {
    animationThree?.finish();
  }, timeoutTimeAnimationThree);

  setTimeout(() => {
    animationFour?.finish();
  }, timeoutTimeAnimationFour);
};
