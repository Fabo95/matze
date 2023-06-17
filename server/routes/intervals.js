const { Router } = require('express');

const db = require('../../database/database');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const result = await db
      .promise()
      .query(`SELECT * FROM intervals WHERE user_id = ${32}`);

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
        INSERT INTO intervals 
        VALUES ('${userId}', '${workTime}', '${restTime}','${exerciseCount}','${roundCount}','${roundResetTime}') `
    );
    res.send(200);
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

router.patch('/', async (req, res) => {
  const {
    workTime = null,
    restTime = null,
    exerciseCount = null,
    roundCount = null,
    roundResetTime = null,
  } = req.body;

  const query =
    'UPDATE intervals SET work_time = IFNULL(?, work_time), rest_time = IFNULL(?, rest_time),  exercise_count = IFNULL(?, exercise_count), round_count = IFNULL(?, round_count), round_reset_time = IFNULL(?, round_reset_time) WHERE user_id = ?';

  const values = [
    workTime,
    restTime,
    exerciseCount,
    roundCount,
    roundResetTime,
    32,
  ];

  try {
    await db.promise().query(query, values);
    res.send(200);
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

module.exports = router;
