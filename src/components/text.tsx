import { ReactNode } from 'react';

export const Text = ({
  classNames: propsClassNames,
  children,
}: {
  classNames?: string;
  children: ReactNode;
}) => {
  const defaultClassnames = 'text-inherit';

  const classNames = propsClassNames
    ? `${defaultClassnames} ${propsClassNames}`
    : defaultClassnames;

  return <p className={classNames}>{children}</p>;
};
