describe("schools.api", () => {
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

    api = require("@/api/schools.api");
    servicesClients = require("@/api/servicesClients").default;
    jest.clearAllMocks();
  });

  describe("GET endpoints", () => {
    it("calls school list endpoint without query params", async () => {
      await api.apiList();

      expect(servicesClients.get).toHaveBeenCalledWith(
        "https://services.test/v1/school/list?"
      );
    });

    it("calls school list endpoint with all query params", async () => {
      await api.apiList(1, 20, "createdAt:desc", "harapan");

      expect(servicesClients.get).toHaveBeenCalledWith(
        "https://services.test/v1/school/list?&page=1&pageSize=20&sort=createdAt:desc&search=harapan"
      );
    });

    it("calls school students endpoint without query params", async () => {
      await api.apiStudents();

      expect(servicesClients.get).toHaveBeenCalledWith(
        "https://services.test/v1/school/student/list?"
      );
    });

    it("calls school students endpoint with all query params", async () => {
      await api.apiStudents(9, 2, 15, "name:asc", "andi");

      expect(servicesClients.get).toHaveBeenCalledWith(
        "https://services.test/v1/school/student/list?&schoolId=9&page=2&perPage=15&filter.order=name:asc&filter.search=andi"
      );
    });
  });

  describe("POST endpoints", () => {
    it("calls school active endpoint", async () => {
      await api.apiActive();

      expect(servicesClients.post).toHaveBeenCalledWith(
        "https://services.test/v1/school/active"
      );
    });

    it("calls school detail endpoint", async () => {
      await api.apiDetail(7);

      expect(servicesClients.post).toHaveBeenCalledWith(
        "https://services.test/v1/school/detail?id=7"
      );
    });

    it("calls school create endpoint", async () => {
      const payload = { name: "SMA 1" };
      await api.apiCreate(payload);

      expect(servicesClients.post).toHaveBeenCalledWith(
        "https://services.test/v1/school/create",
        payload
      );
    });

    it("calls school update endpoint", async () => {
      const payload = { name: "SMA 1 Updated" };
      await api.apiUpdate(8, payload);

      expect(servicesClients.post).toHaveBeenCalledWith(
        "https://services.test/v1/school/update?id=8",
        payload
      );
    });

    it("calls school delete endpoint", async () => {
      await api.apiDelete(12);

      expect(servicesClients.post).toHaveBeenCalledWith(
        "https://services.test/v1/school/delete?id=12"
      );
    });
  });
});