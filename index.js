require("dotenv").config();
const puppeteer = require("puppeteer");
const MINUTE = 60 * 1000;

const sites = [
  { url: "http://localhost:3000", showFor: MINUTE * 10 },
  { url: "https://yle.fi/", showFor: MINUTE * 1 },
  { url: "http://localhost:3000", showFor: MINUTE * 10 },
  { url: "https://rare.fi", showFor: MINUTE * 1 },
  { url: "http://localhost:3000", showFor: MINUTE * 10 },
  { url: "http://v1.windows93.net/", showFor: MINUTE * 3 },
  { url: "http://localhost:3000", showFor: MINUTE * 10 },
  { url: "http://www.nyan.cat/", showFor: MINUTE * 3 },
  { url: "https://hs.fi/", showFor: MINUTE * 5 },
  { url: "http://localhost:3000", showFor: MINUTE * 10 },
  { url: "https://cat-bounce.com/", showFor: MINUTE * 5 },
  { url: "http://www.patience-is-a-virtue.org/", showFor: MINUTE * 5 },
  { url: "http://localhost:3000", showFor: MINUTE * 10 },
  { url: "https://www.zoomquilt.org/", showFor: MINUTE * 5 },
];

function wait(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

async function main() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    executablePath: process.env.CHROMIUM_EXECUTABLE,
    userDataDir: "./data",
    args: [
      "--start-fullscreen",
      "--kiosk",
      "--disable-infobars",
      "--disable-session-crashed-bubble",
      "--noerrdialogs",
    ],
    ignoreDefaultArgs: ["--enable-automation"],
  });
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0);

  let i = 0;
  while (true) {
    const site = sites[i % sites.length];
    console.log("Opening", site.url);

    await page.goto(site.url);

    await wait(site.showFor);
    i++;
  }
}

main();
