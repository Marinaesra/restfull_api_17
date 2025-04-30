const express = require ('express');
const router = express.Router();
const {getAllUser, getUserById} = require ('../controllers/userController');

router.get('/all-user', getAllUser);
router.get('/:id', getUserById);

module.exports = router;