import React, { ReactElement, useMemo } from 'react';

import { Row } from 'common/row';
import { useSelector } from 'ui/intervalTimer/IntervalTimerExecutionMachineContext/intervalTimerExecutionMachineContext';
import { DetailButton } from 'common/detailButton';
import { ApplicationProcessMachine } from 'ui/intervalTimer/IntervalTimerExecutionMachine/IntervalTimerExecutionMachine';
import { useParams } from 'next/navigation';
import { getTFunction } from 'i18n/tFunction';
import { Locale } from 'utils/types';
import { Text } from 'common/text';

type IntervalTimerDetailExecutionOverviewButtonProps = {
  className: { overviewDot?: string; detailButton: string };
  title: string;
  icon: ReactElement;
  selectTotalCount: (state: ApplicationProcessMachine) => number;
  selectRemainingCount: (state: ApplicationProcessMachine) => number;
};

export const IntervalTimerDetailExecutionOverviewButton = ({
  className: propsClassName,
  title,
  icon,
  selectTotalCount,
  selectRemainingCount,
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
    [completedCount, t, totalCount]
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
