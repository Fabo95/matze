import { ReactNode } from 'react';

export const Row = ({
  classNames: propsClassNames,
  children,
}: {
  classNames?: string;
  children: ReactNode;
}) => {
  const defaultClassnames = 'flex flex-row';

  const classNames = propsClassNames
    ? `${defaultClassnames} ${propsClassNames}`
    : defaultClassnames;

  return <div className={classNames}>{children}</div>;
};
