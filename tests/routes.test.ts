import {
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
  DEFAULT_LOGGED_IN_REDIRECT,
} from "../src/routes";

describe("Routes Constants", () => {
  it("should have the correct public routes", () => {
    expect(publicRoutes).toEqual(["/"]);
  });

  it("should have the correct auth routes", () => {
    expect(authRoutes).toEqual(["/sign-in", "/sign-up"]);
  });

  it("should have the correct API auth prefix", () => {
    expect(apiAuthPrefix).toBe("/api/auth");
  });

  it("should have the correct default logged-in redirect route", () => {
    expect(DEFAULT_LOGGED_IN_REDIRECT).toBe("/dashboard");
  });
});
