const request = require("supertest");
const app = require("../src/app");
const database = require("../database");

afterAll(() => database.end());

//* Test pour le GET movies*/

describe("GET /api/movies", () => {
  it("should return all movies", async () => {
    const response = await request(app).get("/api/movies");

    expect(response.headers["content-type"]).toMatch(/json/);

    expect(response.status).toEqual(200);
  });
});

//* Test pour le GET movies*/

describe("GET /api/movies/:id", () => {
  it("should return one movie", async () => {
    const response = await request(app).get("/api/movies/1");

    expect(response.headers["content-type"]).toMatch(/json/);

    expect(response.status).toEqual(200);
  });

  it("should return no movie", async () => {
    const response = await request(app).get("/api/movies/0");

    expect(response.status).toEqual(404);
  });
});

//** pour ecrire le test pour le POST */

describe("POST /api/movies", () => {
  it("should return create movie", async () => {
    const newMovie = {
      title: "Star Wars",
      director: "George Lucas",
      year: "1977",
      color: true,
      duration: 120,
    };

    const response = await request(app).post("/api/movies").send(newMovie);

    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty("id");
    expect(typeof response.body.id).toBe("number");

    //*pour recuperer la nouvelle ressource */

    const [result] = await database.query(
      "SELECT * FROM movies WHERE id=?",
      response.body.id
    );
    const [movieInDatabase] = result;
    expect(movieInDatabase).toHaveProperty("id");

    expect(movieInDatabase).toHaveProperty("title");
    expect(movieInDatabase.title).toStrictEqual(newMovie.title);
    expect(movieInDatabase.director).toStrictEqual(newMovie.director);
    expect(movieInDatabase.year).toStrictEqual(newMovie.year);
    expect(Boolean(movieInDatabase.color)).toStrictEqual(newMovie.color);
    expect(movieInDatabase.duration).toStrictEqual(newMovie.duration);

    //* Pour tester le cas d'erreur: l'api retourne une erreur lorsque les propriétés du film posté (POST) sont manquants.*/
  });
  it("should return an error", async () => {
    const movieWithMissingProps = { title: "Harry Potter" };

    const response = await request(app)
      .post("/api/movies")
      .send(movieWithMissingProps);

    expect(response.status).toEqual(500);
  });
});
