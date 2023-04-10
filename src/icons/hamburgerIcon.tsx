export const HamburgerIcon = ({
  classNames: propsClassNames,
}: {
  classNames?: string;
}) => {
  const defaultClassnames = 'w-9 stroke-black-900';

  const classNames = propsClassNames
    ? `${defaultClassnames} ${propsClassNames}`
    : defaultClassnames;

  return (
    <svg
      className={classNames}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
