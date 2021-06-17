const express = require('express')
const { getCountries } = require('../controllers/countries')

const Country = require('../models/Country')

const router = express.Router()

const advancedResults = require('../middleware/advancedResults')

router
    .route('/')
    // .get(authResume, advancedResults(Resume), getResumes);
    .get(advancedResults(Country), getCountries)

module.exports = router
