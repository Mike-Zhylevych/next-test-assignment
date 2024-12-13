import React from "react";

import { render } from "@testing-library/react";
import { Search } from "../../../../../src/app/icons";

describe("Search Component", () => {
  it("renders without crashing", () => {
    const { container } = render(<Search />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("has the correct default attributes", () => {
    const { container } = render(<Search />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg).toHaveAttribute("fill", "none");
    expect(svg).toHaveAttribute("focusable", "false");
    expect(svg).toHaveAttribute("height", "1em");
    expect(svg).toHaveAttribute("role", "presentation");
    expect(svg).toHaveAttribute("viewBox", "0 0 24 24");
    expect(svg).toHaveAttribute("width", "1em");
  });

  it("spreads additional props onto the svg element", () => {
    const { container } = render(
      <Search data-testid="search-icon" className="custom-class" />
    );
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("data-testid", "search-icon");
    expect(svg).toHaveClass("custom-class");
  });

  it("renders the correct path elements with proper attributes", () => {
    const { container } = render(<Search />);
    const paths = container.querySelectorAll("path");
    expect(paths.length).toBe(2);

    expect(paths[0]).toHaveAttribute(
      "d",
      "M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
    );
    expect(paths[0]).toHaveAttribute("stroke", "currentColor");
    expect(paths[0]).toHaveAttribute("stroke-linecap", "round");
    expect(paths[0]).toHaveAttribute("stroke-linejoin", "round");
    expect(paths[0]).toHaveAttribute("stroke-width", "2");

    expect(paths[1]).toHaveAttribute("d", "M22 22L20 20");
    expect(paths[1]).toHaveAttribute("stroke", "currentColor");
    expect(paths[1]).toHaveAttribute("stroke-linecap", "round");
    expect(paths[1]).toHaveAttribute("stroke-linejoin", "round");
    expect(paths[1]).toHaveAttribute("stroke-width", "2");
  });

  it("matches the snapshot", () => {
    const { container } = render(<Search />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
