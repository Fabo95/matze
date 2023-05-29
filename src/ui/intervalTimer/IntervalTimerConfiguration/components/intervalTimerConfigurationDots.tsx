import { Box } from 'common/box';

type IntervalTimerConfigurationDotsProps = {
  className: string;
  currentCount: number;
  index: number;
};

export const IntervalTimerConfigurationDots = ({
  className,
  currentCount,
  index,
}: IntervalTimerConfigurationDotsProps) => (
  <Box className={`${className}`}>
    <Box
      className={`${
        index < currentCount ? 'interval-timer-overview-dot-completed' : ''
      }`}
    />
  </Box>
);
