const fs = require("fs").promises;
const path = require("path");

const userDataDir = path.join(__dirname, "user-data");
const cookiesFilePath = path.join(userDataDir, "cookies.json");

const loadSavedCookies = async (page) => {
  try {
    const cookiesString = await fs.readFile(cookiesFilePath);
    const cookies = JSON.parse(cookiesString);
    await page.setCookie(...cookies);
    console.info("Loaded cookies from file");
  } catch (e) {
    console.info("No cookies found, will need to login");
  }
};

const saveCookies = async (page) => {
  console.info("saving cookies.......");
  const cookies = await page.cookies();
  await fs.mkdir(userDataDir, { recursive: true });
  await fs.writeFile(cookiesFilePath, JSON.stringify(cookies, null, 2));
};

module.exports = {
  loadSavedCookies,
  saveCookies,
};
