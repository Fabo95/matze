"use client";

import { ButtonHTMLAttributes, ForwardedRef, forwardRef, ReactNode } from "react";

import { UnstyledButton } from "@Interval/components/core/unstyledButton";

type ButtonProps = {
    children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef(
    ({ children, className, ...buttonProps }: ButtonProps, ref?: ForwardedRef<HTMLButtonElement>) => {
        // --- RENDER ---

        return (
            <UnstyledButton className={`button ${className}`} ref={ref} {...buttonProps}>
                {children}
            </UnstyledButton>
        );
    }
);
