import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IQuote } from "@/interfaces";

export interface IState {
  lastQuotes: IQuote[];
  historyQuotes: IQuote[];
}

const initialState: IState = {
  lastQuotes: [],
  historyQuotes: [],
};

const quotesSlice = createSlice({
  name: "quotes",
  initialState,
  reducers: {
    updateQuotes: (state, { payload }: PayloadAction<IQuote[]>) => {
      state.lastQuotes = payload;
    },
    addQuotes: (state, { payload }: PayloadAction<IQuote[]>) => {
      state.historyQuotes.push(...payload);
    },
  },
});

export const { addQuotes, updateQuotes } = quotesSlice.actions;
export const quotesReducer = quotesSlice.reducer;
