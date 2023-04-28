import { ReactNode } from 'react';

type BoxProps = {
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
};
export const Box = ({
  className: propsClassName,
  children,
  onClick,
}: BoxProps) => {
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
