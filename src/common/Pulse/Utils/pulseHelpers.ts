import { PULSE_ANIMATION_DURATION } from 'common/Pulse/Utils/pulseConstants';

export const executeStopPulsing = ({
  animationOne,
  animationTwo,
  animationThree,
  animationFour,
}: {
  animationOne: Animation;
  animationTwo: Animation;
  animationThree: Animation;
  animationFour: Animation;
}) => {
  animationOne.pause();
  animationTwo.pause();
  animationThree.pause();
  animationFour.pause();

  const computedTimingOne = animationOne?.effect?.getComputedTiming();
  const computedTimingTwo = animationTwo.effect?.getComputedTiming();
  const computedTimingThree = animationThree.effect?.getComputedTiming();
  const computedTimingFour = animationFour.effect?.getComputedTiming();

  const test1 = animationOne.currentTime;
  const test2 = animationTwo.currentTime;
  const test3 = animationThree.currentTime;
  const test4 = animationFour.currentTime;

  const remainingDuration1 =
    PULSE_ANIMATION_DURATION - (test1 % PULSE_ANIMATION_DURATION);
  const remainingDuration2 =
    PULSE_ANIMATION_DURATION - (test2 % PULSE_ANIMATION_DURATION);
  const remainingDuration3 =
    PULSE_ANIMATION_DURATION - (test3 % PULSE_ANIMATION_DURATION);
  const remainingDuration4 =
    PULSE_ANIMATION_DURATION - (test4 % PULSE_ANIMATION_DURATION);

  animationOne.pause();
  animationTwo.pause();
  animationThree.pause();
  animationFour.pause();

  console.log('test1,', test1);
  console.log('remainingDuration1', remainingDuration1);

  animationOne.effect?.updateTiming({
    direction: 'reverse',
    iterations: Number(computedTimingOne?.currentIteration) + 1,
  });
  animationTwo.effect?.updateTiming({
    direction: 'reverse',
    iterations: Number(computedTimingTwo?.currentIteration) + 1,
  });
  animationThree.effect?.updateTiming({
    direction: 'reverse',
    iterations: Number(computedTimingThree?.currentIteration) + 1,
  });
  animationFour.effect?.updateTiming({
    direction: 'reverse',
    iterations: Number(computedTimingFour?.currentIteration) + 1,
  });

  animationOne.currentTime = remainingDuration1;
  animationTwo.currentTime = remainingDuration2;
  animationThree.currentTime = remainingDuration3;
  animationFour.currentTime = remainingDuration4;

  animationOne.play();
  animationTwo.play();
  animationThree.play();
  animationFour.play();
};
