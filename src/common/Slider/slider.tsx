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
  const classNames = propsClassName ? `slider ${propsClassName}` : 'slider';

  return (
    <input
      className={classNames}
      max={max}
      min={min}
      orient="vertical"
      type="range"
      value={value}
      onChange={onChange}
    />
  );
};
