import React from "react";

import { render } from "@testing-library/react";
import { OauthButtons } from "../../../src/components/common";

// Mock the actions module
jest.mock("@/actions", () => ({
  googleSignIn: "/mock-google-sign-in-url",
  githubSignIn: "/mock-github-sign-in-url",
}));

describe("OauthButtons Component", () => {
  it("renders without crashing", () => {
    const { getByText } = render(<OauthButtons />);
    expect(getByText(/Continue with Google/i)).toBeInTheDocument();
    expect(getByText(/Continue with Github/i)).toBeInTheDocument();
    expect(getByText(/OR/i)).toBeInTheDocument();
  });
});
