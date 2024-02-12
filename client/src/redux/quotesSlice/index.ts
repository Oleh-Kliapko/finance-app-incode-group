import {
  quotesReducer,
  addQuotes,
  updateQuotes,
  toggleFavorite,
  addToFavorites,
  toggleStopped,
  addToStopped,
  deleteQuote,
  addToDeleted,
  restoreQuote,
  initialState,
} from "./quotesSlice";
import {
  selectLastQuotes,
  selectHistoryQuotes,
  selectQuotesByTicker,
  selectFavorites,
  selectStopped,
  selectDeleted,
} from "./selectors";

export {
  initialState,
  quotesReducer,
  addQuotes,
  updateQuotes,
  toggleFavorite,
  addToFavorites,
  toggleStopped,
  addToStopped,
  deleteQuote,
  addToDeleted,
  restoreQuote,
  selectLastQuotes,
  selectHistoryQuotes,
  selectQuotesByTicker,
  selectFavorites,
  selectStopped,
  selectDeleted,
};
