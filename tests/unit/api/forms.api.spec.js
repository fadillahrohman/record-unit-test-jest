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

  describe("Questions endpoints", () => {
    it("calls form questions endpoint", async () => {
      await api.apiFormQuestion(3, 1);

      expect(formClients.get).toHaveBeenCalledWith(
        "https://services.test/v1/form/questions?formId=3&page=1"
      );
    });

    it("calls add form question endpoint", async () => {
      const payload = { text: "What is your age?" };
      await api.apiFormAddQuestion(3, payload);

      expect(formClients.post).toHaveBeenCalledWith(
        "https://services.test/v1/form/question/add?formId=3",
        payload
      );
    });

    it("calls form detail question endpoint", async () => {
      await api.apiFormDetailQuestion(3, 15);

      expect(formClients.get).toHaveBeenCalledWith(
        "https://services.test/v1/form/question/detail?formId=3&questionId=15"
      );
    });

    it("calls edit form question endpoint", async () => {
      const payload = { text: "Updated question?" };
      await api.apiFormEditQuestion(3, 15, payload);

      expect(formClients.post).toHaveBeenCalledWith(
        "https://services.test/v1/form/question/edit?formId=3&questionId=15",
        payload
      );
    });

    it("calls delete form question endpoint", async () => {
      await api.apiFormDeleteQuestion(3, 15);

      expect(formClients.post).toHaveBeenCalledWith(
        "https://services.test/v1/form/question/delete?formId=3&questionId=15"
      );
    });
  });

  it("calls delete form endpoint", async () => {
    await api.apiDeleteForms(5);

    expect(formClients.post).toHaveBeenCalledWith(
      "https://services.test/v1/form/form/delete?formId=5"
    );
  });

  it("calls get forms endpoint without params", async () => {
    await api.apiGetForms();

    expect(formClients.get).toHaveBeenCalledWith(
      "https://services.test/v1/form/forms?"
    );
  });

  it("calls get forms endpoint with all params", async () => {
    await api.apiGetForms(2, "survey", "customer");

    expect(formClients.get).toHaveBeenCalledWith(
      "https://services.test/v1/form/forms?page=2&kind=survey&search=customer"
    );
  });

  it("calls get forms endpoint with page and kind only", async () => {
    await api.apiGetForms(1, "quiz");

    expect(formClients.get).toHaveBeenCalledWith(
      "https://services.test/v1/form/forms?page=1&kind=quiz"
    );
  });
});
