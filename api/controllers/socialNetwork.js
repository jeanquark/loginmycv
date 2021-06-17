const asyncHandler = require('../middleware/async')
const SocialNetwork = require('../models/SocialNetwork')

// @desc      Get all languages
// @route     GET /api/v1/languages
// @access    Public
exports.getSocialNetworks = asyncHandler(async (req, res, next) => {
    console.log('getSocialNetworks called!')
    const socialNetworks = await SocialNetwork.find()
    res.status(200).json({ success: true, data: socialNetworks })
})