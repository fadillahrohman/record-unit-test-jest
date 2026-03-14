describe("topic.api", () => {
  let api;
  let servicesClient;

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

    api = require("@/api/topic.api");
    servicesClient = require("@/api/servicesClients").default;
    jest.clearAllMocks();
  });

  it("calls get topic endpoint", async () => {
    await api.apiGetTopic(10);

    expect(servicesClient.get).toHaveBeenCalledWith(
      "https://services.test/v1/topics/ce/10"
    );
  });

  it("calls create topic endpoint", async () => {
    const payload = { title: "New Topic" };
    await api.apiCreateTopic(payload);

    expect(servicesClient.post).toHaveBeenCalledWith(
      "https://services.test/v1/topics",
      payload
    );
  });

  it("calls edit topic endpoint", async () => {
    const payload = { title: "Edited Topic" };
    await api.apiEditTopic(4, payload);

    expect(servicesClient.post).toHaveBeenCalledWith(
      "https://services.test/v1/topics/4/edit",
      payload
    );
  });

  it("calls delete topic endpoint", async () => {
    await api.apiDeleteTopic(7);

    expect(servicesClient.post).toHaveBeenCalledWith(
      "https://services.test/v1/topics/7/delete"
    );
  });

  it("calls list endpoint with all filters", async () => {
    await api.apiGetListTopic(2, "public", "javascript");

    expect(servicesClient.get).toHaveBeenCalledWith(
      "https://services.test/v1/topics?page=2&kind=public&search=javascript"
    );
  });

  it("calls list endpoint without filters", async () => {
    await api.apiGetListTopic();

    expect(servicesClient.get).toHaveBeenCalledWith(
      "https://services.test/v1/topics?"
    );
  });
});