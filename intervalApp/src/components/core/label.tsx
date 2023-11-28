import { LabelHTMLAttributes } from "react";

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;
export const Label = ({ children, className: propsClassName, ...labelProps }: LabelProps) => {
    const defaultClassname = "label";

    const className = propsClassName ? `${defaultClassname} ${propsClassName}` : defaultClassname;

    return (
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        <label className={className} {...labelProps}>
            {children}
        </label>
    );
};
