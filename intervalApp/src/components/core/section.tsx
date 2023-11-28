import { forwardRef, HTMLAttributes, Ref } from "react";

type SectionProps = HTMLAttributes<HTMLDivElement>;

export const Section = forwardRef(
    ({ children, className: propsClassName, ...sectionProps }: SectionProps, ref: Ref<HTMLDivElement>) => {
        const defaultClassname = "section";

        const className = propsClassName ? `${defaultClassname} ${propsClassName}` : defaultClassname;

        return (
            <section className={className} ref={ref} role="presentation" {...sectionProps}>
                {children}
            </section>
        );
    }
);
