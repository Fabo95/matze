import { ForwardedRef, forwardRef, MouseEvent, ReactNode } from 'react';

type UnstyledButtonProps = {
  className?: string;
  children: ReactNode;
  handleMouseDown?: (event: MouseEvent<HTMLButtonElement>) => void;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  type?: HTMLButtonElement['type'];
};

export const UnstyledButton = forwardRef(
  (
    {
      className: propsClassName,
      children,
      handleMouseDown,
      onClick,
      type = 'button',
    }: UnstyledButtonProps,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    // --- STATE ---
    const defaultClassnames = 'unstyled-button';

    const classNames = propsClassName
      ? `${defaultClassnames} ${propsClassName}`
      : defaultClassnames;

    // --- RENDER ---

    return (
      <button
        className={classNames}
        ref={ref}
        type={type}
        onClick={onClick}
        onMouseDown={handleMouseDown}
      >
        {children}
      </button>
    );
  }
);
