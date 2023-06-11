import { v4 as uuidv4 } from 'uuid';

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

type IntervalTimerDetailExecutionOverviewProps = {
  executionOverviewButtonProps: IntervalTimerExecutionOverviewButtonProps[];
};

export const IntervalTimerDetailExecutionOverview = ({
  executionOverviewButtonProps,
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

      <Box className="interval-timer-detail-execution-overview-rest">
        {`Verbleibende Zeite: ${formattedRemainingTotalTime}`}
      </Box>
    </Box>
  );
};
