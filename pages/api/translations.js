import connectDB from "./../../middleware/mongoDB";
const Translation = require("./../../utils/models/translations.model");
import { getSession } from "next-auth/react";

async function handler(req, res) {
  connectDB();

  if (req.method === "GET") {
    // Process a POST request
    try {
      const session = await getSession(res);
      const userId = session.user.id,
        userType = session.user.userType;

      const translations =
        userType === 2
          ? await Translation.find({})
          : await Translation.find({ "addedBy.userId": userId });

      res.json({
        status: "ok",
        error: "nada",
        data: translations,
      });
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
