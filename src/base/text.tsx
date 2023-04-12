import { ReactNode } from 'react';

export const Text = ({
  className: propsClassName,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  const defaultClassnames = 'text-inherit';

  const classNames = propsClassName
    ? `${defaultClassnames} ${propsClassName}`
    : defaultClassnames;

  return <p className={classNames}>{children}</p>;
};
