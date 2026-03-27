describe("studio.api", () => {
  let api;
  let studioClients;

  beforeEach(() => {
    process.env.servicesApi = "https://services.test/";
    jest.resetModules();
    jest.doMock("@/api/studioClients", () => ({
      __esModule: true,
      default: {
        get: jest.fn(),
        post: jest.fn(),
      },
    }));

    api = require("@/api/studio.api");
    studioClients = require("@/api/studioClients").default;
    jest.clearAllMocks();
  });

  it("calls get ext endpoint without version", async () => {
    await api.apiGetExt();

    expect(studioClients.get).toHaveBeenCalledWith(
      "https://services.test/v1/metronom/ce/lang"
    );
  });

  it("calls get ext endpoint with version", async () => {
    await api.apiGetExt("1.0");

    expect(studioClients.get).toHaveBeenCalledWith(
      "https://services.test/v1/metronom/ce/lang?v=1.0"
    );
  });

  it("calls get ext endpoint with version", async () => {
    await api.apiGetExt("2.0");

    expect(studioClients.get).toHaveBeenCalledWith(
      "https://services.test/v1/metronom/ce/lang?v=2.0"
    );
  });

  it("calls get ext endpoint with version", async () => {
    await api.apiGetExt("3.0");

    expect(studioClients.get).toHaveBeenCalledWith(
      "https://services.test/v1/metronom/ce/lang?v=3.0"
    );
  });

  it("calls get ext endpoint with version", async () => {
    await api.apiGetExt("4.0");

    expect(studioClients.get).toHaveBeenCalledWith(
      "https://services.test/v1/metronom/ce/lang?v=4.0"
    );
  });

  it("calls get all studio endpoint", async () => {
    await api.apiGetAllStudio();

    expect(studioClients.get).toHaveBeenCalledWith(
      "https://services.test/v1/metronom/ce"
    );
  });

  it("calls get studio endpoint", async () => {
    await api.apiGetStudio(123);

    expect(studioClients.get).toHaveBeenCalledWith(
      "https://services.test/v1/metronom/ce/123"
    );
  });

  it("calls get studio endpoint", async () => {
    await api.apiGetStudio(5);

    expect(studioClients.get).toHaveBeenCalledWith(
      "https://services.test/v1/metronom/ce/5"
    );
  });

  it("calls get studio endpoint", async () => {
    await api.apiGetStudio(2);

    expect(studioClients.get).toHaveBeenCalledWith(
      "https://services.test/v1/metronom/ce/2"
    );
  });
});
