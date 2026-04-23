describe("lti.api", () => {
  let api;
  let servicesClients;
  let axios;
  let publicLTIClient;

  beforeEach(() => {
    process.env.servicesApi = "https://services.test/";
    publicLTIClient = {
      get: jest.fn(),
      post: jest.fn(),
      interceptors: {
        response: {
          use: jest.fn(),
        },
      },
    };

    jest.resetModules();
    jest.doMock("axios", () => ({
      __esModule: true,
      default: {
        create: jest.fn(() => publicLTIClient),
      },
    }));
    jest.doMock("@/api/servicesClients", () => ({
      __esModule: true,
      default: {
        get: jest.fn(),
        post: jest.fn(),
      },
    }));

    api = require("@/api/lti.api");
    servicesClients = require("@/api/servicesClients").default;
    axios = require("axios").default;
    jest.clearAllMocks();
  });

  describe("Client setup", () => {
    it("creates public LTI client with services base URL", () => {
      expect(axios.create).toHaveBeenCalledWith({
        baseURL: "https://services.test/",
      });
    });

    it("registers response interceptor", () => {
      expect(publicLTIClient.interceptors.response.use).toHaveBeenCalled();
      const [onFulfilled, onRejected] =
        publicLTIClient.interceptors.response.use.mock.calls[0];

      expect(typeof onFulfilled).toBe("function");
      expect(typeof onRejected).toBe("function");
    });
  });

  describe("Auth and config endpoints", () => {
    it("calls LTI config endpoint", async () => {
      await api.apiGetLTIConfig("client-123");

      expect(publicLTIClient.get).toHaveBeenCalledWith(
        "v1/lti/config?clientId=client-123"
      );
    });

    it("calls save LTI config endpoint", async () => {
      const payload = { platformId: "plat-1" };
      await api.apiSaveLTIConfig(payload);

      expect(servicesClients.post).toHaveBeenCalledWith(
        "v1/lti/config/save",
        payload
      );
    });

    it("calls JWKS endpoint", async () => {
      await api.apiGetJWKS("platform-9");

      expect(publicLTIClient.get).toHaveBeenCalledWith(
        "v1/lti/jwks?platformId=platform-9"
      );
    });

    it("calls validate launch endpoint", async () => {
      const payload = { idToken: "abc" };
      await api.apiValidateLTILaunch(payload);

      expect(servicesClients.post).toHaveBeenCalledWith(
        "v1/lti/launch/validate",
        payload
      );
    });

    it("calls initiate OIDC auth endpoint", async () => {
      const payload = { login_hint: "hint" };
      await api.apiInitiateOIDCAuth(payload);

      expect(publicLTIClient.post).toHaveBeenCalledWith(
        "v1/lti/oidc/login",
        payload
      );
    });

    it("calls launch params endpoint", async () => {
      const payload = { state: "state-1" };
      await api.apiGetLTILaunchParams(payload);

      expect(servicesClients.post).toHaveBeenCalledWith(
        "v1/lti/launch/params",
        payload
      );
    });

    it("calls token exchange endpoint", async () => {
      const payload = { code: "code-1" };
      await api.apiExchangeLTIToken(payload);

      expect(servicesClients.post).toHaveBeenCalledWith(
        "v1/lti/oidc/token/exchange",
        payload
      );
    });

    it("calls LTI user info endpoint", async () => {
      await api.apiGetLTIUserInfo("token-abc");

      expect(servicesClients.post).toHaveBeenCalledWith("v1/lti/user/info", {
        token: "token-abc",
      });
    });

    it("calls create LTI session endpoint", async () => {
      const payload = { userId: 7 };
      await api.apiCreateLTISession(payload);

      expect(servicesClients.post).toHaveBeenCalledWith(
        "v1/lti/session/create",
        payload
      );
    });
  });

  describe("Course and module endpoints", () => {
    it("calls LTI course detail endpoint", async () => {
      await api.apiGetLTICourseDetail("course-1");

      expect(publicLTIClient.get).toHaveBeenCalledWith(
        "v1/lti/courses/course-1"
      );
    });

    it("calls LTI course modules endpoint", async () => {
      await api.apiGetLTICourseModules("course-1");

      expect(publicLTIClient.get).toHaveBeenCalledWith(
        "v1/lti/courses/course-1/modules"
      );
    });

    it("calls LTI module detail endpoint", async () => {
      await api.apiGetLTIModuleDetail("course-1", "module-10");

      expect(servicesClients.get).toHaveBeenCalledWith(
        "v1/lti/courses/course-1/modules/module-10"
      );
    });

    it("calls mark module complete endpoint", async () => {
      const payload = { is_completed: true };
      await api.apiMarkModuleComplete("course-1", "module-10", payload);

      expect(servicesClients.post).toHaveBeenCalledWith(
        "v1/lti/courses/course-1/modules/module-10/complete",
        payload
      );
    });

    it("calls LTI user progress endpoint", async () => {
      await api.apiGetLTIUserProgress("course-1");

      expect(servicesClients.get).toHaveBeenCalledWith(
        "v1/lti/courses/course-1/progress"
      );
    });

    it("calls submit module assessment endpoint", async () => {
      const payload = { answers: ["A", "B"] };
      await api.apiSubmitModuleAssessment("course-1", "module-10", payload);

      expect(servicesClients.post).toHaveBeenCalledWith(
        "v1/lti/courses/course-1/modules/module-10/submit",
        payload
      );
    });
  });
});
