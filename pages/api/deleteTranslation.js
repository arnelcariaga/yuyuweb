import connectDB from "./../../middleware/mongoDB";
const Translation = require("./../../utils/models/translations.model");
import fs from "fs";
import { getSession } from "next-auth/react";

const async = require("async");

const deleteFile = function (file, callback) {
  fs.unlink("public" + file, callback);
};

async function handler(req, res) {
  connectDB();

  if (req.method === "POST") {
    try {
      const rowToDelete = JSON.parse(req.body).data;
      let files = [rowToDelete.englishPhraseAudio, rowToDelete.howToSayAudio];

      async.each(files, deleteFile, async function (err) {
        if (err) throw err;

        const deleteTranslation = await Translation.deleteOne({
          _id: rowToDelete._id,
        });

        if (
          deleteTranslation.acknowledged &&
          deleteTranslation.deletedCount === 1
        ) {
          res.json({
            status: "ok",
            code: "translation_deleted",
            msg: "Traduccion eliminada",
            data: "",
          });
        } else {
          res.json({
            status: "error",
            code: "nothing_to_delete",
            msg: "No se ha podido eliminar la traduccion",
            data: "",
          });
        }
      });
    } catch (err) {
      res.json({
        status: "error",
        code: "server_error",
        msg: "Error con el servidor",
        data: err,
      });
    }
  } else {
    res.json({
      status: "error",
      code: "server_error",
      msg: "Error con el servidor",
      data: "result",
    });
  }
}

export default handler;
