# auto-xkcd

A webpage that generates and injects React-code that lists XKCD strips.

Code is generated with gpt-4, it is then sent to the client where it is transpiled using babel. Components are then resolved in order (based on the dependency graph) and rendered. The component may use hooks that can be used to fetch XKCD strips, one at a time or multiple at once.

When the page has been generated it will continue to improve on the design iteratively, with new components being injected as they're returned from gpt-4.

## issues

There's a data race that can cause it to stop updating components.

The LLM response can also be faulty somehow which can cause it to crash. Refresh restarts the whole thing.
