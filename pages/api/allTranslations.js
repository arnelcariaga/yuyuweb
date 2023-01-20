import connectDB from "./../../middleware/mongoDB";
const Translation = require("./../../utils/models/translations.model");

async function handler(req, res) {
  connectDB();

  if (req.method === "GET") {
    // Process a POST request
    try {
      const translations = await Translation.find({});

      res.json({ status: "ok", error: "nada", data: translations });
    } catch (err) {
      res.json({
        status: "error",
        error: "server error",
        data: err,
      });
    }
  } else {
    // Handle any other HTTP method
  }
}

export default handler;
