describe("newsletter.api", () => {
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

    api = require("@/api/newsletter.api");
    servicesClients = require("@/api/servicesClients").default;
    jest.clearAllMocks();
  });

  describe("Newsletter endpoints", () => {
    it("calls newsletter list endpoint without params", async () => {
      await api.apiGetNewsletterList({});

      expect(servicesClients.get).toHaveBeenCalledWith(
        "https://services.test/v1/newsletter/list?"
      );
    });

    it("calls newsletter list endpoint with all params", async () => {
      await api.apiGetNewsletterList({
        page: 2,
        pageSize: 20,
        filter: "active",
      });

      expect(servicesClients.get).toHaveBeenCalledWith(
        "https://services.test/v1/newsletter/list?&page=2&pageSize=20&filter=active"
      );
    });

    it("calls newsletter detail endpoint", async () => {
      await api.apiGetNewsletterDetail("weekly-news");

      expect(servicesClients.get).toHaveBeenCalledWith(
        "https://services.test/v1/newsletter/detail?slug=weekly-news"
      );
    });

    it("calls create newsletter endpoint", async () => {
      const payload = { title: "April Newsletter" };
      await api.apiPostNewsletter(payload);

      expect(servicesClients.post).toHaveBeenCalledWith(
        "https://services.test/v1/newsletter/create",
        payload
      );
    });

    it("calls unsubscribe newsletter endpoint", async () => {
      await api.apiUnsubsNewsletter();

      expect(servicesClients.post).toHaveBeenCalledWith(
        "https://services.test/v0/cms/newsletter/unsubs"
      );
    });

    it("calls import newsletter endpoint with multipart header", async () => {
      const filePayload = { file: "dummy-file" };
      await api.apiImportNewsletterV2(filePayload);

      expect(servicesClients.post).toHaveBeenCalledWith(
        "https://services.test/v1/newsletter/import",
        filePayload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    });
  });

  describe("Newsletter classrooms endpoint", () => {
    it("calls classrooms list endpoint without params", async () => {
      await api.fetchNewsletterClassrooms({});

      expect(servicesClients.get).toHaveBeenCalledWith(
        "https://services.test/v1/newsletter/class?"
      );
    });

    it("calls classrooms list endpoint with all params", async () => {
      await api.fetchNewsletterClassrooms({
        page: 3,
        pageSize: 10,
        search: "kelas A",
      });

      expect(servicesClients.get).toHaveBeenCalledWith(
        "https://services.test/v1/newsletter/class?&page=3&pageSize=10&search=kelas A"
      );
    });
  });
});
