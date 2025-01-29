const express = require('express');
const axios = require('axios');
const { SHOPIFY_API_KEY, SHOPIFY_API_SECRET, REDIRECT_URI } = require('../../config/shopifyConfig');

const router = express.Router();

router.get('/auth', (req, res) => {
  const { shop } = req.query;
  if (!shop) return res.status(400).send('Parametro shop mancante!');
  const authURL = `https://${shop}/admin/oauth/authorize?client_id=${SHOPIFY_API_KEY}&scope=read_products,write_products&redirect_uri=${REDIRECT_URI}`;
  res.redirect(authURL);
});

router.get('/auth/callback', async (req, res) => {

  const { shop, code } = req.query;
  	console.log('xxxxx', shop, code)
  	
  if (!shop || !code) return res.status(400).send('Shop o code mancante!');
  try {
    const tokenResponse = await axios.post(`https://${shop}/admin/oauth/access_token`, {
      client_id: SHOPIFY_API_KEY,
      client_secret: SHOPIFY_API_SECRET,
      code,
    });
    const accessToken = tokenResponse.data.access_token;
    console.log(`Access Token per ${shop}: ${accessToken}`);
    res.redirect(`/admin/dashboard?shop=${shop}`);
  } catch (error) {
    console.error('Errore durante il callback OAuth:', error);
    res.status(500).send('Errore durante l\'autenticazione.');
  }
});

module.exports = router;



const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY;
const SHOPIFY_API_SECRET = process.env.SHOPIFY_API_SECRET;
const SHOPIFY_REDIRECT_URL = process.env.SHOPIFY_REDIRECT_URL;

// Step 1: Redirigi a Shopify per ottenere il codice temporaneo
router.get('/auth', (req, res) => {
    const { shop } = req.query;

    if (!shop) {
        return res.status(400).send('Parametro "shop" mancante.');
    }

    const authUrl = https://${shop}/admin/oauth/authorize?client_id=${SHOPIFY_API_KEY}&scope=read_products,write_products&redirect_uri=${SHOPIFY_REDIRECT_URL};
    
    console.log('🔄 Reindirizzamento a Shopify OAuth:', authUrl);
    res.redirect(authUrl);
});

// Step 2: Shopify redirige qui con il codice temporaneo
router.get('/auth/callback', async (req, res) => {
    const { shop, code } = req.query;

    console.log('🔍 Shopify OAuth callback ricevuto:', shop, code);

    if (!shop || !code) {
        return res.status(400).send('Errore: parametri mancanti.');
    }

    try {
        // Richiedi il token di accesso a Shopify
        const tokenResponse = await axios.post(https://${shop}/admin/oauth/access_token, {
            client_id: SHOPIFY_API_KEY,
            client_secret: SHOPIFY_API_SECRET,
            code
        });

        const accessToken = tokenResponse.data.access_token;

        console.log('✅ Access Token ricevuto:', accessToken);

        // Puoi salvare il token nel database o sessione
        res.send(Autenticazione riuscita! Access token: ${accessToken});
    } catch (error) {
        console.error('❌ Errore durante lo scambio del codice con il token:', error);
        res.status(500).send('Errore durante l\'autenticazione con Shopify.');
    }
});

module.exports = router;
