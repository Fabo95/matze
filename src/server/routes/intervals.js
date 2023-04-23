const { Router } = require('express');

const db = require('../../database/database');

const router = Router();

router.get('/', async (req, res) => {
  const result = await db.promise().query(`SELECT * FROM INTERVALS`);

  res.status(200).send(result);
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
      `
        UPDATE INTERVALS
        SET work_time = COALESCE(${workTime}, work_time),
            rest_time = COALESCE(${restTime}, rest_time),
            exercise_count = COALESCE(${exerciseCount}, exercise_count),
            round_count = COALESCE(${roundCount}, round_count),
            round_reset_time = COALESCE(${roundResetTime}, round_reset_time)
        WHERE user_id = ${32}
`
    );
    res.send(200);
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

module.exports = router;
