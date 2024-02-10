import { render, screen } from "@testing-library/react";
import App from "../App";

describe("<App />", () => {
  test("component App renders Hello", () => {
    render(<App />);
    const helloElement = screen.getByText(/hello/i);
    expect(helloElement).toBeInTheDocument();
  });
});
