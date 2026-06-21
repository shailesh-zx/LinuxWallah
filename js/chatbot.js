document.addEventListener("DOMContentLoaded", () => {

    // === UI Elements Selection ===
    const chatToggleBtn = document.getElementById('chat-toggle');
    const chatWindowBox = document.getElementById('chatbot-container');
    const chatCloseBtn = document.getElementById('close-chat');

    const chatBody = document.querySelector('.chatbot-body');
    const chatInput = document.querySelector('.chatbot-input input');
    const chatSendBtn = document.querySelector('.chatbot-input button');

    // === OpenRouter API Configuration ===
    const OPENROUTER_API_KEY = "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"; 
    const API_URL = "https://openrouter.ai/api/v1/chat/completions";
    const AI_MODEL = "openai/gpt-oss-120b:free"; // आपका नया फ्री मॉडल

    // === Toggle Chat Window ===
    if (chatToggleBtn && chatWindowBox) {
        chatToggleBtn.addEventListener('click', () => {
            chatWindowBox.style.display = chatWindowBox.style.display === 'flex' ? 'none' : 'flex';
            if (chatWindowBox.style.display === 'flex' && chatInput) {
                chatInput.focus();
            }
        });
    }

    if (chatCloseBtn && chatWindowBox) {
        chatCloseBtn.addEventListener('click', () => {
            chatWindowBox.style.display = 'none';
        });
    }

    // === Helper Function: Append Messages ===
    function appendMessage(text, className) {
        if (!chatBody) return null;

        const messageDiv = document.createElement('div');
        messageDiv.className = className;
        messageDiv.innerText = text;

        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight; // Auto-scroll to bottom

        return messageDiv;
    }

    // === Helper Function: Append 3-Dots Typing Indicator ===
    function appendTypingIndicator() {
        if (!chatBody) return null;

        const messageDiv = document.createElement('div');
        messageDiv.className = 'bot-msg';
        messageDiv.innerHTML = `
            <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;

        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;

        return messageDiv;
    }

    // === Core API Fetch Function ===
    async function fetchAIResponse(userMessage, loadingDiv) {
        try {
            // Live server या localhost के लिए origin सेट करना
            const currentOrigin =
                window.location.origin === "null"
                    ? "http://localhost:5500"
                    : window.location.origin;

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                    "HTTP-Referer": currentOrigin,
                    "X-Title": "LinuxWallahWebsite"
                },
                body: JSON.stringify({
                    model: AI_MODEL,
                    messages: [
                        {
                            role: "user",
                            content: userMessage + " (Answer briefly in short sentences as a helpful assistant for LinuxWallahwebsite)"
                        }
                    ]
                })
            });

            // अगर सर्वर से एरर आता है तो उसका असली कारण निकालें
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                const serverError = errorData.error?.message || `HTTP status ${response.status}`;
                throw new Error(serverError);
            }

            const data = await response.json();
            const aiText = data.choices?.[0]?.message?.content || "No response received.";

            // 3-dots एनीमेशन हटाएं और AI का जवाब दिखाएं
            if (loadingDiv) loadingDiv.remove();
            appendMessage(aiText, 'bot-msg');

        } catch (error) {
            console.error("Full Debug Error:", error);
            if (loadingDiv) loadingDiv.remove();

            // असली एरर अब सीधे चैट स्क्रीन पर दिखाई देगा ताकि आप देख सकें क्या गड़बड़ है
            appendMessage(`[AI Error] ${error.message}`, 'bot-msg');
        }
    }

    // === Handle Send Actions ===
    function handleSendMessage() {
        if (!chatInput) return;

        const message = chatInput.value.trim();
        if (!message) return;

        // 1. User का मैसेज स्क्रीन पर दिखाएं
        appendMessage(message, 'user-msg');
        chatInput.value = ""; // इनपुट बॉक्स खाली करें

        // 2. 3-Dots टाइपिंग एनीमेशन लोड करें
        const loadingDiv = appendTypingIndicator();

        // 3. API से डेटा लाएं
        fetchAIResponse(message, loadingDiv);
    }

    // Click Event Listener
    if (chatSendBtn) {
        chatSendBtn.addEventListener('click', handleSendMessage);
    }

    // Enter Key Event Listener
    if (chatInput) {
        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                handleSendMessage();
            }
        });
    }

});
