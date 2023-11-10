const puppeteer = require("puppeteer-extra");
const pluginStealth = require("puppeteer-extra-plugin-stealth");

// Use stealth
function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

puppeteer.use(pluginStealth());

const instahyre = async () => {

  puppeteer
    .launch({
      headless: false,
      executablePath: `C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe`,
    })
    .then(async (browser) => {
      const page = await browser.newPage();

      await page.goto("https://www.instahyre.com/login/", {
        waitUntil: "networkidle0",
      });

      console.log("page loaded");
      await page.type('input[id="email"]', process.env.INSTAHYRE_EMAIL);
      await page.type('input[id="password"]', process.env.INSTAHYRE_PASSWORD);
      await delay(3000);
      const loginButton = await page.$x("//button[contains(text(), 'Login')]");

      console.log("Logging In...");
      if (loginButton.length > 0) {
        await loginButton[0].click();
      } else {
        throw new Error("Login button not found");
      }

      await page.waitForNavigation({ waitUntil: "networkidle0" });
      await delay(4000);

      console.log("Clicked Show Results...");
      await page.click("button[id='show-results']");

      // await page.waitForNavigation({ waitUntil: "networkidle0" });
      await delay(4000);

      console.log("Clicked View Button...");
      const viewButton = await page.$x("//button[contains(text(), 'View »')]");
      if (viewButton.length > 0) {
        await viewButton[0].click();
      } else {
        throw new Error("View button not found");
      }

      // await page.waitForNavigation({ waitUntil: "networkidle0" });
      await delay(5000);

      console.log("Applying jobs...");
      while (true) {
        const applyButton = await page.$x(
          "//button[contains(text(), 'Apply')]"
        );

        if (applyButton.length > 0) {
          await applyButton[0].click();
        } else {
          throw new Error("Apply button not found");
        }
        // await page.waitForNavigation({ waitUntil: "networkidle0" });
        await delay(3000);
      }
    });
};

module.exports = instahyre;
