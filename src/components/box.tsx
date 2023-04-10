import { ReactNode } from 'react';

export const Box = ({
  classNames: propsClassNames,
  children,
}: {
  classNames?: string;
  children: ReactNode;
}) => {
  const defaultClassnames = 'flex flex-col';

  const classNames = propsClassNames
    ? `${defaultClassnames} ${propsClassNames}`
    : defaultClassnames;

  return <div className={classNames}>{children}</div>;
};
