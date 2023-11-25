import React from 'react';

import { useParams } from 'next/navigation';

import { IntervalTimerDetailExecutionOverviewButton } from '@Interval/components/blocks/intervalTimer/components/intervalTimerDetail/components/IntervalTimerDetailExecutionOverview/components/intervalTimerDetailExecutionOverviewButton';
import { IntervalTimerExecutionOverviewButtonProps } from '@Interval/components/blocks/intervalTimer/components/utils/intervalTimerTypes';
import { useSelector } from '@Interval/components/blocks/intervalTimer/intervalTimerExecutionMachineContext/intervalTimerExecutionMachineContext';
import {
  makeSelectRemainingCount,
  makeSelectTotalCount,
  selectRemainingTotalTime,
} from '@Interval/components/blocks/intervalTimer/intervalTimerExecutionMachineContext/utils/intervalTimerExecutionMachineSelectors';
import { Box } from '@Interval/components/core/box';
import { Row } from '@Interval/components/core/row';
import { Text } from '@Interval/components/core/text';
import { ClockIcon } from '@Interval/components/icons/clockIcon';
import { getTFunction } from '@Interval/i18n/tFunction';
import { getFormattedSeconds } from '@Interval/utils/helpers';
import { Locale } from '@Interval/utils/types';

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
