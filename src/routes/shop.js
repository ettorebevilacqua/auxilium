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
// Endpoint per recuperare le collezioni (custom e smart) da Shopify
router.get('/shop-collections', async (req, res) => {
    const { shop } = req.query;
  
    // Verifica che il parametro shop e il token di sessione siano presenti
    if (!shop || !shopSessions || !shopSessions[shop]) {
      console.error('❌ Errore: token di sessione mancante per il negozio:', shop);
      return res.status(401).send('❌ Errore: session token mancante.');
    }
  
    try {
      // Imposta la versione dell'API (puoi decidere di renderla configurabile)
      const apiVersion = '2023-10';
      
      // Effettua le chiamate in parallelo per custom_collections e smart_collections
      const [customResponse, smartResponse] = await Promise.all([
        axios.get(`https://${shop}/admin/api/${apiVersion}/custom_collections.json`, {
          headers: {
            'X-Shopify-Access-Token': shopSessions[shop],
            'Content-Type': 'application/json'
          }
        }),
        axios.get(`https://${shop}/admin/api/${apiVersion}/smart_collections.json`, {
          headers: {
            'X-Shopify-Access-Token': shopSessions[shop],
            'Content-Type': 'application/json'
          }
        })
      ]);
  
      // Combina i risultati delle due chiamate
      const collections = {
        custom: customResponse.data.custom_collections,
        smart: smartResponse.data.smart_collections
      };
  
      res.json(collections);
    } catch (error) {
      console.error('❌ Errore nel recupero delle collezioni:', error);
      res.status(500).send('Errore nel recupero delle collezioni.');
    }
  });

module.exports = router;