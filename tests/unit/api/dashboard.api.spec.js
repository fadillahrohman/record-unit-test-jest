describe("dashboard.api", () => {
  let api;
  let servicesClients;

  beforeEach(() => {
    process.env.servicesApi = "https://services.test/";
    jest.resetModules();
    jest.doMock("@/api/servicesClients", () => ({
      __esModule: true,
      default: {
        get: jest.fn(),
      },
    }));

    api = require("@/api/dashboard.api");
    servicesClients = require("@/api/servicesClients").default;
    jest.clearAllMocks();
  });

  it("calls student funnel endpoint", async () => {
    await api.apiGetStudentFunnel("2026-03", 10);

    expect(servicesClients.get).toHaveBeenCalledWith(
      "https://services.test/v1/statistics/students/funnel?month=2026-03&classroomId=10"
    );
  });

  it("calls assignment rate endpoint", async () => {
    await api.apiGetAssignmentRate("2026-03", 10);

    expect(servicesClients.get).toHaveBeenCalledWith(
      "https://services.test/v1/statistics/assignment/rate?month=2026-03&classroomId=10"
    );
  });

  it("calls assignment monitor endpoint", async () => {
    await api.apiGetAssignmentMonitor("2026-03-01", "2026-03-31", 10);

    expect(servicesClients.get).toHaveBeenCalledWith(
      "https://services.test/v1/statistics/assignment/monitor?start=2026-03-01&end=2026-03-31&classroomId=10"
    );
  });

  it("calls weekly student endpoint", async () => {
    await api.apiGetWeeklyStudent(10);

    expect(servicesClients.get).toHaveBeenCalledWith(
      "https://services.test/v1/statistics/student/top/weekly?&classroomId=10"
    );
  });

  it("calls active class endpoint", async () => {
    await api.apiGetActiveClass();

    expect(servicesClients.get).toHaveBeenCalledWith(
      "https://services.test/v1/statistics/class/active/latest"
    );
  });

  it("calls active class endpoint", async () => {
    await api.apiGetActiveClass();

    expect(servicesClients.get).toHaveBeenCalledWith(
      "https://services.test/v1/statistics/class/active/latest"
    );
  });

  it("calls latest assignment endpoint", async () => {

    await api.apiGetLatestAssignment();

    expect(servicesClients.get).toHaveBeenCalledWith(
      "https://services.test/v1/statistics/assignments/latest"
    );
  });

  it("calls daily login endpoint", async () => {
    await api.apiGetDailyLogin();

    expect(servicesClients.get).toHaveBeenCalledWith(
      "https://services.test/v1/statistics/login/daily"
    );
  }); 

  it("calls visitor endpoint", async () => {
    await api.apiGetVisitor("daily", "2026-04-01", "2026-04-31");

    expect(servicesClients.get).toHaveBeenCalledWith(
      "https://services.test/v1/statistics/visitors?kind=daily&from=2026-04-01&to=2026-04-31"
    );
  });

  it("calls visited class endpoint", async () => {
    await api.apiGetVisitedClass("2026-04-01", "2026-04-31");

    expect(servicesClients.get).toHaveBeenCalledWith(
      "https://services.test/v1/statistics/class/visitors?from=2026-04-01&to=2026-04-31"
    );
  });

  it("calls program participants endpoint", async () => {
    await api.apiGetProgramParticipants();

    expect(servicesClients.get).toHaveBeenCalledWith(
      "https://services.test//v1/statistics/program/participants"
    );
  });

  it("calls attendance statistics endpoint", async () => {
    await api.apiGetAttendanceStatistics(12, "weekly");

    expect(servicesClients.get).toHaveBeenCalledWith(
      "https://services.test/v1/statistics/attendances?classId=12&type=weekly"
    );
  });
});
