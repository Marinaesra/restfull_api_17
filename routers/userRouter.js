const express = require("express");
const router = express.Router();
const { 
getAllUser,
getUserById, 
getUserByName, 
addUser, 
getUserByAge, 
} = require("../controllers/userController");
 
router.get("/", getAllUser);
router.post("/", addUser);
router.get("/:idUser", getUserById);
router.get("/searchName/:nombre", getUserByName);
router.get("/searchAge/:age", getUserByAge);
 
module.exports = router;
 
// http://localhost:3000/api/user
// http://localhost:3000/api/user/9
// http://localhost:3000/api/user/searchName/Diego
// http://localhost:3000/api/user/searchAge/40