import { ReactNode } from 'react';

export const Row = ({
  classNames: propsClassNames,
  children,
  onClick,
}: {
  classNames?: string;
  children: ReactNode;
  onClick?: () => void;
}) => {
  const defaultClassnames = 'flex flex-row';

  const classNames = propsClassNames
    ? `${defaultClassnames} ${propsClassNames}`
    : defaultClassnames;

  return (
    <div className={classNames} onClick={onClick}>
      {children}
    </div>
  );
};
