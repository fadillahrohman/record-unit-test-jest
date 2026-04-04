describe("cities.api", () => {
  let api;
  let httpClient;
  let servicesClients;

  beforeEach(() => {
    process.env.baseURL = "https://example.test/";
    process.env.servicesApi = "https://services.test/";
    jest.resetModules();
    jest.doMock("@/api/httpClient", () => ({
      __esModule: true,
      default: {
        get: jest.fn(),
        post: jest.fn(),
      },
    }));
    jest.doMock("@/api/servicesClients", () => ({
      __esModule: true,
      default: {
        get: jest.fn(),
        post: jest.fn(),
      },
    }));

    api = require("@/api/cities.api");
    httpClient = require("@/api/httpClient").default;
    servicesClients = require("@/api/servicesClients").default;
    jest.clearAllMocks();
  });

  it("calls location cities endpoint", async () => {
    await api.apiGetLocationCities();

    expect(servicesClients.get).toHaveBeenCalledWith(
      "https://services.test/v1/location/cities"
    );
  });

  it("calls cities list endpoint", async () => {
    await api.apiGetCities();

    expect(httpClient.get).toHaveBeenCalledWith("https://example.test/cities");
  });

  it("calls available cities endpoint", async () => {
    await api.apiGetAvailableCities(4, 9);

    expect(httpClient.get).toHaveBeenCalledWith(
      "https://example.test//batch/4/program/9/cities"
    );
  });

  it("calls search cities endpoint", async () => {
    await api.apiSearchCities("jakarta");

    expect(httpClient.get).toHaveBeenCalledWith(
      "https://example.test/cities/jakarta"
    );
  });
});
