const { until, By } = require("selenium-webdriver");

var driver = require("./chrome.helper").getChromeDriver();

const findElementBy = async (locator) => {
  const webElement = driver.wait(until.elementLocated(locator), 20000);
  return driver.wait(until.elementIsVisible(webElement), 20000);
}

const getSchedules = async () => {
  await driver.get('http://www.nfl.com/schedules/');
  var elems = await driver.findElements(By.className('nfl-o-matchup-group'));
  let data = await processElements(elems);
  return data;
}

const processElements = async (elems) => {
  let elements = await Promise.all(elems);
  let dataResult = await Promise.all(elements.map(async el => {
    let data = {
      played: [],
      scheduled: []
    };
    let text = await el.getText();
    let dates = text.split("  ");
    let result = processSchedule(dates);
    data.played = result.played;
    data.scheduled = result.scheduled;
    return data;
  }));
  let finalResult = {
    played: [],
    scheduled: []
  };
  for (let i = 0; i < dataResult.length; i++) {
    let res = dataResult[i];
    for (let j = 0; j < res.played.length; j++) {
      let play = res.played[j];
      finalResult.played.push(play);
    }
    for (let j = 0; j < res.scheduled.length; j++) {
      let schedule = res.scheduled[j];
      finalResult.scheduled.push(schedule);
    }
  }
  return finalResult;
}

const processFinal = (final, date) => {
  let game = {};
  for (let i = 0; i < final.length; i++) {
    if (i === 0) {
      game.date = date;
    } else if (i === 2) {
      game.scoreOne = final[i];
    } else if (i === 3) {
      game.teamOne = final[i];
    } else if (i === 4) {
      game.scoreTwo = final[i];
    } else if (i === 5) {
      game.teamTwo = final[i];
    }
  }
  return game;
}

const processNotPlayed = (toPlay, date) => {
  let game = {};
  for (let i = 0; i < toPlay.length; i++) {
    if (i === 0) {
      if (toPlay[i].includes(":")) {
        game.date = `${date} ${toPlay[i]} ${toPlay[i + 1]}`;
      } else {
        game.date = `${date} ${toPlay[i + 1]} ${toPlay[i + 2]}`;
      }
    }
    else if (i === 2) {
      if (toPlay[0].includes(":")) {
        game.teamOne = toPlay[i];
      } else {
        game.teamOne = toPlay[i + 1];
      }
    } else if (i === 3) {
      if (toPlay[0].includes(":")) {
        game.teamTwo = toPlay[i];
      } else {
        game.teamTwo = toPlay[i + 1];
      }
    }
  }
  return game;
}

const processSchedule = (array) => {
  let played = [];
  let scheduled = [];
  let date = array[0].split("\n")[0];
  for (let i = 0; i < array.length; i++) {
    let game = {};
    let element = array[i].split("\n");
    if (element[1] === 'FINAL') {
      game = processFinal(element, date);
      played.push(game);
    } else {
      game = processNotPlayed(element, date);
      scheduled.push(game);
    }
  }
  let data = {
    played: played,
    scheduled: scheduled
  };
  return data;
}

module.exports = {
  findElementBy: findElementBy,
  getSchedules: getSchedules
}