import { getFormattedSeconds } from 'utils/helpers';
import { Box } from 'common/box';
import { UnstyledButton } from 'common/unstyledButton';
import { Row } from 'common/row';
import { Text } from 'common/text';
import { PlayIcon } from 'icons/playIcon';
import { PauseIcon } from 'icons/pauseIcon';

export const IntervalTimerExecution = ({
  isExecuting,
  startIntervalTimerExecution,
  pauseIntervalTimerExecution,
  remainingCurrentTime,
}: {
  isExecuting: boolean;
  startIntervalTimerExecution: () => void;
  pauseIntervalTimerExecution: () => void;
  remainingCurrentTime: number;
}) => {
  // --- HELPERS ---

  const formattedIntervalTime = getFormattedSeconds(remainingCurrentTime);

  // --- CALLBACKS ---

  const handleIntervalTimerExecution = isExecuting
    ? pauseIntervalTimerExecution
    : startIntervalTimerExecution;

  // --- RENDER ---

  return (
    <Box className="interval-timer-execution">
      <Text className="interval-timer-execution-intro">
        {formattedIntervalTime}
      </Text>

      <Row>
        <UnstyledButton
          className="interval-timer-execution-button"
          onClick={handleIntervalTimerExecution}
        >
          {isExecuting ? <PauseIcon /> : <PlayIcon />}
        </UnstyledButton>
      </Row>
    </Box>
  );
};
