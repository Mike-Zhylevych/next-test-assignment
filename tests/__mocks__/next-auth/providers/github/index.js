const GitHubProvider = jest.fn((options) => ({
  id: "github",
  name: "GitHub",
  type: "oauth",
  version: "2.0",
  scope: "read:user",
  params: { grant_type: "authorization_code" },
  accessTokenUrl: "https://github.com/login/oauth/access_token",
  requestTokenUrl: "https://github.com/login/oauth/access_token",
  authorizationUrl:
    "https://github.com/login/oauth/authorize?response_type=code",
  profileUrl: "https://api.github.com/user",
  profile: (profile) => ({
    id: profile.id.toString(),
    name: profile.name,
    email: profile.email,
    image: profile.avatar_url,
  }),
  ...options,
}));

module.exports = GitHubProvider;
