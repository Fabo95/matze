export const PlayIcon = ({
  className: propsClassName,
  fill,
}: {
  className?: string;
  fill?: string;
}) => {
  const defaultClassname = 'stroke-red-primary h-12 w-12';

  const className = propsClassName
    ? `${defaultClassname} ${propsClassName}`
    : defaultClassname;

  return (
    <svg
      className={className}
      fill={fill || '#F01151'}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
        fillRule="evenodd"
      />
    </svg>
  );
};
