import chrome from 'selenium-webdriver/chrome';

export default async function () {
  let status = "Unknown";

  try {
    // Access Chrome profile path from environment variable
    const chromeProfilePath = process.env.CHROME_PROFILE_PATH;

    const options = new chrome.Options().addArguments(`user-data-dir=${chromeProfilePath}`);

    const driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();

    try {
      console.log('Navigating to WhatsApp');
      await driver.get('https://web.whatsapp.com/');

      console.log('Waiting for QR code scan');
      await driver.wait(until.elementLocated(By.tagName('canvas')), 5000);

      console.log('Finding and clicking element for name');
      const element = await driver.wait(
        until.elementLocated(By.xpath("//div[@class='_3H4MS']")),
        5000
      );
      await element.click();

      console.log('Getting status');
      try {
        await driver.findElement(By.xpath("//span[contains(text(), 'online')]"));
        status = "Online";
      } catch {
        status = "Offline";
      }
    } catch (error) {
      console.error('An error occurred while checking status:', error);
      status = "Unknown";
    } finally {
      await driver.quit();
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }

  return status;
}
