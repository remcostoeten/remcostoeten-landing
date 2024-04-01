import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { text } = req.body;
    const processedText = text.replaceAll(/a/gi, ""); // Replace all 'a' (case-insensitive)
    res.status(200).json(processedText);
  } else {
    res.status(405).end("Method Not Allowed"); // Handle other methods (optional)
  }
}
