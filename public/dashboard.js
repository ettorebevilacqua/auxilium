document.addEventListener("DOMContentLoaded", async function() {
    const shop = new URLSearchParams(window.location.search).get("shop");
    if (!shop) {
        alert("❌ Errore: Parametro 'shop' mancante.");
        return;
    }

    try {
        const response = await fetch(`/shop-info?shop=${shop}`);
        const data = await response.json();

        document.getElementById("shop-name").innerText = data.shop.name;
        document.getElementById("shop-domain").innerText = data.shop.domain;
        document.getElementById("shop-plan").innerText = data.shop.plan_name;
    } catch (error) {
        console.error("Errore nel recupero dei dati:", error);
        alert("❌ Errore nel caricamento delle informazioni.");
    }
});
