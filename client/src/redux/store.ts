import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { quotesReducer } from "./quotesSlice";

const assetsPersistConfig = {
  key: "assets",
  storage,
};

export const store = configureStore({
  reducer: {
    quotes: quotesReducer,
    // assets: persistReducer(assetsPersistConfig, assetsReducer),
  },
  //   middleware: (getDefaultMiddleware) =>
  //     getDefaultMiddleware({
  //       serializableCheck: false,
  //     }),
});

export type RootState = ReturnType<typeof store.getState>;

// export const persistor = persistStore(store);
