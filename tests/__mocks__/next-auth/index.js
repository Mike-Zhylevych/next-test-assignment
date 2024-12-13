const NextAuth = jest.fn(() => ({
  handlers: {
    GET: jest.fn(),
    POST: jest.fn(),
  },
  auth: jest.fn(),
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

module.exports = {
  __esModule: true,
  default: NextAuth,
  signIn: jest.fn(),
  signOut: jest.fn(),
  useSession: jest.fn(),
  getSession: jest.fn(),
  CredentialsSignin: class {
    constructor() {}
  },
};
