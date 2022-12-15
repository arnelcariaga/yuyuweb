import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import langsDucks from "./langsDucks";
export const store = configureStore({
  reducer: {
    langsData: langsDucks,
  },
  middleware: [thunk],
});
