// File: src/routes/settings.js
const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const SETTINGS_FILE = path.join(__dirname, "../../config/settings.json");

// Carica le impostazioni
router.get("/settings", (req, res) => {
    try {
        if (fs.existsSync(SETTINGS_FILE)) {
            const settings = JSON.parse(fs.readFileSync(SETTINGS_FILE, "utf8"));
            return res.json(settings);
        } else {
            return res.json({ message: "Nessuna impostazione trovata" });
        }
    } catch (error) {
        res.status(500).json({ error: "Errore nel caricamento delle impostazioni" });
    }
});

// Salva le impostazioni
router.post("/settings", (req, res) => {
    try {
        const { welcomeMessage, aiLogo, sector } = req.body;
        const newSettings = { welcomeMessage, aiLogo, sector };
        fs.writeFileSync(SETTINGS_FILE, JSON.stringify(newSettings, null, 2));
        res.json({ success: true, message: "Impostazioni salvate con successo" });
    } catch (error) {
        res.status(500).json({ error: "Errore nel salvataggio delle impostazioni" });
    }
});

module.exports = router;
