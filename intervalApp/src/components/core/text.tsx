import { forwardRef, Ref, TextareaHTMLAttributes } from "react";

type TextProps = TextareaHTMLAttributes<HTMLParagraphElement>;

export const Text = forwardRef(
    ({ children, className: propsClassName, ...textProps }: TextProps, ref: Ref<HTMLParagraphElement>) => {
        const defaultClassnames = "";

        const classNames = propsClassName ? `${defaultClassnames} ${propsClassName}` : defaultClassnames;

        return (
            <p className={classNames} ref={ref} {...textProps}>
                {children}
            </p>
        );
    }
);
