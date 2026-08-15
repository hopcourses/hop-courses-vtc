export async function onRequestPost(context) {
    try {
        const data = await context.request.json();
        const makeWebhookUrl = "https://hook.eu1.make.com/b7t2ujkx5gdf15iz7ty3ff164xhc19xj";

        const makeResponse = await fetch(makeWebhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        // On lit la réponse de Make
        const texteReponse = await makeResponse.text();
        let reponseFinale;

        try {
            // Si Make envoie bien le lien Stripe au format JSON
            reponseFinale = JSON.parse(texteReponse);
        } catch (e) {
            // Si Make n'est pas encore configuré et répond "Accepted" en texte brut
            reponseFinale = { messageBrut: texteReponse };
        }

        return new Response(JSON.stringify(reponseFinale), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
