'use client';

import { Row } from 'base/row';
import { IntervalTimerSettingOptionProps } from 'ui/intervalTimer/intervalTimerHelpers';
import { BackgroundBlur } from 'base/backgroundBlur';
import { useBoolean } from 'utils/hooks';
import { Modal } from 'base/modal';

export const IntervalTimerSettingOption = ({
  className,
  title,
  icon,
  intensity,
}: IntervalTimerSettingOptionProps) => {
  // --- STATE ---

  const {
    value: isOpen,
    setFalse: closeModal,
    setTrue: openModal,
  } = useBoolean(false);

  // --- RENDER ---

  return (
    <>
      <BackgroundBlur handleUnblur={closeModal} isBlurred={isOpen} />

      <Row
        className={`${className} mb-4 flex items-center justify-between rounded-2xl p-4 text-xl font-semibold`}
        key={title}
        onClick={openModal}
      >
        <Row className="items-center text-black-dark">
          {icon}
          {title}
        </Row>

        {intensity}
      </Row>

      <Modal isOpen={isOpen}> ds</Modal>
    </>
  );
};
