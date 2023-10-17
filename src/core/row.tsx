import { CSSProperties, ReactNode } from 'react';

type RowProps = {
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
};

export const Row = ({
  className: propsClassName,
  children,
  onClick,
  style,
}: RowProps) => {
  const defaultClassnames = 'row';

  const classNames = propsClassName
    ? `${defaultClassnames} ${propsClassName}`
    : defaultClassnames;

  return (
    <div
      className={classNames}
      role="presentation"
      style={style}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
