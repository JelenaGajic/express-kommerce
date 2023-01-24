
const axios = require('axios');
const logger = require('loglevel');
const { formatAttributes } = require('../services/formatAttributes.js');

async function getProductsWithAttributes({ params }) {
    let query = formatFacetQuery({ params });
    query += params.lang ? formatTextQuery({ params }) : '';
    const apiUrl = `${process.env.API_URL}/${process.env.PROJECT_KEY}/product-projections/search${query}`

    await axios({
        method: 'GET',
        url: apiUrl,
        headers: {
            'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
        }
    })
        .then((res) => {
            data = res.data;

            logger.warn('products pulled from:', apiUrl)
        })
        .catch((error) => {
            console.error(error)
        });
    return { results: data.results, attributes: formatAttributes(data.facets) };
}

function formatFacetQuery({ params }) {
    let data = { color: params.color, commonSize: params.commonSize };
    let query = '?'
    let filterQuery = '&filter.query=';
    Object.keys(data).forEach((facetName, ind) => {
        if (ind) query += '&'
        query += `facet=variants.attributes.${facetName}.key`
        filterQuery += filterQuery.length > 14 ? "&" : "";
        if (data[`${facetName}`].length) {
            filterQuery += `variants.attributes.${facetName}.key`
            data[`${facetName}`].forEach((val, i) => {
                if (i === 0)
                    filterQuery += `:"${val}"`
                else {
                    filterQuery += `,"${val}"`
                }
            })
        }
    })
    return filterQuery.length > 14 ? query + filterQuery : query;
}

function formatTextQuery({ params }) {
    return `&text.${params.lang}=${params.search}`
}


module.exports.getProductsWithAttributes = getProductsWithAttributes;