const express = require('express')
const { getTemplates, getTemplateById } = require('../controllers/templates')

const Template = require('../models/Template')

const router = express.Router()

const advancedResults = require('../middleware/advancedResults')

router
    .route('/')
    // .get(authTemplate, advancedResults(Template), getTemplates);
    .get(advancedResults(Template), getTemplates)

router
    // .route('/:slug')
    .route('/:id')
    // .get(authTemplate, getTemplate);
    .get(getTemplateById);

// router
//     .route('/slug/:slug')
//     .get(authTemplate, getTemplateBySlug);
    // .get(getTemplateBySlug);

module.exports = router
