const nextJest = require("next/jest");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables from .env.test
dotenv.config({ path: path.resolve(__dirname, ".env.test") });

const createJestConfig = nextJest({
  dir: "./",
});

// Add any custom Jest configuration options here
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^next-auth$": "<rootDir>/tests/__mocks__/next-auth/index.js",
    "^next-auth/providers/github$":
      "<rootDir>/__mocks__/next-auth/providers/github/index.js",
    "^next-auth/providers/google$":
      "<rootDir>/__mocks__/next-auth/providers/google/index.js",
    "^next-auth/providers/credentials$":
      "<rootDir>/__mocks__/next-auth/providers/credentials/index.js",
    "^@auth/prisma-adapter$":
      "<rootDir>/tests/__mocks__/next-auth/prisma-adapter.js",
  },
  testEnvironment: "jest-environment-jsdom",
};

// Export the Jest configuration
module.exports = createJestConfig(customJestConfig);
