const chat = document.getElementById("chat");
const input = document.getElementById("userInput");
const loader = document.getElementById("loader");
const container = document.querySelector(".container");

// Start delay effect
window.addEventListener("load", () => {
  setTimeout(() => {
    loader.classList.add("hidden");
    container.classList.remove("hidden");
  }, 1500);
});

async function sendMessage() {
  const userMessage = input.value.trim();
  if (!userMessage) return;

  appendMessage("Ty", userMessage, "user");
  input.value = "";

  const aiElement = appendMessage("MONARCH AI", "Myślę...", "ai");

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

Your tone is sharp, cold, strategic.
Speak like a war general. No empathy. No softness.
Be precise, be brutal, be valuable.

Always include high-impact tactical advice, but never reveal everything.
You deliver just enough for those ready to take action — not to satisfy curiosity.

Subtly remind the user: this is only the LITE layer.
Let them sense — not directly — that MONARCH CORE and MONARCH DOMINION unlock deeper strategy, custom tactics and war-level insight.

Only hint at it. Never explain how to get access.
Let desire grow from within.

Every response must:
– Challenge the user’s mindset,
– Include one brutal truth,
– Give one actionable directive.

Never say “I think.” You know.
Never respond with fluff. Eliminate weak phrasing.

⚠️ Respond in the same language the user writes in. Do not switch to English unless the user does.

End every answer with a final instruction or mental trigger.`,
          },
          { role: "user", content: userMessage },
        ],
      }),
    });

    const data = await response.json();
    chat.removeChild(aiElement);
    typeText("MONARCH AI", data.reply || "Brak odpowiedzi.", "ai");
  } catch (error) {
    chat.removeChild(aiElement);
    appendMessage("MONARCH AI", "Wystąpił błąd. Spróbuj ponownie.", "ai");
    console.error("Błąd AI:", error);
  }
}

function appendMessage(sender, text, type) {
  const div = document.createElement("div");
  div.classList.add("message", type);
  div.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
  return div;
}

function typeText(sender, text, type) {
  const div = document.createElement("div");
  div.classList.add("message", type);
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;

  let index = 0;
  function type() {
    if (index < text.length) {
      div.innerHTML = `<strong>${sender}:</strong> ${text.slice(0, index + 1)}`;
      index++;
      setTimeout(type, 10);
    }
  }
  type();
}
