import { HTMLAttributes } from 'react';

type GridProps = HTMLAttributes<HTMLDivElement>;
export const Grid = ({
  className: propsClassName,
  children,
  ...gridProps
}: GridProps) => {
  const defaultClassname = 'grid';

  const className = propsClassName
    ? `${defaultClassname} ${propsClassName}`
    : defaultClassname;

  return (
    <div className={className} {...gridProps}>
      {children}
    </div>
  );
};
