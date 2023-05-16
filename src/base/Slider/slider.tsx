import { SyntheticEvent } from 'react';
import styles from 'base/Slider/slider.module.scss';

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
  const classNames = propsClassName
    ? `${styles.slider} ${propsClassName}`
    : styles.slider;

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
