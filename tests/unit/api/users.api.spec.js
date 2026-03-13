const { onActivated } = require("vue");

describe("users.api", () => {
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
    api = require("@/api/users.api");
    servicesClients = require("@/api/servicesClients").default;
    jest.clearAllMocks();
  });

  it("calls list endpoint with filters", async () => {
    await api.apiGetUsers(1, "student", "john", true, true);

    expect(servicesClients.get).toHaveBeenCalledWith(
      "https://services.test/v1/chat/user/list?page=1&kind=student&keyword=john&certified=true"
    );
  });

  it("calls list endpoint without chat flag", async () => {
    await api.apiGetUsers(2, "mentor");

    expect(servicesClients.get).toHaveBeenCalledWith(
      "https://services.test/v1/user/list?page=2&kind=mentor"
    );
  });

  it("calls detail endpoint", async () => {
    await api.apiGetDetailUser(10);

    expect(servicesClients.get).toHaveBeenCalledWith(
      "https://services.test/v1/user/detail?userId=10"
    );
  });

  it("calls detail endpoint", async () => {
    await api.apiGetDetailUser(5);

    expect(servicesClients.get).toHaveBeenCalledWith(
      "https://services.test/v1/user/detail?userId=5"
    );
  });

  it("calls create endpoint", async () => {
    const payload = { name: "Eko" };
    await api.apiPostUser(payload);

    expect(servicesClients.post).toHaveBeenCalledWith(
      "https://services.test/v1/user/create",
      payload
    );
  });

  it("calls create endpoint", async () => {
    const payload = { name: "Walik" };
    await api.apiPostUser(payload);

    expect(servicesClients.post).toHaveBeenCalledWith(
      "https://services.test/v1/user/create",
      payload
    );
  });

  it("calls edit endpoint", async () => {
    const payload = { name: "Updated" };
    await api.apiEditUser(5, payload);

    expect(servicesClients.post).toHaveBeenCalledWith(
      "https://services.test/v1/user/edit?userId=5",
      payload
    );
  });

  it("calls edit endpoint", async () => {
    const payload = { name: "Update User" };
    await api.apiEditUser(12, payload);

    expect(servicesClients.post).toHaveBeenCalledWith(
      "https://services.test/v1/user/edit?userId=12",
      payload
    );
  });
});
