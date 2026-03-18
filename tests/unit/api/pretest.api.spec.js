describe("pretest.api", () => {
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

    api = require("@/api/pretest.api");
    httpClient = require("@/api/httpClient").default;
    jest.clearAllMocks();
  });

  describe("GET endpoints", () => {
    it("calls get pretest question endpoint", async () => {
      await api.getPretestQuestion(10);

      expect(httpClient.get).toHaveBeenCalledWith(
        "https://example.test/program/10/pretests/questions"
      );
    });

    it("calls get student pretest by id endpoint", async () => {
      await api.getStudentPretestById(1, 2, 3);

      expect(httpClient.get).toHaveBeenCalledWith(
        "https://example.test/batch/1/program/2/pretests/3"
      );
    });

    it("calls pretest metronom endpoint", async () => {
      await api.pretestMetronom(11);

      expect(httpClient.get).toHaveBeenCalledWith(
        "https://example.test/custom/module/11/metronom"
      );
    });

    it("calls pretest metronom respondents endpoint", async () => {
      await api.pretestMetronomRespondents(11, 22);

      expect(httpClient.get).toHaveBeenCalledWith(
        "https://example.test/custom/module/11/user/22/metronom"
      );
    });
  });

  describe("POST endpoints", () => {
    it("calls post pretest answer endpoint", async () => {
      const payload = {
        answer: [
          {
            question_id: 1,
            value: "A",
          },
        ],
      };

      await api.postPretestAnswer(payload);

      expect(httpClient.post).toHaveBeenCalledWith(
        "https://example.test/batch/program/pretests/answer",
        payload
      );
    });
  });
});