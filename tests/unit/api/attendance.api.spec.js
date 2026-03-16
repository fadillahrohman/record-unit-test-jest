describe("attendance.api", () => {
  let api;
  let servicesClients;

  beforeEach(() => {
    process.env.servicesApi = "https://services.test/";
    jest.resetModules();
    jest.doMock("@/api/servicesClients", () => ({
      __esModule: true,
      default: {
        post: jest.fn(),
      },
    }));
    api = require("@/api/attendance.api");
    servicesClients = require("@/api/servicesClients").default;
    jest.clearAllMocks();
  });

  it("calls scan QR endpoint", async () => {
    const payload = { qrCode: "ABC123", userId: 10 };
    await api.apiScanQR(payload);

    expect(servicesClients.post).toHaveBeenCalledWith(
      "https://services.test/v1/attendance/record/qr",
      payload
    );
  });
});
