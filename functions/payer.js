export async function onRequestPost(context) {
    try {
        // 1. Récupérer les données du client
        const data = await context.request.json();
        
        // 2. URL de ton webhook Make
        const makeWebhookUrl = "https://hook.eu1.make.com/b7t2ujkx5gdf15iz7ty3ff164xhc19xj";

        // 3. Envoyer les données à Make
        const makeResponse = await fetch(makeWebhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        // 4. Lire la réponse en texte brut (pour ne pas crasher si Make répond "Accepted")
        const texteReponse = await makeResponse.text();

        // 5. On renvoie le résultat au navigateur
        return new Response(JSON.stringify({
            succes: makeResponse.ok,
            status: makeResponse.status,
            reponseMake: texteReponse
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (err) {
        // Si le script plante, on renvoie l'erreur exacte
        return new Response(JSON.stringify({ 
            erreurFatale: true, 
            message: err.message 
        }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
