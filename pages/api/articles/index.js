import db from "../../../libs/db";
import authorization from "../../../middlewares/authorization";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  const auth = await authorization(req, res);

  const articles = await db("articles");

  res.status(200);
  res.json({
    message: "Article data",
    data: articles,
  });
}
