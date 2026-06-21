// Chatbot Elements
const chatButton = document.getElementById('chat-toggle'); // Floating button
const chatWindow = document.getElementById('chatbot-container'); // Poori window
const closeChat = document.getElementById('close-chat'); // Close button
const chatInput = document.querySelector('.chatbot-input input'); // Input field
const sendBtn = document.querySelector('.chatbot-input button'); // Send icon
const chatBody = document.querySelector('.chatbot-body'); // Body jahan message dikhenge

// 1. Open/Close Logic
if (chatButton) {
    chatButton.addEventListener('click', () => {
        chatWindow.style.display = (chatWindow.style.display === 'none' || chatWindow.style.display === '') ? 'flex' : 'none';
    });
}

if (closeChat) {
    closeChat.addEventListener('click', () => {
        chatWindow.style.display = 'none';
    });
}

// 2. Append Message Logic
function appendMessage(text, className) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add(className); // 'user-msg' ya 'bot-msg'
    msgDiv.textContent = text;
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
    return msgDiv;
}

// 3. API Logic (Cloudflare Worker)
async function fetchAIResponse(userMessage, loadingDiv) {
    try {
        const WORKER_URL = "https://linuxwallah-ai-backend.shailesh-github.workers.dev";
        const response = await fetch(WORKER_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMessage })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Error");
        
        if (loadingDiv) loadingDiv.remove();
        appendMessage(data.reply, 'bot-msg');
    } catch (error) {
        if (loadingDiv) loadingDiv.remove();
        appendMessage("Error: Could not reach AI.", 'bot-msg');
    }
}

// 4. Send Handler
function handleSendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;
    appendMessage(text, 'user-msg');
    chatInput.value = '';
    const loadingDiv = appendMessage("Typing...", "bot-msg");
    fetchAIResponse(text, loadingDiv);
}

sendBtn.addEventListener('click', handleSendMessage);
chatInput.addEventListener('keypress', (e) => { if(e.key === 'Enter') handleSendMessage(); });
