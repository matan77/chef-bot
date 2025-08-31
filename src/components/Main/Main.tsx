import { useEffect, useRef, useState } from "react";
import { IngredientsList } from "../IngredientsList";
import { Recipe } from "../Recipe";
import "./style.css";
import { getRecipeStreamFromLLaMA } from "../../ai";

const Main = () => {
  const [ingredients, setIngredients] = useState<string[]>([
    "Chicken",
    "Oregano",
    "Tomatoes",
  ]);
  const [recipe, setRecipe] = useState("");

  const pinnedRef = useRef(true); 

  const computePinned = () => {
    const doc = document.documentElement;
    const isAtBottom =
      window.innerHeight + window.scrollY >= doc.scrollHeight - 8; 
    pinnedRef.current = isAtBottom;
  };

  useEffect(() => {

    computePinned();
    window.addEventListener("scroll", computePinned, { passive: true });
    window.addEventListener("resize", computePinned);
    return () => {
      window.removeEventListener("scroll", computePinned);
      window.removeEventListener("resize", computePinned);
    };
  }, []);

  const addIngredient = (formData: FormData): void => {
    const ingredient = formData.get("ingredient") as string;
    if (ingredient !== "") setIngredients((prev) => [...prev, ingredient]);
  };

  const scrollWindowToBottom = () => {

    requestAnimationFrame(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    });
  };

  const getRecipe = async () => {
    const response = await getRecipeStreamFromLLaMA(ingredients);
    setRecipe("");

    if (response) {
      for await (const chunk of response) {
        const delta = chunk.choices[0].delta?.content;
        if (!delta) continue;

        setRecipe((recipe) => recipe + delta);

        if (pinnedRef.current) {
          scrollWindowToBottom();
        }
      }
    }
  };

  return (
    <main className="scroll-smooth">
      <form action={addIngredient} className="add-ingredient-form">
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button>Add ingredient</button>
      </form>

      {ingredients.length > 0 && (
        <IngredientsList
          ingredients={ingredients}
          toggleRecipeShown={getRecipe}
        />
      )}

      {recipe && <Recipe recipe={recipe} />}
    </main>
  );
};

export { Main };
