import { useCallback, useEffect, useMemo } from 'react';

import {
  executeIntervalTimerExecutionBackgroundGradientStrategy,
  getIntervalTimerExecutionBackgroundGradientStrategies,
} from 'components/blocks/intervalTimer/components/intervalTimerExecution/utils/intervalTimerExecutionHelpers';
import {
  useActor,
  useSelector,
} from 'components/blocks/intervalTimer/intervalTimerExecutionMachineContext/intervalTimerExecutionMachineContext';
import {
  selectIsExecuting,
  selectRemainingCurrentTime,
} from 'components/blocks/intervalTimer/intervalTimerExecutionMachineContext/utils/intervalTimerExecutionMachineSelectors';
import { PageBlockStart } from 'components/core/page/components/pageBlockStart';
import { Pulse } from 'components/core/pulse/pulse';
import { Row } from 'components/core/row';
import { Text } from 'components/core/text';
import { UnstyledButton } from 'components/core/unstyledButton';
import { PauseIcon } from 'components/icons/pauseIcon';
import { PlayIcon } from 'components/icons/playIcon';
import { getFormattedSeconds } from 'utils/helpers';

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

    return () => {
      document.body.className = '';
    };
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
