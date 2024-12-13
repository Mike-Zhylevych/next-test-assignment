import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "../src/db";
import bcrypt from "bcryptjs";
import { ThirdPartyError } from "../src/auth.config";

// Mock Dependencies
jest.mock("../src/db", () => ({
  db: {
    user: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
  },
}));

jest.mock("bcryptjs", () => ({
  compare: jest.fn().mockResolvedValue(true),
  hash: jest.fn().mockResolvedValue("hashed-password"),
}));

jest.mock("../src/auth.config", () => ({
  ThirdPartyError: jest
    .fn()
    .mockImplementation(() => new Error("Third Party Error")),
}));

describe("Credentials Provider - authorize", () => {
  const credentialsProvider = CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      const { email, password } = credentials as {
        email: string;
        password: string;
      };

      const user = await db.user.findUnique({
        where: { email },
      });

      if (!user) return null;

      if (!user.password) {
        throw new ThirdPartyError();
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) return user;
      return null;
    },
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return user object when credentials are valid", async () => {
    const mockUser = {
      id: "1",
      email: "test@example.com",
      password: "hashedPassword",
    };

    (db.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    const user = await credentialsProvider.authorize({
      email: "test@example.com",
      password: "plaintextPassword",
    });

    expect(db.user.findUnique).toHaveBeenCalledWith({
      where: { email: "test@example.com" },
    });

    expect(bcrypt.compare).toHaveBeenCalledWith(
      "plaintextPassword",
      "hashedPassword"
    );
    expect(user).toEqual(mockUser);
  });

  it("should return null if user does not exist", async () => {
    (db.user.findUnique as jest.Mock).mockResolvedValue(null);

    const user = await credentialsProvider.authorize({
      email: "nonexistent@example.com",
      password: "anyPassword",
    });

    expect(db.user.findUnique).toHaveBeenCalledWith({
      where: { email: "nonexistent@example.com" },
    });
    expect(user).toBeNull();
  });

  it("should throw ThirdPartyError if user has no password", async () => {
    const mockUser = {
      id: "2",
      email: "thirdparty@example.com",
      password: null,
    };

    (db.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

    await expect(
      credentialsProvider.authorize({
        email: "thirdparty@example.com",
        password: "anyPassword",
      })
    ).rejects.toThrow("Third Party Error");

    expect(db.user.findUnique).toHaveBeenCalledWith({
      where: { email: "thirdparty@example.com" },
    });
    expect(bcrypt.compare).not.toHaveBeenCalled();
  });

  it("should return null if password is incorrect", async () => {
    const mockUser = {
      id: "3",
      email: "user@example.com",
      password: "hashedPassword",
    };

    (db.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    const user = await credentialsProvider.authorize({
      email: "user@example.com",
      password: "wrongPassword",
    });

    expect(db.user.findUnique).toHaveBeenCalledWith({
      where: { email: "user@example.com" },
    });
    expect(bcrypt.compare).toHaveBeenCalledWith(
      "wrongPassword",
      "hashedPassword"
    );
    expect(user).toBeNull();
  });
});
