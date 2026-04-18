describe("statistic.api", () => {
  let api;
  let servicesClients;

  beforeEach(() => {
    process.env.servicesApi = "https://services.test/";
    jest.resetModules();
    jest.doMock("@/api/servicesClients", () => ({
      __esModule: true,
      default: {
        get: jest.fn(),
      },
    }));

    api = require("@/api/statistic.api");
    servicesClients = require("@/api/servicesClients").default;
    jest.clearAllMocks();
  });

  describe("apiGetVisitorByTopic", () => {
    it("calls visitor by topic endpoint with full params", async () => {
      await api.apiGetVisitorByTopic("article", "2026-04-01", "2026-04-30");

      expect(servicesClients.get).toHaveBeenCalledWith(
        "https://services.test/v1/statistics/post-kind/visitor?kindSlug=article&from=2026-04-01&to=2026-04-30"
      );
    });

    it("calls visitor by topic endpoint with empty query when kindSlug is missing", async () => {
      await api.apiGetVisitorByTopic(undefined, "2026-04-01", "2026-04-30");

      expect(servicesClients.get).toHaveBeenCalledWith(
        "https://services.test/v1/statistics/post-kind/visitor?"
      );
    });
  });

  describe("apiGetPostTopWeekly", () => {
    it("calls post top weekly endpoint with full params", async () => {
      await api.apiGetPostTopWeekly("article", 1, 10, "react");

      expect(servicesClients.get).toHaveBeenCalledWith(
        "https://services.test/v1/statistics/post/top-weekly?kindSlug=article&page=1&pageSize=10&search=react"
      );
    });

    it("calls post top weekly endpoint without params", async () => {
      await api.apiGetPostTopWeekly();

      expect(servicesClients.get).toHaveBeenCalledWith(
        "https://services.test/v1/statistics/post/top-weekly?"
      );
    });
  });

  describe("apiGetRadioVisitors", () => {
    it("calls radio visitors endpoint with full params", async () => {
      await api.apiGetRadioVisitors("2026-04-01", "2026-04-30");

      expect(servicesClients.get).toHaveBeenCalledWith(
        "https://services.test/v1/statistics/visitors/bharabas-radio?from=2026-04-01&to=2026-04-30"
      );
    });

    it("calls radio visitors endpoint without params", async () => {
      await api.apiGetRadioVisitors();

      expect(servicesClients.get).toHaveBeenCalledWith(
        "https://services.test/v1/statistics/visitors/bharabas-radio?"
      );
    });
  });
});
