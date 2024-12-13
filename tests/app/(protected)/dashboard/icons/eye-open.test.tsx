import React from "react";

import { render } from "@testing-library/react";
import { EyeOpen } from "../../../../../src/app/icons";

describe("EyeOpen Component", () => {
  it("renders without crashing", () => {
    const { container } = render(<EyeOpen />);
    const svgElement = container.querySelector("svg");
    expect(svgElement).toBeInTheDocument();
  });

  it("applies default attributes correctly", () => {
    const { container } = render(<EyeOpen />);
    const svgElement = container.querySelector("svg");
    expect(svgElement).toHaveAttribute("width", "24");
    expect(svgElement).toHaveAttribute("height", "24");
    expect(svgElement).toHaveAttribute("viewBox", "0 0 24 24");
  });

  it("spreads additional props onto the svg element", () => {
    const { container } = render(
      <EyeOpen data-testid="eye-open-icon" className="custom-class" />
    );
    const svgElement = container.querySelector("svg");
    expect(svgElement).toHaveAttribute("data-testid", "eye-open-icon");
    expect(svgElement).toHaveClass("custom-class");
  });

  it("renders the correct path elements with proper attributes", () => {
    const { container } = render(<EyeOpen />);
    const pathElements = container.querySelectorAll("path");
    expect(pathElements.length).toBe(2);

    expect(pathElements[0]).toHaveAttribute("fill", "currentColor");
    expect(pathElements[0]).toHaveAttribute(
      "d",
      "M9.75 12a2.25 2.25 0 1 1 4.5 0a2.25 2.25 0 0 1-4.5 0"
    );

    expect(pathElements[1]).toHaveAttribute("fill", "currentColor");
    expect(pathElements[1]).toHaveAttribute(
      "d",
      "M2 12c0 1.64.425 2.191 1.275 3.296C4.972 17.5 7.818 20 12 20s7.028-2.5 8.725-4.704C21.575 14.192 22 13.639 22 12c0-1.64-.425-2.191-1.275-3.296C19.028 6.5 16.182 4 12 4S4.972 6.5 3.275 8.704C2.425 9.81 2 10.361 2 12m10-3.75a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5"
    );
  });

  it("matches the snapshot", () => {
    const { container } = render(<EyeOpen />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
