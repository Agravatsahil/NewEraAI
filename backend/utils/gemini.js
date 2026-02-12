import dotenv from "dotenv";

 const getGeminiResponse = async (message) => {
    // TODO: Implement Gemini API call
    // console.log("Gemini prompt:", prompt);
    // return "Gemini response";    

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
            contents: [
                { parts: [{ text: message }] }
            ]
        }),
    };

    try {
        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent",
            options
        );

        const data = await response.json();

        // Safely extract generated text
        const generatedText =
            data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!generatedText) {
            return {
                error: "No text generated",
                fullResponse: data
            };
        }

        return { text: generatedText };
    } catch (err) {
        console.error("AI Generation Error:", err);
        return {
            error: "AI generation failed",
            details: err.message
        };
    }
};

export { getGeminiResponse };