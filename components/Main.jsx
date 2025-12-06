export default function Main() {

    const ingredients = ["cheese", "tomato", "basil"];
    const ingredientsListItems = ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient.charAt(0).toUpperCase() + ingredient.substring(1).toLowerCase()}</li>
    ));

    function handleSubmit(event) {
        event.preventDefault();
        console.log("Form submitted");
        const newIngredient = event.target.ingredient.value;
        ingredients.push(newIngredient);
        console.log(ingredients);
    }


    return (
        <main>
            <form onSubmit={handleSubmit} className="recipe-form">
                <input type="text" placeholder="e.g. cheese" name="ingredient" className="ingredient-input" />
                <button type="submit" className="add-button">+ Add Ingredients</button>
            </form>
            <ul>
                {ingredientsListItems}
            </ul>
        </main>
    )
}
