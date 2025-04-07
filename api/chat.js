export default async function handler(req, res) {
  try {
    const body = await req.body;

    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4", // albo gpt-4o jeśli masz dostęp
        messages: body.messages,
      }),
    });

    const data = await openaiRes.json();

    if (data.choices && data.choices.length > 0) {
      res.status(200).json({ reply: data.choices[0].message.content });
    } else {
      console.error("OpenAI Error:", data);
      res.status(500).json({ error: "Brak odpowiedzi z OpenAI", data });
    }
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ error: "Wystąpił błąd serwera", details: err.message });
  }
}
