const axios = require('axios');

async function getToken() {
    await axios({
        method: 'POST',
        url: process.env.AUTH_API_URL,
        auth: {
            username: process.env.USERNAME,
            password: process.env.PASSWORD
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
        .then((res) => {
            process.env.ACCESS_TOKEN = res.data.access_token;
            process.env.EXPIRES_IN = res.data.expires_in;
        })
        .catch((error) => {
            console.error(error)
        });
    return {
        access_token: process.env.ACCESS_TOKEN,
        expires_in: process.env.EXPIRES_IN
    };
};

module.exports.getToken = getToken;