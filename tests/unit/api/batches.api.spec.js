describe("batches.api", () => {
  let api;
  let httpClient;

  beforeEach(() => {
    process.env.baseURL = "https://example.test/";
    jest.resetModules();
    jest.doMock("@/api/httpClient", () => ({
      __esModule: true,
      default: {
        get: jest.fn(),
        post: jest.fn(),
      },
    }));

    api = require("@/api/batches.api");
    httpClient = require("@/api/httpClient").default;
    jest.clearAllMocks();
  });

  describe("GET endpoints", () => {
    it("calls batch active endpoint", async () => {
      await api.getBatchActive();

      expect(httpClient.get).toHaveBeenCalledWith(
        "https://example.test/batch/active"
      );
    });

    it("calls batch detail endpoint", async () => {
      await api.getBatchDetail(12);

      expect(httpClient.get).toHaveBeenCalledWith(
        "https://example.test/batch/active/12"
      );
    });
  });

  describe("POST endpoints", () => {
    it("calls join batch endpoint", async () => {
      await api.setJoinBatch(12);

      expect(httpClient.post).toHaveBeenCalledWith(
        "https://example.test//batch/12/join"
      );
    });

    it("calls release approval endpoint", async () => {
      await api.postReleaseApproval(12);

      expect(httpClient.post).toHaveBeenCalledWith(
        "https://example.test//batch/12/approval/release"
      );
    });
  });
});
