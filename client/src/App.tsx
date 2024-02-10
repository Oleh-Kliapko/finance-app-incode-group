import { FC } from "react";
import { useDispatch } from "react-redux";
import { Layout } from "antd";

import { AppContent, AppHeader } from "@/components/Layouts";

import { useGetTickers } from "@/hooks";
import { addQuotes, updateQuotes } from "@/redux/quotesSlice/quotesSlice";

const App: FC = () => {
  const dispatch = useDispatch();

  useGetTickers((quotes) => {
    dispatch(addQuotes(quotes));
    dispatch(updateQuotes(quotes));
  });

  return (
    <Layout>
      <AppHeader />
      <Layout style={{ marginTop: 100 }}>
        <AppContent />
      </Layout>
    </Layout>
  );
};

export default App;
