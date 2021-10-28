const { until, By } = require("selenium-webdriver");

var driver = require("./chrome.helper").getChromeDriver();

const findElementBy = async (locator) => {
  const webElement = driver.wait(until.elementLocated(locator), 20000);
  return driver.wait(until.elementIsVisible(webElement), 20000);
}

const getSchedules = async () => {
  await driver.get('http://www.nfl.com/schedules/');
  var title = await driver.getTitle();
  const webElement = driver.wait(until.elementLocated(By.className("d3-o-section-title")), 20000);
  return driver.wait(until.elementIsVisible(webElement), 20000).getText();
}

module.exports = {
  findElementBy: findElementBy,
  getSchedules: getSchedules
}