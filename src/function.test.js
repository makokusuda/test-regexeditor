const { Builder, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const service = new chrome.ServiceBuilder("./chromedriver");

describe("Function options", () => {
  let driver;

  beforeAll(() => {
    driver = new Builder()
      .forBrowser("chrome")
      .setChromeService(service)
      .build();
  });

  afterAll(() => {
    return driver.quit();
  });

  test("can select substitution", async () => {
    await driver.get("https://regex101.com/");

    // Switch function
    await driver
      .findElement(
        By.xpath(
          "//*[@class='wcfss']//*[@class='u_Q0A'][text()='Substitution']"
        )
      )
      .click();

    // Substitution area is displayed
    const substitutionTitle = await driver
      .findElement(
        By.xpath("//*[@class='dYInr JOzNE z2wCE llpmv']//*[@class='JOzNE']")
      )
      .getText();

    expect(substitutionTitle).toContain("SUBSTITUTION");
  });
});
