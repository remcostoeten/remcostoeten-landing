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
      logger.info('Successfully navigated to WhatsApp');

      let status = "Unknown";
      let lastSeenSince = "";
      let totalOnline = 0;
      let totalOffline = 0;
      let offlineSince = null;
      let timestamp = new Date().toLocaleString();
      let previousStatus = null;

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

          const getTimeInbetween = (time1, time2) => {
            const date1 = new Date(time1);
            const date2 = new Date(time2);
            const diffTime = Math.abs(date2 - date1);
            const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
            const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
            return `${diffHours}h ${diffMinutes}m`;
          }

          try {
            await driver.findElement(By.xpath("//span[@title='Online']"));
            status = "Online";
          } catch {
            status = "Offline";
          }

          if (status !== previousStatus) {
            if (status === "Online") {
              if (offlineSince !== null) {
                lastSeenSince = getTimeInbetween(offlineSince, timestamp);
                totalOffline += 1;
                offlineSince = null;
              } else {
                totalOnline += 1;
              }
            } else {
              if (offlineSince === null) {
                offlineSince = timestamp;
              } else {
                lastSeenSince = getTimeInbetween(offlineSince, timestamp);
                totalOffline += 1;
              }
            }
          }

          previousStatus = status;

          logger.info(`Status for ${name}: ${status} at ${timestamp}`);
          logger.info(JSON.stringify({ name, status, timestamp, lastSeenSince, totalOnline, totalOffline, offlineSince }));
        } catch (error) {
          logger.error('An error occurred while checking status:', error);
        }
        await new Promise(resolve => setTimeout(resolve, 5000));  // Wait for 5 seconds
      }
    } catch (error) {
      logger.error('An error occurred while checking status:', error);
    }
  }
  catch (error) {
    logger.error('An error occurred while checking status:', error);
  }
}