describe("certificates.api", () => {
  let api;
  let httpClient;
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
    jest.doMock("@/api/servicesClients", () => ({
      __esModule: true,
      default: {
        get: jest.fn(),
        post: jest.fn(),
      },
    }));

    api = require("@/api/certificates.api");
    httpClient = require("@/api/httpClient").default;
    servicesClients = require("@/api/servicesClients").default;
    jest.clearAllMocks();
  });

  describe("httpClient endpoints", () => {
    it("calls download certificate by id endpoint", async () => {
      await api.downloadCertificateById(10, 20);

      expect(httpClient.get).toHaveBeenCalledWith(
        "https://example.test/test/batch/10/user/20/certificate"
      );
    });

    it("throws ReferenceError on download certificate by token because batch_id is undefined", () => {
      expect(() => api.downloadCertificateByToken("token-123")).toThrow(
        ReferenceError
      );
      expect(httpClient.get).not.toHaveBeenCalled();
    });

    it("calls certificates students endpoint", async () => {
      await api.getCertificatesStudents();

      expect(httpClient.get).toHaveBeenCalledWith(
        "https://example.test/certificates"
      );
    });
  });

  describe("servicesClients endpoints", () => {
    it("calls detail raport endpoint", async () => {
      await api.getDetailRaport(7, 15);

      expect(servicesClients.get).toHaveBeenCalledWith(
        "https://services.test/v1/class/rapor/detail?userId=7&classroomId=15"
      );
    });

    it("calls detail certificate endpoint", async () => {
      await api.getDetailCertificate(7, 15);

      expect(servicesClients.get).toHaveBeenCalledWith(
        "https://services.test/v1/class/certificate/detail?userId=7&classroomId=15"
      );
    });
  });
});
