import puppeteer from 'puppeteer';

export async function login() {

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto('https://bunpro.jp/ja/login');

  const loggedInSelector = 'selector-for-logged-in-element'; // TODO
  const isLoggedIn = await page.$(loggedInSelector);

  if (isLoggedIn) {
    console.log('Already logged in!');

  } else {
    // TODO: Remove ''
    await page.type('#user_email', process.env.BUNPRO_EMAIL || ''); // TOFIX
    await page.type('#user_password', process.env.BUNPRO_PASSWORD || '');

    await Promise.all([
      page.waitForNavigation(),
    ]);
    // await page.click('input[type="submit"]');
  }
}

export default {
  login,
};