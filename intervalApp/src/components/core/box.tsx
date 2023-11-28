"use client";

import { forwardRef, HTMLAttributes, Ref } from "react";

type BoxProps = HTMLAttributes<HTMLDivElement>;

export const Box = forwardRef(
    ({ children, className: propsClassName, ...boxProps }: BoxProps, ref: Ref<HTMLDivElement>) => {
        const defaultClassnames = "box";

        const classNames = propsClassName ? `${defaultClassnames} ${propsClassName}` : defaultClassnames;

        return (
            <div className={classNames} ref={ref} role="presentation" {...boxProps}>
                {children}
            </div>
        );
    }
);
