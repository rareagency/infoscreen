require("dotenv").config();
const puppeteer = require("puppeteer");
const MINUTE = 60 * 1000;

const sites = [
  { url: "http://localhost:3000", showFor: MINUTE * 10 },
  { url: "https://yle.fi/", showFor: MINUTE * 1 },
  { url: "http://localhost:3000", showFor: MINUTE * 10 },
  { url: "https://rare.fi", showFor: MINUTE * 1 },
  { url: "http://localhost:3000", showFor: MINUTE * 10 },
  { url: "https://hs.fi/", showFor: MINUTE * 5 },
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

  let i = 0;
  while (true) {
    const site = sites[i % sites.length];
    console.log("Opening", site.url);

    await page.goto(site.url, {
      waitUntil: "networkidle2",
    });

    await wait(site.showFor);
    i++;
  }
}

main();
