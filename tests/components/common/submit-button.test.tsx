import React from "react";

import { render } from "@testing-library/react";
import { SubmitButton } from "../../../src/components/common";

import { useFormStatus } from "react-dom";

jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  useFormStatus: jest.fn(),
}));

describe("SubmitButton Component", () => {
  it("renders correctly when not pending", () => {
    (useFormStatus as jest.Mock).mockReturnValue({ pending: false });

    const { getByRole } = render(<SubmitButton>Submit</SubmitButton>);
    const button = getByRole("button", { name: "Submit" });

    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
    expect(button).toHaveAttribute("type", "submit");
    expect(button).not.toHaveAttribute("data-loading");
  });

  it("renders correctly when pending", () => {
    (useFormStatus as jest.Mock).mockReturnValue({ pending: true });

    const { getByRole } = render(<SubmitButton>Submit</SubmitButton>);
    const button = getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("type", "submit");
    // Check if the button shows a loading state
    expect(button).toHaveAttribute("data-loading", "true");
  });
});
