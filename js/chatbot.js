// === Core API Fetch Function ===
async function fetchAIResponse(userMessage, loadingDiv) {
    try {
        // Yahan aapke secure Cloudflare Worker ka URL hai
        const WORKER_URL = "https://linuxwallah-ai-backend.shailesh-github.workers.dev";

        const response = await fetch(WORKER_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: userMessage })
        });

        const data = await response.json();

        // Agar server se koi error aaye
        if (!response.ok) {
            throw new Error(data.error || "Backend Server Error");
        }

        const aiText = data.reply || "No response received.";

        // 3-dots एनीमेशन हटाएं और AI का जवाब दिखाएं
        if (loadingDiv) loadingDiv.remove();
        appendMessage(aiText, 'bot-msg');

    } catch (error) {
        console.error("Full Debug Error:", error);
        if (loadingDiv) loadingDiv.remove();
        appendMessage(`[AI Error] ${error.message}`, 'bot-msg');
    }
}
