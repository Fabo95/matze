import { ButtonHTMLAttributes, ForwardedRef, forwardRef } from "react";

import { XMarkIcon } from "@Interval/components/icons/xMarkIcon";
import { UnstyledButton } from "@Interval/components/core/unstyledButton";

type CloseButtonProps = {
    iconClassName?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const CloseButton = forwardRef(
    ({ iconClassName, ...unstyledButtonProps }: CloseButtonProps, ref?: ForwardedRef<HTMLButtonElement>) => {
        return (
            <UnstyledButton ref={ref} {...unstyledButtonProps}>
                <XMarkIcon className={iconClassName} />
            </UnstyledButton>
        );
    }
);
