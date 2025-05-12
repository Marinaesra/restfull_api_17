const users = require("../db/users");
 
const getAllUser = (req, res) => {
  res.send(users);
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
 
const addUser = (req, res) => {
  const newUser = req.body;
  console.log(newUser);
  res.send('Usuario creado')
};
 
module.exports = {
  getAllUser,
  getUserById,
  getUserByName,
  addUser
};
 
 
 