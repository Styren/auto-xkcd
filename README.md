# auto-xkcd



https://github.com/Styren/auto-xkcd/assets/3768403/6599a5d4-4e8b-4a96-8a87-2d42ea5f5160



A webpage that generates and injects React-code that lists XKCD strips.

Code is generated with gpt-4, it is then sent to the client where it is transpiled using babel. Components are then rendered in order based on the dependency graph. The component may use hooks that can be used to fetch XKCD strips, one at a time or multiple at once.

When the page has been generated it will continue to improve on the design iteratively, with new components being injected as they're returned from gpt-4.

## instructions

Env variable `OPENAI_API_KEY` has to be set.

```bash
npm install
npm dev
```

## issues

- There's a data race that can cause it to stop updating components
- The LLM response can be faulty (imports a missing dependency, syntax error, etc) which can cause it to crash
