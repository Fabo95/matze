import { HTMLAttributes } from "react";

type HLineProps = HTMLAttributes<HTMLHRElement>;
export const HLine = ({ className: propsClassName, ...hLineProps }: HLineProps) => {
    const defaultClassnames = "hLine";

    const classNames = propsClassName ? `${defaultClassnames} ${propsClassName}` : defaultClassnames;

    return <hr className={classNames} {...hLineProps} />;
};
