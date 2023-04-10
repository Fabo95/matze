import { ReactNode } from 'react';

export const Heading = ({
  classNames: propsClassNames,
  children,
}: {
  classNames?: string;
  children: ReactNode;
}) => {
  const defaultClassnames = 'text-inherit text-2xl font-semibold';

  const classNames = propsClassNames
    ? `${defaultClassnames} ${propsClassNames}`
    : defaultClassnames;

  return <h1 className={classNames}>{children}</h1>;
};
