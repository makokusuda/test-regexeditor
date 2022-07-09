const { Builder, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const service = new chrome.ServiceBuilder("./chromedriver");
const PATH = require("../path");

describe("Function options", () => {
  let driver;

  beforeAll(() => {
    driver = new Builder()
      .forBrowser("chrome")
      .setChromeService(service)
      .build();
  });

  afterAll(() => {
    driver.quit();
  });

  test("should be able to switch", async () => {
    await driver.get(PATH.index);

    // Click substitution
    await driver.findElement(By.xpath(PATH.substitution)).click();

    const substitutionTitle = await driver
      .findElement(By.xpath(PATH.substitutionTitle))
      .getText();

    // Substitution area should appear
    expect(substitutionTitle).toContain("SUBSTITUTION");
  });
});
