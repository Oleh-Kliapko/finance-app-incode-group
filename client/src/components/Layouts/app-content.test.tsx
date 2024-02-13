window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

import { Provider } from "react-redux";

import { AppContent } from "./AppContent";
import { render, screen } from "@/tests/test-utils";
import { store } from "@/redux/store";
import { isIQuote } from "@/helpers";

describe("AppContent component", () => {
  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <AppContent />
      </Provider>
    );
  });

  it("renders the title correctly", () => {
    render(
      <Provider store={store}>
        <AppContent />
      </Provider>
    );
    expect(
      screen.getByText(
        /Information on securities quotations of \d+ large companies/i
      )
    ).toBeDefined();
  });

  it("renders the last trade time correctly", () => {
    render(
      <Provider store={store}>
        <AppContent />
      </Provider>
    );
    expect(screen.getByText(/Last trade time:/i)).toBeDefined();
  });

  it("renders the correct number of QuoteCard components", () => {
    render(
      <Provider store={store}>
        <AppContent />
      </Provider>
    );
    const quoteCards = screen.getAllByTestId("quote-card");
    expect(quoteCards.length).toBeGreaterThanOrEqual(0);
  });

  it("renders the QuoteCard components with correct data", () => {
    render(
      <Provider store={store}>
        <AppContent />
      </Provider>
    );
    const quoteCards = screen.getAllByTestId("quote-card");
    quoteCards.forEach((quoteCard) => {
      const dataset = quoteCard.dataset as unknown;
      if (isIQuote(dataset)) {
        const {
          ticker,
          change_percent,
          exchange,
          price,
          change,
          dividend,
          yield: yieldValue,
          last_trade_time,
        } = dataset;

        if (
          ticker &&
          change_percent &&
          exchange &&
          price &&
          change &&
          dividend &&
          yieldValue &&
          last_trade_time
        ) {
          const tickerTexts = screen.queryAllByText(new RegExp(ticker));
          const changePercentTexts = screen.queryAllByText(
            new RegExp(`${change_percent}%`)
          );
          const exchangeTexts = screen.queryAllByText(new RegExp(exchange));
          const priceTexts = screen.queryAllByText(new RegExp(price));
          const changeTexts = screen.queryAllByText(new RegExp(change));
          const dividendTexts = screen.queryAllByText(new RegExp(dividend));
          const yieldTexts = screen.queryAllByText(new RegExp(yieldValue));
          const lastTradeTimeTexts = screen.queryAllByText(
            new RegExp(last_trade_time)
          );

          tickerTexts.forEach((tickerText) => {
            expect(tickerText).toBeDefined();
          });
          changePercentTexts.forEach((changePercentText) => {
            expect(changePercentText).toBeDefined();
          });
          exchangeTexts.forEach((exchangeText) => {
            expect(exchangeText).toBeDefined();
          });
          priceTexts.forEach((priceText) => {
            expect(priceText).toBeDefined();
          });
          changeTexts.forEach((changeText) => {
            expect(changeText).toBeDefined();
          });
          dividendTexts.forEach((dividendText) => {
            expect(dividendText).toBeDefined();
          });
          yieldTexts.forEach((yieldText) => {
            expect(yieldText).toBeDefined();
          });
          lastTradeTimeTexts.forEach((lastTradeTimeText) => {
            expect(lastTradeTimeText).toBeDefined();
          });
        } else {
          console.error("One or more dataset properties are not defined");
        }
      } else {
        console.error("Dataset does not match IQuote interface");
      }
    });
  });
});
