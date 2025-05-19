const express = require("express");
const router = express.Router();
const {
addMovie,
getMovieById,
getAllMovies
} = require("../controllers/movieController")

router.post("/", addMovie);
router.post("/:idMovie", getMovieById)
router.get("/", getAllMovies)

module.exports = router;