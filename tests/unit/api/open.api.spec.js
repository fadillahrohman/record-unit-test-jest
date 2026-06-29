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

  it("calls edit user endpoint", async () => {
    const payload = { name: "Dina Updated" };
    await api.apiEditUser(5, payload);

    expect(uploadClient.post).toHaveBeenCalledWith(
      "https://example.test/student/5/edit",
      payload
    );
  });

  it("calls get students by program endpoint", async () => {
    await api.getStudentByProgramId({
      program_id: 3,
      page: 1,
      search: "eko",
      cityId: 7,
      sortBy: "name",
      sortType: "asc",
    });

    expect(httpClient.get).toHaveBeenCalledWith(
      "https://example.test/program/3/students?page=1&search=eko&cityId=7&sort=name&sortType=asc"
    );
  });

  it("calls get students by batch and program endpoint", async () => {
    await api.getStudentByBatchIdProgramId({
      batch_id: 2,
      program_id: 6,
      page: 4,
      search: "lia",
      cityId: 1,
      sortBy: "name",
      sortType: "desc",
    });

    expect(httpClient.get).toHaveBeenCalledWith(
      "https://example.test/batch/2/program/6/students?page=4&search=lia&cityId=1&sort=name&sortType=desc"
    );
  });

  it("calls get students by round and program endpoint", async () => {
    await api.getStudentByBatchIdRoundIdProgramId({
      round_id: 10,
      program_id: 6,
      page: 1,
      search: "zaki",
      cityId: 2,
      sortBy: "name",
      sortType: "asc",
      studentStatus: 1,
    });

    expect(httpClient.get).toHaveBeenCalledWith(
      "https://example.test/batch/round/10/program/6/students?page=1&search=zaki&cityId=2&sort=name&sortType=asc&studentStatus=1"
    );
  });

  it("calls student request by program endpoint", async () => {
    await api.getStudentRequestByProgramId({
      search: "bayu",
      program_id: 15,
      page: 2,
      cityId: 9,
      sortBy: "name",
      sortType: "asc",
    });

    expect(httpClient.get).toHaveBeenCalledWith(
      "https://example.test/program/15/students/registrar?page=2&search=bayu&cityId=9&sort=name&sortType=asc"
    );
  });

  it("calls detail user by id endpoint", async () => {
    await api.getDetailUserById(22);

    expect(httpClient.get).toHaveBeenCalledWith(
      "https://example.test/user/22/detail"
    );
  });

  it("calls block user endpoint", async () => {
    await api.apiBlockUser(22);

    expect(httpClient.post).toHaveBeenCalledWith(
      "https://example.test/student/22/block"
    );
  });

  it("calls detail user auth endpoint", async () => {
    await api.getDetailUser();

    expect(authClient.get).toHaveBeenCalledWith("https://auth.test/user/detail");
  });

  it("calls mentors endpoint with program filter", async () => {
    await api.apiGetMentors({ page: 1, programId: 9 });

    expect(httpClient.get).toHaveBeenCalledWith(
      "https://example.test/mentors?page=1&programId=9"
    );
  });

  it("calls mentors endpoint without program filter", async () => {
    await api.apiGetMentors({ page: 2 });

    expect(httpClient.get).toHaveBeenCalledWith(
      "https://example.test/mentors?page=2"
    );
  });

  it("calls mentor detail endpoint", async () => {
    await api.apiGetMentorById(3);

    expect(httpClient.get).toHaveBeenCalledWith(
      "https://example.test/mentor/3"
    );
  });

  it("calls create mentor endpoint", async () => {
    const payload = { name: "Mentor A" };
    await api.apiPostMentor(payload);

    expect(httpClient.post).toHaveBeenCalledWith(
      "https://example.test/mentor",
      payload
    );
  });

  it("calls edit mentor endpoint", async () => {
    const payload = { name: "Mentor A Updated" };
    await api.apiEditMentor(3, payload);

    expect(uploadClient.post).toHaveBeenCalledWith(
      "https://example.test/mentor/3/edit",
      payload
    );
  });

  it("calls block mentor endpoint", async () => {
    await api.apiBlockMentor(3);

    expect(httpClient.post).toHaveBeenCalledWith(
      "https://example.test/mentor/3/block"
    );
  });

  it("calls admins list endpoint", async () => {
    await api.apiGetAdmins(4);

    expect(httpClient.get).toHaveBeenCalledWith(
      "https://example.test/admins?page=4"
    );
  });

  it("calls admin detail endpoint", async () => {
    await api.apiGetAdminById(6);

    expect(httpClient.get).toHaveBeenCalledWith(
      "https://example.test/admin/6"
    );
  });

  it("calls create admin endpoint", async () => {
    const payload = { name: "Admin A" };
    await api.apiPostAdmin(payload);

    expect(httpClient.post).toHaveBeenCalledWith(
      "https://example.test/auth/register/admin",
      payload
    );
  });

  it("calls edit admin endpoint", async () => {
    const payload = { name: "Admin A Updated" };
    await api.apiEditAdmin(6, payload);

    expect(uploadClient.post).toHaveBeenCalledWith(
      "https://example.test/admin/6/edit",
      payload
    );
  });

  it("calls block admin endpoint", async () => {
    await api.apiBlockAdmin(6);

    expect(httpClient.post).toHaveBeenCalledWith(
      "https://example.test/admin/6/block"
    );
  });

  it("calls industries list endpoint", async () => {
    await api.apiGetIndustries(2);

    expect(httpClient.get).toHaveBeenCalledWith(
      "https://example.test/industries?page2"
    );
  });

  it("calls create industry endpoint", async () => {
    const payload = { name: "Industry A" };
    await api.apiPostIndustry(payload);

    expect(httpClient.post).toHaveBeenCalledWith(
      "https://example.test/auth/register/industry",
      payload
    );
  });

  it("calls edit industry endpoint", async () => {
    const payload = { name: "Industry A Updated" };
    await api.apiEditIndustry(8, payload);

    expect(uploadClient.post).toHaveBeenCalledWith(
      "https://example.test/industry/8/edit",
      payload
    );
  });

  it("calls activate industry endpoint", async () => {
    await api.apiActivateIndustry(8);

    expect(httpClient.post).toHaveBeenCalledWith(
      "https://example.test/industry/8/activate"
    );
  });

  it("calls deactivate industry endpoint", async () => {
    await api.apiDeactivateIndustry(8);

    expect(httpClient.post).toHaveBeenCalledWith(
      "https://example.test/industry/8/deactivate"
    );
  });

  it("calls block industry endpoint", async () => {
    await api.apiBlockIndustry(8);

    expect(httpClient.post).toHaveBeenCalledWith(
      "https://example.test/industry/8/block"
    );
  });

  it("calls search user endpoint", async () => {
    await api.apiSearchUser("bimo");

    expect(httpClient.get).toHaveBeenCalledWith(
      "https://example.test/user/search/bimo"
    );
  });

  it("calls download certificate endpoint", async () => {
    await api.apiDownloadCertificate(7, 99);

    expect(httpClient.get).toHaveBeenCalledWith(
      "https://example.test/batch/7/user/99/certificate"
    );
  });

  it("calls detail global endpoint", async () => {
    await api.apiGetDetailGlobal(99);

    expect(httpClient.get).toHaveBeenCalledWith(
      "https://example.test/student/99/profile"
    );
  });