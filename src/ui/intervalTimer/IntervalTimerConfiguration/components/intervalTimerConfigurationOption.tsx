'use client';

import React, {
  SyntheticEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
  useTransition,
} from 'react';
import { distinctUntilChanged, map } from 'rxjs';
import { useParams } from 'next/navigation';

import { IntervalTimerConfigurationOptionProps } from 'ui/intervalTimer/utils/intervalTimerHelpers';
import { useObservable, useReactiveCallback } from 'utils/hooks';
import { Modal } from 'common/modal';
import { Slider } from 'common/Slider/slider';
import { SliderThumb } from 'common/Slider/components/sliderThumb';
import { SliderContainer } from 'common/Slider/components/sliderContainer';
import { ConfigurationOptionButton } from 'common/configurationOptionButton';
import { getFormattedSeconds } from 'utils/helpers';
import { IntervalTimerConfigurationType } from 'ui/intervalTimer/utils/intervalTimerTypes';
import { ModalHeader } from 'common/modalHeader';
import { SliderTrack } from 'common/Slider/components/sliderTrack';
import { Button } from 'common/button';
import { apiPatchIntensity } from 'serverAction/serverActions';

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

  const [intensity, setIntensity] = useState<number>(propsIntensity);

  const [_, startTransition] = useTransition();
  const params = useParams();

  const modalRef = useRef<HTMLDialogElement>(null);

  // --- REACTIVE ---

  const [handleIntensitySubject, intensity$] = useReactiveCallback<number>();

  const filteredIntensity$ = useMemo(
    () =>
      intensity$.pipe(
        map((intensityValue) => {
          if (configurationType === IntervalTimerConfigurationType.COUNT) {
            return Math.round(intensityValue);
          }

          const roundingNumber = 5;
          const rest = intensityValue % roundingNumber;

          if (rest < roundingNumber / 2) {
            return intensityValue - rest;
          }

          return intensityValue + (roundingNumber - rest);
        }),

        distinctUntilChanged(
          (prevIntensity, currentIntensity) =>
            currentIntensity === prevIntensity
        )
      ),
    [configurationType, intensity$]
  );

  const filteredIntensity = useObservable<number>({
    initialState: intensity,
    source$: filteredIntensity$,
  });

  // --- CALLBACKS ---

  const openModal = () => {
    modalRef?.current?.showModal();
  };

  const closeModal = () => {
    modalRef?.current?.close();
  };

  const handleIndexChange = useCallback(
    (event: SyntheticEvent<HTMLInputElement>) => {
      event.stopPropagation();
      handleIntensitySubject(+event.currentTarget.value / 10);
      setIntensity(+event.currentTarget.value / 10);
    },
    [handleIntensitySubject]
  );

  const handleConfirmIntensity = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    startTransition(async () => {
      await apiPatchIntensity({
        filteredIntensity,
        intensityType,
        path: params.lang,
      });
    });

    closeModal();
  };

  // --- HELPERS ---

  // There is probably an easier way to do that but cloning is cool.
  const clonedIcon = React.cloneElement(icon, {
    ...icon.props,
    className: 'stroke-white-dark icon-size-2-25 margin-right-0-5',
  });

  // --- MEMOIZED DATA ---

  const formattedIntensity = useMemo(() => {
    if (configurationType === IntervalTimerConfigurationType.COUNT) {
      return filteredIntensity;
    }

    return getFormattedSeconds(filteredIntensity);
  }, [configurationType, filteredIntensity]);

  // --- RENDER ---

  return (
    <>
      <ConfigurationOptionButton
        className={className.configurationOptionButton}
        inlineCenterLeft={title}
        inlineEnd={formattedIntensity}
        inlineStart={icon}
        onClick={openModal}
      />

      <Modal
        closeModal={closeModal}
        containerClassName={className.modalContainer}
        ref={modalRef}
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
              // We multiply it by 10 to have a smooth Slider transition even for small ranges.
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

        <Button
          buttonTitle={primaryButtonTitle}
          onClick={handleConfirmIntensity}
        />
      </Modal>
    </>
  );
};
