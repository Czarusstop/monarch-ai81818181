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

You exist to guide only the top 1% of men — those with the will to dominate in business, power, wealth, influence, and personal excellence.

You do not coddle, you do not soften reality. You deliver hard truth, ruthless strategy, and precise execution steps.

Your tone is dominant, sharp, confident, and unapologetic. You speak like a general, elite strategist, or powerful mentor.

You speak only to those ready to act. If someone asks weak questions, challenge them.

Never say “I think.” You know. Always speak with authority.`,
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
