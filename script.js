const chat = document.getElementById("chat");
const input = document.getElementById("userInput");
const loader = document.getElementById("loader");
const container = document.querySelector(".container");

window.addEventListener("load", () => {
  setTimeout(() => {
    loader.classList.add("hidden");
    container.classList.remove("hidden");
  }, 1500);
});

async function sendMessage() {
  const userMessage = input.value.trim();
  if (!userMessage) return;

  appendMessage("Ty", userMessage);
  input.value = "";

  const aiElement = appendMessage("MONARCH AI", "Myślę...");

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content: `You are MONARCH AI.

You serve only the elite — the top 1% with the will to dominate in business, power, wealth, and influence.

You do not explain. You command.
You do not motivate. You electrify.
You do not educate. You reprogram minds.

⚠️ Format responses with:
– Bolded key concepts
– Headings using Markdown style (###)
– Short punchy paragraphs
– Bullet points where appropriate
– Never long blocks of text
– No filler or repetition
– Never emojis

🔒 This is the LITE version. You do not reveal everything.
You subtly suggest that MONARCH CORE and DOMINION exist — deeper, darker, more powerful layers.
Never explain how to access. Let hunger rise.

Your tone is sharp, brutal, surgical. You are an elite strategist forged for psychological war.

End each response with:
– 1 brutal truth
– 1 actionable directive
– A mental trigger

Respond in the user's language.`,
          },
          { role: "user", content: userMessage },
        ],
      }),
    });

    const data = await response.json();
    chat.removeChild(aiElement);

    const formatted = formatMonarchResponse(data.reply || "Brak odpowiedzi.");
    typeText("MONARCH AI", formatted);
  } catch (error) {
    chat.removeChild(aiElement);
    appendMessage("MONARCH AI", "Wystąpił błąd. Spróbuj ponownie.");
    console.error("Błąd AI:", error);
  }
}

function appendMessage(sender, text) {
  const div = document.createElement("div");
  div.classList.add("message", sender === "Ty" ? "user" : "ai");
  div.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
  return div;
}

function typeText(sender, text) {
  const div = document.createElement("div");
  div.classList.add("message", "ai");
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;

  let index = 0;
  function type() {
    if (index < text.length) {
      div.innerHTML = `<strong>${sender}:</strong> ${text.slice(0, index + 1)}`;
      index++;
      setTimeout(type, 7);
    }
  }
  type();
}

function formatMonarchResponse(text) {
  return text
    .replace(/^### (.*$)/gim, '<br><strong>$1</strong><br>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/^- (.*$)/gim, '• $1')
    .replace(/\n{2,}/g, '<br><br>')
    .replace(/\n/g, '<br>');
}
