describe("drive.api", () => {
  let api;
  let servicesClients;

  beforeEach(() => {
    process.env.baseUrlDrive = "https://drive.test/";
    jest.resetModules();
    jest.doMock("@/api/servicesClients", () => ({
      __esModule: true,
      default: {
        get: jest.fn(),
        post: jest.fn(),
      },
    }));

    api = require("@/api/drive.api");
    servicesClients = require("@/api/servicesClients").default;
    jest.clearAllMocks();
  });

  it("calls drive assets endpoint", async () => {
    await api.apiGetDriveAssets("folder/images");

    expect(servicesClients.get).toHaveBeenCalledWith(
      "https://drive.test/v1/folder/images"
    );
  });

  it("calls upload drive assets endpoint", async () => {
    const payload = { fileName: "banner.png" };
    await api.apiUploadDriveAssets(payload);

    expect(servicesClients.post).toHaveBeenCalledWith(
      "https://drive.test/v1/upload",
      payload
    );
  });
});
