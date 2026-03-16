describe("courses.api", () => {
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
    api = require("@/api/courses.api");
    httpClient = require("@/api/httpClient").default;
    servicesClients = require("@/api/servicesClients").default;
    jest.clearAllMocks();
  });

  describe("Course endpoints - httpClient", () => {
    it("calls courses list endpoint", async () => {
      await api.apiGetCourses(2);

      expect(httpClient.get).toHaveBeenCalledWith(
        "https://example.test/courses?page=2"
      );
    });

    it("calls course by id endpoint", async () => {
      await api.apiGetCoursesById(10);

      expect(httpClient.get).toHaveBeenCalledWith(
        "https://example.test/course/10"
      );
    });

    it("calls create course endpoint", async () => {
      const payload = { name: "New Course" };

      await api.apiPostCourse(payload);

      expect(httpClient.post).toHaveBeenCalledWith(
        "https://example.test/course",
        payload
      );
    });

    it("calls edit course endpoint", async () => {
      const payload = { name: "Updated Course" };
      await api.apiEditCourse(10, payload);

      expect(httpClient.post).toHaveBeenCalledWith(
        "https://example.test/course/10/edit",
        payload
      );
    });

    it("calls delete course endpoint", async () => {
      await api.apiDeleteCourse(10);

      expect(httpClient.get).toHaveBeenCalledWith(
        "https://example.test/course/10/delete"
      );
    });

    it("calls courses all endpoint", async () => {
      await api.apiGetCoursesAll();

      expect(httpClient.get).toHaveBeenCalledWith(
        "https://example.test/courses/all"
      );
    });
  });

  describe("Module endpoints - httpClient", () => {
    it("calls module by id endpoint", async () => {
      await api.apiGetModulesById(5);
      expect(httpClient.get).toHaveBeenCalledWith(
        "https://example.test/course/module/5"
      );
    });

    it("calls modules by course id endpoint", async () => {
      await api.apiGetModulesByCourseId(10, 2);
      expect(httpClient.get).toHaveBeenCalledWith(
        "https://example.test/course/10/modules?page=2"
      );
    });

    it("calls get forms endpoint", async () => {
      await api.apiGetForms(10, 5);
      expect(httpClient.get).toHaveBeenCalledWith(
        "https://example.test/classroom/10/module/5"
      );
    });

    it("calls modules by classroom id endpoint", async () => {
      await api.apiGetModulesByClassroomId(10, 5, 20);
      expect(httpClient.get).toHaveBeenCalledWith(
        "https://example.test/classroom/10/module/5/student/20/task"
      );
    });

    it("calls create module endpoint", async () => {
      const payload = { name: "New Module" };
      await api.apiPostModule(payload);
      expect(httpClient.post).toHaveBeenCalledWith(
        "https://example.test/course/module",
        payload
      );
    });

    it("calls edit module endpoint", async () => {
      const payload = { name: "Updated Module" };
      await api.apiEditModule(5, payload);
      expect(httpClient.post).toHaveBeenCalledWith(
        "https://example.test/course/module/5",
        payload
      );
    });

    it("calls delete module endpoint", async () => {
      await api.apiDeleteModule(5);
      expect(httpClient.post).toHaveBeenCalledWith(
        "https://example.test/course/module/5/delete"
      );
    });

    it("calls silabus by program id endpoint", async () => {
      await api.apiGetSilabusByProgramId(15);
      expect(httpClient.get).toHaveBeenCalledWith(
        "https://example.test/silabus/15"
      );
    });

    it("calls module extension endpoint", async () => {
      await api.apiGetModuleExtension();
      expect(httpClient.get).toHaveBeenCalledWith(
        "https://example.test/ce/extensions"
      );
    });

    it("calls add form endpoint", async () => {
      const payload = { formId: 100 };
      await api.apiAddForm(5, payload);
      expect(httpClient.post).toHaveBeenCalledWith(
        "https://example.test/course/module/5/form",
        payload
      );
    });

    it("calls attach forms endpoint", async () => {
      const payload = { formIds: [1, 2, 3] };
      await api.apiAttachForms(5, payload);
      expect(httpClient.post).toHaveBeenCalledWith(
        "https://example.test/course/module/5/form/attach",
        payload
      );
    });

    it("calls delete forms module endpoint", async () => {
      await api.apiDeleteFormsModule(5);
      expect(httpClient.post).toHaveBeenCalledWith(
        "https://example.test/course/module/5/form/remove"
      );
    });

    it("calls attach studio endpoint", async () => {
      const payload = { studioId: 50 };
      await api.apiAttachStudio(5, payload);
      expect(httpClient.post).toHaveBeenCalledWith(
        "https://example.test/course/module/5/studio/attach",
        payload
      );
    });

    it("calls delete studio module endpoint", async () => {
      await api.apiDeleteStudioModule(5);
      expect(httpClient.post).toHaveBeenCalledWith(
        "https://example.test/course/module/5/studio/remove"
      );
    });
  });

  describe("Module endpoints - servicesClients", () => {
    it("calls assign module to LMS endpoint", async () => {
      await api.apiAssignModuleToLMS(5);
      expect(servicesClients.post).toHaveBeenCalledWith(
        "https://services.test/v1/module/lms/assign?moduleId=5"
      );
    });

    it("calls publish module endpoint", async () => {
      await api.apiPublishModule(5);
      expect(servicesClients.post).toHaveBeenCalledWith(
        "https://services.test/v1/module/topic/state/release?topicId=5"
      );
    });

    it("calls generate topic slug endpoint", async () => {
      const payload = { title: "New Topic" };
      await api.apiGenerateTopicSlug(payload);
      expect(servicesClients.post).toHaveBeenCalledWith(
        "https://services.test/v2/module/topic/slug/generate",
        payload
      );
    });
  });

  describe("Bundle endpoints", () => {
    it("calls list bundle library with all params", async () => {
      await api.apiGetListBundleLibrary(1, 20, "test", "asc", "javascript", 10);
      expect(servicesClients.get).toHaveBeenCalledWith(
        "https://services.test/v2/module/bundle/public?&search=test&page=1&pageSize=20&sort=asc&categorySlug=javascript&authorId=10"
      );
    });

    it("calls list bundle library without params", async () => {
      await api.apiGetListBundleLibrary();
      expect(servicesClients.get).toHaveBeenCalledWith(
        "https://services.test/v2/module/bundle/public?"
      );
    });

    it("calls list bundle with all params", async () => {
      await api.apiGetListBundle(2, 15, "course", "desc", "python", 5);
      expect(servicesClients.get).toHaveBeenCalledWith(
        "https://services.test/v2/module/bundle/list?&search=course&page=2&pageSize=15&sort=desc&categorySlug=python&authorId=5"
      );
    });

    it("calls list bundle without params", async () => {
      await api.apiGetListBundle();
      expect(servicesClients.get).toHaveBeenCalledWith(
        "https://services.test/v2/module/bundle/list?"
      );
    });

    it("calls create bundle endpoint", async () => {
      const payload = { name: "New Bundle" };
      await api.apiCreateBundle(payload);
      expect(servicesClients.post).toHaveBeenCalledWith(
        "https://services.test/v2/module/bundle/create",
        payload
      );
    });

    it("calls delete bundle endpoint", async () => {
      await api.apiDeleteBundle("intro-js");
      expect(servicesClients.post).toHaveBeenCalledWith(
        "https://services.test/v2/module/bundle/delete?slug=intro-js"
      );
    });

    it("calls detail bundle endpoint", async () => {
      await api.apiDetailBundle("intro-js");
      expect(servicesClients.get).toHaveBeenCalledWith(
        "https://services.test/v2/module/bundle/detail?slug=intro-js"
      );
    });

    it("calls edit bundle endpoint", async () => {
      const payload = { name: "Updated Bundle" };
      await api.apiEditBundle("intro-js", payload);
      expect(servicesClients.post).toHaveBeenCalledWith(
        "https://services.test/v2/module/bundle/edit?slug=intro-js",
        payload
      );
    });
  });

  describe("Category endpoints", () => {
    it("calls list category endpoint", async () => {
      await api.apiGetListCategory();

      expect(servicesClients.get).toHaveBeenCalledWith(
        "https://services.test/v2/module/category/list"
      );
    });
  });
});
