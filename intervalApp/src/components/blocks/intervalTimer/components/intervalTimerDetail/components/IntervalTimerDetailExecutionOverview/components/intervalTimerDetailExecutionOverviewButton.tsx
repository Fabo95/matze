import React, { ReactElement, useMemo } from 'react';

import { useParams } from 'next/navigation';

import { ApplicationProcessMachine } from '@Interval/components/blocks/intervalTimer/intervalTimerExecutionMachine/IntervalTimerExecutionMachine';
import { useSelector } from '@Interval/components/blocks/intervalTimer/intervalTimerExecutionMachineContext/intervalTimerExecutionMachineContext';
import { DetailButton } from '@Interval/components/core/detailButton';
import { Row } from '@Interval/components/core/row';
import { Text } from '@Interval/components/core/text';
import { getTFunction } from '@Interval/i18n/tFunction';
import { Locale } from '@Interval/utils/types';

type IntervalTimerDetailExecutionOverviewButtonProps = {
  className: { detailButton: string overviewDot?: string; };
  icon: ReactElement;
  selectRemainingCount: (state: ApplicationProcessMachine) => number;
  selectTotalCount: (state: ApplicationProcessMachine) => number;
  title: string;
};

export const IntervalTimerDetailExecutionOverviewButton = ({
  className: propsClassName,
  icon,
  selectRemainingCount,
  selectTotalCount,
  title,
}: IntervalTimerDetailExecutionOverviewButtonProps) => {
  const params = useParams();

  const t = getTFunction(params.lang as Locale);

  // --- STATE ---

  const totalCount = useSelector(selectTotalCount);

  const remainingCount = useSelector(selectRemainingCount);

  // --- HELPERS ---

  const completedCount = totalCount - remainingCount;

  // --- MEMOIZED DATA ---

  const IntervalCompletion = useMemo(
    () => (
      <Row>
        <Text>
          {t('pages.home.intervalTimerOverview.completedOfTotal', {
            completed: completedCount,
            total: totalCount,
          })}
        </Text>
      </Row>
    ),
    [completedCount, t, totalCount],
  );

  // --- RENDER ---

  return (
    <DetailButton
      className={propsClassName.detailButton}
      inlineCenterLeft={title}
      inlineEnd={IntervalCompletion}
      inlineStart={icon}
    />
  );
};
