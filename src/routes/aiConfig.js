const express = require('express');
const router = express.Router();
const db = require('../utils/db'); // Database JSON locale

// Endpoint per ottenere le impostazioni AI
router.get('/ai-settings', async (req, res) => {
    try {
        const settings = await db.getSettings();
        res.json(settings.ai || {}); // Sezione AI nelle impostazioni
    } catch (error) {
        console.error("Errore nel recupero delle impostazioni AI:", error);
        res.status(500).json({ error: "Errore nel recupero delle impostazioni AI" });
    }
});

// Endpoint per salvare le impostazioni AI
router.post('/ai-settings', async (req, res) => {
    try {
        const settings = await db.getSettings();
        settings.ai = req.body;
        await db.saveSettings(settings);
        res.json({ success: true });
    } catch (error) {
        console.error("Errore nel salvataggio delle impostazioni AI:", error);
        res.status(500).json({ error: "Errore nel salvataggio delle impostazioni AI" });
    }
});

module.exports = router;
