import { getFormattedSeconds } from 'utils/helpers';
import { Box } from 'common/box';
import { UnstyledButton } from 'common/unstyledButton';
import { Row } from 'common/row';
import { Text } from 'common/text';
import { PlayIcon } from 'icons/playIcon';
import { HLine } from 'common/hLine';
import { PauseIcon } from 'icons/pauseIcon';

export const IntervalTimerExecution = ({
  isExecuting,
  startIntervalTimerExecution,
  pauseIntervalTimerExecution,
  intervalTime,
  totalTime,
}: {
  isExecuting: boolean;
  startIntervalTimerExecution: () => void;
  pauseIntervalTimerExecution: () => void;
  intervalTime: number;
  totalTime: number;
}) => {
  // --- HELPERS ---

  const formattedTotalTime = getFormattedSeconds(totalTime);

  const formattedIntervalTime = getFormattedSeconds(intervalTime);

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
      <HLine className="interval-timer-execution-dividing-line" />

      <Text className="interval-timer-execution-text">
        {formattedTotalTime}
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
