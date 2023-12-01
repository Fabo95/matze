"use client";

import { ButtonHTMLAttributes, ForwardedRef, forwardRef, ReactNode } from "react";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { useFormStatus } from "react-dom";

import { UnstyledButton } from "@Interval/components/core/unstyledButton";
import { ButtonSize, ButtonType } from "@Interval/components/button/utils/buttonTypes";
import {
    BUTTON_SIZE_TO_CLASS_NAME_MAP,
    BUTTON_TYPE_TO_CLASS_NAME_MAP,
} from "@Interval/components/button/utils/buttonConstants";
import { ButtonLoadingIndicator } from "@Interval/components/button/components/buttonLoadingIndicator";

export type ButtonProps = {
    buttonSize?: ButtonSize;
    buttonType?: ButtonType;
    children: ReactNode;
    isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef(
    (
        {
            buttonSize: propsButtonSize = ButtonSize.MEDIUM,
            buttonType: propsButtonType = ButtonType.DARK,
            children,
            className,
            isLoading,
            ...buttonProps
        }: ButtonProps,
        ref?: ForwardedRef<HTMLButtonElement>
    ) => {
        const status = useFormStatus();

        console.log("status", status);

        // --- HELPERS ---

        const buttonType = BUTTON_TYPE_TO_CLASS_NAME_MAP[propsButtonType];

        const buttonSize = BUTTON_SIZE_TO_CLASS_NAME_MAP[propsButtonSize];

        // --- RENDER ---

        return (
            <UnstyledButton className={`button ${buttonType} ${buttonSize} ${className}`} ref={ref} {...buttonProps}>
                {isLoading && <ButtonLoadingIndicator />}
                {children}
            </UnstyledButton>
        );
    }
);
