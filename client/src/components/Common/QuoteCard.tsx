import { FC, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Typography,
  Tag,
  List,
  ConfigProvider,
  Card,
  Statistic,
  Tooltip,
} from "antd";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  StarOutlined,
  StarFilled,
  ReloadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { iconWrapperStyle, cardStyle, switchOffCardStyle } from "./styles";
import { IQuote } from "@/interfaces";
import {
  deleteQuote,
  selectDeleted,
  selectFavorites,
  selectStopped,
  toggleFavorite,
  toggleStopped,
} from "@/redux/quotesSlice";
import { findQuotes } from "@/helpers";

interface QuoteCardProps {
  quote: IQuote;
}

export interface IQuoteCard {
  title: string;
  value: number;
  dimension: string | null;
}

export const QuoteCard: FC<QuoteCardProps> = ({ quote }) => {
  const dispatch = useDispatch();
  const favoriteQuotes = useSelector(selectFavorites);
  const stoppedQuotes = useSelector(selectStopped);
  const deletedQuotes = useSelector(selectDeleted);
  const [isFavorite, setIsFavorite] = useState(
    findQuotes(favoriteQuotes, quote) || false
  );
  const [isStopped, setIsStopped] = useState(
    findQuotes(stoppedQuotes, quote) || false
  );
  const [isDeleted, setIsDeleted] = useState(
    findQuotes(deletedQuotes, quote) || false
  );

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

  const toggleFavoriteHandler = () => {
    dispatch(toggleFavorite(ticker));
    setIsFavorite(!isFavorite);
  };

  const toggleStoppedHandler = () => {
    dispatch(toggleStopped(ticker));
    setIsStopped(!isStopped);
  };

  const handleDelete = () => {
    dispatch(deleteQuote(ticker));
    setIsDeleted(true);
  };

  if (isDeleted) return null;

  return (
    <Card
      style={{
        ...cardStyle,
        transform: !isStopped ? "rotateY(0deg)" : "rotateY(180deg)",
      }}
    >
      {!isStopped && (
        <>
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
          <div style={iconWrapperStyle}>
            <Tooltip
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              {isFavorite ? (
                <StarFilled onClick={toggleFavoriteHandler} />
              ) : (
                <StarOutlined onClick={toggleFavoriteHandler} />
              )}
            </Tooltip>
            <Tooltip title="Switch off this asset">
              <ReloadOutlined onClick={toggleStoppedHandler} />
            </Tooltip>
            <Tooltip title="Move to trash / Restore from cart">
              <DeleteOutlined onClick={handleDelete} />
            </Tooltip>
          </div>
        </>
      )}
      {isStopped && (
        <div style={switchOffCardStyle}>
          <Tooltip title="Switch on this asset">
            <ReloadOutlined
              style={{ color: "red", fontSize: "50px" }}
              onClick={toggleStoppedHandler}
            />
          </Tooltip>
        </div>
      )}
    </Card>
  );
};
