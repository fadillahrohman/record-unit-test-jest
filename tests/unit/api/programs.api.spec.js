describe("programs.api", () => {
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

    api = require("@/api/programs.api");
    httpClient = require("@/api/httpClient").default;
    jest.clearAllMocks();
  });

  describe("GET endpoints", () => {
    it("calls programs list endpoint", async () => {
      await api.apiGetPrograms();
      expect(httpClient.get).toHaveBeenCalledWith(
        "https://example.test/programs"
      );
    });

    it("calls program detail endpoint", async () => {
      await api.apiGetProgramById(7);
      expect(httpClient.get).toHaveBeenCalledWith(
        "https://example.test/program/7"
      );
    });

    it("calls all programs endpoint", async () => {
      await api.apiGetAllPrograms();
      expect(httpClient.get).toHaveBeenCalledWith(
        "https://example.test/program/list"
      );
    });

    it("calls batch list endpoint", async () => {
      await api.apiGetBatch(2);
      expect(httpClient.get).toHaveBeenCalledWith(
        "https://example.test/batchs?page=2"
      );
    });

    it("calls batch by id endpoint", async () => {
      await api.apiGetBatchById(3);
      expect(httpClient.get).toHaveBeenCalledWith(
        "https://example.test/batch/program/3"
      );
    });

    it("calls cities by batch endpoint", async () => {
      await api.apiGetCitiesByBatch(11);
      expect(httpClient.get).toHaveBeenCalledWith(
        "https://example.test/program/batch/cities/11"
      );
    });

    it("calls ranking endpoint", async () => {
      await api.apiGetRanking();
      expect(httpClient.get).toHaveBeenCalledWith(
        "https://example.test/batch/rank"
      );
    });
  });

  describe("POST endpoints", () => {
    it("calls create program endpoint", async () => {
      const payload = { title: "Program" };
      await api.apiPostProgram(payload);

      expect(httpClient.post).toHaveBeenCalledWith(
        "https://example.test/program/",
        payload
      );
    });

    it("calls edit program endpoint", async () => {
      const payload = { title: "Updated Program" };
      await api.apiEditProgram(10, payload);

      expect(httpClient.post).toHaveBeenCalledWith(
        "https://example.test/program/10/edit",
        payload
      );
    });

    it("calls create batch endpoint", async () => {
      const payload = { name: "Batch Alpha" };
      await api.apiPostBatch(payload);

      expect(httpClient.post).toHaveBeenCalledWith(
        "https://example.test/programs/batch",
        payload
      );
    });

    it("calls edit batch endpoint", async () => {
      const payload = { name: "Batch Beta" };
      await api.apiEditBatch(4, payload);

      expect(httpClient.post).toHaveBeenCalledWith(
        "https://example.test/programs/batch/4/edit",
        payload
      );
    });

  });
});
