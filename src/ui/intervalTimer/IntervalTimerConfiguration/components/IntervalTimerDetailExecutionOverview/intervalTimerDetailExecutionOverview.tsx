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
import { useParams } from 'next/navigation';
import { getTFunction } from 'i18n/tFunction';
import { Locale } from 'utils/types';

type IntervalTimerDetailExecutionOverviewProps = {
  executionOverviewButtonProps: IntervalTimerExecutionOverviewButtonProps[];
};

export const IntervalTimerDetailExecutionOverview = ({
  executionOverviewButtonProps,
}: IntervalTimerDetailExecutionOverviewProps) => {
  const params = useParams();

  const t = getTFunction(params.lang as Locale);

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
            className={className}
            icon={icon}
            key={intensityType}
            selectRemainingCount={makeSelectRemainingCount(intensityType)}
            selectTotalCount={makeSelectTotalCount(intensityType)}
            title={title}
          />
        )
      )}

      <Row className="interval-timer-detail-execution-overview-rest">
        <ClockIcon className="stroke-gray-dark" />
        <Text>{t('pages.home.intervalTimerOverview.timeLeft')}</Text>
        <Text className="interval-timer-detail-execution-overview-rest-text">
          {formattedRemainingTotalTime}
        </Text>
      </Row>
    </Box>
  );
};
