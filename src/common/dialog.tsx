import { CSSProperties, forwardRef, ReactNode, Ref } from 'react';

type DialogProps = {
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
};

export const Dialog = forwardRef(
  (
    { style, className: propsClassName, children }: DialogProps,
    ref: Ref<HTMLDialogElement>
  ) => {
    const defaultClassnames = '';

    const classNames = propsClassName
      ? `${defaultClassnames} ${propsClassName}`
      : defaultClassnames;

    return (
      <dialog className={classNames} ref={ref} style={style}>
        {children}
      </dialog>
    );
  }
);
