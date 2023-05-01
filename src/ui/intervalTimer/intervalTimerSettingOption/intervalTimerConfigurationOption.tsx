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
import { ConfigurationOptionButton } from 'ui/intervalTimer/intervalTimerSettingOption/components/configurationOptionButton';
import { getFormattedSecondsToMinutes } from 'utils/helpers';
import { IntervalTimerConfigurationType } from 'ui/intervalTimer/utils/intervalTimerTypes';
import { useIntensityPipe } from 'ui/intervalTimer/utils/intervalTimerHooks';
import { ModalHeader } from 'base/modalHeader';
import { SliderTrack } from 'base/sliderTrack';
import { UnstyledButton } from 'base/unstyledButton';

export const IntervalTimerConfigurationOption = ({
  className,
  icon,
  primaryButtonTitle,
  sliderRange,
  title,
  configurationType,
  intensity: propsIntensity,
  intensityType,
}: IntervalTimerConfigurationOptionProps & { primaryButtonTitle: string }) => {
  // --- STATE ---

  console.log(className);

  const [intensity, setIntensity] = useState<number>(propsIntensity);
  const [filteredIntensity, setFilteredIntensity] = useState<number>(0);

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
    setFilteredIntensity(result);
  }, []);

  const handleConfirmIntensity = async () => {
    try {
      await fetch('http://localhost:8080/intervals', {
        body: JSON.stringify({ [intensityType]: filteredIntensity }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PATCH',
      });
    } catch (e) {
      console.log(e);
    }

    closeModal();
  };

  // --- HELPERS ---

  // There is probably an easier way to do that but cloning is cool.
  const clonedIcon = React.cloneElement(icon, {
    ...icon.props,
    className: 'stroke-white-full h-9 w-9 mr-2 stroke-green-dark',
  });

  // --- EFFECTS ---

  useIntensityPipe({
    configurationType,
    handleIntensityChange,
    intensitySubject,
    sliderRange,
  });

  // --- MEMOIZED DATA ---

  const formattedIntensity = useMemo(() => {
    if (configurationType === IntervalTimerConfigurationType.COUNT) {
      return filteredIntensity;
    }

    return getFormattedSecondsToMinutes(filteredIntensity);
  }, [configurationType, filteredIntensity]);

  // --- RENDER ---

  return (
    <>
      <BackgroundBlur handleUnblur={closeModal} isBlurred={isOpen} />

      <ConfigurationOptionButton
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
              max={sliderRange.to * 10}
              min={sliderRange.from * 10}
              value={intensity * 10}
              onChange={handleIndexChange}
            />
            <SliderThumb intensity={intensity} sliderRange={sliderRange} />
            <SliderTrack
              configurationType={configurationType}
              sliderRange={sliderRange}
            />
          </>
        </SliderContainer>

        <UnstyledButton
          className={`rounded bg-white-full p-4 text-xl font-semibold ${className.button}`}
          onClick={handleConfirmIntensity}
        >
          {primaryButtonTitle}
        </UnstyledButton>
      </Modal>
    </>
  );
};
