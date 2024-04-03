"use client";
import * as React from "react";
import { useEffect } from "react";
import generatePrompt from "@/prompts/generate";
import getImprovePrompt from "@/prompts/improve";
import useLLMComponentStreamingResponse from "@/hooks/useLLMComponentStreamingResponse";

export default function Home() {
  const { data, state, RootComponent, components, completion } =
    useLLMComponentStreamingResponse();
  useEffect(() => {
    // Generate the first layout
    if (state === "uninitialized" && !RootComponent) {
      completion(generatePrompt);
    }
    // Once the first layout is generated we start improving on it, one component at a time (chosen randomly)
    if (state === "idle" && RootComponent) {
      const randomComponent =
        components[
          Object.keys(components)[
            Math.floor(Math.random() * Object.keys(components).length)
          ]
        ];
      completion(getImprovePrompt(randomComponent.code));
    }
  }, [state, RootComponent, components, completion]);

  return (
    <main className="flex min-h-screen flex-col">
      <section className="flex gap-5 sticky top-0 justify-center items-center bg-stone-100 w-full py-10 relative">
        <div className="w-full h-full absolute font-mono text-sm top-0 left-0 flex flex-col-reverse select-none overflow-hidden text-gray-800 opacity-20">
          {data}
        </div>
        <h1 className="z-10 text-gray-600 text-7xl font-bold">auto-xkcd</h1>
        <p className="text-gray-600 font-medium">
          Generates an XKCD list using gpt and injects it client-side into the page.
          <br />
          Iteratively updates the design of each component.
          <br />
          Refresh the page to start over.
        </p>
      </section>
      {RootComponent ? (
        <RootComponent />
      ) : (
        <div className="my-32 text-center font-mono text-gray-600">
          Rendering...
        </div>
      )}
    </main>
  );
}
