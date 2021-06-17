const asyncHandler = require('../middleware/async')
// const ResumeModel = require('../models/ResumeModel')

// @desc      Get all resumes models
// @route     GET /api/v1/resumes-models
// @access    Public
exports.getResumesModels = asyncHandler(async (req, res, next) => {
    console.log('[resumesModels controller] @getResumesModels called!')
    // const socialNetworks = await SocialNetwork.find()
    // res.status(200).json({ success: true, data: socialNetworks })
    res.status(200).json(res.advancedResults);
})