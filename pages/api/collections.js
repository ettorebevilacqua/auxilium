export default async function handler(req, res) {
    try {
      const shopDomain = process.env.SHOPIFY_SHOP_DOMAIN; // es: "iltuoshop.myshopify.com"
      const accessToken = process.env.SHOPIFY_ACCESS_TOKEN; // Token API Shopify
  
      // Controlla se le variabili d'ambiente sono impostate
      if (!shopDomain || !accessToken) {
        console.error("❌ ERRORE: Variabili d’ambiente mancanti.", { shopDomain, accessToken });
        return res.status(500).json({ error: "Variabili d’ambiente mancanti" });
      }
  
      // URL API REST Shopify (2025-04)
      const apiUrl = `https://${shopDomain}/admin/api/2025-04/custom_collections.json`;
  
      // Chiamata API per ottenere le collezioni
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "X-Shopify-Access-Token": accessToken,
          "Content-Type": "application/json",
        }
      });
  
      // Se la chiamata non è andata a buon fine, restituisce errore
      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ ERRORE API Shopify:", errorText);
        return res.status(response.status).json({ error: "Errore nel recuperare le collezioni", details: errorText });
      }
  
      // Converte la risposta in JSON
      const data = await response.json();
  
      // Risponde con i dati delle collezioni
      res.status(200).json(data);
  
    } catch (error) {
      console.error("❌ ERRORE GENERALE:", error);
      res.status(500).json({ error: "Errore interno del server" });
    }
  }
  