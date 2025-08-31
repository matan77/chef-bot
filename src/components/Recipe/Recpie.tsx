import ReactMarkdown from "react-markdown";
import "./style.css";

const Recipe = ({ recipe }: { recipe: string }) => {
	return (
		<section className="suggested-recipe-container" aria-live="polite">
			<h2>Chef Llama Recommends:</h2>
			<ReactMarkdown unwrapDisallowed={true} >{recipe}</ReactMarkdown>
		</section>
	);
};

export { Recipe };

