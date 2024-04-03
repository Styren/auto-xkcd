// Nextjs endpoint that returns a list of all XKCD comics from start ID to end ID
import { NextApiRequest, NextApiResponse } from "next";

export default async function getArticles(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { startId, endId }: { startId: string; endId: string } =
    req.query as any;
  const comics = [];
  for (let i = +startId ?? 0; i <= +endId; ++i) {
    const response = await fetch(`https://xkcd.com/${i}/info.0.json`);
    const data = await response.json();
    comics.push(data);
  }
  res.status(200).json(comics);
}
