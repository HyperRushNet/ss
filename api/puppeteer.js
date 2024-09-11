const puppeteer = require('puppeteer-core');

module.exports = async (req, res) => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        executablePath: '/usr/bin/chromium-browser'
    });
    const page = await browser.newPage();
    await page.goto('https://www.google.com');
    await page.type('input[name=q]', 'site:example.com');
    await page.keyboard.press('Enter');
    await page.waitForSelector('#result-stats');
    const resultStats = await page.$eval('#result-stats', el => el.innerText);
    await browser.close();
    res.send(resultStats);
};
