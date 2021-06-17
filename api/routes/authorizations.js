const express = require('express')

const { getAuthorizations, getUserAuthorizations, createAuthorization, deleteAuthorization } = require('../controllers/authorizations')

const Authorization = require('../models/Authorization')

const router = express.Router()
const { authUser, authAdmin, authorize } = require('../middleware/auth')
const { route } = require('./resumes')

router
    .route('/')
    // .get(getAuthorizations)
    // .get(authAdmin, getAuthorizations)
    .get(authUser, authorize('admin'), getAuthorizations)
    .post(authUser, createAuthorization)

router.route('/:id').delete(authUser, deleteAuthorization)
router
    .route('/user/authUser')
    // .get(getUserAuthorizations)
    .get(authUser, getUserAuthorizations)

module.exports = router
