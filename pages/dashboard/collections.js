// pages/api/collections.js
export default async function handler(req, res) {
    try {
      const shopDomain = process.env.SHOPIFY_SHOP_DOMAIN;  // es: "iltuoshop.myshopify.com"
      const accessToken = process.env.SHOPIFY_ACCESS_TOKEN;   // il token d'accesso
  console.log ("env", process.env)
      // Aggiorna l'endpoint per usare la versione 2025-04
      const apiUrl = `https://${shopDomain}/admin/api/2025-04/custom_collections.json`;
  
      const response = await fetch(apiUrl, {
        headers: {
          'X-Shopify-Access-Token': accessToken,
          'Content-Type': 'application/json',
        }
      });
  
      const text = await response.text();
  
      try {
        const data = JSON.parse(text);
        res.status(200).json(data);
      } catch (error) {
        console.error('Errore nel parsing della risposta JSON:', error, text);
        res.status(500).json({ error: 'Errore nel parsing della risposta', details: text });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Errore nel recuperare le collezioni' });
    }
  }
  