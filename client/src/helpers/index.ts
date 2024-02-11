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
