const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const service = new chrome.ServiceBuilder("./chromedriver");
const PATH = require("../path");

describe("Quick reference card", () => {
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

  test("should display reference", async () => {
    await driver.get(PATH.index);

    // Click the top reference
    await driver.findElement(By.xpath(`${PATH.referenceItem}[1]`)).click();

    // Wait until description card displays
    await driver.wait(
      until.elementLocated(By.xpath(PATH.referenceDescription)),
      10000
    );

    const reference = await driver
      .findElement(By.xpath(PATH.referenceDescription))
      .getAttribute("innerHTML");

    // Reference should be displayed
    expect(reference).toBe("Matches either an a, b or c character");
  });
});
