import {useState} from "react";

export default function Main() {

    const [ingredients, setIngredients] = useState([]);
    const ingredientsListItems = ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient.charAt(0).toUpperCase() + ingredient.substring(1).toLowerCase()}</li>
    ));

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient").trim();
        setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
    }


    return (
        <main>
            <form action={addIngredient} className="recipe-form">
                <input type="text" placeholder="e.g. cheese" name="ingredient" className="ingredient-input" />
                <button type="submit" className="add-button">+ Add Ingredients</button>
            </form>

            {ingredients.length > 0 && <section>
                <h2>Ingredients on hand:</h2>

                <ul className="ingredients-list">
                    {ingredientsListItems}
                </ul>

                <div className="generate-recipe-container">
                    <h3>Ready for a recipe?</h3>
                    <p>Click the button below to generate a recipe using your ingredients.</p>
                    <button className="generate-recipe-button">Generate Recipe</button>
                </div>
            </section>}

        </main>
    )
}
