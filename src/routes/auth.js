const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const router = express.Router();
const querystring = require('querystring');
let shopSessions = require('../session');

dotenv.config();

const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY;
const SHOPIFY_API_SECRET = process.env.SHOPIFY_API_SECRET;
const SHOPIFY_REDIRECT_URL = process.env.SHOPIFY_REDIRECT_URL;

  console.log('shopSessions start  ', shopSessions)
  
// Step 1: Redirigi a Shopify per ottenere il codice temporaneo
router.get('/auth', (req, res) => {
    const { shop } = req.query;

    if (!shop) {
        return res.status(400).send('Parametro "shop" mancante.');
    }

    const authUrl =`https://${shop}/admin/oauth/authorize?client_id=${SHOPIFY_API_KEY}&scope=read_products,write_products&redirect_uri=${SHOPIFY_REDIRECT_URL}`;
    
    console.log('🔄 Reindirizzamento a Shopify OAuth:', authUrl);
    res.redirect(authUrl);
});

// Step 2: Shopify redirige qui con il codice temporaneo
router.get('/auth/callback', async (req, res) => {
    const { shop, code } = req.query;

    if (!shop || !code) {
        return res.status(400).send("Errore: Parametri mancanti.");
    }

    try {
        // Ottieni l'access token
        const response = await axios.post(`https://${shop}/admin/oauth/access_token`, {
            client_id: SHOPIFY_API_KEY,
            client_secret: SHOPIFY_API_SECRET,
            code
        });

        const accessToken = response.data.access_token;
        console.log("✅ Access token ottenuto:", accessToken);

        // Salva il token in sessione (o database)
         shopSessions[shop] = accessToken;
        console.log('shopSessions update ', shopSessions)
        
       // req.session.accessToken = accessToken;
      //  req.session.shop = shop;
	//  const redirectURL = `https://${shop}/admin/apps/auxilium-app/dashboard`;
        // Reindirizza in modo sicuro
           res.redirect(`/dashboard?shop=${shop}`);
           return 
        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Reindirizzamento...</title>
                <script src="https://unpkg.com/@shopify/app-bridge@3"></script>
            </head>
            <body>
                <script>
                    document.addEventListener("DOMContentLoaded", function () {
                        var AppBridge = window["app-bridge"];
                        var actions = AppBridge.actions;

                        var app = AppBridge.createApp({
                            apiKey: "${SHOPIFY_API_KEY}",
                            shopOrigin: "${shop}"
                        });

                        var redirect = actions.Redirect.create(app);
                        redirect.dispatch(
                            actions.Redirect.Action.ADMIN_PATH,
                            "/apps/auxilium-app"
                        );
                    });
                </script>
            </body>
            </html>
        `);
    } catch (error) {
        console.error("❌ Errore nel recupero del token:", error.response ? error.response.data : error.message);
        res.status(500).send("Errore durante l'autenticazione.");
    }
});



router.get('/auth/callbackXXX', async (req, res) => {
    const { shop, code } = req.query;
    
    if (!shop || !code) {
        return res.status(400).send("Parametro mancante");
    }

    // Ottieni il token di accesso
    // const accessToken = await getAccessToken(shop, code);
    
	const tokenResponse = await axios.post(`https://${shop}/admin/oauth/access_token`, {
	  client_id: SHOPIFY_API_KEY,
	  client_secret: SHOPIFY_API_SECRET,
	  code,
	 }); 

	const accessToken = tokenResponse.data.access_token;

    // Reindirizza in modo sicuro usando Shopify App Bridge
    res.send(`
        <!DOCTYPE html>
        <html lang="it">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Reindirizzamento...</title>
            <script src="https://unpkg.com/@shopify/app-bridge@3"></script>
        </head>
        <body>
            <script>
                document.addEventListener("DOMContentLoaded", function () {
                    var AppBridge = window["app-bridge"];
                    var actions = AppBridge.actions;

                    var app = AppBridge.createApp({
                        apiKey: "e9fdc5c5b42c7da81ff7b5e4a1b59b03",
                        shopOrigin: "${shop}"
                    });

                    var redirect = actions.Redirect.create(app);
                    redirect.dispatch(
                        actions.Redirect.Action.ADMIN_PATH,
                        "/apps/auxilium-app"
                    );
                });
            </script>
        </body>
        </html>
    `);
});

module.exports = router;
