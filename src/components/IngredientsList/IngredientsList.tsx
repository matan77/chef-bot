import "./style.css";
import { MdDelete } from "react-icons/md";

const IngredientsList = ({
  ingredients,
  toggleRecipeShown,
  removeIngredient,
}: {
  ingredients: string[];
  toggleRecipeShown: () => void;
  removeIngredient: (ingredient: string) => void;
}) => {
  return (
    <>
      <ul className="ingredients-list" aria-live="polite">
        {ingredients.map((ingredient) => (
          <li key={ingredient}>
            {ingredient}
            <MdDelete
              className=""
              onClick={() => removeIngredient(ingredient)}
            />
          </li>
        ))}
      </ul>

      {ingredients.length > 3 && (
        <div className="get-recipe-container">
          <div>
            <h3>Ready for a recipe?</h3>
            <p>Generate a recipe from your list of ingredients.</p>
          </div>
          <button onClick={toggleRecipeShown}>Get a recipe</button>
        </div>
      )}
    </>
  );
};

export { IngredientsList };
