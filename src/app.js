const express = require("express");

const app = express();

//**c'est un middleware express intégré qui permet de lire du json dans les corps de requete*/
app.use(express.json());

const movieControllers = require("./controllers/movieControllers");
const userControllers = require("./controllers/userControllers");

app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);

//* declaration route get
app.get("/api/users", userControllers.getUsers);
app.get("/api/users/:id", userControllers.getUserById);

app.post("/api/users", userControllers.postUser);
app.post("/api/movies", movieControllers.postMovie);

//*route pour PUT*/

app.put("/api/movies/:id", movieControllers.putMovie);
app.put("/api/users/:id", userControllers.putUser);

module.exports = app;
