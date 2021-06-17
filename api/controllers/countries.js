const asyncHandler = require('../middleware/async')
const Country = require('../models/Country')

// @desc      Get all countries
// @route     GET /api/v1/countries
// @access    Public
exports.getCountries = asyncHandler(async (req, res, next) => {
    console.log('getCountries called!')
    const countries = await Country.find()
    res.status(200).json({ success: true, data: countries })
})