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

const getMovieById = async (req, res) => {
  try {
    const { idMovie } = req.params;
    const movie = await movieModel.findById(idMovie);
    if(!movie) {
      res.status(200).send("La peli no se encuentra");
    }
    res.status(200).send({status: "Success", data: idMovie});
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const getAllMovies = async (req, res) => {
  try {
    const { title, category,rating, page =1, limit= 10 } = req.query;
 
    const filters = {};
 
    if (title) {
      filters.title = { $regex: title, $options: "i" };
    }
 
    if (category) {
      const categoryArray = category.split(",");
      filters.category = { $in: categoryArray };
    }

    if (rating) {
      filters.rating = { $gt: parseFloat(rating) };
    }


 
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await movieModel.countDocuments();
    const totalPages = Math.ceil(total / limit);
 
    const movies = await movieModel.find(filters).skip(skip).limit(parseInt(limit));
    
    if (movies.length === 0) {
      return res.status(200).send("La peli no se encuentra");
    }
 
    res.status(200).send({ status: "Success", data: movies, currentPage: parseInt(page), totalPages });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};
 

module.exports = {
    addMovie,
    getMovieById,
    getAllMovies
}