export default function getPrompt(componentCode: string) {
  return `You are a senior front-end developer. Your goal is to improve a website that displays a list of XKCD strips with thumbnails. Update the following component by giving it a radical design. Use inline CSS to style the components, you may NOT use tailwindcss.

\`\`\`js
${componentCode}
\`\`\`

You cannot change the name of the component. Do NOT add any imports or change the format of the code in any way. You may however change the styling and structure of the component as you wish.
You may not add any other components. You can only modify the existing component.
Describe your changes very briefly. Emphasis is on the code.`;
}
