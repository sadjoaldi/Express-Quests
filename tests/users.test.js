const request = require("supertest");

const app = require("../src/app");
const database = require("../database");

afterAll(() => database.end());

describe("GET /api/users", () => {
  it("should return all users", async () => {
    const response = await request(app).get("/api/users");

    expect(response.headers["content-type"]).toMatch(/json/);

    expect(response.status).toEqual(200);
  });
});

describe("GET /api/users/:id", () => {
  it("should return one user", async () => {
    const response = await request(app).get("/api/users/1");

    expect(response.headers["content-type"]).toMatch(/json/);

    expect(response.status).toEqual(200);
  });

  it("should return no user", async () => {
    const response = await request(app).get("/api/users/0");

    expect(response.status).toEqual(404);
  });
});

//** pour ecrire le test pour le POST */

const crypto = require("node:crypto");

describe("POST /api/users", () => {
  it("should return create user", async () => {
    const newUser = {
      firstname: "Marie",
      lastname: "Martin",
      email: `${crypto.randomUUID()}@wild.co`,
      city: "Paris",
      language: "French",
    };

    const response = await request(app).post("/api/users").send(newUser);
    expect(response.header["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty("id");
    expect(typeof response.body.id).toBe("number");

    //*pour recuperer la nouvelle ressource */

    const [result] = await database.query(
      "SELECT * FROM users WHERE id=?",
      response.body.id
    );
    const [userInDatabase] = result;
    expect(userInDatabase).toHaveProperty("id");

    expect(userInDatabase).toHaveProperty("firstname");
    expect(userInDatabase.firstname).toStrictEqual(newUser.firstname);
    expect(userInDatabase.lastname).toStrictEqual(newUser.lastname);
    expect(userInDatabase.email).toStrictEqual(newUser.email);
    expect(userInDatabase.city).toStrictEqual(newUser.city);
    expect(userInDatabase.language).toStrictEqual(newUser.language);

    //* Pour tester le cas d'erreur: l'api retourne une erreur lorsque les propriétés du film posté (POST) sont manquants.*/
  });
  it("should return an error", async () => {
    const userWithMissingProps = {
      firstname: "kemino",
    };

    const response = await request(app)
      .post("/api/users")
      .send(userWithMissingProps);

    expect(response.status).toEqual(500);
  });
});
