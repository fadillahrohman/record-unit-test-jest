const { tileLayer } = require("leaflet");

describe("assignments.api", () => {
  let api;
  let servicesClients;
  let httpClientExport;

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
    jest.doMock("@/api/httpClientExport", () => ({
      __esModule: true,
      default: {
        get: jest.fn(),
      },
    }));
    api = require("@/api/assignments.api");
    servicesClients = require("@/api/servicesClients").default;
    httpClientExport = require("@/api/httpClientExport").default;
    jest.clearAllMocks();
  });

  describe("GET endpoints", () => {
    it("calls detail assignment endpoint", async () => {
      await api.apiDetailAssignment(1);
      expect(servicesClients.get).toHaveBeenCalledWith(
        "https://services.test/v1/assignment/base/detail?topicId=1"
      );
    });

    it("calls public assignments endpoint", async () => {
      await api.apiPublicAssignments("eko", "intro-js");
      expect(servicesClients.get).toHaveBeenCalledWith(
        "https://services.test/v1/assignment/public?user=eko&slug=intro-js"
      );
    });

    it("calls assignment counter endpoint", async () => {
      await api.apiGetAssignmentCounter(1, 2);
      expect(servicesClients.get).toHaveBeenCalledWith(
        "https://services.test/v1/assignment/base/counter?classroomId=1&topicId=2"
      );
    });

    it("calls assignments list with all parameters", async () => {
      await api.apiGetAssignments(
        1,
        1,
        20,
        "desc",
        "test",
        5,
        "quiz",
        "individual",
        "course"
      );
      expect(servicesClients.get).toHaveBeenCalledWith(
        "https://services.test/v1/assignment/base/list?classroomId=1&page=1&pageSize=20&order=desc&filter.search=test&filter.moduleId=5&filter.type=quiz&filter.kind=individual&moduleType=course"
      );
    });

    it("calls assignments list with minimal parameters", async () => {
      await api.apiGetAssignments(1);
      expect(servicesClients.get).toHaveBeenCalledWith(
        "https://services.test/v1/assignment/base/list?classroomId=1"
      );
    });

    it("calls students assignment with all filters", async () => {
      await api.apiGetStudentsAssignment(
        10,
        50,
        "eko",
        90,
        "submitted",
        "desc",
        2,
        10,
        false
      );
      expect(servicesClients.get).toHaveBeenCalledWith(
        "https://services.test/v1/assignment/students?topicId=10&filter.minScore=50&filter.search=eko&filter.maxScore=90&filter.state=submitted&order=desc&page=2&pageSize=10"
      );
    });

    it("calls students assignment with export flag", async () => {
      await api.apiGetStudentsAssignment(
        1,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        true
      );
      expect(httpClientExport.get).toHaveBeenCalledWith(
        "https://services.test/v1/assignment/students?topicId=1&export=true"
      );
    });

    it("calls assignment to review list", async () => {
      await api.apiGetAssignmentToReview(1, 20, "pending", 10, "asc");
      expect(servicesClients.get).toHaveBeenCalledWith(
        "https://services.test/v1/assignment/review/list?&page=1&pageSize=20&state=pending&classroomId=10&order=asc"
      );
    });

    it("calls assignment student histories", async () => {
      await api.apiGetAssignmentStudentHistories(10, 20, 1, 15);
      expect(servicesClients.get).toHaveBeenCalledWith(
        "https://services.test/v1/assignment/base/history?&classroomId=10&topicId=20&page=1&pageSize=15"
      );
    });

    it("calls check report mentor with params", async () => {
      await api.apiCheckReportMentor({ classroomId: 1, topicId: 1 });
      expect(servicesClients.get).toHaveBeenCalledWith(
        "https://services.test/v1/assignment/check?classroomId=1&topicId=1"
      );
    });

    it("calls check report mentor without params", async () => {
      await api.apiCheckReportMentor({});
      expect(servicesClients.get).toHaveBeenCalledWith(
        "https://services.test/v1/assignment/check"
      );
    });
  });

  describe("POST endpoints", () => {
    it("calls create assignment endpoint", async () => {
      const payload = { title: "New Assignment" };
      await api.apiCreateAssignment(payload);

      expect(servicesClients.post).toHaveBeenCalledWith(
        "https://services.test/v1/assignment/base/create",
        payload
      );
    });

    it("calls edit assignment endpoint", async () => {
      const payload = { title: "Updated Assignment" };
      await api.apiEditAssignment(payload, 123);
      expect(servicesClients.post).toHaveBeenCalledWith(
        "https://services.test/v1/assignment/base/edit?topicId=123",
        payload
      );
    });

    it("calls edit assignment endpoint", async () => {
      const payload = { title: "Updated Assignment" };
      await api.apiEditAssignment(payload, 1);

      expect(servicesClients.post).toHaveBeenCalledWith(
        "https://services.test/v1/assignment/base/edit?topicId=1",
        payload
      );
    });

    it("calls delete assignment endpoint", async () => {
      await api.apiDeleteAssignment(10, 123);
      expect(servicesClients.post).toHaveBeenCalledWith(
        "https://services.test/v1/assignment/base/delete?topicId=123&classroomId=10"
      );
    });
  });
});
