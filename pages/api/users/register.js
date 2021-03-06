import nextConnect from "next-connect";
import db from "../../../utils/db";
import User from "../../../models/User";
import bcrypt from "bcryptjs";
import { signToken } from "../../../utils/auth";

const handler = nextConnect();
handler.post(async (req, res) => {
  await db.connect(); // connect to db
  //   const existingUser = await User.findOne({ email: req.body.email });
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
    isAdmin: false,
  });
  await user.save();
  await db.disconnect();

  const token = signToken(user);
  res.send({
    token,
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
  //   if (user && bcrypt.compareSync(req.body.password, user.password)) {
  //     const token = signToken(user);
  //     res.send({
  //       token,
  //       _id: user._id,
  //       name: user.name,
  //       email: user.email,
  //       isAdmin: user.isAdmin,
  //     });
  //   } else {
  //     res.status(401).send({ message: "Invalid username or password" });
  //   }
});

export default handler;
