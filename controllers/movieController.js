const movieModel = require('../models/movieModel');

const addMovie = async (req, res) => {
  try {
    const newMovie = req.body;
    await movieModel.create(newMovie)
    res.status(200).send("La pelicula se ha añadio correctamente");
  } catch (error) {
    res.status(500).send({ status:"Failed", error: error.message })
  }
};

module.exports = {
    addMovie
}