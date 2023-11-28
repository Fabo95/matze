"use client";

import { forwardRef, HTMLAttributes, Ref } from "react";

type BoxProps = HTMLAttributes<HTMLDivElement>;

export const Box = forwardRef(
    ({ children, className: propsClassName, ...boxProps }: BoxProps, ref: Ref<HTMLDivElement>) => {
        const defaultClassname = "box";

        const className = propsClassName ? `${defaultClassname} ${propsClassName}` : defaultClassname;

        return (
            <div className={className} ref={ref} role="presentation" {...boxProps}>
                {children}
            </div>
        );
    }
);
