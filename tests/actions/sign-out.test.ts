import { signOut } from "../../src/actions/sign-out";
import * as auth from "@/auth";

jest.mock("@/auth", () => ({
  signOut: jest.fn(),
}));

describe("signOut", () => {
  it("should call auth.signOut with the correct redirect URL", async () => {
    const mockResponse = { success: true };
    (auth.signOut as jest.Mock).mockResolvedValue(mockResponse);

    const result = await signOut();

    expect(auth.signOut).toHaveBeenCalledWith({ redirectTo: "/sign-in" });
    expect(result).toBe(mockResponse);
  });

  it("should throw an error if auth.signOut fails", async () => {
    const mockError = new Error("Sign out failed");
    (auth.signOut as jest.Mock).mockRejectedValue(mockError);

    await expect(signOut()).rejects.toThrow("Sign out failed");
    expect(auth.signOut).toHaveBeenCalledWith({ redirectTo: "/sign-in" });
  });
});
