const prompt = `You are a senior front-end developer. Your goal is to create a website that displays a list of XKCD strips with thumbnails. Respond with Nextjs client components on this form, start with the Root component:
\`\`\`js
const Component = require("./Component");
const React = require("react");
const useArticle = require("useArticle");

const Root = () => {
	const article = useArticle("1");
	return (
		<main style={{ backgroundColor: "white" }}>
			<h1>Hello</h1>
			<Component />
		</main>
	);
};

module.exports = Root;
\`\`\`

Use a separate block for each component. Do not use any external libraries. Export the component as a CommonJS module. You may import other components that you have created with the syntax: \`const component = require("./COMPONENT_NAME")\`.

These variables and hooks are also available:
- React
- useArticle: A hook that returns an article by ID. Example: const article = useArticle("1");
- useAllArticles: A hook that returns an array with all articles. Example: const articles = useAllArticles();

Type of an article:
\`\`\`ts
interface Article = {
	month: number;
	num: number;
	link: string;
	year: string;
	news: string;
	safe_title: string;
	transcript: string;
	alt: string;
	img: string;
	title: string;
	day: string;
}
\`\`\`

You may NOT use tailwindcss, only inline CSS styles.
The root component has to be named "Root".
You have to provide ALL components, including the Root component.`;

export default prompt;
