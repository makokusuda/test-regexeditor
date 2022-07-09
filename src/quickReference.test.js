const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const service = new chrome.ServiceBuilder("./chromedriver");

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
    await driver.get("https://regex101.com/");

    // Click first reference
    await driver
      .findElement(
        By.xpath("(//*[@class='WLU1r BcuOd VZGjx']/div[@class='Lta24'])[1]")
      )
      .click();

    // Wait until description card displays
    await driver.wait(
      until.elementLocated(By.xpath("//*[@class='vqMnN']/div")),
      10000
    );

    const reference = await driver
      .findElement(By.xpath("//*[@class='vqMnN']/div"))
      .getAttribute("innerHTML");

    // Reference should be displayed
    expect(reference).toBe("Matches either an a, b or c character");
  });
});
