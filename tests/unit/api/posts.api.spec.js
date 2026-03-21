describe("posts.api", () => {
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
    api = require("@/api/posts.api");
    servicesClients = require("@/api/servicesClients").default;
    jest.clearAllMocks();
  });

  describe("GET endpoints", () => {
    it("calls posts list with page and kind", async () => {
      await api.apiGetPosts(1, "article");

      expect(servicesClients.get).toHaveBeenCalledWith(
        "https://services.test/v1/post/list?page=1&kind=article"
      );
    });

    it("calls posts list with only page", async () => {
      await api.apiGetPosts(2);

      expect(servicesClients.get).toHaveBeenCalledWith(
        "https://services.test/v1/post/list?page=2"
      );
    });

    it("calls posts list with only kind", async () => {
      await api.apiGetPosts(null, "news");

      expect(servicesClients.get).toHaveBeenCalledWith(
        "https://services.test/v1/post/list?&kind=news"
      );
    });

    it("calls posts list without parameters", async () => {
      await api.apiGetPosts();

      expect(servicesClients.get).toHaveBeenCalledWith(
        "https://services.test/v1/post/list?"
      )
    })

    it("calls detail post v1 endpoint", async () => {
      await api.apiGetDetailPost(123);
      expect(servicesClients.get).toHaveBeenCalledWith(
        "https://services.test/v1/post/detail?id=123"
      );
    });

    it("calls detail post v2 endpoint", async () => {
      await api.apiGetDetailPostV2("intro-javascript");

      expect(servicesClients.get).toHaveBeenCalledWith(
        "https://services.test/v2/post/detail?slug=intro-javascript"
      );
    });

    it("calls delete post endpoint", async () => {
      await api.apiDeletePost(123);

      expect(servicesClients.get).toHaveBeenCalledWith(
        "https://services.test/v1/post/delete?id=123"
      );
    });
  });

  describe("POST endpoints", () => {
    it("calls create post endpoint", async () => {
      const payload = { title: "New Post", content: "Content" };
      await api.apiCreatePost(payload);

      expect(servicesClients.post).toHaveBeenCalledWith(
        "https://services.test/v1/post/create",
        payload
      );
    });

    it("calls edit post endpoint", async () => {
      const payload = { title: "Updated Post" };
      await api.apiEditPost(123, payload);

      expect(servicesClients.post).toHaveBeenCalledWith(
        "https://services.test/v1/post/update?id=123",
        payload
      );
    });
  });
});
