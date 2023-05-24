import { ForwardedRef, forwardRef, ReactNode } from 'react';

type UnstyledButtonProps = {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
};

export const UnstyledButton = forwardRef(
  (
    { className: propsClassName, children, onClick }: UnstyledButtonProps,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    const defaultClassnames = 'unstyled-button';

    const classNames = propsClassName
      ? `${defaultClassnames} ${propsClassName}`
      : defaultClassnames;

    return (
      <button className={classNames} ref={ref} type="button" onClick={onClick}>
        {children}
      </button>
    );
  }
);
