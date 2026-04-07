describe("region.api", () => {
  let api;
  let servicesClients;

  beforeEach(() => {
    process.env.servicesApi = "https://services.test/";
    jest.resetModules();
    jest.doMock("@/api/servicesClients", () => ({
      __esModule: true,
      default: {
        get: jest.fn(),
        post: jest.fn(),
      },
    }));

    api = require("@/api/region.api");
    servicesClients = require("@/api/servicesClients").default;
    jest.clearAllMocks();
  });

  describe("GET endpoints", () => {
    it("calls region list endpoint without page", async () => {
      await api.apiList();

      expect(servicesClients.get).toHaveBeenCalledWith(
        "https://services.test/v1/region/list?"
      );
    });

    it("calls region list endpoint with page", async () => {
      await api.apiList(3);

      expect(servicesClients.get).toHaveBeenCalledWith(
        "https://services.test/v1/region/list?&page=3"
      );
    });

    it("calls region detail endpoint", async () => {
      await api.apiDetail("abc-123");

      expect(servicesClients.get).toHaveBeenCalledWith(
        "https://services.test/v1/region/detail?uuid=abc-123"
      );
    });
  });

  describe("POST endpoints", () => {
    it("calls region create endpoint", async () => {
      const payload = { name: "West Region" };
      await api.apiCreate(payload);

      expect(servicesClients.post).toHaveBeenCalledWith(
        "https://services.test/v1/region/create",
        payload
      );
    });

    it("calls region update endpoint", async () => {
      const payload = { name: "West Region Updated" };
      await api.apiUpdate("abc-123", payload);

      expect(servicesClients.post).toHaveBeenCalledWith(
        "https://services.test/v1/region/update?uuid=abc-123",
        payload
      );
    });

    it("calls region delete endpoint", async () => {
      await api.apiDelete("abc-123");

      expect(servicesClients.post).toHaveBeenCalledWith(
        "https://services.test/v1/region/delete?uuid=abc-123"
      );
    });
  });
});
