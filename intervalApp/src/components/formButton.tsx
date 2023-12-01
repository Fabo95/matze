"use client";

import { ForwardedRef, forwardRef } from "react";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { useFormStatus } from "react-dom";

import { Button, ButtonProps } from "@Interval/components/button/button";

type FormButtonProps = ButtonProps;

export const FormButton = forwardRef(
    ({ children, ...buttonProps }: FormButtonProps, ref?: ForwardedRef<HTMLButtonElement>) => {
        // --- STATE ---

        const { pending } = useFormStatus();

        // --- RENDER ---

        return (
            <Button isLoading={pending} ref={ref} {...buttonProps}>
                {children}
            </Button>
        );
    }
);
