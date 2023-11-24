import React, { ReactElement, useMemo } from 'react';

import { ApplicationProcessMachine } from 'components/blocks/intervalTimer/intervalTimerExecutionMachine/IntervalTimerExecutionMachine';
import { useSelector } from 'components/blocks/intervalTimer/intervalTimerExecutionMachineContext/intervalTimerExecutionMachineContext';
import { DetailButton } from 'components/core/detailButton';
import { Row } from 'components/core/row';
import { Text } from 'components/core/text';
import { getTFunction } from 'i18n/tFunction';
import { useParams } from 'next/navigation';
import { Locale } from 'utils/types';

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
