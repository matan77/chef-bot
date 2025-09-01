# Demo

#### Chef-Llama: http://frontend-trainee-playground-8.apps.medone-1.med.one/

#### Docs: http://vllm-server-trainee-playground-8.apps.medone-1.med.one/docs

```ts
import OpenAI from "openai";

const api = new OpenAI({
  baseURL: import.meta.env.VITE_VLLM_SERVER,
  apiKey:"",
  dangerouslyAllowBrowser:true,
  timeout: 500000
});

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe,
they could make with some or all of those ingredients.
You don't need to use every ingredient they mention in your recipe.
The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients.
Format your response in markdown to make it easier to render to a web page
`;


export const getRecipeStreamFromLLaMA = async (ingredientsArr: string[]) => {
  const ingredientsString = ingredientsArr.join(", ");
  try {
    const response = await api.chat.completions.create({
      model: "/models/Llama-3-8B-Instruct",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`,
        },
      ],
      max_completion_tokens: 1024,
      stream: true
    });
    return response;
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
    else console.error(error);
  }


};
```

```ts
  const getRecipe = async () => {
    setIsGenerate(true);
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
      setIsGenerate(false);
    }
  };
```

```ts

```
