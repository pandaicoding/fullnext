import db from "../../../libs/db";
import authorization from "../../../middlewares/authorization";
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const auth = await authorization(req, res);

  const { title, content } = req.body;

  const create = await db("articles").insert({
    title,
    content,
  });

  const createData = await db("articles").where("id", create).first();

  res.status(200);
  res.json({
    message: "Article created successfully",
    data: createData,
  });
}
