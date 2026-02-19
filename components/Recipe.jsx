export default function Recipe({ recipe, loading }) {
    if (loading) {
        return (
            <div className="loading-recipe">
                <p>Cooking something up… 🍳</p>
                <div className="loading-spinner"></div>
            </div>
        );
    }

    if (!recipe) {
        return null;
    }

    if (typeof recipe !== "string") {
        return <p style={{ margin: "30px 0 0 0" }}>⚠️ Unexpected response format.</p>;
    }

    console.log(recipe);
    const lines = recipe.split("\n").filter(line => line.trim() !== "");
    let title = "";
    let ingredients = [];
    let instructions = [];
    let currentSection = null;

    function formatRecipeText(text) {
        lines.forEach(line => {
            if (line.toLowerCase().startsWith("**recipe name")) {
                title = line.replace(/\*\*/g, "").trim();
            } else if (line.toLowerCase().startsWith("**ingredients")) {
                currentSection = "ingredients";
            } else if (line.toLowerCase().startsWith("**step-by-step instructions")) {
                currentSection = "instructions";
            } else if (currentSection === "ingredients" && line.startsWith("-")) {
                ingredients.push(line.replace("-", "").trim());
            } else if (currentSection === "instructions") {
                instructions.push(line.replace(/^\d+\.\s*/g, "").replace(/\*\*}/g, "").trim());
            }
        });

        console.log(title, ingredients, instructions);
    }

    formatRecipeText(recipe);

    return (
        <section className="recipe">
            <h3>Here's a recipe you can make with your ingredients:</h3>
            <div className="recipe-card">
                <h1>{title}</h1>
                <h2 className="ingredients-title" style={{textAlign: "left"}}>Ingredients:</h2>
                <ul>
                    {ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
                <h2>Step-by-Step Instructions:</h2>
                <ol>
                    {instructions.map((instruction, index) => (
                        <li key={index}>{instruction}</li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
