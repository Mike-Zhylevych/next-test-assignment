import React from "react";

import { render } from "@testing-library/react";
import { EyeClosed } from "../../../../../src/app/icons";

describe("EyeClosed Component", () => {
  it("renders without crashing", () => {
    const { container } = render(<EyeClosed />);
    const svgElement = container.querySelector("svg");
    expect(svgElement).toBeInTheDocument();
  });

  it("applies default props correctly", () => {
    const { container } = render(<EyeClosed />);
    const svgElement = container.querySelector("svg");
    expect(svgElement).toHaveAttribute("width", "24");
    expect(svgElement).toHaveAttribute("height", "24");
    expect(svgElement).toHaveAttribute("viewBox", "0 0 24 24");
  });

  it("spreads additional props onto the svg element", () => {
    const { container } = render(
      <EyeClosed data-testid="eye-closed-icon" className="custom-class" />
    );
    const svgElement = container.querySelector("svg");
    expect(svgElement).toHaveAttribute("data-testid", "eye-closed-icon");
    expect(svgElement).toHaveClass("custom-class");
  });

  it("renders correctly when passed different props", () => {
    const { container } = render(
      <EyeClosed width="48" height="48" viewBox="0 0 48 48" fill="red" />
    );
    const svgElement = container.querySelector("svg");
    expect(svgElement).toHaveAttribute("width", "48");
    expect(svgElement).toHaveAttribute("height", "48");
    expect(svgElement).toHaveAttribute("viewBox", "0 0 48 48");
    expect(svgElement).toHaveAttribute("fill", "red");

    const pathElement = container.querySelector("path");
    expect(pathElement).toHaveAttribute("fill", "currentColor");
  });

  it("matches the snapshot", () => {
    const { container } = render(<EyeClosed />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
