import nextConnect from "next-connect";
import db from "../../../utils/db";
import Product from "../../../models/Product";

const handler = nextConnect();
handler.get(async (req, res) => {
  await db.connect(); // connect to db
  const product = await Product.findById(req.query.id); // empty object means return all products
  await db.disconnect();
  res.send(product);
});

export default handler;
