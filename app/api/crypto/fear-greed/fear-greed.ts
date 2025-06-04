// pages/api/crypto/fear-greed.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch("https://api.alternative.me/fng/", {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch Fear & Greed data");
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching Fear & Greed data:", error);
    res.status(500).json({ error: "Failed to fetch Fear & Greed data" });
  }
}
