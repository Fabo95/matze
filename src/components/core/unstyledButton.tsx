'use client';

import {
  ButtonHTMLAttributes,
  ForwardedRef,
  forwardRef,
  MouseEvent,
} from 'react';

type UnstyledButtonProps = {
  handlemousedown?: (event: MouseEvent<HTMLButtonElement>) => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const UnstyledButton = forwardRef(
  (
    {
      className: propsClassName,
      children,
      ...unstyledButtonProps
    }: UnstyledButtonProps,
    ref?: ForwardedRef<HTMLButtonElement>
  ) => {
    // --- STATE ---
    const defaultClassnames = 'unstyled-button';

    const classNames = propsClassName
      ? `${defaultClassnames} ${propsClassName}`
      : defaultClassnames;

    // --- RENDER ---

    return (
      <button className={classNames} ref={ref} {...unstyledButtonProps}>
        {children}
      </button>
    );
  }
);
