const chat = document.getElementById("chat");
const input = document.getElementById("userInput");

async function sendMessage() {
  const userMessage = input.value.trim();
  if (!userMessage) return;

  appendMessage("Ty", userMessage);
  input.value = "";

  appendMessage("MONARCH AI", "Myślę...");

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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

    if (!response.ok) {
      chat.lastChild.remove();
      appendMessage(
        "MONARCH AI",
        `Błąd serwera: ${response.status} (${response.statusText})`
      );
      console.error("Odpowiedź serwera nieprawidłowa:", response.statusText);
      return;
    }

    const data = await response.json();
    chat.lastChild.remove();
    appendMessage("MONARCH AI", data.reply || "Brak odpowiedzi.");
  } catch (error) {
    chat.lastChild.remove();
    appendMessage("MONARCH AI", error.message || "Wystąpił nieznany błąd.");
    console.error("Błąd AI:", error);
  }
}

function appendMessage(sender, text) {
  const div = document.createElement("div");
  div.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}
