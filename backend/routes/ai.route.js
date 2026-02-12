import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// POST /api/ai/generate
router.post("/generate", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [
            { parts: [{ text: prompt }] }
          ]
        }),
      }
    );

    const data = await response.json();

    // Safely extract generated text
    const generatedText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      return res
        .status(500)
        .json({ error: "No text generated", fullResponse: data });
    }

    res.json({ text: generatedText });
  } catch (err) {
    console.error("AI Generation Error:", err);
    res.status(500).json({ error: "AI generation failed", details: err.message });
  }
});

export default router;
