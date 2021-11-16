import nextConnect from "next-connect";
import db from "../../../utils/db";
import User from "../../../models/User";
import bcrypt from "bcryptjs";
import { signToken } from "../../../utils/auth";

const handler = nextConnect();
handler.post(async (req, res) => {
  await db.connect(); // connect to db
  const user = await User.findOne({ email: req.body.email });
  await db.disconnect();
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    const token = signToken(user);
    res.send({
      token,
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401).send({ message: "Invalid username or password" });
  }
  res.send(user);
});

export default handler;
