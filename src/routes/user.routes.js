const express = require('express')

const userController = require('../controller/user.controller')

const router = express.Router()

router
.route('/')
.get(userController.findUserAll)
.post(userController.createUser)

router 
.route('/:id')
.get(userController.findUser)

module.exports = router