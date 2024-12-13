import React from "react";

import { render } from "@testing-library/react";
import { ChevronDown } from "../../../../../src/app/icons";

describe("ChevronDown Component", () => {
  it("renders without crashing", () => {
    const { container } = render(<ChevronDown />);
    const svgElement = container.querySelector("svg");
    expect(svgElement).toBeInTheDocument();
  });

  it("applies default strokeWidth when no prop is provided", () => {
    const { container } = render(<ChevronDown />);
    const pathElement = container.querySelector("path");
    expect(pathElement).toHaveAttribute("stroke-width", "1.5");
  });

  it("applies custom strokeWidth when provided", () => {
    const customStrokeWidth = 2;
    const { container } = render(
      <ChevronDown strokeWidth={customStrokeWidth} />
    );
    const pathElement = container.querySelector("path");
    expect(pathElement).toHaveAttribute(
      "stroke-width",
      customStrokeWidth.toString()
    );
  });

  it("spreads additional props onto the svg element", () => {
    const { container } = render(
      <ChevronDown data-testid="chevron-icon" className="custom-class" />
    );
    const svgElement = container.querySelector("svg");
    expect(svgElement).toHaveAttribute("data-testid", "chevron-icon");
    expect(svgElement).toHaveClass("custom-class");
  });

  it("renders the correct path", () => {
    const { container } = render(<ChevronDown />);
    const pathElement = container.querySelector("path");
    expect(pathElement).toHaveAttribute(
      "d",
      "m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
    );
  });
});
