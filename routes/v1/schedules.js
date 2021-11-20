const express = require('express');
const router = express.Router();
const responseHelper = require('../../helpers/response.helper');
const axiosHelper = require('../../helpers/axios.helper');
const constantsHelper = require('../../helpers/constants.helper');
const nflHelper = require('../../helpers/nfl.helper');

/* GET schedules listing. */
router.get('/', async (req, res, next) => {
  const result = await axiosHelper.get(constantsHelper.nfl_espn);
  if (!result) {
    responseHelper.respond(res, 404, "Not found", "Data was not found");
  } else {
    const processed_result = nflHelper.processNflFeed(result);
    if(!processed_result) {
      responseHelper.respond(res, 500, "Server error", "Error while processing nfl data.");
    }else{
      
    }
    responseHelper.respond(res, 200, "NFL Scheduled games", processed_result);
  }
});

module.exports = router;