const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const service = new chrome.ServiceBuilder("./chromedriver");

describe("Match information card", () => {
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

  test("should display match string", async () => {
    await driver.get("https://regex101.com/");

    // Input regular expression
    const regularExpression = await driver.findElement(
      By.xpath("//*[@aria-label='insert your regular expression here']")
    );
    await driver.actions().move(regularExpression).perform();
    await driver.actions().sendKeys(`[a-z]`).perform();

    // Input test string
    const testString = await driver.findElement(
      By.xpath(
        "//*[@class='CodeMirror cm-s-default CodeMirror-wrap CodeMirror-empty']"
      )
    );
    await testString.click();
    await driver.actions().move(testString).perform();
    await driver.actions().sendKeys("123abc").perform();

    // Wait until match information card displays
    await driver.wait(
      until.elementLocated(By.xpath("(//*[@class='amvtn']/span)[1]")),
      10000
    );

    // Check match information
    const first = await driver
      .findElement(By.xpath("(//*[@class='amvtn']/span)[1]"))
      .getText();
    const second = await driver
      .findElement(By.xpath("(//*[@class='amvtn']/span)[2]"))
      .getText();
    const third = await driver
      .findElement(By.xpath("(//*[@class='amvtn']/span)[3]"))
      .getText();

    // Only matched string is displayed
    expect(first).toBe("a");
    expect(second).toBe("b");
    expect(third).toBe("c");
  });
});
