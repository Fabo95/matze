"use client";

import { ButtonHTMLAttributes, ForwardedRef, forwardRef, ReactNode, useCallback, useState } from "react";

import { UnstyledButton } from "@Interval/components/core/unstyledButton";

type ButtonProps = {
    children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef(
    ({ children, className, onClick, ...buttonProps }: ButtonProps, ref?: ForwardedRef<HTMLButtonElement>) => {
        const [isClickEffect, setIsClickEffect] = useState(false);

        // --- CALLBACKS ---

        const handleClick = useCallback(
            (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                setIsClickEffect(true);

                setTimeout(() => {
                    setIsClickEffect(false);

                    if (onClick) {
                        onClick(event);
                    }
                }, 150);
            },
            [onClick]
        );

        // --- RENDER ---

        return (
            <UnstyledButton
                className={`button ${className} ${isClickEffect ? "button-click-effect" : ""}`}
                onClick={handleClick}
                ref={ref}
                {...buttonProps}
            >
                {children}
            </UnstyledButton>
        );
    }
);
