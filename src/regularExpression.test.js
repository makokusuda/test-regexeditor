const { Builder, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const service = new chrome.ServiceBuilder("./chromedriver");
const PATH = require("../path");

describe("Regular expression", () => {
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

    // Input regular expression
    const textArea = await driver.findElement(
      By.xpath(PATH.regularExpressionInput)
    );
    await driver.actions().move(textArea).perform();
    await driver.actions().sendKeys("[a-zA-Z]").perform();

    // Check string
    const value = await textArea.getAttribute("value");
    expect(value).toContain("[a-zA-Z]");
  });
});
