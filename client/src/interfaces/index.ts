import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

export interface IQuote {
  ticker: string;
  exchange: string;
  price: string;
  change: string;
  change_percent: string;
  dividend: string;
  yield: string;
  last_trade_time: string;
}

export interface ILocalStorageItem {
  key: string;
  action: ActionCreatorWithPayload<string[]>;
}
