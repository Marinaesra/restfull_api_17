const express = require("express");
const router = express.Router();
const { 
getAllUser,
getUserById, 
getUserByName, 
addUser,  
deleteUser,
replaceUser,
updateUser,
addFavouriteMovie,
deleteMovie
} = require("../controllers/userController");
 
router.get("/", getAllUser);
router.post("/", addUser);
router.get("/:idUser", getUserById);
router.put("/:idUser", replaceUser)
router.patch("/:idUser", updateUser)
router.delete("/:idUser", deleteUser)
router.get("/searchName/:nombre", getUserByName);
router.patch("/:idUser/favourites/:idMovie", addFavouriteMovie);
router.patch("/:idUser/removefavourite/:idMovie", deleteMovie);
 
module.exports = router;
 
// http://localhost:3000/api/user
// http://localhost:3000/api/user/9
// http://localhost:3000/api/user/searchName/Diego