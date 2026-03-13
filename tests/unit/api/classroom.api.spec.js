describe("classroom.api", () => {
  let api;
  let httpClient;
  let httpClientExport;
  let uploadClient;

  beforeEach(() => {
    process.env.servicesApi = "https://services.test/";
    jest.resetModules();
    jest.doMock("@/api/httpClient", () => ({
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
    jest.doMock("@/api/uploadClient", () => ({
      __esModule: true,
      default: {
        post: jest.fn(),
      },
    }));
    api = require("@/api/classroom.api");
    httpClient = require("@/api/httpClient").default;
    httpClientExport = require("@/api/httpClientExport").default;
    uploadClient = require("@/api/uploadClient").default;
    jest.clearAllMocks();
  });

  describe("GET endpoints", () => {
    it("calls classroom list endpoint", async () => {
      await api.apiGetClassroomList(2);
      expect(httpClient.get).toHaveBeenCalledWith(
        "https://services.test/classrooms?page=2"
      );
    });

    it("calls active classroom endpoint", async () => {
      await api.apiGetActiveClassroom();
      expect(httpClient.get).toHaveBeenCalledWith(
        "https://services.test/classroom/active"
      );
    });

    it("calls classroom detail endpoint", async () => {
      await api.apiGetClassroomDetail(1);
      expect(httpClient.get).toHaveBeenCalledWith(
        "https://services.test/classroom/1"
      );
    });

    it("calls classroom module tasks endpoint", async () => {
      await api.apiGetClassroomModuleTasks(10, 5, 2);
      expect(httpClient.get).toHaveBeenCalledWith(
        "https://services.test/classroom/10/module/5/tasks?page=2"
      );
    });

    it("calls classroom task detail endpoint", async () => {
      await api.apiGetClassroomTaskDetail(10, 5, 20);
      expect(httpClient.get).toHaveBeenCalledWith(
        "https://services.test/classroom/10/module/5/student/20/task"
      );
    });

    it("calls student task list endpoint", async () => {
      await api.apiGetStudentTaskList(1, 20);
      expect(httpClient.get).toHaveBeenCalledWith(
        "https://services.test/classroom/student/20/tasks?page=1"
      );
    });

    it("calls form respondents endpoint", async () => {
      await api.apiFormRespondents(100);
      expect(httpClient.get).toHaveBeenCalledWith(
        "https://services.test/classroom/module/form/100"
      );
    });

    it("calls check generate class endpoint", async () => {
      await api.apiCekGenerateClass();
      expect(httpClient.get).toHaveBeenCalledWith(
        "https://services.test/classrooms/student/ungenerated"
      );
    });

    it("calls get progress endpoint", async () => {
      await api.apiGetProgress();
      expect(httpClient.get).toHaveBeenCalledWith(
        "https://services.test/classroom/progress"
      );
    });

    it("calls leaderboards endpoint", async () => {
      await api.apiLeaderboards(10);
      expect(httpClient.get).toHaveBeenCalledWith(
        "https://services.test/classroom/10/leaderboards"
      );
    });

    it("calls leaderboards export endpoint", async () => {
      await api.apiLeaderboardsExport(1);
      expect(httpClientExport.get).toHaveBeenCalledWith(
        "https://services.test/classroom/1/leaderboards/export"
      );
    });

    it("calls class payment recap with default params", async () => {
      await api.apiGetClassPaymentRecap("intro-js");
      expect(httpClient.get).toHaveBeenCalledWith(
        "https://services.test/v1/class/payment/recap?class_slug=intro-js&page=1&per_page=10"
      );
    });

    it("calls payment reveneu endpoint", async () => {
      await api.apiGetPaymentRevenue("intro-js");
      expect(httpClient.get).toHaveBeenCalledWith(
        "https://services.test/v1/payment/revenue?class_slug=intro-js"
      );
    });
  });

  describe("POST endpoints", () => {
    it("calls create classroom endpoint", async () => {
      const payload = { name: "New Class" };
      await api.apiCreateClassroom(payload);
      expect(httpClient.post).toHaveBeenCalledWith(
        "https://services.test/classroom",
        payload
      );
    });

    it("calls edit classroom endpoint", async () => {
      const payload = { name: "Updated Class" };
      await api.apiEditClassroom(1, payload);

      expect(httpClient.post).toHaveBeenCalledWith(
        "https://services.test/classroom/1/edit",
        payload
      );
    });

    it("calls start classroom endpoint", async () => {
      const payload = { meetUrl: "https://meet.test" };
      await api.apiStartClassroom(10, payload);
      9;
      expect(httpClient.post).toHaveBeenCalledWith(
        "https://services.test/classroom/10/meet",
        payload
      );
    });

    it("calls student assign task endpoint", async () => {
      const payload = { file: "test.pdf" };
      await api.apiStudentAssignTask(1, 2, payload);

      expect(uploadClient.post).toHaveBeenCalledWith(
        "https://services.test/classroom/1/module/2/task/assign",
        payload
      );
    });

    it("calls mentor verify task endpoint", async () => {
      const payload = { score: 90 };
      await api.apiMentorVerifyTask(10, 5, 20, payload);

      expect(httpClient.post).toHaveBeenCalledWith(
        "https://services.test/classroom/10/module/5/student/20/task/verify",
        payload
      );
    });
    v;

    it("calls create user editor endpoint", async () => {
      const payload = { userId: 10 };

      await api.apiCreateUserEditor(payload);
      expect(httpClient.post).toHaveBeenCalledWith(
        "https://services.test/user/editor",
        payload
      );
    });

    it("calls add form endpoint", async () => {
      const payload = { formId: 100 };
      await api.apiAddForm(10, 5, payload);

      expect(httpClient.post).toHaveBeenCalledWith(
        "https://services.test/classroom/10/module/5/form",
        payload
      );
    });

    it("calls start form answer endpoint", async () => {
      await api.apiStartFormAnswer(10, 5);
      expect(httpClient.post).toHaveBeenCalledWith(
        "https://services.test/classroom/10/module/5/form/start"
      );
    });

    it("calls pinned classrooms endpoint", async () => {
      const payload = { classroomIds: [1, 2, 3] };
      await api.apiPinnedClassrooms(payload);

      expect(httpClient.post).toHaveBeenCalledWith(
        "https://services.test/v1/class/pinned",
        payload
      );
    });
  });
});
