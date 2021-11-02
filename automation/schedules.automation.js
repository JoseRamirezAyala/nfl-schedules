const selenium = require("selenium-webdriver");
const automationHelper = require("../helpers/automation.helper");

class Schedule {

  get searchInputLocator() {
    return selenium.By.css('nfl-o-matchup-group');
  };

  get searchButtonLocator() {
    return selenium.By.xpath("//button[@class='pure-button pure-button-primary-progressive']");
  };

  wikiSearch(item) {
    return automationHelper.findElementBy(this.searchInputLocator).sendKeys(item);
  };

  searchButton() {
    return automationHelper.findElementBy(this.searchButtonLocator).click();
  };

  async goToSchedule(){
    return await automationHelper.getSchedules();
  }
}

module.exports = {
  schedule: new Schedule()
};