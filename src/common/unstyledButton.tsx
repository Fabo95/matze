import { ForwardedRef, forwardRef, MouseEvent, ReactNode } from 'react';

type UnstyledButtonProps = {
  className?: string;
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  handleMouseDown?: (event: MouseEvent<HTMLButtonElement>) => void;
};

export const UnstyledButton = forwardRef(
  (
    {
      className: propsClassName,
      children,
      onClick,
      handleMouseDown,
    }: UnstyledButtonProps,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    const defaultClassnames = 'unstyled-button';

    const classNames = propsClassName
      ? `${defaultClassnames} ${propsClassName}`
      : defaultClassnames;

    return (
      <button
        className={classNames}
        ref={ref}
        type="button"
        onClick={onClick}
        onMouseDown={handleMouseDown}
      >
        {children}
      </button>
    );
  }
);
