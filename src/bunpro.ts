import puppeteer, { Browser, Page, Puppeteer } from 'puppeteer';
import { handleError } from './utils';

export default class Bunpro {
  browser: Browser | null;
  page: Page | null;
  credentials: { email: string; password: string; };
  email: any;
  password: any;

  constructor({ email, password }: { email: string; password: string }) {
    this.browser = null;
    this.page = null;
    this.credentials = {
      email,
      password,

    };
  }

  // Initialize the browser and page
  async init() {
    this.browser = await puppeteer.launch({ headless: true });
    this.page = await this.browser.newPage();
  }

  // Navigate to the login page and perform login
  async login() {
    if (!this.page || !this.browser) {
      throw new Error('Browser not initialized. Call init() first.');
    }

    await this.page.goto('https://bunpro.jp/ja/login', { waitUntil: 'networkidle2' });

    await this.page.waitForSelector('#user_email', { visible: true });
    await this.page.click('#user_email');
    await this.page.type('#user_email', this.credentials.email);
    await this.page.type('#user_password', this.credentials.password);
    await this.page.click('input[type="submit"]');

    // Wait for navigation and check if the login was successful
    try {
      await this.page.waitForNavigation({ waitUntil: 'networkidle0' });
      const currentURL = this.page.url();

      if (currentURL === 'https://bunpro.jp/ja/dashboard') {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      handleError(error, 'Error during login or page redirection:');
      return false;
    }
  }

  // Add a vocab item to the reviews
  async addVocabItem(item: string, add_to_reviews: boolean = false) {
    if (!this.page) throw new Error('Page not initialized. Call init() first.');
    try {

      await this.page.goto(`https://bunpro.jp/ja/vocabs/${item}`, { waitUntil: 'networkidle2' });
      await this.page.waitForSelector('#js-tour-learn-sidebar', { visible: true });
      await this.page.click('#js-tour-learn-sidebar');
      await this.page.waitForSelector('#js-tour-learn-actions', { visible: true, timeout: 20000 });

      const wordStatus = await this.page.evaluate(() => {
        const addToReviewButton = document.querySelector('svg[data-name="ADD"]');
        return addToReviewButton ? 'not_in_reviews' : 'in_reviews';
      });

      if (wordStatus === 'in_reviews') {
        console.log(`[${item}] : item is already in the reviews.`);
      } else {
        console.log(`[${item}] : adding item to the reviews...`);
        await this.page.click('#js-tour-learn-actions');
        await this.page.waitForSelector('svg[data-name="ADD"]', { visible: true });
        await this.page.click('svg[data-name="ADD"]');
        console.log(`[${item}] : item added to the reviews.`);
      }
    } catch (error) {
      handleError(error, `Error fetching or adding word status for ${item}`);
    }
  }

  // Logout from the website
  async logout() {
    if (!this.page) {
      throw new Error('No page instance available.');
    }
    try {
      await this.page.goto('https://bunpro.jp/ja/logout', { waitUntil: 'networkidle2' });
    } catch (error) {
      console.log('Error during logout:', error);
    }
  }

  // Close the browser
  async close() {
    if (this.browser) {
      await this.browser.close();
      console.log('Browser closed.');
    }
  }
}
