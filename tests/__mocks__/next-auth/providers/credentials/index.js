const CredentialsProvider = jest.fn((options) => ({
  id: "credentials",
  name: "Credentials",
  type: "credentials",
  credentials: {
    username: { label: "Username", type: "text", placeholder: "jsmith" },
    password: { label: "Password", type: "password" },
  },
  authorize: jest.fn(async (credentials) => {
    // Mock user data
    const user = { id: 1, name: "John Smith", email: "john@example.com" };

    // Simulate successful authentication
    if (credentials.username === "admin" && credentials.password === "admin") {
      return user;
    }

    // Return null if authentication fails
    return null;
  }),
  ...options,
}));

module.exports = CredentialsProvider;
