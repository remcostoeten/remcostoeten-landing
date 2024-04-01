// Import Selenium WebDriver classes
import { Builder, By, until } from 'selenium-webdriver';

// Import chrome module
import chrome from 'selenium-webdriver/chrome';

// Import path module
import path from 'path';

export default async (req, res) => {

 // Get name from request
 const name = req.query.name || process.env.WHATSAPP_NAME;

 // Create chrome options
 let options = new chrome.Options();

 // Construct the absolute path to the chromeprofile directory
 const chromeProfilePath = path.resolve(__dirname, '../../../../../chromeprofile');

 // Set path to existing chrome profile
 options.addArguments(`user-data-dir=${chromeProfilePath}`);

 // Create driver with chrome options
 let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

 try {

    // Navigate to WhatsApp
    await driver.get('https://web.whatsapp.com/');

    // Wait for QR code scan
    await new Promise(resolve => setTimeout(resolve, 20000));

    // Find name element and click
    let element = await driver.wait(
      until.elementLocated(By.xpath(`//span[contains(text(), '${name}')]`)),
      5000
    );
    await element.click();

    // Get status
    let status;
    try {
      let online = await driver.findElement(By.xpath("//span[contains(text(), 'online')]"));
      status = "Online";
    } catch {
      status = "Offline";
    }

    // Wait before quitting
    await new Promise(resolve => setTimeout(resolve, 20000));

    // Return status
    res.status(200).json({ status });

 } finally {
    await driver.quit();
 }

};
