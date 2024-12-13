const GoogleProvider = jest.fn((options) => ({
  id: "google",
  name: "Google",
  type: "oauth",
  version: "2.0",
  scope: "openid email profile",
  params: { grant_type: "authorization_code" },
  accessTokenUrl: "https://oauth2.googleapis.com/token",
  requestTokenUrl: "https://oauth2.googleapis.com/token",
  authorizationUrl:
    "https://accounts.google.com/o/oauth2/auth?response_type=code",
  profileUrl: "https://openidconnect.googleapis.com/v1/userinfo",
  profile: (profile) => ({
    id: profile.sub,
    name: profile.name,
    email: profile.email,
    image: profile.picture,
  }),
  ...options,
}));

module.exports = GoogleProvider;
