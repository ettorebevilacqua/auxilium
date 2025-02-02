const express = require('express');
const axios = require('axios');
const router = express.Router();
const db = require('../utils/db');

// Endpoint per generare la risposta AI
router.post('/generate-response', async (req, res) => {
    try {
        const { userMessage } = req.body;
        const settings = await db.getSettings();

        if (!settings.ai || !settings.ai.openAiKey) {
            return res.status(400).json({ error: "API Key OpenAI mancante!" });
        }

        const response = await axios.post("https://api.openai.com/v1/chat/completions", {
            model: "gpt-4",
            messages: [{ role: "system", content: "Rispondi in modo professionale." }, { role: "user", content: userMessage }],
            temperature: settings.ai.temperature || 0.7,
            max_tokens: settings.ai.maxTokens || 200
        }, {
            headers: { Authorization: `Bearer ${settings.ai.openAiKey}`, "Content-Type": "application/json" }
        });

        const aiResponse = response.data.choices[0].message.content;
        console.log("✅ Risposta AI:", aiResponse);

        // Salva la risposta nel database
        const history = settings.ai.history || [];
        history.push({ userMessage, aiResponse, timestamp: new Date().toISOString() });
        settings.ai.history = history;
        await db.saveSettings(settings);

        res.json({ aiResponse });
    } catch (error) {
        console.error("❌ Errore nella generazione della risposta AI:", error);
        res.status(500).json({ error: "Errore nella generazione della risposta AI" });
    }
});

module.exports = router;
