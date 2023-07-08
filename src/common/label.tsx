import { ReactNode } from 'react';

type LabelProps = {
  children?: ReactNode;
  className?: string;
  htmlFor?: HTMLLabelElement['htmlFor'];
};
export const Label = ({
  children,
  className: propsClassName,
  htmlFor,
}: LabelProps) => {
  const defaultClassname = 'label';

  const className = propsClassName
    ? `${defaultClassname} ${propsClassName}`
    : defaultClassname;

  return (
    <label className={className} htmlFor={htmlFor}>
      {children}
    </label>
  );
};
