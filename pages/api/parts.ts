import type { NextApiRequest, NextApiResponse } from "next";
import { type Part } from "../../lib/parts";
import * as parts from "../../lib/parts";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Part[] | string>
) {
  switch (req.method) {
    case "GET":
      return res.status(200).json(await parts.list());
    default:
      return res.status(405).send("Method Not Allowed");
  }
}
