import { SyntheticEvent } from 'react';

type SliderProps = {
  className?: string;
  max: number;
  min: number;
  onChange?: (event: SyntheticEvent<HTMLInputElement>) => void;
  value: number;
};

export const Slider = ({
  className: propsClassName,
  max,
  min,
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
      max={max}
      min={min}
      orient="vertical"
      type="range"
      value={value}
      onChange={onChange}
    />
  );
};
