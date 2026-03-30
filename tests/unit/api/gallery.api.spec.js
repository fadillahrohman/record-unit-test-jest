describe("gallery.api", () => {
  let api;
  let httpClient;
  let uploadClient;

  beforeEach(() => {
    process.env.baseURL = "https://example.test/";
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

    api = require("@/api/gallery.api");
    httpClient = require("@/api/httpClient").default;
    uploadClient = require("@/api/uploadClient").default;
    jest.clearAllMocks();
  });

  it("calls gallery list endpoint", async () => {
    await api.apiGetGalleryList(2);

    expect(httpClient.get).toHaveBeenCalledWith(
      "https://example.test/galleries?page=2"
    );
  });

  it("calls gallery detail endpoint", async () => {
    await api.apiGetGalleryDetail(9);

    expect(httpClient.get).toHaveBeenCalledWith(
      "https://example.test/gallery/9"
    );
  });

  it("calls create gallery endpoint", async () => {
    const payload = { title: "Gallery Item" };
    await api.apiPostGallery(payload);

    expect(uploadClient.post).toHaveBeenCalledWith(
      "https://example.test/gallery",
      payload
    );
  });
});
