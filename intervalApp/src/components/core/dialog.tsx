import { DialogHTMLAttributes, forwardRef, Ref } from "react";

type DialogProps = DialogHTMLAttributes<HTMLDialogElement>;

export const Dialog = forwardRef(
    ({ children, className: propsClassName, ...dialogProps }: DialogProps, ref: Ref<HTMLDialogElement>) => {
        const defaultClassnames = "";

        const classNames = propsClassName ? `${defaultClassnames} ${propsClassName}` : defaultClassnames;

        return (
            <dialog className={classNames} ref={ref} {...dialogProps}>
                {children}
            </dialog>
        );
    }
);
