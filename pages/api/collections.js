export default async function handler(req, res) {
    try {
      // Recupera il dominio Shopify e il token di accesso dalle variabili d'ambiente
      let shopDomain = process.env.SHOPIFY_SHOP_DOMAIN;
      const accessToken = process.env.SHOPIFY_ACCESS_TOKEN;
  
      // Rimuove eventuali "https://" e "/" finali (se presenti)
      shopDomain = shopDomain?.replace(/^https?:\/\//, "").replace(/\/$/, "");
  
      // Controlla se le variabili sono state impostate correttamente
      if (!shopDomain || !accessToken) {
        console.error("❌ ERRORE: Variabili d’ambiente mancanti.");
        return res.status(500).json({ error: "Variabili d’ambiente mancanti" });
      }
  
      console.log("🔗 Connessione a Shopify:", `https://${shopDomain}`);
  
      // Endpoint per ottenere le collezioni generiche più probabili da Shopify
      const apiUrl = `https://${shopDomain}/admin/api/2025-04/collection_listings.json`;
  
      console.log("🔍 Richiesta API a:", apiUrl);
  
      // Effettua la richiesta all'API Shopify
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "X-Shopify-Access-Token": accessToken,
          "Content-Type": "application/json",
        }
      });
  
      // Se la risposta non è valida, stampa un errore
      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ ERRORE API Shopify:", errorText);
        return res.status(response.status).json({ error: "Errore nel recuperare le collezioni", details: errorText });
      }
  
      // Converte la risposta in JSON
      const data = await response.json();
  
      console.log("✅ Collezioni ricevute:", data.collection_listings?.length || 0);
  
      // Risponde con i dati delle collezioni
      res.status(200).json(data);
  
    } catch (error) {
      console.error("❌ ERRORE GENERALE:", error);
      res.status(500).json({ error: "Errore interno del server" });
    }
  }
  