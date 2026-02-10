export default function ClaudeRecipe({ recipe, loading }) {
    if (loading) {
        return <p>Cooking something up… 🍳</p>;
    }

    if (!recipe) {
        return null;
    }

    if (typeof recipe !== "string") {
        return <p>⚠️ Unexpected response format.</p>;
    }

    return (
        <section className="recipe">
            <pre>{recipe}</pre>
        </section>
    );
}
