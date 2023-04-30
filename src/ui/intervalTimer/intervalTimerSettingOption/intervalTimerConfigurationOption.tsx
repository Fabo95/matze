'use client';

import React, { SyntheticEvent, useState } from 'react';

import { IntervalTimerConfigurationOptionProps } from 'ui/intervalTimer/utils/intervalTimerHelpers';
import { BackgroundBlur } from 'base/backgroundBlur';
import { useBoolean } from 'utils/hooks';
import { Modal } from 'base/modal';
import { Slider } from 'base/slider';
import { SliderThumb } from 'base/sliderThumb';
import { SliderContainer } from 'base/sliderContainer';
import { Button } from 'base/button';
import {
  getFormattedSecondsToMinutes,
  mapIndexToIntensity,
  mapIntensityToIndex,
} from 'utils/helpers';
import { Row } from 'base/row';
import { Text } from 'base/text';
import { IntervalTimerConfigurationType } from 'ui/intervalTimer/utils/intervalTimerTypes';

export const IntervalTimerConfigurationOption = ({
  className,
  icon,
  range,
  title,
  type,
  intensity: propsIntensity,
}: IntervalTimerConfigurationOptionProps) => {
  // --- STATE ---

  const [index, setIndex] = useState(
    mapIntensityToIndex({ intensity: propsIntensity, maxIntensity: range.to })
  );

  console.log(index);

  const {
    value: isOpen,
    setFalse: closeModal,
    setTrue: openModal,
  } = useBoolean(false);

  // --- CALLBACKS ---

  const handleIndexChange = (event: SyntheticEvent<HTMLInputElement>) => {
    const currentIndex = +event.currentTarget.value;
    setIndex(currentIndex);
  };

  // --- HELPERS ---

  const translateYOffset = `${index}%`;

  // There is probably an easier way to do that but cloning is cool.
  const clonedIcon = React.cloneElement(icon, {
    ...icon.props,
    className: 'stroke-white-full h-9 w-9 mr-2 stroke-green-dark',
  });

  const intensity = mapIndexToIntensity({ index, maxIntensity: range.to });

  const formattedIntensity =
    type === IntervalTimerConfigurationType.COUNT
      ? intensity
      : getFormattedSecondsToMinutes(intensity);

  // --- RENDER ---

  return (
    <>
      <BackgroundBlur handleUnblur={closeModal} isBlurred={isOpen} />

      <Button
        className={className.button}
        icon={icon}
        intensity={formattedIntensity}
        title={title}
        onClick={openModal}
      />

      <Modal
        closeModal={closeModal}
        contentClassName={className.modal}
        isOpen={isOpen}
      >
        <Row className="mb-8 justify-center">
          {clonedIcon}
          <Text className="text-3xl font-semibold">{title}</Text>
        </Row>
        <Text className="mb-10 text-center text-8xl font-bold text-white-full">
          {formattedIntensity}
        </Text>
        <SliderContainer>
          <>
            <Slider
              className="appearance-none"
              value={index}
              onChange={handleIndexChange}
            />
            <SliderThumb translateYOffset={translateYOffset} />
            {}
          </>
        </SliderContainer>
      </Modal>
    </>
  );
};
