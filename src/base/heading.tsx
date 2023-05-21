import { ReactNode } from 'react';

type HeadingProps = {
  className?: string;
  children: ReactNode;
};

export const Heading = ({
  className: propsClassName,
  children,
}: HeadingProps) => {
  const defaultClassnames = 'text-inherit text-size-1-5 font-semibold';

  const classNames = propsClassName
    ? `${defaultClassnames} ${propsClassName}`
    : defaultClassnames;

  return <h1 className={classNames}>{children}</h1>;
};
