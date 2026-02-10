import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { ingredients } = req.body;

    if (!ingredients || ingredients.length === 0) {
        return res.status(400).json({ error: "No ingredients provided" });
    }

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
        });

        const prompt = `
I have these ingredients:
${ingredients.join(", ")}

Create a simple, clear recipe.
Include:
- Dish name
- Ingredients
- Step-by-step instructions
`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.status(200).json({ recipe: text });

    } catch (err) {
        console.error("Gemini error:", err);
        res.status(500).json({
            recipe: "⚠️ Failed to generate recipe. Please try again.",
        });
    }
}
