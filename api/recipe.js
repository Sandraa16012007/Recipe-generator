import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { ingredients } = req.body;

        if (!ingredients || ingredients.length === 0) {
            return res.status(400).json({
                recipe: "⚠️ No ingredients provided.",
            });
        }

        const prompt = `
You are a helpful cooking assistant.

Using ONLY the following ingredients:
${ingredients.join(", ")}

Create ONE simple recipe.
Include:
- Recipe name
- Ingredients list
- Step-by-step instructions
        `;

        const completion = await groq.chat.completions.create({
            model: "llama3-8b-8192",
            messages: [
                { role: "user", content: prompt }
            ],
            temperature: 0.7,
        });

        const recipe =
            completion.choices?.[0]?.message?.content ||
            "⚠️ No recipe generated.";

        res.status(200).json({ recipe });
    } catch (error) {
        console.error("Groq error:", error);
        res.status(500).json({
            recipe: "⚠️ Server error while generating recipe.",
        });
    }
}
