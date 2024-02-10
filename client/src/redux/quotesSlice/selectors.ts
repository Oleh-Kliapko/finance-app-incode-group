import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "@/redux/store";
import { IQuote } from "@/interfaces";

export const selectLastQuotes = (state: RootState) => state.quotes.lastQuotes;
export const selectHistoryQuotes = (state: RootState) =>
  state.quotes.historyQuotes;

export const selectQuotesByTicker = (ticker: string) =>
  createSelector(selectHistoryQuotes, (historyQuotes) =>
    historyQuotes.filter((quote: IQuote) => quote.ticker === ticker)
  );
