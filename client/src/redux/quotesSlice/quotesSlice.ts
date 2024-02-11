import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IQuote } from "@/interfaces";
import { saveToLocalStorage } from "@/helpers";

export interface IState {
  lastQuotes: IQuote[];
  historyQuotes: IQuote[];
  favoriteQuotes: string[];
  stoppedQuotes: string[];
  deletedQuotes: string[];
}

const initialState: IState = {
  lastQuotes: [],
  historyQuotes: [],
  favoriteQuotes: [],
  stoppedQuotes: [],
  deletedQuotes: [],
};

const quotesSlice = createSlice({
  name: "quotes",
  initialState,
  reducers: {
    // handle quotes
    updateQuotes: (state, { payload }: PayloadAction<IQuote[]>) => {
      state.lastQuotes = payload;
    },
    addQuotes: (state, { payload }: PayloadAction<IQuote[]>) => {
      state.historyQuotes.push(...payload);
    },

    // handle favorite flags
    addToFavorites: (state, { payload }: PayloadAction<string[]>) => {
      state.favoriteQuotes.push(...payload);
      saveToLocalStorage(state.favoriteQuotes, "favorite");
    },
    toggleFavorite: (state, { payload }: PayloadAction<string>) => {
      const isCurrentlyFavorite = state.favoriteQuotes.some(
        (quote) => quote === payload
      );

      if (isCurrentlyFavorite) {
        state.favoriteQuotes = state.favoriteQuotes.filter(
          (quote) => quote !== payload
        );
      } else {
        state.favoriteQuotes.push(payload);
      }

      saveToLocalStorage(state.favoriteQuotes, "favorite");
    },

    // handle stopped flags
    addToStopped: (state, { payload }: PayloadAction<string[]>) => {
      state.stoppedQuotes.push(...payload);
      saveToLocalStorage(state.stoppedQuotes, "stop");
    },

    toggleStopped: (state, { payload }: PayloadAction<string>) => {
      const isCurrentlyStopped = state.stoppedQuotes.some(
        (quote) => quote === payload
      );

      if (isCurrentlyStopped) {
        state.stoppedQuotes = state.stoppedQuotes.filter(
          (quote) => quote !== payload
        );
      } else {
        state.stoppedQuotes.push(payload);
      }

      saveToLocalStorage(state.stoppedQuotes, "stop");
    },

    // handle deleting quote
    addToDeleted: (state, { payload }: PayloadAction<string[]>) => {
      state.deletedQuotes.push(...payload);
      saveToLocalStorage(state.deletedQuotes, "delete");
    },

    deleteQuote: (state, { payload }: PayloadAction<string>) => {
      state.deletedQuotes.push(payload);
      saveToLocalStorage(state.deletedQuotes, "delete");
    },
  },
});

export const {
  addQuotes,
  updateQuotes,
  toggleFavorite,
  addToFavorites,
  toggleStopped,
  addToStopped,
  deleteQuote,
  addToDeleted,
} = quotesSlice.actions;

export const quotesReducer = quotesSlice.reducer;
