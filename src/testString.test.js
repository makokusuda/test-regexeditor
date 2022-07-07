const { Builder, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const service = new chrome.ServiceBuilder("./chromedriver");

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
    await driver.get("https://regex101.com/");

    // Input test string
    const textArea = await driver.findElement(
      By.xpath(
        "//*[@class='CodeMirror cm-s-default CodeMirror-wrap CodeMirror-empty']"
      )
    );
    await textArea.click();
    await driver.actions().move(textArea).perform();
    await driver.actions().sendKeys("090-1111-1111").perform();

    // Check string
    const result = await driver
      .findElement(
        By.xpath(
          "//*[@class='Pk2Mn CodeMirror-show-whitespace']//span[@role='presentation']"
        )
      )
      .getText();

    expect(result).toContain("090-1111-1111");
  });
});
