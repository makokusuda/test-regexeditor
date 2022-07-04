const webdriver = require("selenium-webdriver");
const { Builder, By } = require("selenium-webdriver");
const script = require("jest");

describe("Initial test", () => {
  let driver = new Builder().forBrowser("chrome").build();

  afterAll(async () => {
    await driver.quit();
  }, 15000);

  test("Search selenium on google", async () => {
    await driver.get("https://www.google.com");

    await driver.getTitle();

    await driver.manage().setTimeouts({ implicit: 1000 });

    let searchBox = await driver.findElement(By.name("q"));
    let searchButton = await driver.findElement(By.name("btnK"));

    await searchBox.sendKeys("Selenium");
    await searchButton.click();

    searchBox = await driver.findElement(By.name("q"));
    let value = await searchBox.getAttribute("value");

    expect(value).toContain("Selenium");
  });
});
