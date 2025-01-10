require('dotenv').config();
const cron = require('node-cron');
const fetchCryptoData = require('./utils/fetchCryptoData');
const Crypto = require('./models/crypto'); 
const express = require('express');
const mongoose = require('mongoose');
const cryptoRoutes = require('./routes/cryptoRoutes');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

app.use('/api', cryptoRoutes);

// Schedule the job every 2 hours
cron.schedule('0 */2 * * *', async () => {
    console.log('Fetching cryptocurrency data...');
    const coins = ['bitcoin', 'matic-network', 'ethereum'];
    for (const coin of coins) {
        const data = await fetchCryptoData(coin);
        if (data) {
            const crypto = new Crypto({ coin, ...data });
            await crypto.save();
            console.log(`${coin} data saved to database.`);
        }
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
