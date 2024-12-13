import { signUp } from "../../src/actions";
import { db } from "@/db";
import * as bcrypt from "bcryptjs";
import * as auth from "@/auth";
import { redirect } from "next/navigation";
import { DEFAULT_LOGGED_IN_REDIRECT } from "@/routes";

jest.mock("@/db", () => ({
  db: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  },
}));

jest.mock("bcryptjs", () => ({
  hash: jest.fn(),
}));

jest.mock("@/auth", () => ({
  signIn: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  // Mock redirect to a jest function that does nothing
  redirect: jest.fn(),
}));

describe("signUp", () => {
  const mockUsername = "testuser";
  const mockEmail = "test@example.com";
  const mockPassword = "passwor@D123";
  const mockHashedPassword = "hashed@Password12";

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return an error if the user already exists", async () => {
    // Arrange: Mock db.user.findUnique to return an existing user
    const existingUser = { id: "1", email: mockEmail };
    (db.user.findUnique as jest.Mock).mockResolvedValue(existingUser);

    // Act: Attempt to sign up with an existing email
    const formData = new FormData();
    formData.append("username", mockUsername);
    formData.append("email", mockEmail);
    formData.append("password", mockPassword);
    formData.append("password2", mockPassword);

    const result = await signUp(
      {
        errors: {
          username: [],
          email: [],
          password: [],
          password2: [],
          _form: [],
        },
      },
      formData
    );

    // Assert: Ensure the correct functions were called and the appropriate error was returned
    expect(db.user.findUnique).toHaveBeenCalledWith({
      where: { email: mockEmail },
    });
    expect(result).toEqual({ errors: { _form: ["User already exists"] } });
    expect(db.user.create).not.toHaveBeenCalled();
    expect(bcrypt.hash).not.toHaveBeenCalled();
    expect(auth.signIn).not.toHaveBeenCalled();
  });

  it("should create a new user and sign in successfully", async () => {
    // Arrange: Mock the absence of an existing user, successful hashing, user creation, and sign-in
    (db.user.findUnique as jest.Mock).mockResolvedValue(null);
    (bcrypt.hash as jest.Mock).mockResolvedValue(mockHashedPassword);
    (db.user.create as jest.Mock).mockResolvedValue({
      id: "2",
      email: mockEmail,
    });
    (auth.signIn as jest.Mock).mockResolvedValue({ ok: true });

    // Act: Attempt to sign up with new credentials
    const formData = new FormData();
    formData.append("username", mockUsername);
    formData.append("email", mockEmail);
    formData.append("password", mockPassword);
    formData.append("password2", mockPassword);

    await signUp(
      {
        errors: {
          username: [],
          email: [],
          password: [],
          password2: [],
          _form: [],
        },
      },
      formData
    );
    expect(redirect).toHaveBeenCalledWith(DEFAULT_LOGGED_IN_REDIRECT);
  });

  it("should return an error if user creation fails", async () => {
    // Arrange: Mock the absence of an existing user, successful hashing, but user creation fails
    (db.user.findUnique as jest.Mock).mockResolvedValue(null);
    (bcrypt.hash as jest.Mock).mockResolvedValue(mockHashedPassword);
    (db.user.create as jest.Mock).mockRejectedValue(
      new Error("Database error")
    );

    // Act: Attempt to sign up, which should fail during user creation
    const formData = new FormData();
    formData.append("username", mockUsername);
    formData.append("email", mockEmail);
    formData.append("password", mockPassword);
    formData.append("password2", mockPassword);

    const result = await signUp(
      {
        errors: {
          username: [],
          email: [],
          password: [],
          password2: [],
          _form: [],
        },
      },
      formData
    );

    // Assert: Ensure that an error was returned and sign-in was not attempted
    expect(db.user.findUnique).toHaveBeenCalledWith({
      where: { email: mockEmail },
    });
    expect(bcrypt.hash).toHaveBeenCalledWith(mockPassword, 10);
    expect(db.user.create).toHaveBeenCalledWith({
      data: {
        name: mockUsername,
        email: mockEmail,
        password: mockHashedPassword,
      },
    });
    expect(auth.signIn).not.toHaveBeenCalled();
    expect(result).toEqual({
      errors: { _form: ["Failed to create a new user"] },
    });
  });

  it("should return an error if signing in fails", async () => {
    // Arrange: Mock the absence of an existing user, successful hashing and user creation, but sign-in fails
    (db.user.findUnique as jest.Mock).mockResolvedValue(null);
    (bcrypt.hash as jest.Mock).mockResolvedValue(mockHashedPassword);
    (db.user.create as jest.Mock).mockResolvedValue({
      id: "2",
      email: mockEmail,
    });
    (auth.signIn as jest.Mock).mockRejectedValue(new Error("Sign in failed"));

    // Act: Attempt to sign up, which should fail during sign-in
    const formData = new FormData();
    formData.append("username", mockUsername);
    formData.append("email", mockEmail);
    formData.append("password", mockPassword);
    formData.append("password2", mockPassword);
    const result = await signUp(
      {
        errors: {
          username: [],
          email: [],
          password: [],
          password2: [],
          _form: [],
        },
      },
      formData
    );

    // Assert: Ensure that sign-in was attempted and the appropriate error was returned
    expect(db.user.findUnique).toHaveBeenCalledWith({
      where: { email: mockEmail },
    });
    expect(bcrypt.hash).toHaveBeenCalledWith(mockPassword, 10);
    expect(db.user.create).toHaveBeenCalledWith({
      data: {
        name: mockUsername,
        email: mockEmail,
        password: mockHashedPassword,
      },
    });
    expect(auth.signIn).toHaveBeenCalledWith("credentials", {
      email: mockEmail,
      password: mockPassword,
      redirect: false,
    });
    expect(result).toEqual({
      errors: { _form: ["Failed to sign in the user"] },
    });
  });

  it("should return an error if the form data is invalid", async () => {
    // Act: Attempt to sign up with invalid form data
    const formData = new FormData();
    formData.append("username", mockUsername);
    formData.append("email", "invalid-email");
    formData.append("password", mockPassword);
    formData.append("password2", mockPassword);

    const result = await signUp(
      {
        errors: {
          username: [],
          email: [],
          password: [],
          password2: [],
          _form: [],
        },
      },
      formData
    );

    // Assert: Ensure that the form data was validated and the appropriate error was returned
    expect(db.user.findUnique).not.toHaveBeenCalled();
    expect(result).toEqual({
      errors: {
        email: ["This is not a valid email."],
      },
    });
  });
});
