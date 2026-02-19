export default function Recipe({ recipe, loading }) {
    if (loading) {
        return (
            <div className="loading-recipe">
                <p>Cooking something up… 🍳</p>
                <div className="loading-spinner"></div>
            </div>
        );
    }

    if (!recipe || typeof recipe !== "string") return null;

    const lines = recipe.split("\n").map(l => l.trim()).filter(Boolean);

    let title = "";
    let ingredients = [];
    let instructions = [];
    let tips = [];
    let currentSection = null;

    lines.forEach(line => {
        const cleanLine = line
            .replace(/\*\*/g, "")           // remove **
            .replace(/^\d+\.\s*/g, "")     // remove numbering
            .trim();

        if (cleanLine.toLowerCase().startsWith("recipe name")) {
            title = cleanLine.replace("Recipe Name:", "").trim();
        }
        else if (cleanLine.toLowerCase().startsWith("ingredients")) {
            currentSection = "ingredients";
        }
        else if (cleanLine.toLowerCase().startsWith("step-by-step")) {
            currentSection = "instructions";
        }
        else if (cleanLine.toLowerCase().startsWith("tips")) {
            currentSection = "tips";
        }
        else if (currentSection === "ingredients" && line.startsWith("-")) {
            ingredients.push(cleanLine.replace("-", "").trim());
        }
        else if (currentSection === "instructions") {
            instructions.push(cleanLine);
        }
        else if (currentSection === "tips") {
            tips.push(cleanLine.replace("-", "").trim());
        }
    });

    return (
        <section className="recipe">
            <h3>Here’s a recipe you can make with your ingredients</h3>

            <div className="recipe-card">
                <h1 className="recipe-title">{title}</h1>

                <div className="recipe-section">
                    <h2>Ingredients</h2>
                    <ul>
                        {ingredients.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                </div>

                <div className="recipe-section">
                    <h2>Instructions</h2>
                    <ol>
                        {instructions.map((step, i) => (
                            <li key={i}>{step}</li>
                        ))}
                    </ol>
                </div>

                {tips.length > 0 && (
                    <div className="recipe-tips">
                        <h2>Tips</h2>
                        <ul>
                            {tips.map((tip, i) => (
                                <li key={i}>{tip}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </section>
    );
}
