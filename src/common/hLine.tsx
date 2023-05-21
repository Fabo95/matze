import { CSSProperties } from 'react';

type HLineProps = {
  style?: CSSProperties;
  className?: string;
};
export const HLine = ({ className: propsClassName, style }: HLineProps) => {
  const defaultClassnames = 'background-white-dark';

  const classNames = propsClassName
    ? `${defaultClassnames} ${propsClassName}`
    : defaultClassnames;

  return <hr className={classNames} style={style} />;
};
