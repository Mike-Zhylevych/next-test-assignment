import { emailSignIn, githubSignIn, googleSignIn } from "../../src/actions";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";
import { signInSchema } from "@/schemas";
import { DEFAULT_LOGGED_IN_REDIRECT } from "@/routes";

jest.mock("@/auth", () => ({
  signIn: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

jest.mock("@/schemas", () => ({
  signInSchema: {
    safeParse: jest.fn(),
  },
}));

describe("emailSignIn", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns validation errors when form data is invalid", async () => {
    const formData = new FormData();
    formData.append("email", "invalid-email");
    formData.append("password", "");

    const validationResult = {
      success: false,
      error: {
        flatten: () => ({
          fieldErrors: {
            email: ["Invalid email"],
            password: ["Password is required"],
          },
        }),
      },
    };

    (signInSchema.safeParse as jest.Mock).mockReturnValue(validationResult);

    const result = await emailSignIn({ errors: {} }, formData);

    expect(result).toEqual({
      errors: {
        email: ["Invalid email"],
        password: ["Password is required"],
      },
    });

    expect(signIn).not.toHaveBeenCalled();
    expect(redirect).not.toHaveBeenCalled();
  });

  it("returns form error when sign-in fails", async () => {
    const formData = new FormData();
    formData.append("email", "user@example.com");
    formData.append("password", "@3Ngpassword");

    const validationResult = {
      success: true,
      data: {
        email: "user@example.com",
        password: "wrongpassword",
      },
    };

    (signInSchema.safeParse as jest.Mock).mockReturnValue(validationResult);
    (signIn as jest.Mock).mockRejectedValue({ code: "3rd-party" });

    const result = await emailSignIn({ errors: {} }, formData);
    expect(signIn).toHaveBeenCalledWith("credentials", {
      email: "user@example.com",
      password: "@3Ngpassword",
      redirect: false,
    });

    expect(result).toEqual({
      errors: {
        _form: ["You have signed up with a third-party provider"],
      },
    });

    (signIn as jest.Mock).mockRejectedValue({});
    const wrongCredentialsResult = await emailSignIn({ errors: {} }, formData);
    expect(wrongCredentialsResult).toEqual({
      errors: {
        _form: ["Invalid email or password"],
      },
    });
    expect(redirect).not.toHaveBeenCalled();
  });

  it("redirects to default page when sign-in is successful", async () => {
    const formData = new FormData();
    formData.append("email", "user@example.com");
    formData.append("password", "correctpassword");

    const validationResult = {
      success: true,
      data: {
        email: "user@example.com",
        password: "correctpassword",
      },
    };

    (signInSchema.safeParse as jest.Mock).mockReturnValue(validationResult);
    (signIn as jest.Mock).mockResolvedValue({ error: null });

    const result = await emailSignIn({ errors: {} }, formData);

    expect(signIn).toHaveBeenCalledWith("credentials", {
      email: "user@example.com",
      password: "correctpassword",
      redirect: false,
    });

    expect(redirect).toHaveBeenCalledWith("/dashboard");
    expect(result).toBeUndefined();
  });
});

describe("github", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should sign in with github", async () => {
    await githubSignIn();
    expect(signIn).toHaveBeenCalledWith("github", {
      redirectTo: DEFAULT_LOGGED_IN_REDIRECT,
    });
  });
});

describe("google", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should sign in with google", async () => {
    await googleSignIn();
    expect(signIn).toHaveBeenCalledWith("google", {
      redirectTo: DEFAULT_LOGGED_IN_REDIRECT,
    });
  });
});
