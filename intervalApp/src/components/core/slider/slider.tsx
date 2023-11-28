import { SyntheticEvent } from 'react';

import { stopPropagation } from '@Interval/utils/helpers';

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
  onChange,
  value,
}: SliderProps) => {
  const classNames = propsClassName ? `slider ${propsClassName}` : 'slider';

  return (
    <input
      className={classNames}
      max={max}
      min={min}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      onChange={onChange}
      onMouseMove={stopPropagation}
      onTouchMove={stopPropagation}
      onTouchStart={onChange}
      orient="vertical"
      type="range"
      value={value}
    />
  );
};
