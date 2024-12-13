import React from "react";

import { render } from "@testing-library/react";
import { Moon } from "../../../../../src/app/icons";

describe("Moon Component", () => {
  it("renders without crashing", () => {
    const { container } = render(<Moon />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("applies default attributes correctly", () => {
    const { container } = render(<Moon />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("viewBox", "0 0 24 24");
    expect(svg).toHaveAttribute("width", "1em");
    expect(svg).toHaveAttribute("height", "1em");
  });

  it("spreads additional props onto the svg element", () => {
    const { container } = render(
      <Moon data-testid="moon-icon" className="custom-class" />
    );
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("data-testid", "moon-icon");
    expect(svg).toHaveClass("custom-class");
  });

  it("renders the correct path element with proper attributes", () => {
    const { container } = render(<Moon />);
    const path = container.querySelector("path");
    expect(path).toBeInTheDocument();
    expect(path).toHaveAttribute(
      "d",
      "M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z"
    );
    expect(path).toHaveAttribute("fill", "currentColor");
  });

  it("matches the snapshot", () => {
    const { container } = render(<Moon />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
