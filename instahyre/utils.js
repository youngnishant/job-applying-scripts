const delay = async (time) => {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
};

const clickButton = async (page, elementName, text) => {
  console.info("Button Click", { elementName, text });
  const searchButton = await page.$x(
    `//${elementName}[contains(text(), '${text}')]`
  );

  try {
    await searchButton[0].click();
  } catch (error) {
    await searchButton[1].click();
    console.log("Error in button click-->", { elementName, text }, error);
  }
};

const applyFilter = async (page) => {
  await clickButton(page, "li", "3 yr");
  await clickButton(page, "button", "Show results");
  console.log("Filter jobs...");

  await delay(4000);
};

const applyJobsLoop = async (page) => {
  await clickButton(page, "button", "View »");
  await delay(5000);

  let applied = 0;
  console.log("Applying jobs...");

  while (true) {
    await clickButton(page, "button", "Apply");

    applied += 1;
    console.log("Applied: " + applied);

    await delay(5000);
  }
};

module.exports = { delay, clickButton, applyFilter, applyJobsLoop };
