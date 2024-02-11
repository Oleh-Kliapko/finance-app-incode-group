import { FC } from "react";
import { Flex, Layout, Typography } from "antd";
import { useSelector } from "react-redux";

import { QuoteCard } from "@/components/Common";

import { contentStyle, wrapperStyle, titleStyle, timeStyle } from "./styles";
import { IQuote } from "@/interfaces";
import { selectDeleted, selectLastQuotes } from "@/redux/quotesSlice";
import { TrashIcon } from "../Icons";

const { Title } = Typography;

export const AppContent: FC = () => {
  const lastQuotes = useSelector(selectLastQuotes);
  const deletedQuotes = useSelector(selectDeleted);
  const time = lastQuotes[0]
    ? new Date(lastQuotes[0]?.last_trade_time).toLocaleString()
    : "";

  return (
    <Layout.Content style={contentStyle}>
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
      {deletedQuotes.length > 0 && (
        <div className="trash" onClick={() => {}}>
          <TrashIcon />
        </div>
      )}
    </Layout.Content>
  );
};
