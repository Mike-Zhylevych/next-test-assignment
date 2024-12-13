import React from "react";

import { render } from "@testing-library/react";
import { Sun } from "../../../../../src/app/icons";

describe("Sun Component", () => {
  it("renders without crashing", () => {
    const { container } = render(<Sun />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("has the correct default attributes", () => {
    const { container } = render(<Sun />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg).toHaveAttribute("focusable", "false");
    expect(svg).toHaveAttribute("height", "1em");
    expect(svg).toHaveAttribute("role", "presentation");
    expect(svg).toHaveAttribute("viewBox", "0 0 24 24");
    expect(svg).toHaveAttribute("width", "1em");
  });

  it("spreads additional props onto the svg element", () => {
    const { container } = render(
      <Sun data-testid="sun-icon" className="custom-class" />
    );
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("data-testid", "sun-icon");
    expect(svg).toHaveClass("custom-class");
  });

  it("renders the correct child elements with proper attributes", () => {
    const { container } = render(<Sun />);
    const g = container.querySelector("svg > g");
    expect(g).toBeInTheDocument();
    expect(g).toHaveAttribute("fill", "currentColor");

    const paths = container.querySelectorAll("svg > g > path");
    expect(paths.length).toBe(2);
  });

  it("matches the snapshot", () => {
    const { container } = render(<Sun />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
