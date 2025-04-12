import { useState } from 'react';
import { IngredientsList } from '../IngredientsList';
import { Recipe } from '../Recipe';
import './style.css';
import { getRecipeFromMistral } from '../../ai';

const Main = () => {
	const [ingredients, setIngredients] = useState<string[]>(["Chicken", "Oregano", "Tomatoes"]);
	const [recipe, setRecipe] = useState("");


	const addIngredient = (formData: FormData): void => {
		setIngredients([...ingredients, (formData.get("ingredient") as string)]);
	}

	const getRecipe = async () => {
		const recipeMarkdown = await getRecipeFromMistral(ingredients) as string;
		setRecipe(recipeMarkdown);
	};

	return (
		<main>
			<form action={addIngredient} className="add-ingredient-form">
				<input
					type="text"
					placeholder="e.g. oregano"
					aria-label="Add ingredient"
					name="ingredient"
				/>
				<button>Add ingredient</button>
			</form>
			{ingredients.length > 0 && <IngredientsList ingredients={ingredients} toggleRecipeShown={getRecipe} />}

			{recipe && <Recipe recipe={recipe} />}
		</main >
	)
}

export { Main };

