import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import path from 'path';
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}


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
      logger.info('Navigating to WhatsApp');
      await driver.get('https://web.whatsapp.com/');
      logger.info('Successfully navigated to WhatsApp'); // Log successful navigation

      let status = "Unknown";
      while (true) {
        try {
          const timestamp = new Date().toLocaleString();

            logger.info(`Finding and clicking element for ${name}`);
            let element = await driver.wait(
              until.elementLocated(By.xpath(`//span[contains(text(), '${name}')]`)),
              2500
            );
          await element.click();

          logger.info('Getting status');

          try {
            await driver.findElement(By.xpath("//span[@title='Online']"));
            status = "Online";
          } catch {
            status = "Offline";
          }

          logger.info(`Status for ${name}: ${status}`);
          logger.info(JSON.stringify({ name, status, timestamp }));
          await new Promise(resolve => setTimeout(resolve, 2500));
        } catch (error) {
          logger.error('An error occurred while checking status:', error);
        }
      }
    } catch (error) {
      logger.error('An error occurred:', error);
    }
  } catch (error) {
    logger.error('An error occurred:', error);
    res.status(500).json({ error: error.message });
    logger.error(`Sent 500 response due to error: ${error.message}`); // Log the sent response
  }
};