const express = require("express");
const router = express.Router();
const { getAllUser, getUserById , getUserByName , addUser } = require("../controllers/userController");
 
router.get("/", getAllUser);
router.post("/", addUser);
router.get("/:idUser", getUserById);
router.get("/searchName/:nombre", getUserByName);
 
module.exports = router;
 
// http://localhost:3000/api/user
// http://localhost:3000/api/user/9
// http://localhost:3000/api/user/searchName/Diego