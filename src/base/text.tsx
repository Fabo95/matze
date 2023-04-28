import { ReactNode } from 'react';

type TextProps = {
  className?: string;
  children: ReactNode;
};

export const Text = ({ className: propsClassName, children }: TextProps) => {
  const defaultClassnames = 'text-inherit';

  const classNames = propsClassName
    ? `${defaultClassnames} ${propsClassName}`
    : defaultClassnames;

  return <p className={classNames}>{children}</p>;
};
