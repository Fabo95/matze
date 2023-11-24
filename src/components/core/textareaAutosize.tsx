import BaseTextareaAutosize from 'react-textarea-autosize';
import { TextareaAutosizeProps } from 'react-textarea-autosize/dist/declarations/src';

export const TextareaAutosize = ({
  className: propsClassName,
  ...autosizeTextAreaProps
}: TextareaAutosizeProps) => {
  // --- HELPERS ---

  const defaultClassname = 'text-area-autosize';

  const className = propsClassName
    ? `${defaultClassname} ${propsClassName}`
    : defaultClassname;

  // --- RENDER

  return (
    <BaseTextareaAutosize className={className} {...autosizeTextAreaProps} />
  );
};
