import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY});

async function testGemini() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        { type: "text", text: "hello" },
      ],
    });

    // Safe extraction
    const generatedText =
      response?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (generatedText) {
      console.log("Generated Text:\n", generatedText);
    } else {
      console.log("No generated text found. Full response:\n", JSON.stringify(response, null, 2));
    }
  } catch (err) {
    console.error("Error generating content:", err);
  }
}

testGemini();
