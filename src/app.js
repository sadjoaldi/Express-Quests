const express = require("express");

const validateMovie = require("./middlewares/validateMovie");
const validateUser = require("./middlewares/validateUser");

const app = express();

//**c'est un middleware express intégré qui permet de lire du json dans les corps de requete*/
app.use(express.json());

//*route controllers*/
const movieControllers = require("./controllers/movieControllers");
const userControllers = require("./controllers/userControllers");

app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);

//* declaration route get
app.get("/api/users", userControllers.getUsers);
app.get("/api/users/:id", userControllers.getUserById);

app.post("/api/users", validateUser, userControllers.postUser);
//* ajout middleware à la route post: */
app.post("/api/movies", validateMovie, movieControllers.postMovie);

//*route pour PUT*/
app.put("/api/movies/:id", validateMovie, movieControllers.putMovie);
app.put("/api/users/:id", validateUser, userControllers.putUser);
//*ajout middleware put*/

module.exports = app;
