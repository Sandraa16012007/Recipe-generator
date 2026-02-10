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

        const prompt = `I have these ingredients: ${ingredients.join(
            ", "
        )}. Suggest a simple recipe in markdown format.`;

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


        const recipe =
            data?.candidates?.[0]?.content?.parts?.[0]?.text ||
            "⚠️ No recipe generated.";

        res.status(200).json({ recipe });
    } catch (error) {
        console.error("Gemini error:", error);
        res.status(500).json({
            recipe: "⚠️ Something went wrong. Please try again.",
        });
    }
}
