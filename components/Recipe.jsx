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
    return (
        <section className="recipe">
            <div className="recipe-card">
                <h3>Here's a recipe you can make with your ingredients:</h3>
                <h1></h1>
                <h2>Ingredients:</h2>
                <h2>Step-by-Step Instructions:</h2>
                <pre>{recipe}</pre>
            </div>
        </section>
    );
}
