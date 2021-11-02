const driver = require('../helpers/chrome.helper').getChromeDriver();
const { until, By } = require("selenium-webdriver");
const { addConsoleHandler } = require('selenium-webdriver/lib/logging');


const run = async () => {
  await driver.get('http://www.nfl.com/schedules/');
  var elems = await driver.findElements(By.className('nfl-o-matchup-group'));
  return elems;
}

const processFinal = (final, date) => {
  let game = {};
  for (let i = 0; i < final.length; i++) {
    if (i === 0) {
      game.date = date;
    } else if (i === 1) {
      game.hour = final[i];
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
        game.date = `${date} ${toPlay[i + 1]} ${toPlay[i + 2]}`;
      } else {
        game.date = `${date} ${toPlay[i]} ${toPlay[i + 1]}`;
      }
    }
    else if (i === 2) {
      if (toPlay[0].includes(":")) {
        game.channel = toPlay[i];
      } else {
        game.channel = toPlay[i + 1];
      }
    } else if (i === 3) {
      if (toPlay[0].includes(":")) {
        game.teamOne = toPlay[i];
      } else {
        game.teamOne = toPlay[i + 1];
      }
    } else if (i === 4) {
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
  console.log("check", data);
  return data;
}
const result = run();

result.then(success => {
  let data = {
    played: [],
    scheduled: []
  }
  Promise.all(success).then(elements => {
    elements.forEach(el => {
      el.getText().then(text => {
        let dates = text.split("  ");
        let result = processSchedule(dates);
        data.played.concat(result.played);
        data.scheduled.concat(result.scheduled);
        console.log(data);
      }).catch(error => {
        console.log(error);
      });
    })
  })
}).catch(error => {
  console.log(error);
})
