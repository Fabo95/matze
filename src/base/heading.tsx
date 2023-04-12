import { ReactNode } from 'react';

export const Heading = ({
  className: propsClassName,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  const defaultClassnames = 'text-inherit text-2xl font-semibold';

  const classNames = propsClassName
    ? `${defaultClassnames} ${propsClassName}`
    : defaultClassnames;

  return <h1 className={classNames}>{children}</h1>;
};
