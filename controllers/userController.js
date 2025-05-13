const users = require("../db/users"); //MOCK
const userModel = require ('../models/userModel');
 
const getAllUser = (req, res) => {
  const user = userModel.find();
};
 
const getUserById = (req, res) => {
  const idUser  = req.params.idUser;
  const user = users.find(u => u.id === parseInt(idUser));
  if(!user) {
    return res.status(200).send('No hay usuario')
  }
  res.send(user);
};
 
const getUserByName = (req, res) => {
  const nombre  = req.params.nombre;
  const user = users.filter(u => u.nombre.includes(nombre));
  if(user.length === 0) {
    return res.send('No hay usuarios');
  }
  res.send(user);
};
 
const addUser = async (req, res) => {
  try {
    const newUser = req.body;
    await userModel.create(newUser)
    res.status(200).send("El usuario se ha creado correctamente");
  } catch (error) {
    res.status(500).send({ status:"Failed", error: error.message })
  }
};
 
const getUserByAge = (req, res) => {
    const age =req.params.age;
    const user = users.filter((u) => u.edad === parseInt(age));
    if (!user) {
        return res.status(200).send("No hay usuario con esa edad")
    }
    res.send(user);
};

module.exports = {
  getAllUser,
  getUserById,
  getUserByName,
  addUser,
  getUserByAge
};
 
 
 