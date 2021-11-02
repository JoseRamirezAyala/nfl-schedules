var express = require('express');
var router = express.Router();
var responseHelper = require('../../helpers/response.helper');
var schedule = require('../../automation/schedules.automation').schedule;

/* GET users listing. */
router.get('/', async (req, res, next) => {
  let result = await schedule.goToSchedule();
  responseHelper.respond(res, 200, "NFL Scheduled games", result);
});

module.exports = router;