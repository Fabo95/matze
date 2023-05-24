import { CSSProperties, ReactNode, Ref } from 'react';

type BoxProps = {
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
  onClick?: (event?: any) => void;
  ref?: Ref<any>;
};
export const Box = ({
  style,
  className: propsClassName,
  children,
  onClick,
  ref,
}: BoxProps) => {
  const defaultClassnames = 'box';

  const classNames = propsClassName
    ? `${defaultClassnames} ${propsClassName}`
    : defaultClassnames;

  return (
    <div className={classNames} ref={ref} style={style} onClick={onClick}>
      {children}
    </div>
  );
};
