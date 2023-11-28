import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ className: propsClassName, ...inputProps }: InputProps) => {
    const defaultClassname = "input";

    const className = propsClassName ? `${defaultClassname} ${propsClassName}` : defaultClassname;

    return <input className={className} {...inputProps} />;
};
