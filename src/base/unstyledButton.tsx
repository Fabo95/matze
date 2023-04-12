import { ReactNode } from 'react';

export const UnstyledButton = ({
  className: propsClassName,
  children,
  onClick,
}: {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}) => {
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
