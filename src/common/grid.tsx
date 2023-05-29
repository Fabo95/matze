import { CSSProperties, ReactNode } from 'react';

type GridProps = {
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
};
export const Grid = ({
  style,
  className: propsClassName,
  children,
}: GridProps) => {
  const defaultClassnames = 'grid';

  const classNames = propsClassName
    ? `${defaultClassnames} ${propsClassName}`
    : defaultClassnames;

  return (
    <div className={classNames} style={style}>
      {children}
    </div>
  );
};
