describe("blog.api", () => {
  let api;
  let httpClient;
  let uploadClient;
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
    jest.doMock("@/api/uploadClient", () => ({
      __esModule: true,
      default: {
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

    api = require("@/api/blog.api");
    httpClient = require("@/api/httpClient").default;
    uploadClient = require("@/api/uploadClient").default;
    servicesClients = require("@/api/servicesClients").default;
    jest.clearAllMocks();
  });

  describe("Blog endpoints", () => {
    it("calls blog list endpoint", async () => {
      await api.apiGetBlogList(2);

      expect(httpClient.get).toHaveBeenCalledWith(
        "https://example.test/blogs?page=2"
      );
    });

    it("calls blog detail endpoint", async () => {
      await api.apiGetBlogDetail(9);

      expect(httpClient.get).toHaveBeenCalledWith(
        "https://example.test/blog/9"
      );
    });

    it("calls create blog endpoint", async () => {
      const payload = { title: "New Blog" };
      await api.apiPostBlog(payload);

      expect(uploadClient.post).toHaveBeenCalledWith(
        "https://example.test/blog",
        payload
      );
    });

    it("calls edit blog endpoint", async () => {
      const payload = { title: "Updated Blog" };
      await api.apiEditBlog(9, payload);

      expect(uploadClient.post).toHaveBeenCalledWith(
        "https://example.test/blog/9",
        payload
      );
    });

    it("calls delete blog endpoint", async () => {
      await api.apiDeleteBlog(9);

      expect(httpClient.post).toHaveBeenCalledWith(
        "https://example.test/blog/9/delete"
      );
    });
  });

  describe("Category endpoints", () => {
    it("calls category list endpoint with page", async () => {
      await api.apiCategories(3);
      expect(servicesClients.get).toHaveBeenCalledWith(
        "https://services.test/v2/post/category?page=3"
      );
    });

    it("calls category list endpoint without page", async () => {
      await api.apiCategories();
      expect(servicesClients.get).toHaveBeenCalledWith(
        "https://services.test/v2/post/category"
      );
    });

    it("calls create category endpoint", async () => {
      const payload = { name: "Tech" };
      await api.apiCreateCategories(payload);
      expect(servicesClients.post).toHaveBeenCalledWith(
        "https://services.test/v2/post/category/create",
        payload
      );
    });

    it("calls detail category endpoint", async () => {
      await api.apiDetailCategories("frontend");
      expect(servicesClients.post).toHaveBeenCalledWith(
        "https://services.test/v2/post/category/detail?categorySlug=frontend"
      );
    });

    it("calls edit category endpoint", async () => {
      const payload = { name: "Frontend" };
      await api.apiEditCategories("frontend", payload);
      expect(servicesClients.post).toHaveBeenCalledWith(
        "https://services.test/v2/post/category/update?categorySlug=frontend",
        payload
      );
    });

    it("calls delete category endpoint", async () => {
      await api.apiDeleteCategories(12);
      expect(servicesClients.post).toHaveBeenCalledWith(
        "https://services.test/v2/post/category/delete?categoryId=12"
      );
    });

    it("calls deletee category endpoint", async () => {
      await api.apiDeleteCategories(10);
      expect(servicesClients.post).toHaveBeenCalledWith(
        "https://services.test/v2/post/category/delete?categoryId=10"
      );
    });
  });
});
