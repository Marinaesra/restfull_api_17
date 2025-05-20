const express = require("express");
const router = express.Router();
const {
addMovie,
getMovieById,
getAllMovies,
deleteMovie,
updateMovieById 
} = require("../controllers/movieController")

router.post("/", addMovie);
router.post("/:idMovie", getMovieById)
router.get("/", getAllMovies)
router.delete("/:idMovie", deleteMovie)
router.patch("/:idMovie",updateMovieById )

module.exports = router;