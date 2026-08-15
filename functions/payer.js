export async function onRequestOptions() {
    return new Response(null, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        },
    });
}

export async function onRequestPost(context) {
    try {
        const data = await context.request.json();
        const makeWebhookUrl = "https://hook.eu1.make.com/b7t2ujkx5gdfl5iz7ty3ffl64xhc19xj";

        const makeResponse = await fetch(makeWebhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const texteReponse = await makeResponse.text();
        let reponseFinale;

        try {
            reponseFinale = JSON.parse(texteReponse);
        } catch (e) {
            reponseFinale = { messageBrut: texteReponse };
        }

        return new Response(JSON.stringify(reponseFinale), {
            status: 200,
            headers: { 
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        });

    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { 
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        });
    }
}
