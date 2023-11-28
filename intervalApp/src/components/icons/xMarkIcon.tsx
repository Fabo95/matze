export const XMarkIcon = ({ className: propsClassName }: { className?: string }) => {
    const defaultClassname = "stroke-white-dark icon-size-1-5";

    const className = propsClassName ? `${defaultClassname} ${propsClassName}` : defaultClassname;

    return (
        <svg
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};
