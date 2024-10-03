import { logPageLocators } from "../locators/logPageLocators";
const { expect } = require("@playwright/test");

export async function login(page, email, password) {
    await page.locator(logPageLocators.loginLink).click();
    await page.getByPlaceholder("Email").fill(email);
    await page.getByPlaceholder("Password").fill(password);
    await page.locator(logPageLocators.submitButton).click();
}

export async function validateLogJson(logJson) {
    let jsonData;
    try {
        jsonData = JSON.parse(logJson);
    } catch {
        throw new Error("Fetched text is not valid JSON");
    }

    // Validate properties and types
    expect(jsonData).toHaveProperty("_timestamp");
    expect(jsonData).toHaveProperty("job");
    expect(jsonData).toHaveProperty("level");
    expect(jsonData).toHaveProperty("log");

    expect(typeof jsonData._timestamp).toBe("number");
    expect(typeof jsonData.job).toBe("string");
    expect(typeof jsonData.level).toBe("string");
    expect(typeof jsonData.log).toBe("string");

    expect(jsonData._timestamp).toBeGreaterThan(0);
    expect(jsonData.job).not.toBe("");
    expect(jsonData.level).not.toBe("");
    expect(jsonData.log).not.toBe("");
}

export function validateTimeStamp(timestampElementText){
    const timestamp = timestampElementText.split(/(?=\d{4}-\d{2}-\d{2})/).pop()

    const timestampRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{3}$/
  
    // Assert that the timestamp matches the regex
    expect(timestamp).toMatch(timestampRegex)
}
