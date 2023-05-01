const { Router } = require('express');

const db = require('../../database/database');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const result = await db
      .promise()
      .query(`SELECT * FROM INTERVALS WHERE user_id = ${32}`);

    const [data] = result;

    const {
      user_id: userId,
      work_time: workTime,
      rest_time: restTime,
      exercise_count: exerciseCount,
      round_count: roundCount,
      round_reset_time: roundResetTime,
    } = data[0];

    res.status(200).send({
      exerciseCount,
      restTime,
      roundCount,
      roundResetTime,
      userId,
      workTime,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post('/', async (req, res) => {
  const {
    userId,
    workTime,
    restTime,
    exerciseCount,
    roundCount,
    roundResetTime,
  } = req.body;

  try {
    await db.promise().query(
      `
        INSERT INTO INTERVALS 
        VALUES ('${userId}', '${workTime}', '${restTime}','${exerciseCount}','${roundCount}','${roundResetTime}') `
    );
    res.send(200);
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

router.patch('/', async (req, res) => {
  const { workTime, restTime, exerciseCount, roundCount, roundResetTime } =
    req.body;

  try {
    await db.promise().query(
      `UPDATE INTERVALS
    SET work_time = COALESCE(${workTime !== undefined ? workTime : 'work_time'},
        work_time),
        rest_time = COALESCE(${restTime !== undefined ? restTime : 'rest_time'},
            rest_time),
        exercise_count = COALESCE(${
          exerciseCount !== undefined ? exerciseCount : 'exercise_count'
        },
            exercise_count),
        round_count = COALESCE(${
          roundCount !== undefined ? roundCount : 'round_count'
        },
            round_count),
        round_reset_time = COALESCE(${
          roundResetTime !== undefined ? roundResetTime : 'round_reset_time'
        },
            round_reset_time)
    WHERE user_id = ${32}
`
    );
    res.send(200);
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

module.exports = router;
