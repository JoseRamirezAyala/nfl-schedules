const Builder = require("selenium-webdriver").Builder;
const {PageLoadStrategy, Browser } = require("selenium-webdriver/lib/capabilities");
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require("chromedriver");
const getChromeDriver = () => {
  return new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(new chrome.Options()
      .setPageLoadStrategy(PageLoadStrategy.NORMAL)
      .addArguments(['--ignore-certificate-errors',
        '--disable-extensions',
        '--disable-popup-blocking',
        'enable-automation'])
      .headless())
    .build();
}

module.exports = {
  getChromeDriver: getChromeDriver
}