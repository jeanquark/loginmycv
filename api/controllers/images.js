const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')
const Resume = require('../models/Resume')
const fs = require('fs')
const path = require('path')
const sanitize = require('sanitize-filename')
const calculateFolderSize = require('../utils/calculateFolderSize')

exports.getImage = asyncHandler(async (req, res, next) => {
    return next(new ErrorResponse('Forced error.', 404))
})

exports.uploadImage = asyncHandler(async (req, res, next) => {
    console.log('[image.controller] @uploadImage req.files: ', req.files)
    console.log('[image.controller] @uploadImage req.file: ', req.file)
    console.log('[image controller] @uploadImage req.body: ', req.body)
    console.log('[image controller] @uploadImage req.user: ', req.user)

    const file = req.files ? req.files.file : null
    console.log('file: ', file)

    if (file) {
        // 1) Check file type
        if (!file.mimetype == 'image/jpeg' || !file.mimetype == 'image/png') {
            console.log('Incorrect file type: ', file.mimetype)
            return next(new ErrorResponse(`Invalid data type for image ${file.name}. Image was not uploaded.`, 400))
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
        console.log('[images controller] @uploadImage file.size: ', parseInt(file.size))

        // 3) Everything's fine, upload image to local disk
        const fileName = `${sanitize(file.name)}`
        const uploadPath = `static/images/users/${req.user.id}/${fileName}`

        uploadPicture = () => {
            return new Promise((resolve, reject) => {
                file.mv(uploadPath, function (err) {
                    if (err) {
                        reject()
                    } else {
                        resolve()
                    }
                })
            })
        }

        await uploadPicture()

        if (!fs.existsSync(uploadPath)) {
            return next(new ErrorResponse(`An error occured and image ${fileName} could not been uploaded`, 500))
        }
    } else {
        return next(new ErrorResponse('No image was uploaded.'))
    }

    res.status(201).json({
        success: true
    })
})

exports.deleteImage = asyncHandler(async (req, res, next) => {
    console.log('[images controller] @deleteImage req.body: ', req.body)
    console.log('[images controller] @deleteImage req.params: ', req.params)

    // const { imageName } = req.body
    const { imageName } = req.params
    // console.log('imageName: ', imageName)

    const path = `static/images/users/${req.user.id}/${imageName}`
    console.log('path: ', path)

    // 1) Delete image on server
    try {
        await fs.promises.unlink(path)
        // console.log('Image has been successfully removed')
    } catch (error) {
        console.log('error: ', error)
        return next(new ErrorResponse('Image not found.', 500))
    }

    res.status(200).json({
        success: true
    })
})
