import { Box } from 'common/box';
import { getFormattedSeconds } from 'utils/helpers';
import React from 'react';
import { useSelector } from 'ui/intervalTimer/IntervalTimerExecutionMachineContext/intervalTimerExecutionMachineContext';
import {
  makeSelectRemainingCount,
  makeSelectTotalCount,
  selectRemainingTotalTime,
} from 'ui/intervalTimer/IntervalTimerExecutionMachineContext/Utils/intervalTimerExecutionMachineSelectors';
import { IntervalTimerDetailExecutionOverviewButton } from 'ui/intervalTimer/IntervalTimerConfiguration/components/IntervalTimerDetailExecutionOverview/components/intervalTimerDetailExecutionOverviewButton';
import { IntervalTimerExecutionOverviewButtonProps } from 'ui/intervalTimer/utils/intervalTimerTypes';
import { Row } from 'common/row';
import { Text } from 'common/text';
import { ClockIcon } from 'icons/clockIcon';

type IntervalTimerDetailExecutionOverviewProps = {
  executionOverviewButtonProps: IntervalTimerExecutionOverviewButtonProps[];
  timeLeft: string;
};

export const IntervalTimerDetailExecutionOverview = ({
  executionOverviewButtonProps,
  timeLeft,
}: IntervalTimerDetailExecutionOverviewProps) => {
  // --- STATE ---

  const remainingTotalTime = useSelector(selectRemainingTotalTime);

  // --- HELPERS ---

  const formattedRemainingTotalTime = getFormattedSeconds(remainingTotalTime);

  // --- RENDER ---
  return (
    <Box className="interval-timer-detail-execution-overview">
      {executionOverviewButtonProps.map(
        ({ icon, title, intensityType, className }) => (
          <IntervalTimerDetailExecutionOverviewButton
            className={className.detailButton}
            icon={icon}
            key={intensityType}
            selectRemainingCount={makeSelectRemainingCount(intensityType)}
            selectTotalCount={makeSelectTotalCount(intensityType)}
            title={title}
          />
        )
      )}

      <Row className="interval-timer-detail-execution-overview-rest">
        <ClockIcon />
        <Text>{timeLeft}</Text>
        <Text className="interval-timer-detail-execution-overview-rest-text">
          {formattedRemainingTotalTime}
        </Text>
      </Row>
    </Box>
  );
};
