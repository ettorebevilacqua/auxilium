const express = require('express');
const axios = require('axios');
const router = express.Router();
const db = require('../utils/db');

// Endpoint per generare la risposta AI
router.post('/generate-response', async (req, res) => {

        const { userMessage } = req.body;
        const settings = await db.getSettings();

        if (!settings.ai || !settings.ai.openAiKey) {
            return res.status(400).json({ error: "API Key OpenAI mancante!" });
        }

      const dataOpenAi = {
            model: "gpt-4o-mini",
            messages: [{ role: "system", content: "Rispondi in modo professionale." }, { role: "user", content: userMessage }],
            temperature: settings.ai.temperature || 0.7,
            max_tokens: settings.ai.maxTokens || 200
        }

       console.log('test invio a https://api.openai.com/v1/chat/completions', dataOpenAi);
       console.log('openai settings.ai.openAiKey', settings.ai.openAiKey);
        try {
                const response = await axios.post("https://api.openai.com/v1/chat/completions", dataOpenAi, {
                    header    console.log ('Risposta AI' , response.data)s: { Authorization: `Bearer ${settings.ai.openAiKey}`, "Content-Type": "application/json" }
                });
        } catch (error) {
                console.error("❌ Errore nella generazione della risposta AI:", error);
                res.status(500).json({ error: "Errore nella generazione della risposta AI" });
        }
        const aiData = response.data; // .choices[0].message.content;
        if (!aiData || !aiData.choices[0] || !aiData.choices[0].message){
                return  res.status(500).json({ error: "Errore nei dati della risposta AI" });
        }
        
        const aiResponse = response.data.choices[0].message.content || '';
        console.log("✅ Risposta AI:", aiResponse);

        // Salva la risposta nel database
        const history = settings.ai.history || [];
        history.push({ userMessage, aiResponse, timestamp: new Date().toISOString() });
        settings.ai.history = history;
        await db.saveSettings(settings);

        res.json({ aiResponse });ì
});

module.exports = router;
