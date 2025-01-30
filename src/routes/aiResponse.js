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

        if (!userMessage || typeof userMessage !== "string") {
            return res.status(400).json({ error: "Messaggio utente non valido!" });
        }

        const maxTokens = parseInt(settings.ai.maxTokens, 10);
        const dataOpenAi = {
            model: "gpt-4o-mini", // Assicurati che il modello sia valido
            messages: [{ role: "system", content: "Rispondi in modo professionale." }, { role: "user", content: userMessage }],
            temperature: settings.ai.temperature || 0.7,
            max_tokens: Number.isInteger(maxTokens) ? maxTokens : 200  // Se non è un numero valido, usa 200
        };

        console.log("📡 Payload inviato a OpenAI:", JSON.stringify(dataOpenAi, null, 2));

        const response = await axios.post("https://api.openai.com/v1/chat/completions", dataOpenAi, {
            headers: { Authorization: `Bearer ${settings.ai.openAiKey}`, "Content-Type": "application/json" }
        });

        if (!response || !response.data || !response.data.choices || response.data.choices.length === 0) {
            throw new Error("Risposta vuota da OpenAI");
        }

        const aiResponse = response.data.choices[0].message.content;
        console.log("✅ Risposta AI:", aiResponse);

        // Salva la risposta nel database
        const history = settings.ai.history || [];
        history.push({ userMessage, aiResponse, timestamp: new Date().toISOString() });
        settings.ai.history = history;
        await db.saveSettings(settings);

        return res.json({ aiResponse });

    } catch (error) {
        console.error("❌ Errore nella generazione della risposta AI:", error.response ? error.response.data : error.message);
        return res.status(500).json({ error: error.response ? error.response.data : "Errore nella generazione della risposta AI" });
    }
});

module.exports = router;
