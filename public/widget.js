document.addEventListener("DOMContentLoaded", function () {
    const chatBox = document.createElement("div");
    chatBox.innerHTML = `
        <div id="ai-widget" style="position: fixed; bottom: 20px; right: 20px; width: 300px; background: white; padding: 10px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            <h4>🛒 Chat AI Shopify</h4>
            <input type="text" id="aiUserMessage" placeholder="Fai una domanda..." style="width: 100%; padding: 5px;">
            <button id="aiSendButton" style="margin-top: 5px; width: 100%;">Invia</button>
            <p id="aiResponseText" style="margin-top: 10px; font-size: 14px;"></p>
        </div>
    `;
    document.body.appendChild(chatBox);

    document.getElementById("aiSendButton").addEventListener("click", async function () {
        const userMessage = document.getElementById("aiUserMessage").value;
        document.getElementById("aiResponseText").innerText = "⏳ Attendere...";
        
        const response = await fetch("/shopify/ai-response", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ shop: Shopify.shop, userMessage })
        });

        const data = await response.json();
        document.getElementById("aiResponseText").innerText = data.aiResponse || "Errore nella risposta.";
    });
});
