export default function IngredientsList(props) {

    const ingredientsListItems = props.ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient.charAt(0).toUpperCase() + ingredient.substring(1).toLowerCase()}</li>
    ));

    return (
        <section>
            <h2>Ingredients on hand:</h2>

            <ul className="ingredients-list">
                {ingredientsListItems}
            </ul>

            {props.ingredients.length > 3 && <div className="generate-recipe-container">
                <h3>Ready for a recipe?</h3>
                <p>Click the button below to generate a recipe using your ingredients.</p>
                <button className="generate-recipe-button" onClick={props.getRecipe}>Generate Recipe</button>
            </div>}
        </section>
    )
}
