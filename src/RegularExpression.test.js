const { Builder, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const service = new chrome.ServiceBuilder("./chromedriver");

describe("Regular expression", () => {
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

  test("can input text", async () => {
    await driver.get("https://regex101.com/");

    const textArea = await driver.findElement(
      By.xpath("//*[@aria-label='insert your regular expression here']")
    );
    await driver.actions().move(textArea).perform();
    await driver.actions().sendKeys("0d{1,4}-d{1,4}-d{4}").perform();

    const value = await textArea.getAttribute("value");
    expect(value).toContain("0d{1,4}-d{1,4}-d{4}");
  });
});
