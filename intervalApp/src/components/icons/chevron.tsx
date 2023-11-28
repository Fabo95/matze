type ChevronProps = {
    className?: string;
    direction: "up" | "down" | "right" | "left";
};

export const Chevron = ({ className: propsClassName, direction }: ChevronProps) => {
    const defaultClassname = `icon-size-1-5 stroke-black-dark chevron-icon-direction-${direction}`;

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
            <path d="M4.5 15.75l7.5-7.5 7.5 7.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};
