'use client';

import React, { SyntheticEvent, useEffect, useMemo, useState } from 'react';
import { BehaviorSubject, distinctUntilChanged, map } from 'rxjs';

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
  required,
}: IntervalTimerConfigurationOptionProps) => {
  // --- STATE ---

  const [index, setIndex] = useState<number>(
    mapIntensityToIndex({ intensity: propsIntensity, maxIntensity: range.to })
  );

  const [intensity, setIntensity] = useState<number>(0);

  // --- SUBJECT ---

  const intensitySubject = useMemo(
    () => new BehaviorSubject(propsIntensity),
    [propsIntensity]
  );

  const {
    value: isOpen,
    setFalse: closeModal,
    setTrue: openModal,
  } = useBoolean(false);

  // --- CALLBACKS ---

  const handleIndexChange = (event: SyntheticEvent<HTMLInputElement>) => {
    intensitySubject.next(
      mapIndexToIntensity({
        index: +event.currentTarget.value,
        maxIntensity: range.to,
      })
    );
    setIndex(+event.currentTarget.value);
  };

  // --- HELPERS ---

  const translateYOffset = `${index}%`;

  // There is probably an easier way to do that but cloning is cool.
  const clonedIcon = React.cloneElement(icon, {
    ...icon.props,
    className: 'stroke-white-full h-9 w-9 mr-2 stroke-green-dark',
  });

  // --- EFFECTS ---

  useEffect(() => {
    intensitySubject
      .pipe(
        distinctUntilChanged((prevIntensity, currentIntensity) => {
          if (type === IntervalTimerConfigurationType.COUNT) {
            return false;
          }

          return Math.abs(currentIntensity - prevIntensity) <= 5;
        }),
        map((changedIntensity) => {
          if (type === IntervalTimerConfigurationType.COUNT) {
            return Math.round(changedIntensity);
          }

          const roundingNumber = 5;
          const rest = changedIntensity % roundingNumber;

          if (rest <= roundingNumber / 2) {
            return changedIntensity - rest;
          }

          return changedIntensity + (roundingNumber - rest);
        })
      )
      .subscribe({
        next: (result) => {
          setIntensity(result);
        },
      });
  }, [intensitySubject, range.to, type]);

  // --- MEMOIZED DATA ---

  const formattedIntensity = useMemo(() => {
    if (type === IntervalTimerConfigurationType.COUNT) {
      return intensity;
    }

    return getFormattedSecondsToMinutes(intensity);
  }, [intensity, type]);

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
