const express = require('express');
const router = express.Router();
const Crypto = require('../models/crypto');  
const math = require('mathjs');  

// GET /stats endpoint
router.get('/stats', async (req, res) => {
    const { coin } = req.query;   

    if (!coin) {
        return res.status(400).json({ error: 'Coin parameter is required' });
    }

    try {
        
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

router.get('/deviation', async (req, res) => {
    const { coin } = req.query;  

    if (!coin) {
        
        return res.status(400).json({ error: 'Coin parameter is required' });
    }

    try {
        
        const cryptoData = await Crypto.find({ coin })
            .sort({ createdAt: -1 })   
            .limit(100);   

        if (cryptoData.length === 0) {
             
            return res.status(404).json({ error: `No data found for ${coin}` });
        }

        
        const prices = cryptoData.map(record => record.price);

        
        const deviation = math.std(prices);   

        
        res.json({
            deviation: deviation,
        });
    } catch (err) {
         
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;
