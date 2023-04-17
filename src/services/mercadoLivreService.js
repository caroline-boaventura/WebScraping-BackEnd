const puppeteer = require('puppeteer');
const chromium = require('chrome-aws-lambda');
require('dotenv').config();

const mercadoLivreService = async (product, category, site) => {
    try {
        const browser = await puppeteer.launch({
            args: chromium.args,
            executablePath: process.env.CHROME_EXECUTABLE_PATH || await chromium.executablePath
        });
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0);

        await page.goto('https://www.mercadolivre.com.br/');
        await page.waitForSelector('#cb1-edit');

        await page.type('#cb1-edit', product ? `${category} ${product}` : category)
        
        await Promise.all([
            page.waitForNavigation(),
            await page.click('.nav-icon-search')
        ])

        const links = await page.$$eval('.ui-search-result__image > a', el => el.map(link => link.href));

        const products = [];
        for (const link of links) {
            await page.goto(link);
            await page.waitForSelector('#cb1-edit');
    
            const product = {
                title: await page.$('.ui-pdp-title') ? await page.$eval('.ui-pdp-title', el => el.innerText) : '',
                photo: await page.$('.ui-pdp-gallery__figure > img') ? await page.$eval('.ui-pdp-gallery__figure > img', el => el.getAttribute('src')) : '',
                description: await page.$('.ui-pdp-description__content')  ? await page.$eval('.ui-pdp-description__content', el => el.innerText) : '',
                category,
                price: await page.$('.andes-money-amount__fraction') ? await page.$eval('.andes-money-amount__fraction', el => el.innerText) : '',
                website: site,
            }
    
            products.push(product)
        }

        browser.close();

        return products;

    } catch (error) {
        console.log(error.message);
    }
}

module.exports = mercadoLivreService;