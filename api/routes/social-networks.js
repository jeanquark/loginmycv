const express = require('express')
const { getSocialNetworks } = require('../controllers/socialNetwork')

const SocialNetwork = require('../models/SocialNetwork')

const router = express.Router()

const advancedResults = require('../middleware/advancedResults')

router
    .route('/')
    // .get(authResume, advancedResults(Resume), getResumes);
    .get(advancedResults(SocialNetwork), getSocialNetworks)

module.exports = router
