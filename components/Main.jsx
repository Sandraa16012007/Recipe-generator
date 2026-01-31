import { useState } from "react";

export default function Main() {

    const [ingredients, setIngredients] = useState([]);
    const ingredientsListItems = ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient.charAt(0).toUpperCase() + ingredient.substring(1).toLowerCase()}</li>
    ));

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient").trim();
        setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
    }

    const [recipeShown, setRecipeShown] = useState(false);

    function toggleRecipeShown() {
        setRecipeShown(prev => !prev);
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

                {ingredients.length > 3 && <div className="generate-recipe-container">
                    <h3>Ready for a recipe?</h3>
                    <p>Click the button below to generate a recipe using your ingredients.</p>
                    <button className="generate-recipe-button" onClick={toggleRecipeShown}>Generate Recipe</button>
                </div>}
            </section>}

            {recipeShown && <section className="suggested-recipe-section">
                <h2>Chef Claude Recommends:</h2>
                <article className="suggested-recipe-container" aria-live="polite">
                    <p>Based on the ingredients you have available, I would recommend making a simple a delicious <strong>Beef Bolognese Pasta</strong>. Here is the recipe:</p>
                    <h3>Beef Bolognese Pasta</h3>
                    <h4><strong>Ingredients:</strong></h4>
                    <ul>
                        <li>1 lb. ground beef</li>
                        <li>1 onion, diced</li>
                        <li>3 cloves garlic, minced</li>
                        <li>2 tablespoons tomato paste</li>
                        <li>1 (28 oz) can crushed tomatoes</li>
                        <li>1 cup beef broth</li>
                        <li>1 teaspoon dried oregano</li>
                        <li>1 teaspoon dried basil</li>
                        <li>Salt and pepper to taste</li>
                        <li>8 oz pasta of your choice (e.g., spaghetti, penne, or linguine)</li>
                    </ul>
                    <h4><strong>Instructions:</strong></h4>
                    <ol>
                        <li>Bring a large pot of salted water to a boil for the pasta.</li>
                        <li>In a large skillet or Dutch oven, cook the ground beef over medium-high heat, breaking it up with a wooden spoon, until browned and cooked through, about 5-7 minutes.</li>
                        <li>Add the diced onion and minced garlic to the skillet and cook for 2-3 minutes, until the onion is translucent.</li>
                        <li>Stir in the tomato paste and cook for 1 minute.</li>
                        <li>Add the crushed tomatoes, beef broth, oregano, and basil. Season with salt and pepper to taste.</li>
                        <li>Reduce the heat to low and let the sauce simmer for 15-20 minutes, stirring occasionally, to allow the flavors to meld.</li>
                        <li>While the sauce is simmering, cook the pasta according to the package instructions. Drain the pasta and return it to the pot.</li>
                        <li>Add the Bolognese sauce to the cooked pasta and toss to combine.</li>
                        <li>Serve hot, garnished with additional fresh basil or grated Parmesan cheese if desired.</li>
                    </ol>
                </article>
            </section>}

        </main>
    )
}
