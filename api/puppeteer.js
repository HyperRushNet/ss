const puppeteer = require('puppeteer');

module.exports = async (req, res) => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto('https://www.google.com');
    await page.type('input[name=q]', 'site:docs.stripe.com');
    await page.keyboard.press('Enter');
    await page.waitForSelector('#result-stats');
    const resultStats = await page.$eval('#result-stats', el => el.innerText);
    await browser.close();
    res.send(resultStats);
};
