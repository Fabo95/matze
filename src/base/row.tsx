import { ReactNode } from 'react';

export const Row = ({
  className: propsClassName,
  children,
  onClick,
}: {
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
}) => {
  const defaultClassnames = 'flex flex-row';

  const classNames = propsClassName
    ? `${defaultClassnames} ${propsClassName}`
    : defaultClassnames;

  return (
    <div className={classNames} onClick={onClick}>
      {children}
    </div>
  );
};
