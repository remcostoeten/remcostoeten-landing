import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import path from 'path';

export default async (req, res) => {
  try {
    const name = req.query.name || process.env.WHATSAPP_NAME;

    let driver;

    async function initializeDriver() {
      let options = new chrome.Options();
      const chromeProfilePath = path.resolve(__dirname, '../../../../../chromeprofile');
      options.addArguments(`user-data-dir=${chromeProfilePath}`);

      driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();
    }

    await initializeDriver();

    console.log('Navigating to WhatsApp');
    await driver.get('https://web.whatsapp.com/');

    console.log('Waiting for QR code scan');
    await new Promise(resolve => setTimeout(resolve, 20000));

    while (true) {
      let status = "Unknown";

      try {
        console.log(`Finding and clicking element for ${name}`);

        // Rest of status check logic

        console.log(`Status for ${name}: ${status}`);

      } catch (error) {
        console.error('An error occurred while checking status:', error);
        status = "Unknown";
      }

      // Log status
      console.log(new Date().toLocaleString(), `- Status for ${name}: ${status}`);

      // Removed setTimeout
    }

  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: error.message });
  }

  const stop = async () => {
    if (driver) {
      await driver.quit();
    }
  }
};
