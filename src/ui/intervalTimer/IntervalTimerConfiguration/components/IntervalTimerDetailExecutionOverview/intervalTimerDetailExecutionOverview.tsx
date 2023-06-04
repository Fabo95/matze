import { Box } from 'common/box';
import { Text } from 'common/text';
import { Row } from 'common/row';
import { IntervalTimerDetailExecutionOverviewDot } from 'ui/intervalTimer/IntervalTimerConfiguration/components/IntervalTimerDetailExecutionOverview/components/intervalTimerDetailExecutionOverviewDot';
import { v4 as uuidv4 } from 'uuid';
import { Grid } from 'common/grid';
import { getFormattedSeconds } from 'utils/helpers';

type IntervalTimerDetailExecutionOverviewProps = {
  remainingTotalTime: number;
  totalRoundCount: number;
  totalExerciseCount: number;
  currentRound: number;
  currentExercise: number;
};

export const IntervalTimerDetailExecutionOverview = ({
  remainingTotalTime,
  totalRoundCount,
  totalExerciseCount,
  currentRound,
  currentExercise,
}: IntervalTimerDetailExecutionOverviewProps) => {
  // --- HELPERS ---

  const formattedRemainingTotalTime = getFormattedSeconds(remainingTotalTime);

  const totalRoundDots = new Array(totalRoundCount).fill(
    'interval-timer-detail-execution-overview-dot'
  );

  const totalExerciseDots = new Array(totalExerciseCount).fill(
    'interval-timer-detail-execution-overview-dot'
  );

  // --- RENDER ---
  return (
    <Grid className="interval-timer-detail-execution-overview">
      <Box className="interval-timer-detail-execution-overview-rest">
        {`Verbleibende Zeite: ${formattedRemainingTotalTime}`}
      </Box>
      <Text className="interval-timer-detail-execution-overview-rounds-text">
        Runden
      </Text>
      <Row className="interval-timer-detail-execution-overview-rounds-dots">
        {totalRoundDots.map((className, index) => (
          <IntervalTimerDetailExecutionOverviewDot
            containerClassName={className}
            currentCount={currentRound}
            index={index}
            key={uuidv4()}
          />
        ))}
      </Row>

      <Text className="interval-timer-detail-execution-overview-exercises-text">
        Übungen
      </Text>

      <Row className="interval-timer-detail-execution-overview-exercises-dots">
        {totalExerciseDots.map((className, index) => (
          <IntervalTimerDetailExecutionOverviewDot
            containerClassName={className}
            currentCount={currentExercise}
            index={index}
            key={uuidv4()}
          />
        ))}
      </Row>
    </Grid>
  );
};
