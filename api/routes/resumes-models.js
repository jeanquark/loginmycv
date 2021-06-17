const express = require('express')
const { getResumesModels } = require('../controllers/resumesModels')

const ResumeModel = require('../models/ResumeModel')

const router = express.Router()

const advancedResults = require('../middleware/advancedResults')

router
    .route('/')
    // .get(authUser, advancedResults(ResumeModel), getResumesModels)
    .get(advancedResults(ResumeModel), getResumesModels)

module.exports = router
