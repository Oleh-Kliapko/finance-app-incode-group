import { FC } from "react";
import { Flex, Layout, Typography } from "antd";
import { useSelector } from "react-redux";

import { contentStyle, wrapperStyle, titleStyle, timeStyle } from "./styles";
import { QuoteCard } from "@/components/Common";
import { IQuote } from "@/interfaces";
import { selectDeleted, selectLastQuotes } from "@/redux/quotesSlice";

export const AppContent: FC = () => {
  const lastQuotes = useSelector(selectLastQuotes);
  const deletedQuotes = useSelector(selectDeleted);
  const time = lastQuotes[0]
    ? new Date(lastQuotes[0]?.last_trade_time).toLocaleString()
    : "";

  const filteredQuotes = lastQuotes.filter((quote) => {
    for (let i = 0; i < deletedQuotes.length; i++) {
      if (quote.ticker === deletedQuotes[i]) {
        return false;
      }
    }
    return true;
  });

  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title level={3} style={titleStyle}>
        Information on securities quotations of {filteredQuotes.length} large
        companies
      </Typography.Title>
      <Typography.Title level={5} style={timeStyle}>
        Last trade time: {time}
      </Typography.Title>
      <Flex style={wrapperStyle}>
        {filteredQuotes &&
          filteredQuotes.map((quote: IQuote) => (
            <QuoteCard quote={quote} key={quote.ticker} />
          ))}
      </Flex>
    </Layout.Content>
  );
};
