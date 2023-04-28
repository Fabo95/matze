import { ReactNode } from 'react';

type RowProps = {
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
};

export const Row = ({
  className: propsClassName,
  children,
  onClick,
}: RowProps) => {
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
