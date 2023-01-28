import connectDB from "./../../middleware/mongoDB";
const Translation = require("./../../utils/models/translations.model");
import formidable from "formidable";
import { getSession } from "next-auth/react";
import fs from "fs";

var async = require("async");

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadTranslation = (req, userId, userType, email, username) => {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm({
      keepExtensions: true,
      multiples: true,
    });

    form.parse(req, async function (err, fields, files) {
      if (err) return reject(err);
      const { category, translationForm } = fields,
        translationFormToJSON = JSON.parse(translationForm);
      let translationsAlreadyExist = [],
        addedTranslations = [],
        parseCategoryToJSON = JSON.parse(category);

      for (const key in translationFormToJSON) {
        const data = translationFormToJSON[key],
          howToSay = data["howToSay"];

        const translations = await Translation.find({ howToSay });

        if (translations.length > 0) {
          translationsAlreadyExist.push(translations[0]);
        } else {
          const newData = {
            ...data,
            englishPhraseAudio:
              "/audios/" + files["englishPhraseAudio"][key]["newFilename"],
            howToSayAudio:
              "/audios/" + files["howToSayAudio"][key]["newFilename"],
            category: [
              {
                _id: parseCategoryToJSON._id,
                name: parseCategoryToJSON.name,
                index: parseCategoryToJSON.index,
              },
            ],
            addedBy: [
              {
                userId,
                userType,
                email,
                username,
              },
            ],
          };
          const addTranslation = await Translation.create(newData);
          addedTranslations.push({ ...addTranslation });
        }
      }

      if (translationsAlreadyExist.length > 0) {
        resolve({ translationsAlreadyExist, code: "already_exist" });
      } else if (addedTranslations.length > 0) {
        saveFile(files);
        resolve({ addedTranslations, code: "translations_added" });
      } else {
        resolve({ code: "failed_adding_translations" });
      }
    });
  });
};

const saveFile = (file) => {
  let paths = [];
  for (let index = 0; index < file["englishPhraseAudio"].length; index++) {
    const englishPhraseAudio = file["englishPhraseAudio"][index],
      howToSayAudio = file["howToSayAudio"][index]; //We index howToSayAudio here too cuz the length always will be the same as englishPhraseAudio

    //Set 2 for the length cuz there are only two object key we need to iterate [englishPhraseAudio, howToSayAudio]
    for (let i = 0; i < 2; i++) {
      const filesData = [
        {
          name: englishPhraseAudio["newFilename"],
          path: englishPhraseAudio["filepath"],
        },
        {
          name: howToSayAudio["newFilename"],
          path: howToSayAudio["filepath"],
        },
      ][i];
      paths.push({ ...filesData });
    }
  }

  async.each(
    paths,
    function (file, callback) {
      var newPath = "public/audios/" + file.name;

      fs.readFile(file.path, function (err, data) {
        fs.writeFile(newPath, data, function (err) {
          if (err) throw err;
        });
      });

      callback();
    },
    function (err) {
      if (err) {
        // One of the iterations produced an error.
        // All processing will now stop.
        //console.log(err, "A file failed to process");
      } else {
        //console.log("All files have been processed successfully");
      }
    }
  );
};

async function handler(req, res) {
  connectDB();
  const session = await getSession(res);
  const userId = session.user.id,
    userType = session.user.userType,
    email = session.user.email,
    username = session.user.username;

  if (req.method === "POST") {
    try {
      const translation = await uploadTranslation(
        req,
        userId,
        userType,
        email,
        username
      );

      res.json({
        status: "error",
        code: "server_error",
        msg: "Error con el servidor",
        data: translation,
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
