const express = require('express')
const { getLanguages } = require('../controllers/languages')

const Language = require('../models/Language')

const router = express.Router()

const advancedResults = require('../middleware/advancedResults')

router
    .route('/')
    // .get(authResume, advancedResults(Resume), getResumes);
    .get(advancedResults(Language), getLanguages)

module.exports = router
