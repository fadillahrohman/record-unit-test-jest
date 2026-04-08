describe("projects.api", () => {
  let api;
  let httpClient;
  let uploadClient;

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
    jest.doMock("@/api/uploadClient", () => ({
      __esModule: true,
      default: {
        post: jest.fn(),
      },
    }));
    api = require("@/api/projects.api");
    httpClient = require("@/api/httpClient").default;
    uploadClient = require("@/api/uploadClient").default;
    jest.clearAllMocks();
  });

  describe("GET endpoints", () => {
    it("calls user bid endpoint", async () => {
      await api.apiGetUserBid();

      expect(httpClient.get).toHaveBeenCalledWith(
        "https://example.test/projects/bids"
      );
    });

    it("calls projects list endpoint", async () => {
      await api.apiGetProjects(1);

      expect(httpClient.get).toHaveBeenCalledWith(
        "https://example.test/projects?page=1"
      );
    });

    it("calls projects availablee endpoint", async () => {
      await api.apiGetProjectsAvailable(2);

      expect(httpClient.get).toHaveBeenCalledWith(
        "https://example.test/projects/available?page=2"
      );
    });

    it("calls project detail endpoint", async () => {
      await api.apiGetProjectDetail(10);

      expect(httpClient.get).toHaveBeenCalledWith(
        "https://example.test/project/10"
      );
    });

    it("calls search jobs endpoint", async () => {
      await api.apiSearchJobs("javascript");

      expect(httpClient.get).toHaveBeenCalledWith(
        "https://example.test/jobs/javascript"
      );
    });
  });
});
