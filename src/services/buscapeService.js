const puppeteer = require('puppeteer');

const buscapeService = async (product, category, site) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);

    await page.goto('https://www.buscape.com.br/');
    await page.waitForSelector('.AutoCompleteStyle_autocomplete__e9vOQ > input');

    await page.type('.AutoCompleteStyle_autocomplete__e9vOQ > input', product ?? category)
    
    await Promise.all([
        page.waitForNavigation(),
        await page.click('.AutoCompleteStyle_autocomplete__e9vOQ > button')
    ])

    const links = await page.$$eval('.SearchCard_ProductCard_Inner__7JhKb', el => el.map(link => link.href));

    const products = [];

    for (const link of links) {
        await page.goto(link)
        await page.waitForSelector('.AutoCompleteStyle_autocomplete__e9vOQ > button');

        const descriptions = await page.$$eval('.AttributeBlock_GroupContent__nhYRo.AttributeBlock_NoBorders__UgSGr > p', el => el.map(p => p.innerText));

        const descriptionString = descriptions.join('\n');

        const product = {
            title: await page.$('.Text_Text__h_AF6.Text_MobileTitleM__24Ah0.Text_MobileTitleLAtLarge__CTrpI') 
                ? await page.$eval('.Text_Text__h_AF6.Text_MobileTitleM__24Ah0.Text_MobileTitleLAtLarge__CTrpI', el => el.innerText) : '',
            photo: await page.$('.swiper-slide.Carousel_SlideItem__c7xrN.Carousel_PreventImageOversized__T_jjw.swiper-slide-active > div > img')
                ? await page.$eval('.swiper-slide.Carousel_SlideItem__c7xrN.Carousel_PreventImageOversized__T_jjw.swiper-slide-active > div > img', el => el.getAttribute('src'))
                : await page.$eval('.swiper-slide.Carousel_SlideItem__c7xrN.Carousel_PreventImageOversized__T_jjw.swiper-slide-active > img', el => el.getAttribute('src')),
            description: descriptionString,
            category,
            price: await page.$('.Price_ValueContainer__1U9ia > strong') 
                ? await page.$eval('.Price_ValueContainer__1U9ia > strong', el => el.innerText)
                : await page.$eval('.Text_Text__Q54vF.Text_LabelXxlRegular__sF1jq.Text_LabelXxxRegularAtLarge__XvU_S.OfferPrice_Main__hZooh', el => el.innerText),
            website: site,
        }

        products.push(product)
    }

    browser.close();

    return products
}

module.exports = buscapeService;
