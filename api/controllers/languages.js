const asyncHandler = require('../middleware/async')
const Language = require('../models/Language')

// @desc      Get all languages
// @route     GET /api/v1/languages
// @access    Public
exports.getLanguages = asyncHandler(async (req, res, next) => {
    console.log('getLanguages called!')
    const languages = await Language.find()
    res.status(200).json({ success: true, data: languages })
})