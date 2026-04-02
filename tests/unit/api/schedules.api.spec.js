describe("schedules.api", () => {
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

    api = require("@/api/schedules.api");
    servicesClients = require("@/api/servicesClients").default;
    jest.clearAllMocks();
  });

  it("calls schedules endpoint without params", async () => {
    await api.apiGetSchedules();

    expect(servicesClients.get).toHaveBeenCalledWith(
      "https://services.test/v1/statistics/schedules?"
    );
  });

  it("calls schedules endpoint with day param", async () => {
    await api.apiGetSchedules(15);

    expect(servicesClients.get).toHaveBeenCalledWith(
      "https://services.test/v1/statistics/schedules?day=15"
    );
  });

  it("calls schedules endpoint with day and month params", async () => {
    await api.apiGetSchedules(15, 4);

    expect(servicesClients.get).toHaveBeenCalledWith(
      "https://services.test/v1/statistics/schedules?day=15&month=4"
    );
  });

  it("calls schedules endpoint with all params", async () => {
    await api.apiGetSchedules(15, 4, 2026);

    expect(servicesClients.get).toHaveBeenCalledWith(
      "https://services.test/v1/statistics/schedules?day=15&month=4&year=2026"
    );
  });

  it("calls schedules endpoint with month and year only", async () => {
    await api.apiGetSchedules(undefined, 4, 2026);

    expect(servicesClients.get).toHaveBeenCalledWith(
      "https://services.test/v1/statistics/schedules?&month=4&year=2026"
    );
  });
});
