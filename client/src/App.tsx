import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Layout } from "antd";

import { AppContent, AppHeader } from "@/components/Layouts";

import { useGetTickers } from "@/hooks";
import {
  addQuotes,
  addToDeleted,
  addToFavorites,
  addToStopped,
  updateQuotes,
} from "@/redux/quotesSlice";
import { ILocalStorageItem } from "./interfaces";

const localStorageItems: ILocalStorageItem[] = [
  { key: "favoriteQuotes", action: addToFavorites },
  { key: "stoppedQuotes", action: addToStopped },
  { key: "deletedQuotes", action: addToDeleted },
];

const App: FC = () => {
  const dispatch = useDispatch();

  useGetTickers((quotes) => {
    dispatch(addQuotes(quotes));
    dispatch(updateQuotes(quotes));
  });

  useEffect(() => {
    localStorageItems.forEach(({ key, action }) => {
      const item = localStorage.getItem(key);
      if (item && item.length > 0) {
        dispatch(action(JSON.parse(item) as string[]));
      }
    });
  }, [dispatch]);

  return (
    <Layout>
      <AppHeader />
      <Layout>
        <AppContent />
      </Layout>
    </Layout>
  );
};

export default App;
