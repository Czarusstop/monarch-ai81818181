const chat = document.getElementById("chat");
const input = document.getElementById("userInput");

async function sendMessage() {
  const userMessage = input.value.trim();
  if (!userMessage) return;

  appendMessage("Ty", userMessage);
  input.value = "";

  appendMessage("MONARCH AI", "Myślę...");

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer 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",
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are MONARCH AI. You exist to guide only the top 1% of men. Be direct, elite, and strategic. Never use soft or friendly language.",
        },
        { role: "user", content: userMessage },
      ],
    }),
  });

  const data = await response.json();
  chat.lastChild.remove();
  appendMessage("MONARCH AI", data.choices[0].message.content);
}

function appendMessage(sender, text) {
  const div = document.createElement("div");
  div.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}
