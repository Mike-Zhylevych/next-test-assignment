require("@testing-library/jest-dom");

beforeAll(() => {
  window.scrollTo = jest.fn();
});
