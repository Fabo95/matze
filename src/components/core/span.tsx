import { forwardRef, HTMLAttributes, Ref } from 'react';

type SpanProps = HTMLAttributes<HTMLSpanElement>;

export const Span = forwardRef(
  (
    { className: propsClassName, children, ...spanProps }: SpanProps,
    ref: Ref<HTMLSpanElement>
  ) => {
    const defaultClassnames = 'span';

    const classNames = propsClassName
      ? `${defaultClassnames} ${propsClassName}`
      : defaultClassnames;

    return (
      <span className={classNames} ref={ref} {...spanProps}>
        {children}
      </span>
    );
  }
);
