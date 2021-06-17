const asyncHandler = require('../middleware/async')
const Package = require('../models/Package')

// @desc      Get all packages
// @route     GET /api/v1/packages
// @access    Public
exports.getPackages = asyncHandler(async (req, res, next) => {
    console.log('getPackages called!')
    const packages = await Package.find({ is_active: true }).sort('price')
    res.status(200).json({ success: true, data: packages })
})
