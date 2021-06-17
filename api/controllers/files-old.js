const asyncHandler = require('../middleware/async')

// @desc      Get all files
// @route     GET /api/v1/files
// @access    Public
exports.getFiles = asyncHandler(async (req, res, next) => {
    console.log('getFiles called!')
    const file = `static/images/1920x1080.jpg`;
    res.download(file); // Set disposition and send it.
})

exports.getFiles2 = asyncHandler(async (req, res, next) => {
    console.log('getFiles2 called!')
    const file = `loginmycv/data/1920x1080.jpg`;
    res.download(file); // Set disposition and send it.
})

exports.getFiles3 = asyncHandler(async (req, res, next) => {
    console.log('getFiles3 called!')
    const file = `/loginmycv/data/1920x1080.jpg`;
    res.download(file); // Set disposition and send it.
})

exports.getFiles4 = asyncHandler(async (req, res, next) => {
    console.log('getFiles4 called!')
    const file = `data/1920x1080.jpg`;
    res.download(file); // Set disposition and send it.
})

exports.getFiles5 = asyncHandler(async (req, res, next) => {
    console.log('getFiles5 called!')
    const file = `/data/1920x1080.jpg`;
    res.download(file); // Set disposition and send it.
})