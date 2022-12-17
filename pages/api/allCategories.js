import connectDB from "./../../middleware/mongoDB";
const Category = require("./../../utils/models/category.model");

async function handler(req, res) {
  connectDB();

  if (req.method === "GET") {
    // Process a POST request
    try {
      const category = await Category.find({});

      res.json({ status: "ok", error: "nada", data: category });
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
