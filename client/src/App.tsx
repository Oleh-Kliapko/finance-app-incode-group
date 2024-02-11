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

const App: FC = () => {
  const dispatch = useDispatch();

  useGetTickers((quotes) => {
    dispatch(addQuotes(quotes));
    dispatch(updateQuotes(quotes));
  });

  useEffect(() => {
    const favorites = localStorage.getItem("favoriteQuotes");
    if (favorites && favorites.length > 0) {
      dispatch(addToFavorites(JSON.parse(favorites) as string[]));
    }

    const stoppedQuotes = localStorage.getItem("stoppedQuotes");
    if (stoppedQuotes && stoppedQuotes.length > 0) {
      dispatch(addToStopped(JSON.parse(stoppedQuotes) as string[]));
    }

    const deletedQuotes = localStorage.getItem("deletedQuotes");
    if (deletedQuotes && deletedQuotes.length > 0) {
      dispatch(addToDeleted(JSON.parse(deletedQuotes) as string[]));
    }
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
