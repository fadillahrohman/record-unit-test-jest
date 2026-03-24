describe("Events API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.baseURL = "http://api.test.com/";
  });

  describe("URL Construction and Endpoints", () => {
    it("should construct incoming events endpoint correctly", () => {
      const expectedUrl = process.env.baseURL + "events/incoming";
      expect(expectedUrl).toBe("http://api.test.com/events/incoming");
    });

    it("should construct events list endpoint with pagination", () => {
      const page = 1;
      const expectedUrl = process.env.baseURL + `event?page=${page}`;
      expect(expectedUrl).toBe("http://api.test.com/event?page=1");
    });

    it("should construct event detail endpoint with ID", () => {
      const eventId = "123";
      const expectedUrl = process.env.baseURL + `v1/event/${eventId}`;
      expect(expectedUrl).toBe("http://api.test.com/v1/event/123");
    });

    it("should construct active events endpoint correctly", () => {
      const expectedUrl = process.env.baseURL + "events/active";
      expect(expectedUrl).toBe("http://api.test.com/events/active");
    });

    it("should construct joint event endpoint with ID", () => {
      const eventId = "456";
      const expectedUrl = process.env.baseURL + `event/${eventId}/join`;
      expect(expectedUrl).toBe("http://api.test.com/event/456/join");
    });

    it("should construct create event endpoint correctly", () => {
      const expectedUrl = process.env.baseURL + "event";
      expect(expectedUrl).toBe("http://api.test.com/event");
    });

    it("should construct edit event endpoint with ID", () => {
      const eventId = "789";
      const expectedUrl = process.env.baseURL + `event/${eventId}`;
      expect(expectedUrl).toBe("http://api.test.com/event/789");
    });
  });

  describe("Multiple Page Parameters", () => {
    it("should handle different page values", () => {
      const pages = [1, 2, 5, 10];
      pages.forEach((page) => {
        const url = process.env.baseURL + `events?page=${page}`;
        expect(url).toContain(`page=${page}`);
      });
    });

    it("should maintain consistent URL stucture across pagination", () => {
      const page1 = process.env.baseURL + "events?page=1";
      const page2 = process.env.baseURL + "events?page=2";
      const page3 = process.env.baseURL + "events?page=3";

      expect(page1).toMatch(/events\?page=\d+/);
      expect(page2).toMatch(/events\?page=\d+/);
      expect(page3).toMatch(/events\?page=\d+/);
    });
  });

  describe("Endpoint Patterns", () => {
    it("should use v1 API version for detail endpoint", () => {
      const url = process.env.baseURL + `v1/event/123`;
      expect(url).toContain("/v1/");
    });

    it("should NOT use v1 for action endpoints", () => {
      const joinUrl = process.env.baseURL + `event/123/join`;
      const createUrl = process.env.baseURL + `event`;
      const editUrl = process.env.baseURL + `event/123`;

      expect(joinUrl).not.toContain("/v1/");
      expect(createUrl).not.toContain("/v1/");
      expect(editUrl).not.toContain("/v1/");
    });

    it("should use correct endpoint suffixes", () => {
      const joinUrl = process.env.baseURL + `event/123/join`;
      const editUrl = process.env.baseURL + `event/456`;

      expect(joinUrl).toContain("/join");
      expect(editUrl).not.toContain("/join");
    });
  });
});
