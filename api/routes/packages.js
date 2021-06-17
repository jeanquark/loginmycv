const express = require('express')

const { getPackages } = require('../controllers/packages')

const Package = require('../models/Package')

const router = express.Router()
const { authUser, authAdmin, authorize } = require('../middleware/auth')
const { route } = require('./packages')

router
    .route('/')
    .get(getPackages)

module.exports = router
