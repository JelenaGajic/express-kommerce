const list = ["color", "commonSize", "gender"]

module.exports.formatAttributes = (attr) => {
    const attributes = [];
    Object.keys(attr).forEach((key) => {
        if (key.includes('color')) {
            attributes.push(
                {
                    name: 'color',
                    terms: attr[`${key}`].terms
                }
            )
        } else if (key.includes('commonSize')) {
            attributes.push(
                {
                    name: 'commonSize',
                    terms: attr[`${key}`].terms
                }
            )
        }
    })
    return attributes
}

