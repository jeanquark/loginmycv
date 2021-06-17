const express = require('express')
const { getCompetences } = require('../controllers/competences')

const Competence = require('../models/Competence')

const router = express.Router()

const advancedResults = require('../middleware/advancedResults')

router
    .route('/')
    // .get(authResume, advancedResults(Resume), getResumes);
    .get(advancedResults(Competence), getCompetences)

module.exports = router
