import './style.css';

const Main = () => {
	const ingredients = ["Chicken", "Oregano", "Tomatoes"];

	
	return (
		<main>
			<form className="add-ingredient-form">
				<input
					type="text"
					placeholder="e.g. oregano"
					aria-label="Add ingredient"
				/>
				<button>Add ingredient</button>
			</form>
			<ul>
				{ingredients.map((ingredient, index) =>
					<li key={index}>{ingredient}</li>)}
			</ul>
		</main>
	)
}

export { Main };