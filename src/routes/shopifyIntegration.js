const express = require('express');
const router = express.Router();
// Webhook per notifiche sugli ordini
router.post('/shopify/webhooks/order-created', async (req, res) => {
    console.log("📦 Nuovo ordine ricevuto:", req.body);
    // Possibile utilizzo: attivare un suggerimento AI post-vendita
    res.status(200).send("Webhook ricevuto!");
});
module.exports = router;
