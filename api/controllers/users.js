const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const User = require('../models/User')

// @desc      Get all users
// @route     GET /api/v1/users
// @access    Private/Admin
// exports.getUsers = asyncHandler(async (req, res, next) => {
//   res.status(200).json(res.advancedResults);
// });

exports.getUsers = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);

    // console.log('[getUsers controller]')
    // const users = await User.find({ $text: {$search: 'Doe9'} })
    // console.log('users: ', users)
    // res.status(200).json({
    //     success: true,
    //     data: users
    // })
})

// @desc      Get single user
// @route     GET /api/v1/users/:id
// @access    Private/Admin
exports.getUserById = asyncHandler(async (req, res, next) => {
    console.log('[getUserById controller] req.user.id: ', req.user.id)
    console.log('[getUserById controller] req.params.id: ', req.params.id)
    const userId = req.params.id
    const user = await User
        .findById(userId)
        // .populate('resumes')
        .populate('package')
        .populate('authorizations')
	console.log('user: ', user)

    res.status(200).json({
        success: true,
        data: user
    })
})

// @desc      Create user
// @route     POST /api/v1/users
// @access    Private/Admin
exports.createUser = asyncHandler(async (req, res, next) => {
    const user = await User.create(req.body)

    res.status(201).json({
        success: true,
        data: user
    })
})

// @desc      Update user
// @route     PUT /api/v1/users/:id
// @access    Private/Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
    console.log('[updateUser controller] @updateUser req.user.id: ', req.user.id)
    console.log('[updateUser controller] @updateUser req.body: ', req.body)

    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        data: user
    })
})

// @desc      Delete user
// @route     DELETE /api/v1/users/:id
// @access    Private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
    await User.findByIdAndDelete(req.params.id)

    res.status(200).json({
        success: true,
        data: {}
    })
})
