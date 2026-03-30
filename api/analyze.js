export default async function handler(req, res) {
  const { personImgs, placeImg, plot, ratio } = req.body;

  const apiKey = process.env.GEMINI_API_KEY;

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=" + apiKey,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: `プロット: ${plot} / 比率: ${ratio}` }
          ]
        }]
      })
    }
  );

  const data = await response.json();

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

  res.status(200).json({ prompt: text });
}
