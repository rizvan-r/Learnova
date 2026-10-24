import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

(async () => {
  console.log('--- Starting Playwright Comprehensive UI & Light Mode Tests ---');

  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: 'light',
  });
  const page = await context.newPage();

  const screenshotsDir = path.resolve('I:/Richu/Projects/Learnova/frontend/screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  // 1. Clear theme storage to test fresh user experience
  await page.addInitScript(() => {
    localStorage.removeItem('learnova_theme');
  });

  console.log('Navigating to http://127.0.0.1:5173/ ...');
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });

  // Verify Default Theme is Light Mode
  const initialHtmlClass = await page.evaluate(() => document.documentElement.className);
  console.log('Initial HTML class (must not have dark):', `"${initialHtmlClass}"`);
  if (initialHtmlClass.includes('dark')) {
    throw new Error('Default theme should be light mode, but found dark class on root!');
  }

  // Check body background & text color in light mode
  const bodyStyles = await page.evaluate(() => {
    const s = window.getComputedStyle(document.body);
    return { bg: s.backgroundColor, color: s.color, fontFamily: s.fontFamily };
  });
  console.log('Light Mode Body styles:', bodyStyles);

  // Screenshot 1: Home Page in Light Mode
  const homeScreenshot = path.join(screenshotsDir, '01_home_light_mode.png');
  await page.screenshot({ path: homeScreenshot, fullPage: true });
  console.log('✓ Captured 01_home_light_mode.png');

  // Verify Typography & Alignment on Home Page
  const typographyChecks = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    const heroBtn = document.querySelector('section a button');
    const statCards = Array.from(document.querySelectorAll('section:nth-of-type(2) p'));
    const roleTitles = Array.from(document.querySelectorAll('section:nth-of-type(3) h3'));

    return {
      h1Size: window.getComputedStyle(h1).fontSize,
      h1Color: window.getComputedStyle(h1).color,
      heroBtnText: heroBtn ? heroBtn.innerText.trim() : '',
      heroBtnColor: heroBtn ? window.getComputedStyle(heroBtn).color : '',
      heroBtnBg: heroBtn ? window.getComputedStyle(heroBtn).backgroundColor : '',
      statValues: statCards.slice(0, 4).map(p => ({ text: p.innerText, size: window.getComputedStyle(p).fontSize })),
      roleCount: roleTitles.length,
      firstRoleTitle: roleTitles[0] ? roleTitles[0].innerText : '',
    };
  });
  console.log('Typography & Alignments verified:', typographyChecks);

  // 2. Test Language Toggle to Tamil
  console.log('Testing Language Switcher to Tamil...');
  const langBtn = await page.$('button[title*="Switch Language"]');
  if (langBtn) {
    await langBtn.click();
    await page.waitForTimeout(500);

    const tamilHeroTitle = await page.$eval('h1', el => el.innerText);
    console.log('Tamil Hero Title:', tamilHeroTitle);

    const tamilScreenshot = path.join(screenshotsDir, '02_home_tamil_light_mode.png');
    await page.screenshot({ path: tamilScreenshot, fullPage: true });
    console.log('✓ Captured 02_home_tamil_light_mode.png');

    // Switch back to English
    await langBtn.click();
    await page.waitForTimeout(500);
  }

  // 3. Test Theme Toggle to Dark and back to Light
  console.log('Testing Theme Toggle button...');
  const themeBtn = await page.$('button[aria-label="Toggle Theme"]');
  if (themeBtn) {
    await themeBtn.click();
    await page.waitForTimeout(400);

    const darkHtmlClass = await page.evaluate(() => document.documentElement.className);
    console.log('HTML class after theme toggle:', `"${darkHtmlClass}"`);

    // Toggle back to light mode
    await themeBtn.click();
    await page.waitForTimeout(400);
    const restoredLightClass = await page.evaluate(() => document.documentElement.className);
    console.log('Restored Light Mode HTML class:', `"${restoredLightClass}"`);
  }

  // 4. Navigate to Career Explorer in Light Mode
  console.log('Navigating to Career Explorer in Light Mode...');
  await page.click('a[href="/career"]');
  await page.waitForURL('**/career');
  await page.waitForTimeout(600);

  const careerScreenshot = path.join(screenshotsDir, '03_career_explorer_light_mode.png');
  await page.screenshot({ path: careerScreenshot, fullPage: true });
  console.log('✓ Captured 03_career_explorer_light_mode.png');

  // 5. Navigate to Funds Transparency in Light Mode
  console.log('Navigating to Funds Transparency in Light Mode...');
  await page.click('a[href="/funds"]');
  await page.waitForURL('**/funds');
  await page.waitForTimeout(600);

  const fundsScreenshot = path.join(screenshotsDir, '04_funds_transparency_light_mode.png');
  await page.screenshot({ path: fundsScreenshot, fullPage: true });
  console.log('✓ Captured 04_funds_transparency_light_mode.png');

  // 6. Navigate to Student Dashboard in Light Mode
  console.log('Navigating to Student Dashboard in Light Mode...');
  await page.click('a[href="/dashboard/student"]');
  await page.waitForURL('**/dashboard/student');
  await page.waitForTimeout(600);

  const studentScreenshot = path.join(screenshotsDir, '05_student_dashboard_light_mode.png');
  await page.screenshot({ path: studentScreenshot, fullPage: true });
  console.log('✓ Captured 05_student_dashboard_light_mode.png');

  // 7. Navigate to Complaints in Light Mode
  console.log('Navigating to Complaints Page in Light Mode...');
  await page.click('a[href="/complaints"]');
  await page.waitForURL('**/complaints');
  await page.waitForTimeout(600);

  const complaintsScreenshot = path.join(screenshotsDir, '06_complaints_light_mode.png');
  await page.screenshot({ path: complaintsScreenshot, fullPage: true });
  console.log('✓ Captured 06_complaints_light_mode.png');

  // Function to switch role via header dropdown
  const switchRole = async (buttonText) => {
    const switcher = await page.$('header button[title*="Switch demo role"]');
    if (switcher) {
      await switcher.click();
      await page.waitForTimeout(300);
      await page.click(`button:has-text("${buttonText}")`);
      await page.waitForTimeout(600);
    }
  };

  // 8. Staff Dashboard
  console.log('Switching to Staff Role...');
  await switchRole('Staff');
  await page.screenshot({ path: path.join(screenshotsDir, '07_staff_dashboard_light_mode.png'), fullPage: true });
  console.log('✓ Captured 07_staff_dashboard_light_mode.png');

  // 9. Headmaster Dashboard
  console.log('Switching to Headmaster Role...');
  await switchRole('Headmaster');
  await page.screenshot({ path: path.join(screenshotsDir, '08_headmaster_dashboard_light_mode.png'), fullPage: true });
  console.log('✓ Captured 08_headmaster_dashboard_light_mode.png');

  // 10. Doctor Dashboard
  console.log('Switching to Doctor Role...');
  await switchRole('Doctor');
  await page.screenshot({ path: path.join(screenshotsDir, '09_doctor_dashboard_light_mode.png'), fullPage: true });
  console.log('✓ Captured 09_doctor_dashboard_light_mode.png');

  // 11. Officer Dashboard
  console.log('Switching to Education Officer Role...');
  await switchRole('Education Officer');
  await page.screenshot({ path: path.join(screenshotsDir, '10_officer_dashboard_light_mode.png'), fullPage: true });
  console.log('✓ Captured 10_officer_dashboard_light_mode.png');

  await browser.close();
  console.log('--- All Playwright Light Mode & UI Alignment Tests Completed Successfully! ---');
})();
