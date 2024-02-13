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

import { testLastQuote } from "@/tests/constants";
import { QuoteCard } from "./QuoteCard";
import { render, screen, userEvent } from "@/tests/test-utils";
import { store } from "@/redux/store";

describe("Simple working test", () => {
  it("the title is visible", () => {
    render(
      <Provider store={store}>
        <QuoteCard quote={testLastQuote} />
      </Provider>
    );
    expect(screen.getByText(/Hello Vite \+ React!/i)).toBeDefined();
  });
});
