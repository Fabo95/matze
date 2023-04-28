import { ReactNode } from 'react';

type UnstyledButtonProps = {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
};

export const UnstyledButton = ({
  className: propsClassName,
  children,
  onClick,
}: UnstyledButtonProps) => {
  const defaultClassnames = 'inline-block max-w-max';

  const classNames = propsClassName
    ? `${defaultClassnames} ${propsClassName}`
    : defaultClassnames;

  return (
    <button className={classNames} type="button" onClick={onClick}>
      {children}
    </button>
  );
};
