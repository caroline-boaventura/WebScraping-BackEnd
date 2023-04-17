const entityProduct = require('../models/Product');
const buscapeService = require('./buscapeService');
const mercadoLivreService = require('./mercadoLivreService');

const searchService = async (category, product, site) => {
    const productsByCategoryAndSite = !product ? await entityProduct.find({ $and: [ { category: category }, { website: site } ] }).exec() : [];

    console.log(`${productsByCategoryAndSite.length} products found in Mongo Atlas for category ${category} and website ${site}`)

    if (productsByCategoryAndSite.length === 0) {
        const products = await (site === 'Mercado Livre' ? mercadoLivreService(product, category, site) : buscapeService(product, category, site));

        !product && await entityProduct.insertMany(products)

        return products
    }

    return productsByCategoryAndSite;
}

module.exports = searchService;