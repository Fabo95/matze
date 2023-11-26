import { FormHTMLAttributes } from 'react';

type FormProps = {
  action?: (formData: FormData) => void;
} & Omit<FormHTMLAttributes<HTMLFormElement>, 'action'>;

export const Form = ({
  action,
  children,
  className: propsClassName,
  ...formProps
}: FormProps) => {
  const defaultClassname = 'form';

  const className = propsClassName
    ? `${defaultClassname} ${propsClassName}`
    : defaultClassname;

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <form action={action} className={className} {...formProps}>
      {children}
    </form>
  );
};
