import { forwardRef, Ref, TextareaHTMLAttributes } from 'react';

type TextProps = TextareaHTMLAttributes<HTMLParagraphElement>;

export const Text = forwardRef(
  (
    { className: propsClassName, children, ...textProps }: TextProps,
    ref: Ref<HTMLParagraphElement>
  ) => {
    const defaultClassnames = '';

    const classNames = propsClassName
      ? `${defaultClassnames} ${propsClassName}`
      : defaultClassnames;

    return (
      <p className={classNames} ref={ref} {...textProps}>
        {children}
      </p>
    );
  }
);
