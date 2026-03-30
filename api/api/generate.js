export default async function handler(req, res) {
  const { prompt, ratio } = req.body;

  const apiKey = process.env.GEMINI_API_KEY;

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=" + apiKey,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        instances: [{ prompt }],
        parameters: {
          sampleCount: 1,
          aspectRatio: ratio
        }
      })
    }
  );

  const data = await response.json();

  const image = data.predictions?.[0]?.bytesBase64Encoded;

  res.status(200).json({
    image: `data:image/png;base64,${image}`
  });
}
