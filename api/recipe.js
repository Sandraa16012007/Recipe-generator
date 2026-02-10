import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { ingredients } = req.body;

        if (!ingredients || ingredients.length === 0) {
            return res.status(400).json({ error: "No ingredients provided" });
        }

        const prompt = `
            You are a helpful cooking assistant.

            Using the following ingredients:
            ${ingredients.join(", ")}

            Generate ONE clear, easy recipe.
            Include:
            - Recipe name
            - Ingredients list
            - Step-by-step instructions
            `;

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                }),
            }
        );

        const data = await response.json();
        console.log("Gemini raw response:", JSON.stringify(data, null, 2));


        let recipe = "⚠️ No recipe generated.";

        if (data?.candidates?.length) {
            const parts = data.candidates[0]?.content?.parts;
            if (Array.isArray(parts)) {
                recipe = parts.map(p => p.text).join("\n");
            }
        }

        res.status(200).json({ recipe });
    } catch (error) {
        console.error("Gemini error:", error);
        res.status(500).json({
            recipe: "⚠️ Something went wrong. Please try again.",
        });
    }
}
