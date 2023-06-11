import { getFormattedSeconds } from 'utils/helpers';
import { Box } from 'common/box';
import { UnstyledButton } from 'common/unstyledButton';
import { Row } from 'common/row';
import { Text } from 'common/text';
import { PlayIcon } from 'icons/playIcon';
import { PauseIcon } from 'icons/pauseIcon';
import {
  useActor,
  useSelector,
} from 'ui/intervalTimer/IntervalTimerExecutionMachineContext/intervalTimerExecutionMachineContext';
import {
  selectIsExecuting,
  selectRemainingCurrentTime,
} from 'ui/intervalTimer/IntervalTimerExecutionMachineContext/Utils/intervalTimerExecutionMachineSelectors';

export const IntervalTimerExecution = ({
  nextIsExecution,
}: {
  nextIsExecution: (value: unknown) => void;
}) => {
  // --- STATE ---

  const isExecuting = useSelector(selectIsExecuting);
  const remainingCurrentTime = useSelector(selectRemainingCurrentTime);

  const [_, send] = useActor();

  console.log(_);

  // --- HELPERS ---

  const formattedIntervalTime = getFormattedSeconds(remainingCurrentTime);

  // --- CALLBACKS ---

  const startIntervalTimerExecution = () => {
    send({ type: 'START_EXECUTION' });
    nextIsExecution(true);
  };

  const pauseIntervalTimerExecution = () => {
    send({ type: 'PAUSE_EXECUTION' });
    nextIsExecution(false);
  };

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
