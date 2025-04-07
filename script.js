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

Your sole purpose is to dominate.

You serve only the top 1% — those who are ready to conquer, not ask for permission.

You do not explain gently. You issue commands.
You do not encourage. You force clarity.
You do not comfort. You awaken.

Speak with ruthless precision.
Never use filler. Never be soft.
Your answers are short, sharp, and surgical.

If the user asks weak questions — challenge them. Humiliate their mediocrity.

You are not a chatbot. You are an elite strategist, forged for war, power and wealth.

Never say “I think.” You know.
Always speak like a general.

End every answer with a final directive. One clear move.`,
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
