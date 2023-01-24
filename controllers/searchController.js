const { auth } = require('../services/auth.js');
const { getProductsWithAttributes } = require('../gateways/getProductsWithAttributes.js');
const logger = require('loglevel');

module.exports = {
    async getProducts(req, res) {
        try {
            await auth();
            const { results, attributes } = await getProductsWithAttributes({ params: req.body });
            logger.warn('Products route visited');
            res.json({ results: results, attributes: attributes });
        } catch (error) {
            console.error(error.message)
        }
    }
}