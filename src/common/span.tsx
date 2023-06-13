import { forwardRef, ReactNode, Ref } from 'react';
import { CustomCSSProperties } from 'utils/types';

type SpanProps = {
  className?: string;
  children?: ReactNode;
  style?: CustomCSSProperties;
};

export const Span = forwardRef(
  (
    { className: propsClassName, children, style }: SpanProps,
    ref: Ref<any>
  ) => {
    const defaultClassnames = 'span';

    const classNames = propsClassName
      ? `${defaultClassnames} ${propsClassName}`
      : defaultClassnames;

    return (
      <span className={classNames} ref={ref}>
        {children}
      </span>
    );
  }
);
