const express = require("express");
const router = express.Router();
const {
addMovie,
getMovieById,
getAllMovies,
deleteMovie,
updateMovieById,
addComentMovie
} = require("../controllers/movieController");
const { verifyToken } = require("../middlewares/auth");

router.post("/", addMovie);
router.post("/:idMovie", getMovieById)
router.get("/", getAllMovies)
router.delete("/:idMovie", deleteMovie)
router.patch("/:idMovie",updateMovieById)
router.get("/:idMovie", verifyToken, addComentMovie)

module.exports = router;