export async function onRequestPost(context) {
    try {
        const data = await context.request.json();

        // URL de ton webhook Make.com (le serveur à serveur n'a pas de problème CORS)
        const makeWebhookUrl = "https://hook.eu1.make.com/b7t2ujkx5gdf15iz7ty3ff164xhc19xj";

        const makeResponse = await fetch(makeWebhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (!makeResponse.ok) {
            throw new Error("Erreur de communication avec l'automatisation.");
        }

        const result = await makeResponse.json();

        return new Response(JSON.stringify(result), {
            headers: { "Content-Type": "application/json" }
        });

    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
