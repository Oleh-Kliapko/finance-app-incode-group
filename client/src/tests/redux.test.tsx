import configureStore from "redux-mock-store";
import { RootState } from "@/redux/store";
import {
  addQuotes,
  updateQuotes,
  addToFavorites,
  toggleFavorite,
  addToStopped,
  toggleStopped,
  addToDeleted,
  deleteQuote,
  restoreQuote,
  selectLastQuotes,
  selectHistoryQuotes,
  selectQuotesByTicker,
  selectFavorites,
  selectStopped,
  selectDeleted,
} from "@/redux/quotesSlice";
import { IQuote } from "@/interfaces";
import { initialState } from "@/redux/quotesSlice";
import { testLastQuote, testHistoryQuotes } from "./constants";

const mockStore = configureStore([]);

// action testing
describe("quotesSlice actions", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it("dispatches addQuotes action", () => {
    const quotes: IQuote[] = [testLastQuote];
    const expectedAction = { type: addQuotes.type, payload: quotes };
    store.dispatch(addQuotes(quotes));
    expect(store.getActions()).toEqual([expectedAction]);
  });

  it("dispatches updateQuotes action", () => {
    const quotes: IQuote[] = [testLastQuote];
    const expectedAction = { type: updateQuotes.type, payload: quotes };
    store.dispatch(updateQuotes(quotes));
    expect(store.getActions()).toEqual([expectedAction]);
  });

  it("dispatches addToFavorites action", () => {
    const favorites: string[] = ["Some ticker"];
    const expectedAction = { type: addToFavorites.type, payload: favorites };
    store.dispatch(addToFavorites(favorites));
    expect(store.getActions()).toEqual([expectedAction]);
  });

  it("dispatches toggleFavorite action", () => {
    const quoteId = "Some ticker";
    const expectedAction = { type: toggleFavorite.type, payload: quoteId };
    store.dispatch(toggleFavorite(quoteId));
    expect(store.getActions()).toEqual([expectedAction]);
  });

  it("dispatches addToStopped action", () => {
    const stopped: string[] = ["Some ticker"];
    const expectedAction = { type: addToStopped.type, payload: stopped };
    store.dispatch(addToStopped(stopped));
    expect(store.getActions()).toEqual([expectedAction]);
  });

  it("dispatches toggleStopped action", () => {
    const quoteId = "Some ticker";
    const expectedAction = { type: toggleStopped.type, payload: quoteId };
    store.dispatch(toggleStopped(quoteId));
    expect(store.getActions()).toEqual([expectedAction]);
  });

  it("dispatches addToDeleted action", () => {
    const deleted: string[] = ["Some ticker"];
    const expectedAction = { type: addToDeleted.type, payload: deleted };
    store.dispatch(addToDeleted(deleted));
    expect(store.getActions()).toEqual([expectedAction]);
  });

  it("dispatches deleteQuote action", () => {
    const quoteId = "Some ticker";
    const expectedAction = { type: deleteQuote.type, payload: quoteId };
    store.dispatch(deleteQuote(quoteId));
    expect(store.getActions()).toEqual([expectedAction]);
  });

  it("dispatches restoreQuote action", () => {
    const quoteId = "Some ticker";
    const expectedAction = { type: restoreQuote.type, payload: quoteId };
    store.dispatch(restoreQuote(quoteId));
    expect(store.getActions()).toEqual([expectedAction]);
  });
});

// selectors testing
describe("selectors", () => {
  const state: RootState = {
    quotes: {
      lastQuotes: [testLastQuote],
      historyQuotes: testHistoryQuotes,
      favoriteQuotes: ["Some asset #1"],
      stoppedQuotes: ["Some asset #2"],
      deletedQuotes: [],
    },
  };

  it("selects last quotes", () => {
    expect(selectLastQuotes(state)).toEqual(state.quotes.lastQuotes);
  });

  it("selects history quotes", () => {
    expect(selectHistoryQuotes(state)).toEqual(state.quotes.historyQuotes);
  });

  it("selects quotes by ticker", () => {
    const ticker = "Ticker1";
    const expectedQuotes: IQuote[] = [testHistoryQuotes[0]];
    expect(selectQuotesByTicker(ticker)(state)).toEqual(expectedQuotes);
  });

  it("selects favorite quotes", () => {
    expect(selectFavorites(state)).toEqual(state.quotes.favoriteQuotes);
  });

  it("selects stopped quotes", () => {
    expect(selectStopped(state)).toEqual(state.quotes.stoppedQuotes);
  });

  it("selects deleted quotes", () => {
    expect(selectDeleted(state)).toEqual(state.quotes.deletedQuotes);
  });
});
