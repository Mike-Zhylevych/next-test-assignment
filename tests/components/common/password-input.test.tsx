import React from "react";

import { render, fireEvent } from "@testing-library/react";
import { PasswordInput } from "../../../src/components/common"; // Adjust the import path accordingly

describe("PasswordInput Component", () => {
  const defaultProps = {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
  };

  it("renders without crashing", () => {
    const { getByLabelText } = render(<PasswordInput {...defaultProps} />);
    expect(getByLabelText("Password")).toBeInTheDocument();
  });

  it('renders with type "password" by default', () => {
    const { getByLabelText } = render(<PasswordInput {...defaultProps} />);
    const inputElement = getByLabelText("Password") as HTMLInputElement;
    expect(inputElement.type).toBe("password");
  });

  it("toggles visibility when the icon is clicked", () => {
    const { getByLabelText, getByRole } = render(
      <PasswordInput {...defaultProps} />
    );
    const inputElement = getByLabelText("Password") as HTMLInputElement;
    const toggleButton = getByRole("button");

    // Initially, the input type should be 'password'
    expect(inputElement.type).toBe("password");

    // Click the toggle button
    fireEvent.click(toggleButton);

    // After clicking, the input type should be 'text'
    expect(inputElement.type).toBe("text");

    // Click again to toggle back
    fireEvent.click(toggleButton);

    // Input type should be 'password' again
    expect(inputElement.type).toBe("password");
  });

  it("passes isInvalid and errorMessage props correctly", () => {
    const errorMessage = "Password is required";
    const { getByText } = render(
      <PasswordInput
        {...defaultProps}
        isInvalid={true}
        errorMessage={errorMessage}
      />
    );
    expect(getByText(errorMessage)).toBeInTheDocument();
  });
});
