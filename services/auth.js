const { getToken } = require('../gateways/getToken.js');

let accessToken = '';
let expiryDateInSeconds = '';

async function auth() {
    // if token is not defined or it's expired get new access token
    if (accessToken === '' || (expiryDateInSeconds - (new Date().getTime() / 1000) < 600)) {
        const response = await getToken();
        accessToken = response.access_token;
        // set expire date in seconds
        expiryDateInSeconds = new Date().getTime() / 1000 + response.expires_in;
    }
    return accessToken;
}

module.exports.auth = auth;