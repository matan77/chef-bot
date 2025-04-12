import "./style.css";

const IngredientsList = ({ ingredients, toggleRecipeShown }: { ingredients: string[], toggleRecipeShown: () => void }) => {
	return (
		<section>
			<h2>Ingredients on hand:</h2>
			<ul className="ingredients-list" aria-live="polite">{ingredients.map(ingredient =>
				< li key={ingredient}>{ingredient}</li>)}</ul>
			{ingredients.length > 3 && <div className="get-recipe-container">
				<div>
					<h3>Ready for a recipe?</h3>
					<p>Generate a recipe from your list of ingredients.</p>
				</div>
				<button onClick={toggleRecipeShown}>Get a recipe</button>
			</div>}
		</section>
	);
};

export { IngredientsList };

