'use client';

import React, {
  SyntheticEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
  startTransition,
} from 'react';
import { distinctUntilChanged, map } from 'rxjs';
import { useParams } from 'next/navigation';

import {
  IntervalTimerConfigurationOptionProps,
  IntervalTimerConfigurationType,
} from 'blocks/intervalTimer/components/utils/intervalTimerTypes';
import { useObservable, useReactiveCallback } from 'utils/hooks';
import { Modal } from 'core/modal';
import { Slider } from 'core/slider/slider';
import { SliderThumb } from 'core/slider/components/sliderThumb';
import { SliderContainer } from 'core/slider/components/sliderContainer';
import { DetailButton } from 'core/detailButton';
import { getFormattedSeconds } from 'utils/helpers';
import { ModalHeader } from 'core/modalHeader';
import { SliderTrack } from 'core/slider/components/sliderTrack';
import { Button } from 'core/button';
import { apiPatchIntervalServerAction } from 'serverAction/serverActions';
import { getTFunction } from 'i18n/tFunction';
import { Locale } from 'utils/types';

export const IntervalTimerDetailConfigurationOption = ({
  className,
  icon,
  sliderRange,
  title,
  configurationType,
  intensity: propsIntensity,
  intensityType,
}: IntervalTimerConfigurationOptionProps) => {
  const params = useParams();

  const t = getTFunction(params.lang as Locale);

  // --- STATE ---

  const [intensity, setIntensity] = useState<number>(propsIntensity);

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
      await apiPatchIntervalServerAction({
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
    className: 'stroke-white-dark icon-size-1-5 margin-right-0-5',
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
      <DetailButton
        className={className.detailButton}
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

        <Button
          buttonTitle={t('cta.confirm')}
          onClick={handleConfirmIntensity}
        />
      </Modal>
    </>
  );
};
