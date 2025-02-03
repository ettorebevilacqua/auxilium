const express = require('express');
const axios = require('axios');

const router = express.Router();
let shopSessions = require('../session');

router.get('/shop-info', async (req, res) => {
    const { shop } = req.query;
     
    console.log('shop shopSessions ', shopSessions)
    
    if (!shop || !shopSessions || !shopSessions[shop]) {
		 console.log('errort shopSessions empity',shopSessions )
		 return  res.status(401).send('❌ Errore: session token mising .');
	} else if (!shop || !shopSessions[shop]) {
        return res.status(401).send('❌ Errore: Shop non autenticato.');
    }

    try {
        const response = await axios.get(`https://${shop}/admin/api/2023-10/shop.json`, {
            headers: {
                'X-Shopify-Access-Token': shopSessions[shop],
                'Content-Type': 'application/json'
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('❌ Errore nel recupero dei dati del negozio:', error);
        res.status(500).send('Errore nel recupero dei dati.');
    }
});

module.exports = router;
