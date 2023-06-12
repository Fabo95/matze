import { ReactNode } from 'react';
import { CustomCSSProperties } from 'utils/types';

type SpanProps = {
  className?: string;
  children?: ReactNode;
  style?: CustomCSSProperties;
};

export const Span = ({
  className: propsClassName,
  children,
  style,
}: SpanProps) => {
  const defaultClassnames = 'span';

  const classNames = propsClassName
    ? `${defaultClassnames} ${propsClassName}`
    : defaultClassnames;

  return <span className={classNames}>{children}</span>;
};
