const express = require('express');
const usersController = require('../controllers/users')
const router = express.Router();

router.route('/:id')
.patch(usersController.updateuserbyid)
.delete(usersController.deleteuserbyid);

router.route('/')
.get(usersController.getAllusersfirstname)
.post(usersController.adduser);




module.exports = router;