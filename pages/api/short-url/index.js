import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../lib/database";
import ShortUrl from "../../../models/shortUrl";

export default async function handler(req = NextRequest, res = NextResponse) {
  const { method } = req;
  switch (method) {
    case "POST":
      let { urlBase, redirectFast = false } = req.body;
      if (!urlBase) {
        res.json({
          msg: "Falta parametros",
        });
      }
      if (!/(http|https)/.test(urlBase)) {
        res.json({
          msg: "Al parecer otra persona acorto la URL, puedes reutilizarla sin miedo. ",
        });
      }
      try {
        await dbConnect();

        const existShortUrl = await ShortUrl.findOne({ urlBase });
        if (existShortUrl) {
          res.json({
            ...existShortUrl._doc,
            msg: "Al parecer otra persona acorto la URL, puedes reutilizarla sin miedo. ",
          });
        }
        const newCodeUrl = Math.random().toString(32).substring(2, 9);

        const newShortUrl = await ShortUrl.create({
          urlBase,
          redirectFast,
          shortUrl: newCodeUrl,
        });
        const currentShortUrl = await newShortUrl.save();
        res.json({
          ...currentShortUrl?._doc,
        });
      } catch (error) {}
      break;
    default:
      res.redirect("/oops");
      break;
  }
}
