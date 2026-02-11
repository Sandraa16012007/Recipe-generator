import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
    console.log("API KEY EXISTS:", !!process.env.GEMINI_API_KEY);

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { ingredients } = req.body;

        if (!ingredients || ingredients.length === 0) {
            return res.status(400).json({ error: "No ingredients provided" });
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        const model = genAI.getGenerativeModel({
            model: "models/gemini-1.5-flash",
        });

        const prompt = `
You are a helpful cooking assistant.

Using ONLY these ingredients:
${ingredients.join(", ")}

Generate ONE simple recipe.

Format:
Recipe Name:
Ingredients:
Steps:
`;

        console.log("Sending prompt to Gemini...");
        const result = await model.generateContent(prompt);
        console.log("Gemini responded");
        const response = result.response;
        const text = response.text();

        console.log("Gemini output:", text);

        res.status(200).json({
            recipe: text && text.trim().length > 0
                ? text
                : "⚠️ No recipe generated.",
        });
    } catch (error) {
        console.error("Gemini error:", error);
        res.status(500).json({
            recipe: "⚠️ Something went wrong. Please try again.",
        });
    }
}
