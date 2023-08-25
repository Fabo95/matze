import { useCallback } from 'react';

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
import {
  executeIntervalTimerExecutionBackgroundGradientStrategy,
  getIntervalTimerExecutionBackgroundGradientStrategies,
} from 'ui/intervalTimer/IntervalTimerExecution/Utils/intervalTimerExecutionHelpers';
import { Pulse } from 'common/Pulse/pulse';

export const IntervalTimerExecution = ({
  nextIsExecution,
}: {
  nextIsExecution: (value: unknown) => void;
}) => {
  // --- STATE ---

  const isExecuting = useSelector(selectIsExecuting);
  const remainingCurrentTime = useSelector(selectRemainingCurrentTime);

  const [intervalTimerExecutionState, send] = useActor();

  // --- HELPERS ---

  const formattedIntervalTime = getFormattedSeconds(remainingCurrentTime);

  const intervalTimerExecutionBackgroundGradientStrategies =
    getIntervalTimerExecutionBackgroundGradientStrategies();

  intervalTimerExecutionBackgroundGradientStrategies.forEach(
    (backgroundGradientStrategy) =>
      executeIntervalTimerExecutionBackgroundGradientStrategy({
        backgroundGradientStrategy,
        intervalTimerExecutionStateValue: intervalTimerExecutionState.value,
      })
  );

  // --- CALLBACKS ---

  const startIntervalTimerExecution = useCallback(() => {
    send({ type: 'START_EXECUTION' });
    nextIsExecution(true);
  }, [nextIsExecution, send]);

  const pauseIntervalTimerExecution = useCallback(() => {
    send({ type: 'PAUSE_EXECUTION' });
    nextIsExecution(false);
  }, [nextIsExecution, send]);

  const handleIntervalTimerExecution = isExecuting
    ? pauseIntervalTimerExecution
    : startIntervalTimerExecution;

  // --- RENDER ---

  return (
    <Box className="interval-timer-execution">
      <Text className="interval-timer-execution-intro">
        {formattedIntervalTime}
      </Text>

      <Pulse isAnimating={isExecuting} />

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
