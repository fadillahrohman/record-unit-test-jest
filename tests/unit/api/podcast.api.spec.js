describe("podcast.api", () => {
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

    api = require("@/api/podcast.api");
    servicesClients = require("@/api/servicesClients").default;
    jest.clearAllMocks();
  });

  describe("GET endpoint", () => {
    it("calls podcast list endpoint", async () => {
      await api.apiGetPodcastList(2);

      expect(servicesClients.get).toHaveBeenCalledWith(
        "https://services.test/v1/podcast/list?page=2"
      );
    });
  });

  describe("POST endpoints", () => {
    it("calls create podcast endpoint", async () => {
      const payload = { title: "Episode 1" };
      await api.apiPostPodcast(payload);

      expect(servicesClients.post).toHaveBeenCalledWith(
        "https://services.test/v1/podcast/create",
        payload
      );
    });

    it("calls delete podcast endpoint", async () => {
      await api.apiDeletePodcast(9);

      expect(servicesClients.post).toHaveBeenCalledWith(
        "https://services.test/v1/podcast/delete?id=9"
      );
    });

    it("calls podcast detail endpoint", async () => {
      await api.apiGetPodcastDetail(9);

      expect(servicesClients.post).toHaveBeenCalledWith(
        "https://services.test/v1/podcast/detail?id=9"
      );
    });

    it("calls edit podcast endpoint", async () => {
      const payload = { title: "Episode 1 Updated" };
      await api.apiEditPodcast(9, payload);

      expect(servicesClients.post).toHaveBeenCalledWith(
        "https://services.test/v1/podcast/update?id=9",
        payload
      );
    });
  });
});
