"use client";

import { cloneElement, startTransition, SyntheticEvent, useCallback, useMemo, useRef, useState } from "react";

import { useParams } from "next/navigation";
import { distinctUntilChanged, map } from "rxjs";

import {
    IntervalTimerConfigurationOptionProps,
    IntervalTimerConfigurationType,
} from "@Interval/blocks/intervalTimer/components/utils/intervalTimerTypes";
import { Button } from "@Interval/components/button/button";
import { DetailButton } from "@Interval/components/core/detailButton";
import { Modal } from "@Interval/components/core/modal";
import { ModalHeader } from "@Interval/components/core/modalHeader";
import { SliderContainer } from "@Interval/components/core/slider/components/sliderContainer";
import { SliderThumb } from "@Interval/components/core/slider/components/sliderThumb";
import { SliderTrack } from "@Interval/components/core/slider/components/sliderTrack";
import { Slider } from "@Interval/components/core/slider/slider";
import { apiPatchIntervalServerAction } from "@Interval/serverAction/serverActions";
import { getFormattedSeconds } from "@Interval/utils/helpers";
import { useClientTranslation, useObservable, useReactiveCallback } from "@Interval/utils/hooks";
import { ButtonType } from "@Interval/components/button/utils/buttonTypes";
import { showToast } from "@Interval/utils/toast";

export const IntervalTimerDetailConfigurationOption = ({
    className,
    configurationType,
    icon,
    intensity: propsIntensity,
    intensityType,
    sliderRange,
    title,
}: IntervalTimerConfigurationOptionProps) => {
    const params = useParams();

    const t = useClientTranslation();

    // --- STATE ---

    const [intensity, setIntensity] = useState<number>(propsIntensity);

    const [isLoading, setIsLoading] = useState(false);

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

                distinctUntilChanged((prevIntensity, currentIntensity) => currentIntensity === prevIntensity)
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
        setIsLoading(true);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        startTransition(async () => {
            await apiPatchIntervalServerAction({
                filteredIntensity,
                intensityType,
                path: params.lang,
            });

            showToast(t("toast.intervalSaved"));

            closeModal();
            setIsLoading(false);
        });
    };

    // --- HELPERS ---

    // There is probably an easier way to do that but cloning is cool.
    const clonedIcon = cloneElement(icon, {
        ...icon.props,
        className: "stroke-white-dark icon-size-1-5 margin-right-0-5",
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

            <Modal closeModal={closeModal} containerClassName={className.modalContainer} ref={modalRef}>
                <ModalHeader blockEnd={formattedIntensity} inlineEnd={title} inlineStart={clonedIcon} />

                <SliderContainer>
                    <>
                        <Slider
                            className="appearance-none"
                            // We multiply it by 10 to have a smooth slider transition even for small ranges.
                            max={sliderRange.to * 10}
                            min={sliderRange.from * 10}
                            onChange={handleIndexChange}
                            value={intensity * 10}
                        />

                        <SliderThumb intensity={intensity} sliderRange={sliderRange} />
                        <SliderTrack configurationType={configurationType} sliderRange={sliderRange} />
                    </>
                </SliderContainer>

                <Button buttonType={ButtonType.LIGHT} isLoading={isLoading} onClick={handleConfirmIntensity}>
                    {t("cta.confirm")}
                </Button>
            </Modal>
        </>
    );
};
