const express = require("express");
const router = express.Router();
const { 
getAllUser,
getMyProfile, 
getUserByName, 
//addUser,  
deleteUser,
replaceUser,
updateUser,
addFavouriteMovie,
deleteMovie,
deactiveUser
} = require("../controllers/userController");
const {verifyToken, verifyAdmin} = require("../middlewares/auth")
 
router.get("/", getAllUser);
//router.post("/", addUser);
router.get("/myProfile", verifyToken,verifyAdmin, getMyProfile);
router.put("/:idUser", replaceUser)
router.patch("/:idUser", updateUser)
router.delete("/:idUser", deleteUser)
router.get("/searchName/:nombre", getUserByName);
router.patch("/deactiveUser", verifyToken, deactiveUser)

router.patch("/favourites/:idMovie",verifyToken, addFavouriteMovie);
router.patch("/removefavourite/:idMovie",verifyToken, deleteMovie);
 
module.exports = router;
 
// http://localhost:3000/api/user
// http://localhost:3000/api/user/9
// http://localhost:3000/api/user/searchName/Diego