describe("forms.api", () => {
  let api;
  let formClients;

  beforeEach(() => {
    process.env.servicesApi = "https://services.test/";
    jest.resetModules();
    jest.doMock("@/api/formClients", () => ({
      __esModule: true,
      default: {
        get: jest.fn(),
        post: jest.fn(),
      },
    }));

    api = require("@/api/forms.api");
    formClients = require("@/api/formClients").default;
    jest.clearAllMocks();
  });

  describe("Forms endpoints", () => {
    it("calls get all forms endpoint", async () => {
      await api.apiGetAllForms();

      expect(formClients.get).toHaveBeenCalledWith(
        "https://services.test/v1/form/forms/all"
      );
    });

    it("calls create form endpoint", async () => {
      const payload = { title: "Survey Form" };
      await api.apiCreateForm(payload);

      expect(formClients.post).toHaveBeenCalledWith(
        "https://services.test/v1/form/form/create",
        payload
      );
    });

    it("calls form detail endpoint", async () => {
      await api.apiFormDetail(5);

      expect(formClients.get).toHaveBeenCalledWith(
        "https://services.test/v1/form/form/detail?formId=5"
      );
    });

    it("calls edit form endpoint", async () => {
      const payload = { title: "Updated Survey" };
      await api.apiEditForm(5, payload);

      expect(formClients.post).toHaveBeenCalledWith(
        "https://services.test/v1/form/form/edit?formId=5",
        payload
      );
    });
  });

  describe("Categories endpoints", () => {
    it("calls categories list endpoint without page", async () => {
      await api.apiCategories();

      expect(formClients.get).toHaveBeenCalledWith(
        "https://services.test/v1/form/question/categories"
      );
    });

    it("calls categories list endpoint with page", async () => {
      await api.apiCategories(2);

      expect(formClients.get).toHaveBeenCalledWith(
        "https://services.test/v1/form/question/categories?page=2"
      );
    });

    it("calls create category endpoint", async () => {
      const payload = { name: "Math" };
      await api.apiCreateCategories(payload);

      expect(formClients.post).toHaveBeenCalledWith(
        "https://services.test/v1/form/question/category/create",
        payload
      );
    });

    it("calls detail category endpoint", async () => {
      await api.apiDetailCategories(10);

      expect(formClients.post).toHaveBeenCalledWith(
        "https://services.test/v1/form/question/category/detail?categoryId=10"
      );
    });

    it("calls edit category endpoint", async () => {
      const payload = { name: "English" };
      await api.apiEditCategories(10, payload);

      expect(formClients.post).toHaveBeenCalledWith(
        "https://services.test/v1/form/question/category/edit?categoryId=10",
        payload
      );
    });

    it("calls delete category endpoint", async () => {
      await api.apiDeleteCategories(10);

      expect(formClients.post).toHaveBeenCalledWith(
        "https://services.test/v1/form/question/category/delete?categoryId=10"
      );
    });
  });
});
