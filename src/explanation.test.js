const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const service = new chrome.ServiceBuilder("./chromedriver");
const PATH = require("../path");

describe("Explanation card", () => {
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

  test("should display correct description", async () => {
    await driver.get(PATH.index);

    // Input regular expression
    const textArea = await driver.findElement(
      By.xpath(PATH.regularExpressionInput)
    );
    await driver.actions().move(textArea).perform();
    await driver.actions().sendKeys(`\\d\\D`).perform();

    // Wait until description card displays
    await driver.wait(
      until.elementLocated(By.xpath(`${PATH.equivalentCharacter}[1]`)),
      10000
    );

    const digit = await driver
      .findElement(By.xpath(`${PATH.equivalentCharacter}[1]`))
      .getText();
    const character = await driver
      .findElement(By.xpath(`${PATH.equivalentCharacter}[2]`))
      .getText();

    // Check if explanation is correct
    expect(digit).toBe("[0-9]");
    expect(character).toBe("[^0-9]");
  });
});
