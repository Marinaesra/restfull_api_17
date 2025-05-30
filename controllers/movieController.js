const movieModel = require("../models/movieModel");

const addMovie = async (req, res) => {
  try {
    const newMovie = req.body;
    await movieModel.create(newMovie);
    res.status(200).send("La pelicula se ha añadio correctamente");
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const getMovieById = async (req, res) => {
  try {
    const { idMovie } = req.params;
    const movie = await movieModel.findById(idMovie);
    if (!movie) {
      res.status(200).send("La peli no se encuentra");
    }
    res.status(200).send({ status: "Success", data: idMovie });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const getAllMovies = async (req, res) => {
  try {
    const { title, category, rating, page = 1, limit = 10 } = req.query;

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

    const movies = await movieModel
      .find(filters)
      .skip(skip)
      .limit(parseInt(limit));

    if (movies.length === 0) {
      return res.status(200).send("La peli no se encuentra");
    }
    res
      .status(200)
      .send({
        status: "Success",
        data: movies,
        currentPage: parseInt(page),
        totalPages,
      });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const idMovie = req.params.idMovie;
    await movieModel.findByIdAndDelete(idMovie);
    res
      .status(200)
      .send({ status: "Sucess", data: "La pelicula se elimino correctamente" });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const updateMovieById = async (req, res) => {
  try {
    const idMovie = req.params.idMovie;
    const updateMovie = req.body;

    const movie = await movieModel.findByIdAndUpdate(idMovie, updateMovie, {
      new: true,
      runValidators: true,
    });
    if (!movie) {
      return res.status(500).send("Pelicula no encontrada");
    }
    res.status(200).send({ status: "Success", data: movie });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const addComentMovie = async (req, res) => {
  try {
    const { idMovie } = req.params;
    const comentMovie = req.body.comment;
    const userId = req.payload._id;

    const movie = await movieModel.findById(idMovie);

    if (!movie) {
      return res.status(200).send("Pelicula no existe");
    }

    const objectComent = {
      userId: userId,
      comment: comentMovie,
    };

    movie.comments.push(objectComent);
    movie.save();

    res.status(200).send({ status: "Success", data: movie });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const deleteComent = async (req, res) => {
  try {
    const { idMovie, idComment } = req.params;
    const movie = await movieModel.findById(idMovie);
    if (!movie) {
      return res.status(200).send("La pelicula no existe");
    }

    movie.comments = movie.comments.filter((comment) => comment._id.toString() !== idComment);
    movie.save();

    res.status(200).send({ status: "Success", data: movie });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

module.exports = {
  addMovie,
  getMovieById,
  getAllMovies,
  deleteMovie,
  updateMovieById,
  addComentMovie,
  deleteComent,
};
