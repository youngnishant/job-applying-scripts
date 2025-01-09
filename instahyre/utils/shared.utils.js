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
    console.info("Error in button click-->", { elementName, text }, error);
  }
};

const openUrl = async (page, url) => {
  await page.goto(url, { waitUntil: "networkidle0" });
};

module.exports = { delay, openUrl, clickButton };
