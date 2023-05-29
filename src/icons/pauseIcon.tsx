export const PauseIcon = ({
  className: propsClassName,
  fill,
}: {
  className?: string;
  fill?: string;
}) => {
  const defaultClassname = 'stroke-red-primary icon-size-2-25';

  const className = propsClassName
    ? `${defaultClassname} ${propsClassName}`
    : defaultClassname;

  return (
    <svg
      className={className}
      fill={fill || '#F01151'}
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.75 5.25v13.5m-7.5-13.5v13.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
