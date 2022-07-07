const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const service = new chrome.ServiceBuilder("./chromedriver");

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

  test("should display description", async () => {
    await driver.get("https://regex101.com/");

    // Input regular expression
    const textArea = await driver.findElement(
      By.xpath("//*[@aria-label='insert your regular expression here']")
    );
    await driver.actions().move(textArea).perform();
    await driver.actions().sendKeys(`\\d\\D`).perform();

    // Wait until description card displays
    await driver.wait(
      until.elementLocated(By.xpath("(//*[@class='T0laQ']/span)[1]")),
      10000
    );

    const digit = await driver
      .findElement(By.xpath("(//*[@class='T0laQ']/span)[1]"))
      .getText();
    const character = await driver
      .findElement(By.xpath("(//*[@class='T0laQ']/span)[2]"))
      .getText();

    // Regular expression matches a digit and any character
    expect(digit).toBe("[0-9]");
    expect(character).toBe("[^0-9]");
  });
});
