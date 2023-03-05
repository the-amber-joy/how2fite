import type { NextApiRequest, NextApiResponse } from "next";
import { type Action } from "../../lib/actions";
import * as actions from "../../lib/actions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Action[] | string>
) {
  switch (req.method) {
    case "GET":
      return res.status(200).json(await actions.list());
    default:
      return res.status(405).send("Method Not Allowed");
  }
}
