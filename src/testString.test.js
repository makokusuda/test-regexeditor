const { Builder, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const service = new chrome.ServiceBuilder("./chromedriver");
const PATH = require("../path");

describe("Test string", () => {
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

  test("can input text", async () => {
    await driver.get(PATH.index);

    // Input test string
    const textArea = await driver.findElement(By.xpath(PATH.testStringInput));
    await textArea.click();
    await driver.actions().move(textArea).perform();
    await driver.actions().sendKeys("090-1111-1111").perform();

    // Check string
    const result = await driver
      .findElement(By.xpath(PATH.testStringDisplay))
      .getText();

    expect(result).toContain("090-1111-1111");
  });
});
