const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const Authorization = require('../models/Authorization')
const Resume = require('../models/Resume')

// @desc      Get all authorizations
// @route     GET /api/v1/authorizations
// @access    Public
exports.getAuthorizations = asyncHandler(async (req, res, next) => {
    console.log('[authorizations controller] getAuthorizations')
    authorizations = await Authorization.find()
    // console.log('authorizations: ', authorizations)
    res.status(200).json({ success: true, data: authorizations })
})

// @desc      Get user authorizations
// @route     GET /api/v1/authorizations/user/:userId
// @access    Private
exports.getUserAuthorizations = asyncHandler(async (req, res, next) => {
    // console.log('[authorizations controller] @getUserAuthorizations req.params.userId: ', req.params.userId)
    // const userResumesArray = ['5e66fc284aff05521ef78cb3', '5e66fc2fb35e17a45ce06fc0']

    const userResumes = await Resume.find({ user: req.user.id }, 'id')
    console.log('userResumes: ', userResumes)

    const userResumesArray = userResumes.map(resume => resume.id)
    console.log('userResumesArray: ', userResumesArray)

    // const authorizations = await Authorization.find({ $or: [{ user_id: req.user.id }] })
    // const authorizations = await Authorization.find({ 'resume_id': { $in: [userResumes] }})
    // const authorizations = await Authorization.find().where('resume_id').in(userResumes)
    const authorizations = await Authorization.find({ $or: [{ user: req.user.id }, { 'resume': { $in: userResumesArray }}] }).populate({ path: 'user', select: ['firstname', 'lastname', 'email']}).populate({ path: 'resume', select: ['slug', 'is_active', 'visibility', 'personal_data'] })
    // const authorizations = await Authorization.find({ $or: [{ resume_id: { $in: userResumesArray } }] })
    // const authorizations = await Authorization.find({ user_id: req.user.id })

    res.status(200).json({ success: true, data: authorizations })
})

// @desc      Create new authorization
// @route     POST /api/v1/authorizations
// @access    Public
exports.createAuthorization = asyncHandler(async (req, res, next) => {
    
    console.log('[resumes controller] @createAuthorization req.user.id: ', req.user.id)
    console.log('[resumes controller] @createAuthorization req.body: ', req.body)
    // req.body.user = req.user.id
    // res.status(200).json({ success: true, data: '' })

    // return next(new ErrorResponse('Invalid data', 401))

    const authorization = await Authorization.create(req.body)

    res.status(200).json({ success: true, data: authorization })
})

// @desc      Delete authorization
// @route     DELETE /api/v1/authorizations/:id
// @access    Private
exports.deleteAuthorization = asyncHandler(async (req, res, next) => {
    console.log('[authorizations controller] @deleteAuthorization req.params.id: ', req.params.id)
    const authorization = await Authorization.findById(req.params.id)

    if (!authorization) {
        return next(new ErrorResponse(`Authorization not found with id of ${req.params.id}`, 404))
    }

    // Make sure auth user is authorization owner
    if (authorization.user.toString() !== req.user.id) {
        return next(new ErrorResponse(`User ${req.params.id} is not authorized to delete this authorization`, 401))
    }

    authorization.remove()

    res.status(200).json({ success: true, data: {} })
})