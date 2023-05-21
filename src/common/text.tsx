import { forwardRef, ReactNode, Ref } from 'react';

type TextProps = {
  className?: string;
  children: ReactNode;
};

export const Text = forwardRef(
  (
    { className: propsClassName, children }: TextProps,
    ref: Ref<HTMLParagraphElement>
  ) => {
    const defaultClassnames = '';

    const classNames = propsClassName
      ? `${defaultClassnames} ${propsClassName}`
      : defaultClassnames;

    return (
      <p className={classNames} ref={ref}>
        {children}
      </p>
    );
  }
);
