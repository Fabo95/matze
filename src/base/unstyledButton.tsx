import { ReactNode } from 'react';

export const UnstyledButton = ({
  classNames: propsClassNames,
  children,
  onClick,
}: {
  classNames?: string;
  children: ReactNode;
  onClick?: () => void;
}) => {
  const defaultClassnames = 'inline-block max-w-max';

  const classNames = propsClassNames
    ? `${defaultClassnames} ${propsClassNames}`
    : defaultClassnames;

  return (
    <button className={classNames} type="button" onClick={onClick}>
      {children}
    </button>
  );
};
