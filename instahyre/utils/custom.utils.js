const { delay, clickButton } = require("./shared.utils.js");

let retryCount = 0;

const applyFilter = async (page) => {
  await clickButton(page, "li", "3 yr");
  await clickButton(page, "button", "Show results");
  console.info("Filter jobs...");

  await delay(4000);
};

const applyJobsLoop = async (page) => {
  await clickButton(page, "button", "View »");
  await delay(5000);

  let applied = 0;
  console.info("Applying jobs...");

  while (true) {
    await clickButton(page, "button", "Apply");

    applied += 1;
    console.info("Applied: " + applied);

    await delay(5000);
  }
};

const startLoginProcess = async (page) => {
  const isLoggedIn = await page.evaluate(() => {
    return !document.querySelector('input[id="email"]');
  });

  if (!isLoggedIn) {
    await page.type('input[id="email"]', process.env.INSTAHYRE_EMAIL);
    await page.type('input[id="password"]', process.env.INSTAHYRE_PASSWORD);
    await delay(1000);

    await clickButton(page, "button", "Login");
    console.info("Logging In...");

    await page.waitForNavigation({ waitUntil: "networkidle0" });
    await delay(4000);
  } else {
    console.info("Already logged in");
  }
};

const startApplyingJobs = async (page) => {
  try {
    // await applyFilter(page);
    await applyJobsLoop(page);
  } catch (error) {
    if (retryCount > 2) {
      console.info("Retried 3 times, stopping...");
      return;
    }
    console.info("Error occurred:", error.message);
    retryCount += 1;
    await page.reload({ waitUntil: "networkidle0" });
    await delay(3000);
    await applyJobs(page);
  }
};

module.exports = {
  startLoginProcess,
  startApplyingJobs,
};
