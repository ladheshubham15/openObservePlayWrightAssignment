// @ts-nocheck
import * as logPageFunctions from '../supportFunctions/helper/logPageFunctions'
const { test, expect } = require("@playwright/test");
import { logPageLocators } from '../supportFunctions/locators/logPageLocators';

test("Verify default logs Scenario", async ({ page }) => {
  await page.goto("https://monitor.dev.zinclabs.dev/web/login")

  logPageFunctions.login(page,logPageLocators.loginEmail,logPageLocators.loginPassWord)

  await expect(page).toHaveTitle(/OpenObserve/);
  await page.locator(logPageLocators.logsMenuLink).click();
  await expect(
    page.locator(logPageLocators.noStreamSelectedText)
  ).toBeVisible()
  await page
    .locator(logPageLocators.noStreamSelectedText)
    .click()
  await page
    .locator(logPageLocators.logSelection)
    .click()
  await page
    .locator(logPageLocators.logSelectionOptionList)
    .getByText("arrow_drop_down")
    .click()
  await page
    .locator(logPageLocators.logSelection)
    .click()
  await page.getByText("default").click();
  await expect(page.locator(logPageLocators.logTypeSelectionSection)).toContainText("default")
  await page.locator(logPageLocators.refreshButton).click()
  await expect(
    page.locator(logPageLocators.logErrorMessageLocator)
  ).toContainText("No records found. Please adjust filters and try again")

  await page.locator(logPageLocators.dateTimeButton).click()
  await page.locator(logPageLocators.day4SelectorLocator).click()
  await page.locator(logPageLocators.refreshButton).click()
  await expect(page.locator(logPageLocators.rangeSection)).toContainText("Past 4 Days")
  await expect(
    page.locator(logPageLocators.barChartLocator)
  ).toBeVisible()
 
  const timestampElement = await page.locator(
    logPageLocators.timeStampSectionLocator
  )
  const timestampElementText = await timestampElement.textContent()
  logPageFunctions.validateTimeStamp(timestampElementText)

  const logJson = await page
    .locator(logPageLocators.jsonLogSectionLocator)
    .textContent()

  logPageFunctions.validateLogJson(logJson)
})
