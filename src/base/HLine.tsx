import { CSSProperties } from 'react';

type HLineProps = {
  style?: CSSProperties;
  className?: string;
};
export const HLine = ({ className: propsClassName, style }: HLineProps) => {
  const defaultClassnames = 'bg-white-full';

  const classNames = propsClassName
    ? `${defaultClassnames} ${propsClassName}`
    : defaultClassnames;

  return <hr className={classNames} style={style} />;
};
