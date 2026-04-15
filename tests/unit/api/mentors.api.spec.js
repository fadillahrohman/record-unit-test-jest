describe("mentors.api", () => {
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

    api = require("@/api/mentors.api");
    httpClient = require("@/api/httpClient").default;
    jest.clearAllMocks();
  });

  it("calls active mentors endpoint", async () => {
    await api.apiGetMentors();

    expect(httpClient.get).toHaveBeenCalledWith(
      "https://example.test/active/mentors"
    );
  });
});
