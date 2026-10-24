import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: 'light',
  });
  const page = await context.newPage();

  // Set local storage theme to light before loading
  await page.addInitScript(() => {
    localStorage.setItem('learnova_theme', 'light');
  });

  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });

  // Ensure artifacts dir exists
  const artifactDir = path.resolve('I:/Richu/Projects/Learnova/frontend/screenshots');
  if (!fs.existsSync(artifactDir)) {
    fs.mkdirSync(artifactDir, { recursive: true });
  }

  // Check html class
  const htmlClass = await page.evaluate(() => document.documentElement.className);
  console.log('HTML class:', htmlClass);

  // Take full page screenshot in light mode
  const screenshotPath = path.join(artifactDir, 'home_light_mode_initial.png');
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log('Screenshot saved to:', screenshotPath);

  // Inspect font sizes and alignments
  const heroH1 = await page.$eval('h1', el => {
    const s = window.getComputedStyle(el);
    return { text: el.innerText, fontSize: s.fontSize, lineHeight: s.lineHeight, textAlign: s.textAlign, color: s.color };
  });
  console.log('Hero H1 styles:', heroH1);

  const statsCards = await page.$$eval('section:nth-of-type(2) p', els => els.map(el => {
    const s = window.getComputedStyle(el);
    return { text: el.innerText, fontSize: s.fontSize, textAlign: s.textAlign, color: s.color };
  }));
  console.log('Stats cards sample text styles:', statsCards.slice(0, 4));

  await browser.close();
})();
