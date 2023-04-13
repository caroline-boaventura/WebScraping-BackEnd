const searchService = require('../services/searchService');

const searchController = async (req, res) => {
    try {
        const { category, product, site } = req.body;

        const products = await searchService(category, product, site);

        return res.status(200).json(products)
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = searchController;