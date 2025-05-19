const users = require("../db/users"); //MOCK
const userModel = require("../models/userModel");
const movieModel = require("../models/movieModel");
const { verifyToken } = require("../middlewares/auth");

const getAllUser = async (req, res) => {
  try {
    const users = await userModel.find();
    if (!users) {
      return res.status(200).send("No hay usuario");
    }
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

/* const addUser = async (req, res) => {
  try {
    const newUser = req.body;
    await userModel.create(newUser);
    res.status(200).send("El usuario se ha creado correctamente");
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
}; */

const getMyProfile = async (req, res) => {
  try {
    /* const idUser = req.params.idUser; */
    const idUser = req.payload._id;
    const user = await userModel
      .findById(idUser)
      .populate({ path: "favourites", select: "title description" });

    if (!users) {
      return res.status(200).send("No hay usuario");
    }
    res.status(200).send({ status: "Sucess", data: user });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const getUserByName = async (req, res) => {
  try {
    const name = req.params.name;
    const users = await userModel.find({
      name: { $regex: name, $options: "i" },
    });
    if (users.length === 0) {
      return res.status(200).send("No hay usuario");
    }
    res.status(200).send({ status: "Success", data: users });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const getUserByAge = (req, res) => {
  const age = req.params.age;
  const user = users.filter((u) => u.edad === parseInt(age));
  if (!user) {
    return res.status(200).send("No hay usuario con esa edad");
  }
  res.send(user);
};

//user.findByIdAndDeleted (iduser)

const deleteUser = async (req, res) => {
  try {
    const idUser = req.params.idUser;
    await userModel.findByIdAndDelete(idUser);
    res
      .status(200)
      .send({ status: "Sucess", data: "El usuario se elimino correctamente" });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const replaceUser = async (req, res) => {
  try {
    const idUser = req.params.idUser;
    const newUser = req.body;
    const replaceUser = await userModel.findOneAndReplace(
      { _id: idUser },
      newUser,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!replaceUser) {
      return res.status(200).send("No hay usuario");
    }
    res.status(200).send({ status: "Success", data: replaceUser });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const idUser = req.params.idUser;
    const newUser = req.body;
    const updateUser = await userModel.findByIdAndUpdate(idUser, newUser, {
      new: true,
      runValidators: true,
    });
    if (!updateUser) {
      return res.status(200).send("No hay usuario");
    }
    res.status(200).send({ status: "Success", data: updateUser });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const addFavouriteMovie = async (req, res) => {
  try {
    const {idMovie} = req.params;
     const idUser = req.payload._id
    const user = await userModel.findById(idUser);
    if (!user) {
      return res.status(200).send("No hay usuario");
    }

    const movie = await movieModel.findById(idMovie);
    if (!movie) {
      return res.status(200).send("No hay peli");
    }

    if (user.favourites.includes(idMovie)) {
      return res.status(200).send("La película ya está en favoritos");
    }

    user.favourites.push(idMovie);
    user.save();

    res.status(200).send({ status: "Success", data: user });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const {idMovie} = req.params;
     const idUser = req.payload._id
    const user = await userModel.findById(idUser);
    if (!user) {
      return res.status(200).send("No hay usuario");
    }

    if (!user.favourites.includes(idMovie)) {
      return res.status(200).send("La película NO  está en favoritos");
    }

    user.favourites.pull(idMovie);
    user.save();

    res.status(200).send({ status: "Success", data: user });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

module.exports = {
  getAllUser,
  getMyProfile,
  getUserByName,
  // addUser,
  deleteUser,
  replaceUser,
  updateUser,
  addFavouriteMovie,
  deleteMovie,
  verifyToken
};
