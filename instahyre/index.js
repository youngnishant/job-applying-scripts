const puppeteer = require("puppeteer-extra");
const pluginStealth = require("puppeteer-extra-plugin-stealth");
const { delay, clickButton, applyFilter, applyJobsLoop } = require("./utils");

puppeteer.use(pluginStealth());

const login = async (page) => {
  console.log("page loaded");
  await page.type('input[id="email"]', process.env.INSTAHYRE_EMAIL);
  await page.type('input[id="password"]', process.env.INSTAHYRE_PASSWORD);
  await delay(1000);

  await clickButton(page, "button", "Login");
  console.log("Logging In...");

  await page.waitForNavigation({ waitUntil: "networkidle0" });
  await delay(4000);
};

const applyJobs = async (page) => {
  try {
    // await applyFilter(page);
    await applyJobsLoop(page);
  } catch (error) {
    console.log("Error occurred:", error.message);
    await page.reload({ waitUntil: "networkidle0" });
    await delay(3000);
    await applyJobs(page);
  }
};

const instahyre = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: "/usr/bin/google-chrome",
  });

  const page = await browser.newPage();

  try {
    await page.goto("https://www.instahyre.com/login/", {
      waitUntil: "networkidle0",
    });

    await login(page);
    await applyJobs(page);
  } catch (error) {
    console.log("Login error:", error.message);
    await browser.close();
  }
};

module.exports = instahyre;
