const puppeteer = require("puppeteer-extra");
const pluginStealth = require("puppeteer-extra-plugin-stealth");

const {
  startApplyingJobs,
  startLoginProcess,
} = require("./utils/custom.utils.js");
const { openUrl } = require("./utils/shared.utils.js");
const { loadSavedCookies, saveCookies } = require("./utils/cookie.utils.js");

puppeteer.use(pluginStealth());

const instahyre = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: "/usr/bin/google-chrome",
  });

  const page = await browser.newPage();

  await loadSavedCookies(page);
  await openUrl(page, "https://www.instahyre.com/candidate/opportunities/");
  await startLoginProcess(page);
  await saveCookies(page);
  await startApplyingJobs(page);
};

module.exports = instahyre;
