'use client';

import { SyntheticEvent, useState } from 'react';

import { Row } from 'base/row';
import { IntervalTimerSettingOptionProps } from 'ui/intervalTimer/utils/intervalTimerHelpers';
import { BackgroundBlur } from 'base/backgroundBlur';
import { useBoolean } from 'utils/hooks';
import { Modal } from 'base/modal';
import { Slider } from 'base/slider';
import { Box } from 'base/box';

export const IntervalTimerSettingOption = ({
  className,
  title,
  icon,
  intensity: propsIntensity,
}: IntervalTimerSettingOptionProps) => {
  // --- STATE ---

  const [intensity, setIntensity] = useState(propsIntensity);

  const {
    value: isOpen,
    setFalse: closeModal,
    setTrue: openModal,
  } = useBoolean(false);

  // --- CALLBACKS ---

  const handleIntensityChange = (event: SyntheticEvent<HTMLInputElement>) => {
    setIntensity(+event.currentTarget.value);
  };

  // --- RENDER ---

  console.log(intensity);

  return (
    <>
      <BackgroundBlur handleUnblur={closeModal} isBlurred={isOpen} />

      <Row
        className={`${className.button} mb-4 flex items-center justify-between rounded-2xl p-4 text-xl font-semibold`}
        key={title}
        onClick={openModal}
      >
        <Row className="items-center text-black-dark">
          {icon}
          {title}
        </Row>

        {intensity}
      </Row>

      <Modal
        closeModal={closeModal}
        contentClassName={className.modal}
        isOpen={isOpen}
      >
        <Box className="relative h-5/6 items-center">
          <Slider
            className="appearance-none "
            value={intensity}
            onChange={handleIntensityChange}
          />
          <Box className={`absolute bottom-0 `}>Hallo</Box>
        </Box>
      </Modal>
    </>
  );
};
