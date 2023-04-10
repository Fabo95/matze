import { ReactNode } from 'react';

export const Box = ({
  classNames: propsClassNames,
  children,
  onClick,
}: {
  classNames?: string;
  children: ReactNode;
  onClick?: () => void;
}) => {
  const defaultClassnames = 'flex flex-col';

  const classNames = propsClassNames
    ? `${defaultClassnames} ${propsClassNames}`
    : defaultClassnames;

  return (
    <div onClick={onClick} className={classNames}>
      {children}
    </div>
  );
};
