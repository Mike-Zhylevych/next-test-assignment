import React from "react";

import { render, act } from "@testing-library/react";
import { Hero } from "../../../src/components/common/hero";
import { usePathname } from "next/navigation";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("Hero Component", () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue("/home");
  });

  it("renders without crashing", () => {
    const { getByText } = render(<Hero />);
    expect(getByText("Home")).toBeInTheDocument();
  });

  it("updates fontSize and opacity on scroll", () => {
    const { container } = render(<Hero />);
    const heading = container.querySelector("h1") as HTMLElement;

    expect(heading).toHaveStyle("opacity: 1");
    expect(heading).toHaveStyle("font-size: 3rem");

    act(() => {
      window.scrollY = 100;
      window.dispatchEvent(new Event("scroll"));
    });

    expect(heading).toHaveStyle("opacity: 0.5");
    expect(heading).toHaveStyle("font-size: 2rem");
  });
});
