// @ts-nocheck
import * as logPageFunctions from "../supportFunctions/helper/logPageFunctions"
const { test, expect } = require("@playwright/test")
import { logPageLocators } from "../supportFunctions/locators/logPageLocators"
require("dotenv").config()
const username = process.env.ZO_ROOT_USER_EMAIL
const password = process.env.ZO_ROOT_USER_PASSWORD

test("Verify default logs Scenario", async ({ page }) => {
  //login to the application
  await page.goto("https://monitor.dev.zinclabs.dev/web/login")

  logPageFunctions.login(page, username, password)

  await expect(page).toHaveTitle(/OpenObserve/)

  // navigate to logs window
  await page.locator(logPageLocators.logsMenuLink).click()
  await expect(
    page.locator(logPageLocators.noStreamSelectedText)
  ).toBeVisible()
  await page.locator(logPageLocators.noStreamSelectedText).click()
  await page.locator(logPageLocators.logSelection).click()

  //select the default option
  await page
    .locator(logPageLocators.logSelectionOptionList)
    .getByText("arrow_drop_down")
    .click();
  await page.locator(logPageLocators.logSelection).click()
  await page.getByText("default").click()

  //assert that default selection mult be set after selection of option.
  await expect(
    page.locator(logPageLocators.logTypeSelectionSection)
  ).toContainText("default")

  //click on Run Querry Button and verify Result for Past 15 mins
  await page.locator(logPageLocators.refreshButton).click()
  await expect(
    page.locator(logPageLocators.logErrorMessageLocator)
  ).toContainText("No records found. Please adjust filters and try again")

  //select the Past 4 days selection using picker and click on run querry
  await page.locator(logPageLocators.dateTimeButton).click()
  await page.locator(logPageLocators.day4SelectorLocator).click()
  await page.locator(logPageLocators.refreshButton).click()
  await expect(page.locator(logPageLocators.rangeSection)).toContainText(
    "Past 4 Days"
  )

  //verify that bar chart is shown up in the logs window
  await expect(page.locator(logPageLocators.barChartLocator)).toBeVisible()

  //assert the timestamp and validate that with correct format
  const timestampElement = await page.locator(
    logPageLocators.timeStampSectionLocator
  )
  const timestampElementText = await timestampElement.textContent()
  logPageFunctions.validateTimeStamp(timestampElementText)

  //assert and validate if resulted log is in the correct format or not
  const logJson = await page
    .locator(logPageLocators.jsonLogSectionLocator)
    .textContent()

  logPageFunctions.validateLogJson(logJson)
})
