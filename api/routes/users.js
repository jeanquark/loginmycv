const express = require('express')
const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/users')

const User = require('../models/User')

const router = express.Router({ mergeParams: true })

const advancedResults = require('../middleware/advancedResults')
const { authUser, authorize } = require('../middleware/auth')

// router.use(authUser);
// router.use(authorize('admin'));

router
    .route('/')
    .get(authUser, authorize('admin'), advancedResults(User), getUsers)
    // .get(advancedResults(User), getUsers)
    // .get(authUser, advancedResults(User), getUsers)
    .post(createUser)

router
    .route('/:id')
    .get(authUser, authorize('admin'), getUserById)
    // .get(authUser, getUserById)
    .put(authUser, updateUser)
    .delete(authUser, authorize('admin'), deleteUser)

module.exports = router
