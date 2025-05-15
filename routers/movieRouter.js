const express = require("express");
const router = express.Router();
const {
addMovie,
getMovieById
} = require("../controllers/movieController")

router.post("/", addMovie);
router.post("/", getMovieById)

module.exports = router;