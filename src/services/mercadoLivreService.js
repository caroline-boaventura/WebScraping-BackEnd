const puppeteer = require('puppeteer');

const mercadoLivreService = async (product, category, site) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0);

        await page.goto('https://www.mercadolivre.com.br/');
        await page.waitForSelector('#cb1-edit');

        await page.type('#cb1-edit', product ?? category)
        
        await Promise.all([
            page.waitForNavigation(),
            await page.click('.nav-icon-search')
        ])

        const links = await page.$$eval('.ui-search-result__image > a', el => el.map(link => link.href));

        const products = [];
        for (const link of links) {
            await page.goto(link);
            await page.waitForSelector('.ui-pdp-title');
    
            const product = {
                title: await page.$eval('.ui-pdp-title', el => el.innerText),
                photo: await page.$eval('.ui-pdp-gallery__figure > img', el => el.getAttribute('src')),
                description: await page.$eval('.ui-pdp-description__content', el => el.innerText),
                category,
                price: await page.$eval('.andes-money-amount__fraction', el => el.innerText),
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