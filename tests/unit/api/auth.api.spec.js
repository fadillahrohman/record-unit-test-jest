describe("auth.api", () => {
  let api;
  let httpClient;
  let authClient;

  beforeEach(() => {
    process.env.baseURL = "https://example.test/";
    process.env.baseAuthURL = "https://auth.test/";
    jest.resetModules();
    jest.doMock("@/api/httpClient", () => ({
      __esModule: true,
      default: {
        get: jest.fn(),
        post: jest.fn(),
      },
    }));
    jest.doMock("@/api/authClient", () => ({
      __esModule: true,
      default: {
        get: jest.fn(),
        post: jest.fn(),
      },
    }));
    api = require("@/api/auth.api");
    httpClient = require("@/api/httpClient").default;
    authClient = require("@/api/authClient").default;
    jest.clearAllMocks();
  });

  // httpClient tests
  it("calls login endpoint", async () => {
    const payload = { email: "user@test.com", password: "123456" };
    await api.login(payload);

    expect(httpClient.post).toHaveBeenCalledWith(
      "https://example.test/auth/login",
      payload
    );
  });

  it("calls register endpoint", async () => {
    const payload = { name: "Eko", email: "eko@test.com" };
    await api.register(payload);

    expect(httpClient.post).toHaveBeenCalledWith(
      "https://example.test/auth/register/students",
      payload
    );
  });

  it("calls verification endpoint", async () => {
    await api.apiVerification();
    expect(httpClient.post).toHaveBeenCalledWith(
      "https://example.test/auth/verification"
    );
  });

  it("calls resend verification endpoint", async () => {
    const params = { email: "user@test.com" };
    await api.resendVerification(params);

    expect(httpClient.post).toHaveBeenCalledWith(
      "https://example.test/auth/verification/resend",
      params
    );
  });

  it("calls get student batch endpoint", async () => {
    await api.getCurrentStudentBatch();

    expect(httpClient.get).toHaveBeenCalledWith(
      "https://example.test/student/batch/active"
    );
  });

  it("calls get student batch by id endpoint", async () => {
    await api.getStudentBatchById(10);

    expect(httpClient.get).toHaveBeenCalledWith(
      "https://example.test/student/10/batch/active"
    );
  });

  it("calls forgot password endpoint", async () => {
    const email = { email: "user@test.com" };
    await api.setEmailForgot(email);

    expect(httpClient.post).toHaveBeenCalledWith(
      "https://example.test/auth/forgot",
      email
    );
  });

  it("calls forgot password endpoint", async () => {
    const email = { email: "user@test.com" };
    await api.setEmailForgot(email);

    expect(httpClient.post).toHaveBeenCalledWith(
      "https://example.test/auth/forgot",
      email
    );
  });

  it("calls update password endpoint", async () => {
    const password = { old_password: "123", new_password: "456" };
    await api.setUserPassword(password);

    expect(httpClient.post).toHaveBeenCalledWith(
      "https://example.test/user/edit/password",
      password
    );
  });

  it("calls update password endpoint", async () => {
    const password = { old_password: "123", new_password: "456" };
    await api.setUserPassword(password);

    expect(httpClient.post).toHaveBeenCalledWith(
      "https://example.test/user/edit/password",
      password
    );
  });

  it("calls FCM update endpoint", async () => {
    const params = { token: "fcm_token_123" };
    await api.updateFCM(params);

    expect(httpClient.post).toHaveBeenCalledWith(
      "https://example.test/auth/fcm/update",
      params
    );
  });

  // authClient tests
  it("calls logout endpoint", async () => {
    await api.logout();

    expect(authClient.post).toHaveBeenCalledWith("https://auth.test/signout");
  });

  it("calls generate token endpoint", async () => {
    await api.generateAppToken();

    expect(authClient.post).toHaveBeenCalledWith(
      "https://auth.test/generate/token"
    );
  });

  it("calls check session endpoint", async () => {
    await api.checkSession();

    expect(authClient.get).toHaveBeenCalledWith("https://auth.test/check");
  });
});
