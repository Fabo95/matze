import React, { ReactElement } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { getArrayWithElements } from 'utils/helpers';
import { Row } from 'common/row';
import { IntervalTimerDetailExecutionOverviewDot } from 'ui/intervalTimer/IntervalTimerConfiguration/components/IntervalTimerDetailExecutionOverview/components/intervalTimerDetailExecutionOverviewDot';
import { useSelector } from 'ui/intervalTimer/IntervalTimerExecutionMachineContext/intervalTimerExecutionMachineContext';
import { DetailButton } from 'common/detailButton';
import { ApplicationProcessMachine } from 'ui/intervalTimer/IntervalTimerExecutionMachine/IntervalTimerExecutionMachine';

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
  // --- STATE ---

  const totalCount = useSelector(selectTotalCount);

  const remainingCount = useSelector(selectRemainingCount);

  // --- HELPERS ---

  const completedCount = totalCount - remainingCount;

  const executionOverviewDotElements = getArrayWithElements({
    arrayElement: `interval-timer-detail-execution-${propsClassName.overviewDot}`,
    arrayLength: totalCount,
  });

  const ExecutionOverviewDots = (
    <Row>
      {executionOverviewDotElements.map((className, index) => (
        <IntervalTimerDetailExecutionOverviewDot
          completedCount={completedCount}
          containerClassName={className}
          index={index}
          key={uuidv4()}
        />
      ))}
    </Row>
  );

  // --- RENDER ---

  return (
    <DetailButton
      className={propsClassName.detailButton}
      inlineCenterLeft={title}
      inlineEnd={ExecutionOverviewDots}
      inlineStart={icon}
    />
  );
};
