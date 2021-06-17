const asyncHandler = require('../middleware/async')
const Competence = require('../models/Competence')

// @desc      Get all competences
// @route     GET /api/v1/competences
// @access    Public
exports.getCompetences = asyncHandler(async (req, res, next) => {
    console.log('getCompetences called!')
    const competences = await Competence.find()
    res.status(200).json({ success: true, data: competences })
})