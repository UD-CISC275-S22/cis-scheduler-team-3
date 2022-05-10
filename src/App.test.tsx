import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the welcome message", () => {
    render(<App />);
    const linkElement = screen.getByText(/Hello!/i);
    expect(linkElement).toBeInTheDocument();
});
