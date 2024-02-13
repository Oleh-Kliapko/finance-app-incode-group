import { IQuote } from "@/interfaces";

export const saveToLocalStorage = (ticker: string[] | string, type: string) => {
  switch (type) {
    case "favorite":
      localStorage.setItem("favoriteQuotes", JSON.stringify(ticker));
      break;
    case "stop":
      localStorage.setItem("stoppedQuotes", JSON.stringify(ticker));
      break;
    case "delete":
      localStorage.setItem("deletedQuotes", JSON.stringify(ticker));
      break;
    default:
      break;
  }
};

export const findQuotes = (tickers: string[], quote: IQuote) => {
  return tickers.some((ticker) => ticker === quote.ticker);
};

export function isIQuote(data: unknown): data is IQuote {
  const quote = data as IQuote;
  return (
    typeof quote.ticker === "string" &&
    typeof quote.change_percent === "string" &&
    typeof quote.exchange === "string" &&
    typeof quote.price === "string" &&
    typeof quote.change === "string" &&
    typeof quote.dividend === "string" &&
    typeof quote.yield === "string" &&
    typeof quote.last_trade_time === "string"
  );
}
