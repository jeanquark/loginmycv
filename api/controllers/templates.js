const path = require('path')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const Template = require('../models/Template')

// @desc      Get all templates
// @route     GET /api/v1/templates
// @access    Public
exports.getTemplates = asyncHandler(async (req, res, next) => {
    console.log('getTemplates called!')
    // const templates = await Template.find()
    // res.status(200).json({ success: true, data: templates })
    res.status(200).json(res.advancedResults);
})

// @desc      Get active templates
// @route     GET /api/v1/templates
// @access    Public
// exports.getActiveTemplates = asyncHandler(async (req, res, next) => {
//     console.log('getTemplates called!')
//     const templates = await Template.find({ is_active: true }).sort('slug')
//     res.status(200).json({ success: true, data: templates })
// })

// @desc      Get single template
// @route     GET /api/v1/templates/:id
// @access    Private
exports.getTemplateById = asyncHandler(async (req, res, next) => {
    console.log('[templates controller] @getTemplateById req.params.id: ', req.params.id)
    // console.log('req.params.slug: ', req.params.slug)

    const template = await Template.findById(req.params.id)
    if (!template) {
        return next(new ErrorResponse(`Template not found with id of ${req.params.id}`, 404))
    }

    res.status(200).json({ success: true, data: template })
})

// @desc      Get single template
// @route     GET /api/v1/templates/slug/:slug
// @access    Private
// exports.getTemplateBySlug = asyncHandler(async (req, res, next) => {
//     console.log('[templates controller] @getTemplateBySlug req.params.slug: ', req.params.slug)
//     console.log('[templates controller] @getTemplateBySlug req.userTemplate: ', req.userTemplate)

//     // const template = await Template.findOne({ slug: req.params.slug })
//     const template = req.userTemplate

//     if (!template) {
//         return next(new ErrorResponse(`Template not found with slug of ${req.params.slug}`, 404))
//     }

//     res.status(200).json({ success: true, data: template })
// })
