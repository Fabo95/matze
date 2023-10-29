import { HTMLAttributes } from 'react';

type HeadingProps = HTMLAttributes<HTMLHeadingElement>;

export const Heading = ({
  className: propsClassName,
  children,
  ...headingProps
}: HeadingProps) => {
  const defaultClassnames = 'heading';

  const classNames = propsClassName
    ? `${defaultClassnames} ${propsClassName}`
    : defaultClassnames;

  return (
    <h1 className={classNames} {...headingProps}>
      {children}
    </h1>
  );
};
