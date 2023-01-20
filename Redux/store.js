import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import langsDucks from "./langsDucks";
import categoriesDucks from "./categoriesDucks";
import translationsDuck from "./translationsDuck";

export const store = configureStore({
  reducer: {
    langsData: langsDucks,
    categoriesData: categoriesDucks,
    translationsData: translationsDuck,
  },
  middleware: [thunk],
});
