import { Box } from "@Interval/components/core/box";

type SkeletonProps = { className?: string };

export const Skeleton = ({ className: propsClassName }: SkeletonProps) => {
    const defaultClassname = "skeleton skeleton-light";

    const className = propsClassName ? `${defaultClassname} ${propsClassName}` : defaultClassname;

    // --- RENDER ---

    return <Box className={className} />;
};
