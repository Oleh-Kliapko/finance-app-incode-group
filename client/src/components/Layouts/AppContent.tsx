import { FC } from "react";
import { Flex, Layout, Typography } from "antd";
import { useSelector } from "react-redux";

import { QuoteCard } from "@/components/Common";

import { containerStyle, wrapperStyle, titleStyle, timeStyle } from "./styles";
import { IQuote } from "@/interfaces";
import { selectLastQuotes } from "@/redux/quotesSlice";

const { Title } = Typography;

export const AppContent: FC = () => {
  const lastQuotes = useSelector(selectLastQuotes);
  const time = lastQuotes[0]
    ? new Date(lastQuotes[0]?.last_trade_time).toLocaleString()
    : "";

  return (
    <Layout.Content style={containerStyle}>
      <Title level={3} style={titleStyle}>
        Information on securities quotations of {lastQuotes.length} large
        companies
      </Title>
      <Title level={5} style={timeStyle}>
        Last trade time: {time}
      </Title>
      <Flex style={wrapperStyle}>
        {lastQuotes &&
          lastQuotes.map((quote: IQuote) => (
            <QuoteCard quote={quote} key={quote.ticker} />
          ))}
      </Flex>
    </Layout.Content>
  );
};
