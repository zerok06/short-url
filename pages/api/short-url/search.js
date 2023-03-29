import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../lib/database";
import shortUrl from "../../../models/shortUrl";

export default async function handler(req = NextRequest, res = NextResponse) {
  const { method } = req;
  switch (method) {
    case "POST":
      const { id } = req.body;
      if (!id) {
        res.json({
          msg: "Falta parametros",
        });
      }
      try {
        await dbConnect();
        const findShort = await shortUrl.findOne({ shortUrl: id });
        if (!findShort) {
          res.json({
            msg: "Lo siento, este ID no esta vinculado con ninguna URL.",
            error: true,
          });
        }
        res.json({ ...findShort._doc });
      } catch (error) {
        res.json({ error });
      }

      break;

    default:
      res.json({ error: true });
      break;
  }
}
