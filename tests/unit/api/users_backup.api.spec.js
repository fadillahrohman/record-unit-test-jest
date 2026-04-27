describe("users_backup.api", () => {
  let api;
  let httpClient;
  let authClient;
  let uploadClient;

  beforeEach(() => {
    process.env.baseURL = "https://example.test/";
    process.env.baseAuthURL = "https://auth.test/";

    jest.resetModules();
    jest.doMock("@/api/httpClient", () => ({
      __esModule: true,
      default: {
        get: jest.fn(),
        post: jest.fn(),
      },
    }));
    jest.doMock("@/api/authClient", () => ({
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

    api = require("@/api/users_backup.api");
    httpClient = require("@/api/httpClient").default;
    authClient = require("@/api/authClient").default;
    uploadClient = require("@/api/uploadClient").default;

    jest.clearAllMocks();
  });

  it("calls user detail endpoint", async () => {
    await api.apiGetUserDetail(10);

    expect(httpClient.get).toHaveBeenCalledWith(
      "https://example.test/user/10/detail"
    );
  });

  it("calls user classrooms endpoint", async () => {
    await api.apiGetUserClassrooms(11);

    expect(httpClient.get).toHaveBeenCalledWith(
      "https://example.test/user/11/classrooms"
    );
  });

  it("calls user task endpoint", async () => {
    await api.apiGetUserTask(2, 12, 30);

    expect(httpClient.get).toHaveBeenCalledWith(
      "https://example.test/user/12/classroom/30/tasks?page=2"
    );
  });

  it("calls users request endpoint", async () => {
    await api.apiGetUsersRequest(3);

    expect(httpClient.get).toHaveBeenCalledWith(
      "https://example.test/students/request?page=3"
    );
  });

  it("calls approved users endpoint with all filters", async () => {
    await api.apiGetUsersApproved({
      page: 1,
      search: "budi",
      programId: 8,
      cityId: 4,
      sortBy: "name",
      sortType: "asc",
      studentStatus: 0,
    });

    expect(httpClient.get).toHaveBeenCalledWith(
      "https://example.test/students?page=1&search=budi&programId=8&cityId=4&sort=name&sortType=asc&studentStatus=0"
    );
  });

  it("calls approved users endpoint with required params only", async () => {
    await api.apiGetUsersApproved({ page: 2 });

    expect(httpClient.get).toHaveBeenCalledWith(
      "https://example.test/students?page=2"
    );
  });

  it("calls approved users by school endpoint", async () => {
    await api.apiGetUsersApprovedBySchool({
      page: 1,
      search: "andi",
      programId: 1,
      cityId: 2,
      sortBy: "createdAt",
      sortType: "desc",
      studentStatus: 1,
      schoolId: 90,
    });

    expect(httpClient.get).toHaveBeenCalledWith(
      "https://example.test/school/90/students?page=1&search=andi&programId=1&cityId=2&sort=createdAt&sortType=desc&studentStatus=1"
    );
  });

  it("calls get user by id endpoint", async () => {
    await api.apiGetUserById(5);

    expect(httpClient.get).toHaveBeenCalledWith(
      "https://example.test/student/5"
    );
  });

  it("calls create user endpoint", async () => {
    const payload = { name: "Dina" };
    await api.apiPostUser(payload);

    expect(httpClient.post).toHaveBeenCalledWith(
      "https://example.test/auth/register/students",
      payload
    );
  });
});
