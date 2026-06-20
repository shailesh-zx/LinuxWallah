document.addEventListener("DOMContentLoaded", () => {

    const phrases = ["Welcome to LinuxWallah", "Learn With LinuxWallah"];
    let phraseIdx = 0;
    let charIdx = 0;
    let deleting = false;
    const typingDisplay = document.getElementById("typing-text");

    function playTyping() {
        if (!typingDisplay) return;

        const fullText = phrases[phraseIdx];

        if (deleting) {
            charIdx--;
        } else {
            charIdx++;
        }

        let currentStr = fullText.substring(0, charIdx);
        const cyberStartIndex = fullText.indexOf("LinuxWallah");

        if (cyberStartIndex !== -1 && charIdx > cyberStartIndex) {
            let normalPart = fullText.substring(0, cyberStartIndex);
            let coloredPartSoFar = fullText.substring(cyberStartIndex, charIdx);

            typingDisplay.innerHTML =
                normalPart +
                `<span style="color: #2196F3 !important;">${coloredPartSoFar}</span>`;
        } else {
            typingDisplay.innerHTML = currentStr;
        }

        let speed = deleting ? 40 : 80;

        if (!deleting && charIdx > fullText.length) {
            speed = 2200;
            deleting = true;
        } else if (deleting && charIdx < 0) {
            deleting = false;
            charIdx = 0;
            phraseIdx = (phraseIdx + 1) % phrases.length;
            speed = 400;
        }

        setTimeout(playTyping, speed);
    }

    setTimeout(playTyping, 400);

});
