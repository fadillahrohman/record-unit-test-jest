describe("payment.api", () => {
  let api;
  let servicesClients;

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
    api = require("@/api/payment.api");
    servicesClients = require("@/api/servicesClients").default;
    jest.clearAllMocks();
  });

  it("calls class payment invoice endpoint", async () => {
    await api.apiGetClassPayment("class-1");
    expect(servicesClients.get).toHaveBeenCalledWith(
      "https://services.test/v1/class/payment/invoice?slug=class-1"
    );
  });

  it("calls class repay endpoint", async () => {
    await api.apiPostClassRepay("class-2");
    expect(servicesClients.get).toHaveBeenCalledWith(
      "https://services.test/v1/class/repay?slug=class-2"
    );
  });

  it("calls payouts endpoint with filters", async () => {
    await api.apiGetPayouts(1, 20, "approved", "BCA", "john");
    expect(servicesClients.get).toHaveBeenCalledWith(
      "https://services.test/v2/payout/list?page=1&perPage=20&status=approved&bank=BCA&search=john"
    );
  });

  it("calls payouts endpoint without filters", async () => {
    await api.apiGetPayouts();
    expect(servicesClients.get).toHaveBeenCalledWith(
      "https://services.test/v2/payout/list"
    );
  });

  it("calls bank endpoint", async () => {
    await api.apiGetBanks();
    expect(servicesClients.get).toHaveBeenCalledWith(
      "https://services.test/v2/payout/banks"
    );
  });

  it("calls balance endpoint", async () => {
    await api.apiGetBalance();
    expect(servicesClients.get).toHaveBeenCalledWith(
      "https://services.test/v2/payout/balance"
    );
  });

  it("calls requets payout endpoint", async () => {
    const payload = { amount: 10000 };
    await api.apiRequestPayout(payload);
    expect(servicesClients.post).toHaveBeenCalledWith(
      "https://services.test/v2/payout/request",
      payload
    );
  });

  it("calls approve payout endpoint", async () => {
    const payload = { payoutId: "p1" };
    await api.apiApprovePayout(payload);
    expect(servicesClients.post).toHaveBeenCalledWith(
      "https://services.test/v2/payout/approve",
      payload
    );
  });

  it("calls reject payout endpoint", async () => {
    const payload = { payoutId: "p2" };
    await api.apiRejectPayout(payload);
    expect(servicesClients.post).toHaveBeenCalledWith(
      "https://services.test/v2/payout/reject",
      payload
    );
  });

  it("calls class payment invoice post endpoint", async () => {
    await api.apiGetClassPaymentInvoice("class-3");
    expect(servicesClients.post).toHaveBeenCalledWith(
      "https://services.test/v1/class/payment/invoice?slug=class-3"
    );
  });

  it("calls class payment income endpoint", async () => {
    await api.apiGetClassPaymentIncome("class-4");
    expect(servicesClients.get).toHaveBeenCalledWith(
      "https://services.test/v1/class/payment/income?slug=class-4"
    );
  });

  it("calls class payment recap endpoint with params", async () => {
    await api.apiGetClassPaymentRecap("class-5", { page: 2, status: "paid" });
    expect(servicesClients.get).toHaveBeenCalledWith(
      "https://services.test/v1/class/payment/recap?slug=class-5&page=2&status=paid"
    );
  });
});
