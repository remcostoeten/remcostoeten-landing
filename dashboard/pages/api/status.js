import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';

export default async (req, res) => {
  let driver = await new Builder().forBrowser('chrome').build();

  // Get the name from the request parameters
  const name = req.query.name || 'Lianne';

  try {
    await driver.get('https://web.whatsapp.com/');

    // Wait for you to scan the QR code
    await new Promise(resolve => setTimeout(resolve, 20000));

    // Wait for the name to be present and then click on it
    let element = await driver.wait(until .elementLocated(By.xpath(`//span[contains(text(), '${name}')]`)), 5000);
    await element.click();

    // Get the "Online" or "Offline" status
    let status;
    try {
      let online_indicator = await driver.findElement(By.xpath("//span[contains(text(), 'online')]"));
      status = "Online";
    } catch {
      status = "Offline";
    }

    // Wait for the authentication process to refresh and authenticate again
    await new Promise(resolve => setTimeout(resolve, 20000));

    res.status(200).json({ status: status });
  } finally {
    await driver.quit();
  }
};