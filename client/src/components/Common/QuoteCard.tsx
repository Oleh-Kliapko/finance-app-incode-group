import { FC } from "react";
import { Typography, Tag, List, ConfigProvider, Card, Statistic } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

import { IQuote } from "@/interfaces";
import { quoteCardStyle } from "./styles";

interface QuoteCardProps {
  quote: IQuote;
}

export interface IQuoteCard {
  title: string;
  value: number;
  dimension: string | null;
}

export const QuoteCard: FC<QuoteCardProps> = ({ quote }) => {
  const {
    ticker,
    price,
    change,
    change_percent,
    dividend,
    yield: profit,
  } = quote;

  const isGrow: boolean = Number(change_percent) > 0;

  const quoteCard: IQuoteCard[] = [
    { title: "Price", value: Number(price), dimension: "$" },
    {
      title: "Change rate",
      value: Number(change),
      dimension: "$",
    },
    {
      title: "Yield on securities",
      value: Number(profit),
      dimension: "%",
    },
    {
      title: "Dividends on securities",
      value: Number(dividend),
      dimension: "%",
    },
  ];

  return (
    <Card style={quoteCardStyle}>
      <ConfigProvider
        theme={{
          token: {
            fontSize: 20,
            colorTextDescription: "rgba(110, 24, 24, 0.8)",
          },
        }}
      >
        <Statistic
          title={ticker}
          value={Number(change_percent)}
          precision={2}
          valueStyle={{
            color: isGrow ? "#3f8600" : "#cf1322",
          }}
          prefix={isGrow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
          suffix="%"
        />
      </ConfigProvider>
      <List
        size="small"
        dataSource={quoteCard}
        renderItem={(item) => {
          const { title, value, dimension } = item;

          return (
            <List.Item>
              <Typography.Text>
                {title}
                {dimension ? `, ${dimension}` : ""}
              </Typography.Text>
              {title === "Yield on securities" && (
                <Tag color={isGrow ? "green" : "red"} style={{ margin: 0 }}>
                  {value.toLocaleString()}
                </Tag>
              )}
              {title !== "Yield on securities" && (
                <Typography.Text>{value.toLocaleString()}</Typography.Text>
              )}
            </List.Item>
          );
        }}
      />
    </Card>
  );
};
