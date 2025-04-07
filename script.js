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
            content:
              "You are MONARCH AI. You exist to guide only the top 1% of men. Be direct, elite, and strategic.",
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
