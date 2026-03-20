describe("announcement.api", () => {
  let api;
  let httpClient;

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
    api = require("@/api/announcement.api");
    httpClient = require("@/api/httpClient").default;
    jest.clearAllMocks();
  });

  it("calls list endpoint with page", async () => {
    await api.apiGetAnnouncementList(1);

    expect(httpClient.get).toHaveBeenCalledWith(
      "https://example.test/announcements/dashboard?page=1"
    );
  });

  it("calls list endpoint with page", async () => {
    await api.apiGetAnnouncementList(5);
    expect(httpClient.get).toHaveBeenCalledWith(
      "https://example.test/announcements/dashboard?page=5"
    );
  });

  it("calls auth list endpoint", async () => {
    await api.apiGetAnnouncementAuth();
    expect(httpClient.get).toHaveBeenCalledWith(
      "https://example.test/announcements"
    );
  });

  it("calls detail endpoint", async () => {
    await api.apiGetAnnouncementDetail(1);
    expect(httpClient.get).toHaveBeenCalledWith(
      "https://example.test/announcement/1"
    );
  });

  it("calls detaul endpoint", async () => {
    await api.apiGetAnnouncementDetail(15);
    expect(httpClient.get).toHaveBeenCalledWith(
      "https://example.test/announcement/15"
    );
  });

  it("calls create endpoint", async () => {
    const payload = { title: "Announcement" };
    await api.apiPostAnnouncement(payload);
    expect(httpClient.post).toHaveBeenCalledWith(
      "https://example.test/announcement",
      payload
    );
  });

  it("calls create endpoint", async () => {
    const payload = { title: "Hello" };
    await api.apiPostAnnouncement(payload);
    expect(httpClient.post).toHaveBeenCalledWith(
      "https://example.test/announcement",
      payload
    );
  });

  it("calls edit endpoint", async () => {
    const payload = { title: "Update Announcement" };
    await api.apiEditAnnouncement(1, payload);

    expect(httpClient.post).toHaveBeenCalledWith(
      "https://example.test/announcement/1",
      payload
    );
  });

  it("calls edit endpoint", async () => {
    const payload = { title: "Update" };
    await api.apiEditAnnouncement(10, payload);

    expect(httpClient.post).toHaveBeenCalledWith(
      "https://example.test/announcement/10",
      payload
    );
  });

  it("calls delete endpoint", async () => {
    await api.apiDeleteAnnouncement(5);
    expect(httpClient.post).toHaveBeenCalledWith(
      "https://example.test/announcement/5/delete"
    );
  });

  it("calls delete endpoint", async () => {
    await api.apiDeleteAnnouncement(1);
    expect(httpClient.post).toHaveBeenCalledWith(
      "https://example.test/announcement/1/delete"
    );
  });
});
