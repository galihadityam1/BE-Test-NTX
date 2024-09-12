const request = require("supertest");
const app = require("../../server.js");
const db = require("../models/index.js");
const { signToken } = require("../helpers/jwt.js");
let token;

beforeAll(async () => {
  try {
    // Create a user for testing purposes
    let user = await db.user.create({
      digits: "DFA",
      fotoUrl: "",
      workType: "WFO",
      positionTitle: null,
      lat: 0.0,
      lon: 0.0,
      company: "NTX",
      isLogin: true,
      dovote: true,
      dosurvey: true,
      dofeedback: false,
      fullname: "M. Daffa Quraisy",
      cuurentLeave: 0,
    });

    token = signToken({ id: user.id });
  } catch (error) {
    console.log(error);
  }
});

describe("GET /getSurvey", () => {
  test("successfully retrieves survey data", async () => {
    const response = await request(app)
      .get("/getSurvey")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("success", true);
    expect(response.body.data).toBeInstanceOf(Array);
  });

  test("error on null token", async () => {
    // jest.spyOn(db.survey, "findAll").mockRejectedValue(new Error("Error fetching data"));

    const response = await request(app)
      .get("/getSurvey")
      .set("Authorization", null);

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("message", "Login first");
  });
});

describe("POST /postSurvey", () => {
  test("successfully adds a survey", async () => {
    const dummy = { values: JSON.stringify([10, 20, 30]) };

    const response = await request(app)
      .post("/postSurvey")
      .send(dummy)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Survey sent successfully!"
    );
  });

  test("throw error on missing values", async () => {
    const response = await request(app)
      .post("/postSurvey")
      .send({})
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("message", "Cannot post survey.");
  });

  test("throw error on missing token", async () => {
    const dummy = { values: JSON.stringify([10, 20, 30]) };

    const response = await request(app)
      .post("/postSurvey")
      .send(dummy)
      .set("Authorization", null);

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("message", "Login first");
  });

  test("throw error on invalid token", async () => {
    const dummy = { values: JSON.stringify([10, 20, 30]) };

    const response = await request(app)
      .post("/postSurvey")
      .send(dummy)
      .set("Authorization", "Bearer InvalidToken");

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("message", "Login first");
  });
});

afterAll(async () => {
  await db.user.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await db.survey.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});
