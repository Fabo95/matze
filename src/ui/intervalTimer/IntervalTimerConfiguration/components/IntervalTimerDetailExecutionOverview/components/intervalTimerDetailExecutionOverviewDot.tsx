import { Box } from 'common/box';

type IntervalTimerConfigurationDotProps = {
  containerClassName: string;
  completedCount: number;
  index: number;
};

export const IntervalTimerDetailExecutionOverviewDot = ({
  containerClassName,
  completedCount,
  index,
}: IntervalTimerConfigurationDotProps) => (
  <Box className={`${containerClassName} `}>
    <Box className={`${index < completedCount ? 'completed' : ''}`} />
  </Box>
);
