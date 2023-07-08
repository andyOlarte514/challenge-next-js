import api, { setAuthorizationToken } from "../../config/api";

describe("api", () => {
  test("creates an instance of axios with the correct configuration", () => {
    expect(api?.defaults.baseURL).toBe(process.env.API_BASE_URL);
    expect(api?.defaults.headers["Content-Type"]).toBe("application/json");
  });

  test("sets the authorization token in the headers", () => {
    const token = "abc123";
    setAuthorizationToken(token);

    expect(api?.defaults.headers.common["Authorization"]).toBe(
      `Bearer ${token}`
    );
  });

  test("removes the authorization token from the headers", () => {
    setAuthorizationToken("abc123");
    setAuthorizationToken(null);

    expect(api?.defaults.headers.common["Authorization"]).toBeUndefined();
  });
});
