module.exports = {
  PrismaAdapter: jest.fn(() => ({
    createUser: jest.fn(),
    getUser: jest.fn(),
    getUserById: jest.fn(),
    getUserByEmail: jest.fn(),
  })),
};
