'use client';

import { v4 as uuidv4 } from 'uuid';

import { Box } from 'common/box';
import { IntervalTimerConfigurationOptionProps } from 'ui/intervalTimer/utils/intervalTimerHelpers';
import { IntervalTimerConfigurationOption } from 'ui/intervalTimer/IntervalTimerConfiguration/components/intervalTimerConfigurationOption';
import { Swiper } from 'common/Swiper/swiper';
import { Row } from 'common/row';
import { IntervalTimerConfigurationDots } from 'ui/intervalTimer/IntervalTimerConfiguration/components/intervalTimerConfigurationDots';
import { Text } from 'common/text';
import { Grid } from 'common/grid';
import { getFormattedSeconds } from 'utils/helpers';

export type IntervalTimerConfigurationProps = {
  currentRound: number;
  currentExercise: number;
  totalRoundCount: number;
  totalExerciseCount: number;
  configurationOptionsProps: IntervalTimerConfigurationOptionProps[];
  primaryButtonTitle: string;
  remainingTotalTime: number;
};

export const IntervalTimerConfiguration = ({
  currentRound,
  currentExercise,
  totalRoundCount,
  totalExerciseCount,
  configurationOptionsProps,
  primaryButtonTitle,
  remainingTotalTime,
}: IntervalTimerConfigurationProps) => {
  // --- HELPERS ---

  const formattedTotalTime = getFormattedSeconds(remainingTotalTime);

  const totalRoundDots = new Array(totalRoundCount).fill(
    'interval-timer-overview-dot'
  );

  const totalExerciseDots = new Array(totalExerciseCount).fill(
    'interval-timer-overview-dot'
  );

  // --- RENDER ---
  return (
    <Box className="interval-timer-configuration">
      {/* This box styling enables circle cut off of the interval timer configuration box. */}
      <Box className="interval-timer-configuration-circle-cut-off" />
      <Swiper>
        <Box className="interval-timer-configuration-setting-options">
          {configurationOptionsProps.map(
            ({
              className,
              icon,
              title,
              intensity,
              intensityType,
              sliderRange,
              configurationType,
            }) => (
              <IntervalTimerConfigurationOption
                className={className}
                configurationType={configurationType}
                icon={icon}
                intensity={intensity}
                intensityType={intensityType}
                key={title}
                primaryButtonTitle={primaryButtonTitle}
                sliderRange={sliderRange}
                title={title}
              />
            )
          )}
        </Box>

        <Grid className="interval-timer-overview-grid">
          <Box className="interval-timer-overview-rest">das</Box>
          <Box className="interval-timer-overview-rounds">
            <Text>Runden</Text>
            <Row>
              {totalRoundDots.map((className, index) => (
                <IntervalTimerConfigurationDots
                  className={className}
                  currentCount={currentRound}
                  index={index}
                  key={uuidv4()}
                />
              ))}
            </Row>
          </Box>

          <Box className="interval-timer-overview-exercises">
            <Text>Übungen</Text>
            <Row>
              {totalExerciseDots.map((className, index) => (
                <IntervalTimerConfigurationDots
                  className={className}
                  currentCount={currentExercise}
                  index={index}
                  key={uuidv4()}
                />
              ))}
            </Row>
          </Box>
        </Grid>
      </Swiper>
    </Box>
  );
};
