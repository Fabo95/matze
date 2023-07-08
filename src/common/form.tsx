'use server';

import { ReactNode } from 'react';

type FormProps = {
  action?: (formData: FormData) => void;
  className?: string;
  children?: ReactNode;
};
export const Form = ({
  action,
  className: propsClassName,
  children,
}: FormProps) => {
  const defaultClassname = 'form';

  const className = propsClassName
    ? `${defaultClassname} ${propsClassName}`
    : defaultClassname;

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <form action={action} className={className}>
      {children}
    </form>
  );
};
