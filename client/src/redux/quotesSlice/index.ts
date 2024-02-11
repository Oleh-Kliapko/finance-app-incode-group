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
  quotesReducer,
  addQuotes,
  updateQuotes,
  toggleFavorite,
  addToFavorites,
  toggleStopped,
  addToStopped,
  deleteQuote,
  addToDeleted,
  selectLastQuotes,
  selectHistoryQuotes,
  selectQuotesByTicker,
  selectFavorites,
  selectStopped,
  selectDeleted,
};
