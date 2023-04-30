'use client';

import React, { SyntheticEvent, useCallback, useMemo, useState } from 'react';
import { BehaviorSubject } from 'rxjs';

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

import { IntervalTimerConfigurationType } from 'ui/intervalTimer/utils/intervalTimerTypes';
import { useIntensityPipe } from 'ui/intervalTimer/utils/intervalTimerHooks';
import { Box } from 'base/box';
import { ModalHeader } from 'base/modalHeader';

export const IntervalTimerConfigurationOption = ({
  className,
  icon,
  range,
  title,
  type,
  intensity: propsIntensity,
}: IntervalTimerConfigurationOptionProps) => {
  // --- STATE ---

  const [index, setIndex] = useState<number>(
    mapIntensityToIndex({ intensity: propsIntensity, maxIntensity: range.to })
  );

  const [intensity, setIntensity] = useState<number>(0);

  const {
    value: isOpen,
    setFalse: closeModal,
    setTrue: openModal,
  } = useBoolean(false);

  // --- SUBJECT ---

  const intensitySubject = useMemo(
    () => new BehaviorSubject(propsIntensity),
    [propsIntensity]
  );

  // --- CALLBACKS ---

  const handleIndexChange = useCallback(
    (event: SyntheticEvent<HTMLInputElement>) => {
      intensitySubject.next(
        mapIndexToIntensity({
          index: +event.currentTarget.value,
          maxIntensity: range.to,
        })
      );
      setIndex(+event.currentTarget.value);
    },
    [intensitySubject, range.to]
  );

  const handleIntensityChange = useCallback(
    (result: number) => {
      setIntensity(result);
    },
    [setIntensity]
  );

  // --- HELPERS ---

  const translateYOffset = `${index}%`;

  const sliderTrackDividingLinesAmount =
    type === IntervalTimerConfigurationType.TIME
      ? (range.to - range.from) / 5
      : range.to - range.from;

  // There is probably an easier way to do that but cloning is cool.
  const clonedIcon = React.cloneElement(icon, {
    ...icon.props,
    className: 'stroke-white-full h-9 w-9 mr-2 stroke-green-dark',
  });

  // --- EFFECTS ---

  useIntensityPipe({
    handleIntensityChange,
    intensitySubject,
    range,
    type,
  });

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
        inlineCenterLeft={title}
        inlineEnd={formattedIntensity}
        inlineStart={icon}
        onClick={openModal}
      />

      <Modal
        closeModal={closeModal}
        contentClassName={className.modal}
        isOpen={isOpen}
      >
        <ModalHeader
          blockEnd={formattedIntensity}
          inlineEnd={title}
          inlineStart={clonedIcon}
        />

        <SliderContainer>
          <>
            <Slider
              className="appearance-none"
              value={index}
              onChange={handleIndexChange}
            />
            <SliderThumb translateYOffset={translateYOffset} />
            <Box className="absolute h-full justify-around">
              {new Array(sliderTrackDividingLinesAmount).fill('').map(() => (
                <Box className="h-0.5 w-10 bg-white-full opacity-50" />
              ))}
            </Box>
          </>
        </SliderContainer>
      </Modal>
    </>
  );
};
