import { useCallback, useEffect, useMemo } from 'react';

import { getFormattedSeconds } from 'utils/helpers';
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
import { PageBlockStart } from 'common/Page/components/pageBlockStart';

export const IntervalTimerExecution = ({
  nextIsExecution,
}: {
  nextIsExecution: (value: unknown) => void;
}) => {
  // --- STATE ---

  const isExecuting = useSelector(selectIsExecuting);
  const remainingCurrentTime = useSelector(selectRemainingCurrentTime);

  const [intervalTimerExecutionState, send] = useActor();

  // --- MEMOIZED DATA ---

  const intervalTimerExecutionBackgroundGradientStrategies = useMemo(
    () => getIntervalTimerExecutionBackgroundGradientStrategies(),
    []
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

  // --- HELPERS ---

  const formattedIntervalTime = getFormattedSeconds(remainingCurrentTime);

  const handleIntervalTimerExecution = isExecuting
    ? pauseIntervalTimerExecution
    : startIntervalTimerExecution;

  // --- EFFECTS ---

  useEffect(() => {
    intervalTimerExecutionBackgroundGradientStrategies.forEach(
      (backgroundGradientStrategy) =>
        executeIntervalTimerExecutionBackgroundGradientStrategy({
          backgroundGradientStrategy,
          intervalTimerExecutionStateValue: intervalTimerExecutionState.value,
        })
    );
  }, [
    intervalTimerExecutionBackgroundGradientStrategies,
    intervalTimerExecutionState.value,
  ]);

  // --- RENDER ---

  return (
    <PageBlockStart>
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
    </PageBlockStart>
  );
};
