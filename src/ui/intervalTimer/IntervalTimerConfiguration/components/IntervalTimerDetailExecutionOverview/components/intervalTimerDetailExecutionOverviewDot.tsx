import { Box } from 'common/box';

type IntervalTimerConfigurationDotProps = {
  containerClassName: string;
  currentCount: number;
  index: number;
};

export const IntervalTimerDetailExecutionOverviewDot = ({
  containerClassName,
  currentCount,
  index,
}: IntervalTimerConfigurationDotProps) => (
  <Box className={`${containerClassName} `}>
    <Box className={`${index < currentCount ? 'completed' : ''}`} />
  </Box>
);
