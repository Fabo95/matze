export const ClockIcon = ({ className: propsClassName }: { className?: string }) => {
    const defaultClassnames = "icon-size-1-5";

    const classNames = propsClassName ? `${propsClassName} ${defaultClassnames}` : defaultClassnames;

    return (
        <svg
            className={classNames}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};
