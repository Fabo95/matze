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
  const defaultClassname = 'grid';

  const className = propsClassName
    ? `${defaultClassname} ${propsClassName}`
    : defaultClassname;

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
};
