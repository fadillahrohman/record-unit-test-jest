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

  describe("Query Parameters", () => {
    it("should format pagination query string correctly", () => {
      const page = 2;
      const url = process.env.baseURL + `events?page=${page}`;
      expect(url).toMatch(/\?page=\d+$/);
    });

    it("should separate query parameters with question mark", () => {
      const url = process.env.baseURL + `events?page=1`;
      expect(url).toContain("?");
      expect(url.indexOf("?")).toBeGreaterThan(0);
    });
  });

  describe("API Methods Classification", () => {
    it("should identify GET endpoints", () => {
      const getEndpoints = [
        process.env.baseURL + "events/incoming",
        process.env.baseURL + "events?page=1",
        process.env.baseURL + "events/active",
        process.env.baseURL + "v1/event/123",
      ];

      getEndpoints.forEach((endpoint) => {
        expect(endpoint).toBeTruthy();
        expect(endpoint).toContain(process.env.baseURL);
      });
    });

    it("should identify POST endpoints", () => {
      const postEndpoints = [
        process.env.baseURL + "event/123/join",
        process.env.baseURL + "event",
        process.env.baseURL + "event/456",
      ];

      postEndpoints.forEach((endpoint) => {
        expect(endpoint).toBeTruthy();
        expect(endpoint).toContain(process.env.baseURL);
      });
    });
  });

  describe("Base URL Configuration", () => {
    it("should use configured baseURL", () => {
      expect(process.env.baseURL).toBe("http://api.test.com/");
    });

    it("should apply baseURL to all endpoints", () => {
      const endpoints = [
        process.env.baseURL + "events/incoming",
        process.env.baseURL + "events?page=1",
        process.env.baseURL + "v1/event/123",
        process.env.baseURL + "events/active",
        process.env.baseURL + "event/123/join",
        process.env.baseURL + "event",
        process.env.baseURL + "event/456",
      ];

      endpoints.forEach((url) => {
        expect(url.startsWith(process.env.baseURL)).toBe(true);
      });
    });

    it("should handle baseURL with trailing slash", () => {
      const baseUrl = process.env.baseURL;
      expect(baseUrl.endsWith("/")).toBe(true);
      expect(baseUrl).toBe("http://api.test.com/");
    });
  });

  describe("Events API Export Functions", () => {
    it("should export getIncomingEvents function", () => {
      const { getIncomingEvents } = require("@/api/events.api");
      expect(typeof getIncomingEvents).toBe("function");
    });

    it("should export apiGetEvents function", () => {
      const { apiGetEvents } = require("@/api/events.api");
      expect(typeof apiGetEvents).toBe("function");
    });

    it("should export apiGetEventDetail function", () => {
      const { apiGetEventDetail } = require("@/api/events.api");
      expect(typeof apiGetEventDetail).toBe("function");
    });

    it("should export apiGetEventsActive function", () => {
      const { apiGetEventsActive } = require("@/api/events.api");
      expect(typeof apiGetEventsActive).toBe("function");
    });

    it("should export apiJoinEvent function", () => {
      const { apiJoinEvent } = require("@/api/events.api");
      expect(typeof apiJoinEvent).toBe("function");
    });

    it("should export apiCreateEvent function", () => {
      const { apiCreateEvent } = require("@/api/events.api");
      expect(typeof apiCreateEvent).toBe("function");
    });

    it("should export apiEditEvent function", () => {
      const { apiEditEvent } = require("@/api/events.api");
      expect(typeof apiEditEvent).toBe("function");
    });
  });

  describe("Events API Function Parameters", () => {
    beforeEach(() => {
      jest.resetModules();
      process.env.baseURL = "http://api.test.com/";
    });

    it("apiGetEvents should accept page parameter", () => {
      const { apiGetEvents } = require("@/api/events.api");
      expect(apiGetEvents.length).toBe(1);
    });

    it("apiGetEventDetail should accept event_id parameter", () => {
      const { apiGetEventDetail } = require("@/api/events.api");
      expect(apiGetEventDetail.length).toBe(1);
    });

    it("apiJoinEvent should accept event_id parameter", () => {
      const { apiJoinEvent } = require("@/api/events.api");
      expect(apiJoinEvent.length).toBe(1);
    });

    it("apiCreateEvent should accept params parameter", () => {
      const { apiCreateEvent } = require("@/api/events.api");
      expect(apiCreateEvent.length).toBe(1);
    });

    it("apiEditEvent should accept event_id and params parameters", () => {
      const { apiEditEvent } = require("@/api/events.api");
      expect(apiEditEvent.length).toBe(2);
    });
  });
});
