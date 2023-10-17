type InputProps = {
  className?: string;
  id?: string;
  name?: string;
  type?: HTMLInputElement['type'];
};
export const Input = ({
  className: propsClassName,
  id,
  name,
  type,
}: InputProps) => {
  const defaultClassname = 'input';

  const className = propsClassName
    ? `${defaultClassname} ${propsClassName}`
    : defaultClassname;

  return <input className={className} id={id} name={name} type={type} />;
};
