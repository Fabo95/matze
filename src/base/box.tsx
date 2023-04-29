import { ReactNode, Ref } from 'react';

type BoxProps = {
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
  ref?: Ref<any>;
};
export const Box = ({
  className: propsClassName,
  children,
  onClick,
  ref,
}: BoxProps) => {
  const defaultClassnames = 'flex flex-col';

  const classNames = propsClassName
    ? `${defaultClassnames} ${propsClassName}`
    : defaultClassnames;

  return (
    <div className={classNames} ref={ref} onClick={onClick}>
      {children}
    </div>
  );
};
