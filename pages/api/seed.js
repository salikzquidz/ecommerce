import nextConnect from "next-connect";
import db from "../../utils/db";
import data from "../../utils/data";
import Product from "../../models/Product";

const handler = nextConnect();
handler.get(async (req, res) => {
  await db.connect(); // connect to db
  await Product.deleteMany();
  await Product.insertMany(data.products);
  await db.disconnect();
  res.send({ message: "seeded successfully" });
});

export default handler;
