"use client";

import { HTMLAttributes } from "react";

type RowProps = HTMLAttributes<HTMLDivElement>;

export const Row = ({ children, className: propsClassName, ...rowProps }: RowProps) => {
    const defaultClassnames = "row";

    const classNames = propsClassName ? `${defaultClassnames} ${propsClassName}` : defaultClassnames;

    return (
        <div className={classNames} role="presentation" {...rowProps}>
            {children}
        </div>
    );
};
