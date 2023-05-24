import { ReactNode } from 'react';

type SpanProps = {
  className?: string;
  children: ReactNode;
};

export const Span = ({ className: propsClassName, children }: SpanProps) => {
  const defaultClassnames = 'span';

  const classNames = propsClassName
    ? `${defaultClassnames} ${propsClassName}`
    : defaultClassnames;

  return <span className={classNames}>{children}</span>;
};
