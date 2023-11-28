import BaseTextareaAutosize, { TextareaAutosizeProps } from "react-textarea-autosize";

export const TextareaAutosize = ({ className: propsClassName, ...autosizeTextAreaProps }: TextareaAutosizeProps) => {
    // --- HELPERS ---

    const defaultClassname = "text-area-autosize";

    const className = propsClassName ? `${defaultClassname} ${propsClassName}` : defaultClassname;

    // --- RENDER

    return <BaseTextareaAutosize className={className} {...autosizeTextAreaProps} />;
};
