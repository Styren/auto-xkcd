// Nextjs endpoint that returns an XKCD comic by id
import { NextApiRequest, NextApiResponse } from "next";

export default async function getArticle(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const response = await fetch(`https://xkcd.com/${id}/info.0.json`);
  const data = await response.json();
  res.status(200).json(data);
};
