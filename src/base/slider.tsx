import { SyntheticEvent } from 'react';

type SliderProps = {
  className?: string;
  onChange?: (event: SyntheticEvent<HTMLInputElement>) => void;
  value: number;
};

export const Slider = ({
  className: propsClassName,

  value,
  onChange,
}: SliderProps) => {
  const defaultClassnames = 'flex flex-row';

  const classNames = propsClassName
    ? `${defaultClassnames} ${propsClassName}`
    : defaultClassnames;

  return (
    <input
      className={`${classNames} slider`}
      orient="vertical"
      type="range"
      value={value}
      onChange={onChange}
    />
  );
};
