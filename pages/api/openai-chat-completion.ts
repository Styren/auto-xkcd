import EventEmitter from "events";
import { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

const stream = new EventEmitter();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { message }: { message: string } = req.query as any;
  console.log(message);

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: message }],
    stream: true,
  });

  stream.on("channel", (channel, message) => {
    res.write(`event: ${channel}\ndata: ${message}\n\n`);
  });

  let accumulator = "";
  for await (const chunk of completion) {
    if (chunk.choices[0].delta.content !== undefined) {
      accumulator += chunk.choices[0].delta.content;
      stream.emit(
        "channel",
        "openai-chat-completion",
        encodeURI(chunk.choices[0].delta.content!),
      );
    }
  }
  // Find all markdown code blocks in the string
  const blocks = accumulator.match(/```[\s\S]*?```/g) ?? [];
  for (const block of blocks) {
    // Get content inside, ignore file type
    const content = block.match(/```[\s\S]*?\n([\s\S]*)```/)?.[1] ?? "";
    stream.emit("channel", "component", encodeURI(content));
  }
  res.end();
}
