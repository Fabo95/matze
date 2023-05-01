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
import { getFormattedSecondsToMinutes } from 'utils/helpers';
import { IntervalTimerConfigurationType } from 'ui/intervalTimer/utils/intervalTimerTypes';
import { useIntensityPipe } from 'ui/intervalTimer/utils/intervalTimerHooks';
import { ModalHeader } from 'base/modalHeader';
import { SliderTrack } from 'base/sliderTrack';

export const IntervalTimerConfigurationOption = ({
  className,
  icon,
  range,
  title,
  type,
  intensity: propsIntensity,
}: IntervalTimerConfigurationOptionProps) => {
  // --- STATE ---

  const [intensity, setIntensity] = useState<number>(propsIntensity);
  const [testIntensity, setTestIntensity] = useState<number>(0);

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
      intensitySubject.next(+event.currentTarget.value / 10);
      setIntensity(+event.currentTarget.value / 10);
    },
    [intensitySubject]
  );

  const handleIntensityChange = useCallback((result: number) => {
    setTestIntensity(result);
  }, []);

  // --- HELPERS ---

  const translateYOffset = `${
    ((intensity - range.from) / (range.to - range.from)) * 100
  }%`;

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
      return testIntensity;
    }

    return getFormattedSecondsToMinutes(testIntensity);
  }, [testIntensity, type]);

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
              // We multiply it by 10 to have a smooth slider transition even for small ranges.
              max={range.to * 10}
              min={range.from * 10}
              value={intensity * 10}
              onChange={handleIndexChange}
            />
            <SliderThumb translateYOffset={translateYOffset} />
            <SliderTrack range={range} type={type} />
          </>
        </SliderContainer>
      </Modal>
    </>
  );
};
