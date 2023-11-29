const express = require("express");

const app = express();

//**c'est un middleware express intégré qui permet de lire du json dans les corps de requete*/
app.use(express.json());

const movieControllers = require("./controllers/movieControllers");
const userControllers = require("./controllers/userControllers");

app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);

app.get("/api/users", userControllers.getUsers);
app.get("/api/users/:id", userControllers.getUserById);

app.post("/api/users", userControllers.postUser);
app.post("/api/movies", movieControllers.postMovie);

module.exports = app;
