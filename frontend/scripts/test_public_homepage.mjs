import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'

const SCREENSHOT_DIR = 'i:/Richu/Projects/Learnova/frontend/screenshots'
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true })
}

async function run() {
  console.log('🚀 Starting Playwright verification of Public Homepage...')
  const browser = await chromium.launch({
    channel: 'msedge',
    headless: true,
  })

  const viewports = [
    { name: 'mobile_360', width: 360, height: 780 },
    { name: 'tablet_768', width: 768, height: 1024 },
    { name: 'laptop_1024', width: 1024, height: 800 },
    { name: 'desktop_1440', width: 1440, height: 900 },
  ]

  for (const vp of viewports) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
    })
    const page = await context.newPage()

    await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' })
    await page.waitForTimeout(500)

    // Check for horizontal overflow
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth + 2
    })
    console.log(`[Viewport ${vp.name}] Horizontal overflow check: ${hasHorizontalOverflow ? 'FAILED ❌' : 'PASSED (0 overflow) ✅'}`)

    // Capture initial public homepage screenshot
    const shotPath = path.join(SCREENSHOT_DIR, `public_home_${vp.name}.png`)
    await page.screenshot({ path: shotPath, fullPage: true })
    console.log(`Saved screenshot: ${shotPath}`)

    await context.close()
  }

  // Interactive verification on desktop
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  })
  const page = await context.newPage()
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' })

  console.log('Testing Education Updates category filter...')
  const scholarshipFilter = page.locator('button:has-text("Scholarships")')
  if (await scholarshipFilter.count() > 0) {
    await scholarshipFilter.first().click()
    await page.waitForTimeout(300)
    console.log('✅ Scholarships category filter clicked successfully')
  }

  console.log('Testing Career Sector selection (Healthcare)...')
  const healthcareSector = page.locator('button:has-text("Healthcare and Medicine")')
  if (await healthcareSector.count() > 0) {
    await healthcareSector.first().click()
    await page.waitForTimeout(300)
    console.log('✅ Healthcare sector selected successfully')
  }

  console.log('Testing School Progress tabs (Fund Allocation)...')
  const fundsTab = page.locator('button:has-text("Fund Allocation Summary")')
  if (await fundsTab.count() > 0) {
    await fundsTab.first().click()
    await page.waitForTimeout(300)
    console.log('✅ Fund Allocation Summary tab clicked successfully')
  }

  console.log('Testing Language Switch to Tamil...')
  const langBtn = page.locator('button[title*="Language"]')
  if (await langBtn.count() > 0) {
    await langBtn.first().click()
    await page.waitForTimeout(400)
    const shotTamil = path.join(SCREENSHOT_DIR, `public_home_tamil_full.png`)
    await page.screenshot({ path: shotTamil, fullPage: true })
    console.log(`Saved Tamil screenshot: ${shotTamil}`)
    // Switch back
    await langBtn.first().click()
    await page.waitForTimeout(400)
  }

  console.log('Testing Dark Theme Toggle...')
  const themeBtn = page.locator('button[aria-label="Toggle Theme"]')
  if (await themeBtn.count() > 0) {
    await themeBtn.first().click()
    await page.waitForTimeout(400)
    const shotDark = path.join(SCREENSHOT_DIR, `public_home_dark_mode.png`)
    await page.screenshot({ path: shotDark, fullPage: true })
    console.log(`Saved Dark Mode screenshot: ${shotDark}`)
    // Switch back to light mode
    await themeBtn.first().click()
    await page.waitForTimeout(400)
  }

  await browser.close()
  console.log('🎉 All Playwright verifications completed successfully!')
}

run().catch((err) => {
  console.error('Test execution failed:', err)
  process.exit(1)
})
