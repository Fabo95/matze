import { ReactNode } from 'react';

type HeadingProps = {
  className?: string;
  children: ReactNode;
};

export const Heading = ({
  className: propsClassName,
  children,
}: HeadingProps) => {
  const defaultClassnames = 'text-inherit text-2xl font-semibold';

  const classNames = propsClassName
    ? `${defaultClassnames} ${propsClassName}`
    : defaultClassnames;

  return <h1 className={classNames}>{children}</h1>;
};
