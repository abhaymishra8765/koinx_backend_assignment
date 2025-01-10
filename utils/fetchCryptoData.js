const axios = require('axios');

async function fetchCryptoData(coinId) {
    try {
        const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`;
        const response = await axios.get(url);
        const data = response.data[coinId];
        return {
            price: data.usd,
            marketCap: data.usd_market_cap,
            change24h: data.usd_24h_change
        };
    } catch (err) {
        console.error(`Error fetching data for ${coinId}:`, err.message);
        return null;
    }
}

module.exports = fetchCryptoData;
