const path = require('path')
const fs = require('fs')
const sanitize = require('sanitize-filename')
const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')
// const Resume = require('../models/Resume')
const calculateFolderSize = require('../utils/calculateFolderSize')

// @desc      Get all files
// @route     GET /api/v1/files
// @access    Public
exports.getFiles = asyncHandler(async (req, res, next) => {
    console.log('[files controller] @getFile')
    return next(new ErrorResponse('Forced error.', 404))
    const file = `static/images/1920x1080.jpg`;
    res.download(file);
})

// @desc      Get one file
// @route     GET /api/v1/files/:fileId
// @access    Public
exports.getFile = asyncHandler(async (req, res, next) => {
    console.log('[files controller] @getFile req.body: ', req.body)
    const { userId, fileName } = req.body
    // return next(new ErrorResponse('Forced error.', 404))

    var filePath = path.join(path.resolve(__dirname, '../..'), `/data/files/users/${userId}`)
    console.log('filePath: ', filePath)

    // const file = `${filePath}/${fileName}`
    const file = `${filePath}/Webstamps.pdf`
    console.log('file: ', file)
    res.download(file)
})

// @desc      Upload a new file
// @route     POST /api/v1/files/upload
// @access    Public
exports.uploadFile = asyncHandler(async (req, res, next) => {
    console.log('[files controller] @uploadFile req.files: ', req.files)
    console.log('[files controller] @uploadFile req.file: ', req.file)
    console.log('[files controller] @uploadFile req.body: ', req.body)

    const file = req.files ? req.files.file : null
    console.log('file: ', file)

    if (file) {
        // 1) Check file type
        if (file.mimetype != 'application/pdf') {
            console.log('Incorrect file type: ', file.mimetype)
            return next(new ErrorResponse(`Invalid data type for file "${file.name}". Upload was cancelled.`, 400))
        } else {
            console.log('Correct file type')
        }

        // 2) Create user folders if not exists
        if (!fs.existsSync(`data/files/users/${req.user.id}`)) {
            // console.log('Create folder on server')
            fs.mkdirSync(`data/files/users/${req.user.id}`)
        }
        if (!fs.existsSync(`static/images/users/${req.user.id}`)) {
            fs.mkdirSync(`static/images/users/${req.user.id}`)
        }

        // 2) Check available space
        const imagesFolderSize = await calculateFolderSize(`static/images/users/${req.user.id}`)
        const filesFolderSize = await calculateFolderSize(`data/files/users/${req.user.id}`)
        console.log('imagesFolderSize: ', imagesFolderSize)
        console.log('filesFolderSize: ', filesFolderSize)
        const fileSize = parseInt(file.size)
        const availableSpace = process.env.USER_DEFAULT_ALLOCATED_SPACE_IN_BYTES
        console.log('fileSize: ', fileSize)
        console.log('availableSpace: ', availableSpace)
        if (fileSize > availableSpace) {
            return next(new ErrorResponse(`Not enough space. Upload of file "${file.name}" was cancelled.`))
        }

        console.log('[files controller] @uploadFile file.size: ', parseInt(file.size))

        // 3) Everything's fine, upload file to local disk
        const fileName = `${sanitize(file.name)}`
        const uploadPath = `data/files/users/${req.user.id}/${fileName}`
        // console.log('uploadPath: ', uploadPath)

        
        // console.log('Folder existence checked!')

        uploadPicture = () => {
            return new Promise((resolve, reject) => {
                // setTimeout(() => {
                file.mv(uploadPath, function (err) {
                    if (err) {
                        // console.log('Error from .mv!')
                        // console.log(err)
                        reject()
                    } else {
                        // console.log('Success from .mv!')
                        resolve()
                    }
                })
                // }, 1000)
            })
        }

        await uploadPicture()
        // console.log('Await uploadPicture completed!')
        // expected output: "resolved"

        if (!fs.existsSync(uploadPath)) {
            return next(new ErrorResponse(`An error occured and file ${fileName} could not be uploaded`, 500))
        }

        // return next(new ErrorResponse('Forced error response', 404))
    } else {
        return next(new ErrorResponse('No file was uploaded.'))
    }

    res.status(201).json({
        success: true
    })
})

// @desc      Delete a file
// @route     POST /api/v1/files/delete
// @access    Public
exports.deleteFile = asyncHandler(async (req, res, next) => {
    console.log('[files controller] @deleteFile req.body: ', req.body)
    console.log('[files controller] @deleteFile req.params: ', req.params)

    // const { fileName } = req.body
    const { fileName } = req.params
    // console.log('imageName: ', imageName)

    const path = `data/files/users/${req.user.id}/${fileName}`
    console.log('path: ', path)

    // 1) Delete file on server
    try {
        await fs.promises.unlink(path)
        // console.log('Image has been successfully removed')
    } catch (error) {
        console.log('error: ', error)
        return next(new ErrorResponse(`File ${fileName} not found.`, 500))
    }
    // console.log('Done deleting on server!')

    res.status(200).json({
        success: true
    })
})
