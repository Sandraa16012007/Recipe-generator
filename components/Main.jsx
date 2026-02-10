import { useState } from "react";
import ClaudeRecipe from "./ClaudeRecipe.jsx";
import IngredientsList from "./IngredientsList.jsx";

export default function Main() {

    const [ingredients, setIngredients] = useState([]);

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient").trim();
        if (!newIngredient) return;
        setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
    }

    // Recipe state and loading state for fetching recipe

    const [recipe, setRecipe] = useState("");
    const [loading, setLoading] = useState(false);

    async function getRecipe() {
        setLoading(true);

        try {
            const res = await fetch("/api/recipe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ingredients }),
            });

            if (!res.ok) {
                throw new Error(`Server error: ${res.status}`);
            }

            const data = await res.json();

            // Ensure recipe is always a string
            if (typeof data.recipe === "string") {
                setRecipe(data.recipe);
            } else {
                setRecipe("⚠️ Sorry, I couldn't generate a recipe right now.");
            }

        } catch (err) {
            console.error("Failed to get recipe", err);
            setRecipe("⚠️ Something went wrong. Please try again.");
        
        } finally {
            setLoading(false);
        }
    }



    return (
        <main>
            <form action={addIngredient} className="recipe-form">
                <input type="text" placeholder="e.g. cheese" name="ingredient" className="ingredient-input" />
                <button type="submit" className="add-button">+ Add Ingredients</button>
            </form>

            {ingredients.length > 0 && <IngredientsList ingredients={ingredients} getRecipe={getRecipe} />}

            {<ClaudeRecipe recipe={recipe} loading={loading} />}

        </main>
    )
}
