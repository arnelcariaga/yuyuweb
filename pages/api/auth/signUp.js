import connectDB from "../../../middleware/mongoDB";
const bcrypt = require("bcryptjs");
const User = require("./../../../utils/models/user.model");

async function handler(req, res) {
  connectDB();

  if (req.method === "POST") {
    // Process a POST request
    try {
      const newPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: newPassword,
      });
      res.json({ status: "ok", error: "nada", data: newUser });
    } catch (err) {
      res.json({
        status: "error",
        error: "Usuario ya existe o error en el servidor.",
        data: err,
      });
    }
  } else {
    // Handle any other HTTP method
  }
}

export default handler;
