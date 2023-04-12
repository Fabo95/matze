import { ReactNode } from 'react';

export const Box = ({
  className: propsClassName,
  children,
  onClick,
}: {
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
}) => {
  const defaultClassnames = 'flex flex-col';

  const classNames = propsClassName
    ? `${defaultClassnames} ${propsClassName}`
    : defaultClassnames;

  return (
    <div className={classNames} onClick={onClick}>
      {children}
    </div>
  );
};
