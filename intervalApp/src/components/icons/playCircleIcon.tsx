export const PlayCircleIcon = ({ className: propsClassName }: { className?: string }) => {
    const defaultClassname = "stroke-black-dark icon-size-1-5";

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
            <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
            <path
                d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
