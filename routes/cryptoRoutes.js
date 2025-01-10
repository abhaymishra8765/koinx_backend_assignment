const express = require('express');
const router = express.Router();
const Crypto = require('../models/crypto');  

// GET /stats endpoint
router.get('/stats', async (req, res) => {
    const { coin } = req.query;   

    if (!coin) {
        return res.status(400).json({ error: 'Coin parameter is required' });
    }

    try {
        // Fetch the latest data for the requested coin
        const cryptoData = await Crypto.findOne({ coin }).sort({ createdAt: -1 });   

        if (!cryptoData) {
            return res.status(404).json({ error: `No data found for ${coin}` });
        }

        
        res.json({
            price: cryptoData.price,
            marketCap: cryptoData.marketCap,
            change24h: cryptoData.change24h,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
