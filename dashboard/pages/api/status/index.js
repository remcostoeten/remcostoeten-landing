import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import path from 'path';

export default async (req, res) => {
  try {
    const name = req.query.name || process.env.WHATSAPP_NAME;

    let options = new chrome.Options();
    const chromeProfilePath = path.resolve(__dirname, '../../../../../chromeprofile');
    options.addArguments(`user-data-dir=${chromeProfilePath}`);

    let driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();

    try {
      console.log('Navigating to WhatsApp');
      await driver.get('https://web.whatsapp.com/');

      console.log('Waiting for QR code scan');
      await new Promise(resolve => setTimeout(resolve, 20000));

      let status = "Unknown";

      while (true) {
        try {
          console.log(`Finding and clicking element for ${name}`);
          let element = await driver.wait(
            until.elementLocated(By.xpath(`//span[contains(text(), '${name}')]`)),
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
        }

        console.log(`Status for ${name}: ${status}`);
        // Log status with timestamp
        console.log(new Date().toLocaleString(), `- Status for ${name}: ${status}`);

        await new Promise(resolve => setTimeout(resolve, 20000));
      }

    } finally {
      // No need to quit driver as it's running continuously
    }

  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: error.message });
  }
};
