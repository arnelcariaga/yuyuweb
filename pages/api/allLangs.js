import connectDB from "./../../middleware/mongoDB";
const Lang = require("./../../utils/models/lang.model");

async function handler(req, res) {
  connectDB();

  if (req.method === "GET") {
    // Process a POST request
    try {
      const lang = await Lang.find({});

      res.json({ status: "ok", error: "nada", data: lang });
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
