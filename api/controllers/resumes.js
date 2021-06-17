const path = require('path')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const Resume = require('../models/Resume')
const fs = require('fs')
const sanitize = require('sanitize-filename')
// const multer = require('multer')
// const multerS3 = require('multer-s3')
const jwt = require('jsonwebtoken')
const util = require('util')
const mongoose = require('mongoose')
// const Resume = mongoose.model('Resume')
const ObjectId = mongoose.Types.ObjectId

// exports.getFile2 = asyncHandler(async (req, res, next) => {
//     console.log('[resumes controller] @getFile req.body: ', req.body)
//     return next(new ErrorResponse('Forced error.', 404))
//     const { fileName } = req.body

//     // var filePath = path.join(path.resolve(__dirname, '..'), '/static/')
//     // console.log('filePath: ', filePath)

//     // const file = `${filePath}/${fileName}`
//     // console.log('file: ', file)
//     // res.download(file)

//     return next(new ErrorResponse(`No file found`, 404))
// })

// @desc      Get all resumes
// @route     GET /api/v1/resumes
// @access    Public
exports.getResumes = asyncHandler(async (req, res, next) => {
    console.log('[resumes controller] getResumes called!', new Date())

    // console.log('[resumes controller] __dirname: ', __dirname)
    // var filePath = path.join(__dirname, '/files', '1920x1080.jpg')
    // fileDownload(filePath, 'filename.csv');
    // res.download(filePath, function(err) {
    //     if (!err) {
    //         console.log('SUCCESS, filePath', filePath)
    //         // res.send(filePath)

    //         return // file sent
    //     }
    //     if (err.status !== 404) return next(err) // non-404 error
    //     // file for download not found
    //     res.statusCode = 404
    //     res.send('Cant find that file, sorry!')
    // })

    // res.status(200).json(res.advancedResults)
    // const resumes = await Resume.find({ is_active: true, $or: [{ visibility: 'public' }, { visibility: 'semi-private' }] }, 'user slug job_title visibility languages').populate(
    //     'personal_data.country',
    //     'flag'
    // )
    const resumes = await Resume.find({ is_active: true, $or: [{ visibility: 'public' }, { visibility: 'semi-private' }] }, 'user slug job_title visibility languages')
    // console.log('[resumes controller] resumes: ', resumes)

    res.status(200).json({ success: true, data: resumes })
})

// @desc      Get single resume
// @route     GET /api/v1/resumes/:id
// @access    Private
exports.getResumeById = asyncHandler(async (req, res, next) => {
    console.log('[resumes controller] @getResumeById req.authResume: ', req.authResume)
    console.log('[resumes controller] @getResumeById req.params.id: ', req.params.id)
    // console.log('req.params.slug: ', req.params.slug)

    const resume = await Resume.findById(req.params.id)
    if (!resume) {
        return next(new ErrorResponse(`Resume not found with id of ${req.params.id}`, 404))
    }

    res.status(200).json({ success: true, data: resume })
})

// @desc      Get single resume
// @route     GET /api/v1/resumes/slug/:slug
// @access    Private
exports.getResumeBySlug = asyncHandler(async (req, res, next) => {
    console.log('[resumes controller] @getResumeBySlug req.authResume: ', req.authResume)
    console.log('[resumes controller] @getResumeBySlug req.params.slug: ', req.params.slug)
    console.log('[resumes controller] @getResumeBySlug req.cookies[token-user]', req.cookies['token-user'])

    // Get authUser id if it exists
    let userId = null
    if (req.cookies['token-user']) {
        const decoded = jwt.verify(req.cookies['token-user'], process.env.JWT_SECRET_USER)
        console.log('[resumes controller] @getResumeBySlug decoded:', decoded)
        userId = decoded.id
    }

    // Return resume and update statistics
    const resume = await Resume.findOneAndUpdate(
        { slug: req.params.slug },
        {
            $inc: { 'statistics.total_views_count': 1 },
            $push: { 'statistics.last_visitors': { $each: [{ user: userId, date: new Date() }], $slice: -5 } }
        }
    )
        .populate('template')
        .populate('personal_data.country')
        .populate('personal_data.nationalities')
        .select('-statistics')
        .select('-uploads.statistics')

    if (!resume) {
        return next(new ErrorResponse(`Resume not found with slug of ${req.params.slug}`, 404))
    }

    res.status(200).json({ success: true, data: resume })
})

// @desc      Get user resumes
// @route     GET /api/v1/resumes/auth-user
// @access    Private
exports.getUserResumes = asyncHandler(async (req, res, next) => {
    // console.log('[resumes controller] @getUserResumes req.params.id: ', req.params.id)
    // console.log('[resumes controller] @getUserResumes req.authUser: ', req.authUser)
    console.log('[resumes controller] @getUserResumes req.user: ', req.user)
    console.log('[resumes controller] @getUserResumes req.user.id: ', req.user.id)
    // return next(new ErrorResponse(`No resume found for user ${req.user.id}`, 404))

    const resumes = await Resume.find({ user: req.user.id })
        .populate('user')
        .populate('template')
        .populate('personal_data.country')
        .populate('personal_data.nationalities')
    // const resume = req.userResume
    console.log('resumes.uploads: ', resumes[1]['uploads'])

    if (!resumes) {
        return next(new ErrorResponse(`No resume found for user ${req.user.id}`, 404))
    }

    res.status(200).json({ success: true, data: resumes })
})

// @desc      Get user images
// @route     GET /api/v1/resumes/user-images
// @access    Private
exports.getUserImages = asyncHandler(async (req, res, next) => {
    console.log('[resumes controller] @getUserImages')
    const directoryPath = path.join(path.resolve(__dirname, '../..'), `/static/images/users/${req.user.id}/`)
    console.log('directoryPath: ', directoryPath)

    const userImages = []

    let files
    try {
        files = await fs.promises.readdir(directoryPath)
    } catch (error) {
        console.log('error readdir: ', error)
    }
    console.log('files: ', files)
    if (files) {
        let totalSize = 0
        files.forEach(function(file) {
            const stats = fs.statSync(`${directoryPath}/${file}`)
            const { size } = stats
            console.log('size: ', size)
            totalSize += size
            userImages.push({
                name: file,
                size
            })
        })
        console.log('totalSize: ', totalSize)
        console.log('userImages: ', userImages)
        console.log('files: ', files)

        console.log('Done!')
    }

    // return next(new ErrorResponse(`Forced error response`, 404))
    res.status(200).json({ success: true, data: userImages })
})

// @desc      Get user files
// @route     GET /api/v1/resumes/user-files
// @access    Private
exports.getUserFiles = asyncHandler(async (req, res, next) => {
    console.log('[resumes controller] @getUserFiles')

    // Initialize S3
   
    // console.log('next')

    // // Get S3 objects
    // const s3Objects = []
    // for (let object of s3ListObjects.Contents) {
    //     const params = {
    //         Bucket: process.env.AWS_S3_BUCKET_NAME,
    //         Key: `${object.Key}`
    //     }
    //     const s3Object = await s3.getObject(params).promise()
    //     if (!s3Object) {
    //         console.log('error: ', error, error.stack)
    //         return next(new ErrorResponse(`User file could not be retrieved`, 404))
    //     }
    //     console.log('s3Object: ', s3Object)
    //     s3Objects.push(s3Object)
    // }
    // console.log('s3Objects: ', s3Objects)

    res.status(200).json({
        success: true,
        data: s3ListObjects.Contents.map(object => {
            return { name: object.Key.substring(object.Key.indexOf('/') + 1) }
        })
    })
    // res.status(200).json({ success: true, data: s3ListObjects.Contents.map(({Key}) => {Key} ) })
})

// @desc      Get user file
// @route     POST /api/v1/resumes/file
// @access    Private
exports.getResumeFile = asyncHandler(async (req, res, next) => {
    console.log('[resumes controller] @getResumeFile req.params: ', req.params)
    console.log('[resumes controller] @getResumeFile req.body: ', req.body)
    console.log('[resumes controller] @getResumeFile req.headers.accept: ', req.headers.accept)
    // return next(new ErrorResponse(`Resume file could not be retrieved`, 404))
    const { fileName, fileId, resumeId, resumeUserId, authUserId } = req.body
    // const { resumeId, fileId } = req.params
    // console.log('resumeId: ', resumeId)
    // console.log('fileId: ', fileId)

    // 1) Initialize s3
    

    res.send()
})

// @desc      Create new resume
// @route     POST /api/v1/resumes
// @access    Private
exports.createResume = asyncHandler(async (req, res, next) => {
    console.log('[resumes controller] @createResume req.user: ', req.user)
    console.log('[resumes controller] @createResume req.body: ', req.body)

    // Do not update uploads entries (leave that to the uploadResumeFiles function)
    delete req.body.uploads

    const resume = await Resume.create(req.body)
    res.status(200).json({ success: true, data: resume })
})

// @desc      Update existing resume
// @route     PUT /api/v1/resumes
// @access    Private
exports.updateResumeData = asyncHandler(async (req, res, next) => {
    console.log('[resumes controller] @updateResume req.params.id: ', req.params.id)
    console.log('[resumes controller] @updateResume req.user.id: ', req.user.id)
    console.log('[resumes controller] @updateResume req.body: ', req.body)
    // return next(new ErrorResponse(`Resume not found with id of ${req.params.id}`, 404))

    let resume = await Resume.findById(req.params.id)

    if (!resume) {
        return next(new ErrorResponse(`Resume not found with id of ${req.params.id}`, 404))
    }

    // Make sure user is resume owner
    if (resume.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`User ${req.params.id} is not authorized to update this resume`, 401))
    }

    // Do not update uploads entries (leave that to the uploadResumeFiles function)
    delete req.body.uploads

    resume = await Resume.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        context: 'query'
    })
    res.status(200).json({ success: true, data: resume })
})

// @desc    Add image to uploads array
// @route   POST /api/v1/resumes/images/add
// @access  Private
exports.addResumeImage = asyncHandler(async (req, res, next) => {
    console.log('[resume controller] @addResumeImage req.body: ', req.body)
    const { resumeId, image } = req.body

    await Resume.findByIdAndUpdate(resumeId, {
        $push: {
            uploads: {
                name: image['name'],
                title: image['title'],
                mime_type: image['mimetype'],
                size_in_bytes: image['size_in_bytes'],
                type: image['type'],
                category: image['category']
            }
        }
    })

    res.status(200).json({ success: true })
})


// @desc    Remove image from uploads array
// @route   POST /api/v1/resumes/images/remove
// @access  Private
exports.removeResumeImage = asyncHandler(async (req, res, next) => {
    console.log('[resume controller] @removeResumeImage req.body: ', req.body)
    const { resumeId, imageName } = req.body

    await Resume.findByIdAndUpdate(resumeId, {
        $pull: {
            uploads: {
                name: imageName,
                type: 'image'
            }
        }
    })
    res.status(200).json({ success: true })
})

// @desc    Add file to uploads array
// @route   POST /api/v1/resumes/files/add
// @access  Private
exports.addResumeFile = asyncHandler(async (req, res, next) => {
    console.log('[resume controller] @addResumeFile req.body: ', req.body)
    const { resumeId, file } = req.body

    await Resume.findByIdAndUpdate(resumeId, {
        $push: {
            uploads: {
                name: file['name'],
                title: file['title'],
                mime_type: file['mimetype'],
                size_in_bytes: file['size_in_bytes'],
                type: file['type'],
                category: file['category']
            }
        }
    })

    res.status(200).json({ success: true })
})

// @desc      Update existing resume files
// @route     PUT /api/v1/resumes/files
// @access    Private
exports.updateResumeFiles = asyncHandler(async (req, res, next) => {
    console.log('[resume controller] @updateResumeFiles req.body: ', req.body)
    const { resumeId, resumeFiles } = req.body

    for (let i = 0; i < resumeFiles.length; i++) {
        console.log('resumeFiles[i]: ', resumeFiles[i])
        await Resume.updateOne(
            { _id: resumeId, 'uploads.$.name': resumeFiles[i]['name'] },
            {
                $set: {
                    'uploads.$.title': resumeFiles[i]['title']
                }
            },
            { new: true, runValidators: true }
        )
    }
    res.status(200).json({ success: true })
})

// // @desc      Upload files for resume
// // @route     POST /api/v1/resumes/files/add
// // @access    Private
// exports.uploadResumeFile2 = asyncHandler(async (req, res, next) => {
//     console.log('[resume.controller] @uploadResumeFiles req.params.id: ', req.params.id)
//     // console.log('[resume.controller] @uploadResumeFiles req.body: ', req.body)
//     console.log('[resume.controller] @uploadResumeFiles req.files: ', req.files)
//     const filesPropertiesArray = JSON.parse(req.body.array)
//     console.log('filesPropertiesArray: ', filesPropertiesArray)

//     // return next(new ErrorResponse(`Forced error response`, 404))

//     const resume = await Resume.findById(req.params.id)

//     // 1) Check if resume exists
//     if (!resume) {
//         return next(new ErrorResponse(`Resume with id of ${req.params.id} not found`, 404))
//     }

//     // 2) Make sure auth user is resume owner
//     if (resume.user.toString() !== req.user.id && req.user.role !== 'admin') {
//         return next(new ErrorResponse(`User ${req.params.id} is not authorized to update this resume`, 401))
//     }

//     // 3) Initialize S3
//     const s3 = new AWS.S3({
//         accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//         secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//         region: 'eu-central-1'
//     })

//     // 4) Upload new files on S3 and DB
//     for (let i = 0; i < req.files.length; i++) {
//         console.log(`Upload file with index ${i}`)
//         const file = req.files[i]
//         console.log('file: ', file)

//         // Check file size
//         if (parseInt(file.size) > parseInt(process.env.MAX_FILE_UPLOAD_SIZE_IN_BYTES || 10000000)) {
//             // 10MB
//             return next(new ErrorResponse(`Please upload a file smaller than ${process.env.MAX_FILE_UPLOAD_SIZE_IN_BYTES / 10000000 || '10'} MB`, 400))
//         }

//         // Setting up S3 upload parameters
//         const file_name = `${sanitize(file.originalname)}`
//         const params = {
//             Bucket: process.env.AWS_S3_BUCKET_NAME,
//             Key: `${req.user.id}/${file_name}`, // File name you want to save as in S3
//             Body: file.buffer,
//             // ACL: 'public-read'
//             ACL: 'private' // Access to this file is restricted
//         }

//         // Uploading files to the bucket
//         const s3ObjectUpload = await s3.upload(params).promise()
//         if (!s3ObjectUpload) {
//             return next(new ErrorResponse(`Failed to upload file ${s3ObjectUpload}`, 401))
//         }
//         console.log('s3ObjectUpload: ', s3ObjectUpload)

//         // Update database with new upload entry
//         await Resume.findByIdAndUpdate(req.params.id, {
//             $push: {
//                 uploads: {
//                     name: file_name,
//                     mime_type: file.mimetype,
//                     size_in_bytes: file.size,
//                     download_url: s3ObjectUpload.Location
//                 }
//             }
//         })
//     }

//     // 5) Delete removed files on S3 and DB
//     console.log('filesPropertiesArray length: ', filesPropertiesArray.length)
//     for (let i = 0; i < filesPropertiesArray.length; i++) {
//         if (filesPropertiesArray[i]['status'] == 'delete') {
//             console.log(`Delete file with index ${i}`)
//             // Delete on S3
//             const params = {
//                 Bucket: process.env.AWS_S3_BUCKET_NAME,
//                 Key: `${req.user.id}/${filesPropertiesArray[i]['name']}`
//             }

//             const s3DeletedObject = await s3.deleteObject(params).promise()
//             if (!s3DeletedObject) {
//                 return next(new ErrorResponse(`Failed to delete file ${filesPropertiesArray[i]['name']}`, 401))
//             }

//             // Delete on DB
//             await Resume.findByIdAndUpdate(req.params.id, {
//                 $pull: {
//                     uploads: {
//                         name: `${filesPropertiesArray[i]['name']}`
//                     }
//                 }
//             })
//         }
//     }

//     // 6) Update file title & file category
//     for (let i = 0; i < filesPropertiesArray.length; i++) {
//         console.log('filesProperiesArray status: ', filesPropertiesArray[i]['status'])
//         if (filesPropertiesArray[i]['status'] != 'delete') {
//             // Not a deleted file
//             console.log(`Update title with index ${i}`)
//             await Resume.updateOne(
//                 { _id: req.params.id, 'uploads.name': filesPropertiesArray[i]['name'] },
//                 {
//                     $set: {
//                         'uploads.$.title': filesPropertiesArray[i]['title'],
//                         'uploads.$.category': filesPropertiesArray[i]['category']
//                     }
//                 },
//                 { new: true, runValidators: true }
//             )
//         }
//         // 7) Update Access Control List to "public-read" for S3 object of category type "profile_picture"
//         // if (filesPropertiesArray[i]['category'] === 'profile_picture') {
//         //     const params = {
//         //         Bucket: process.env.AWS_S3_BUCKET_NAME,
//         //         Key: `${req.user.id}/${filesPropertiesArray[i]['name']}`,
//         //         ACL: 'public-read'
//         //     }
//         //     s3.putObjectAcl(params, function(err, data) {
//         //         if (err) {
//         //             console.log(err, err.stack)
//         //         }
//         //         // an error occurred
//         //         else {
//         //             console.log(data) // successful response
//         //         }
//         //     })
//         // }
//     }

//     res.status(201).json({
//         success: true,
//         data: 'uploadResumeFiles'
//     })
// })

// @desc    Remove file from uploads array
// @route   POST /api/v1/resumes/files/remove
// @access  Private
exports.removeResumeFile = asyncHandler(async (req, res, next) => {
    console.log('[resume controller] @removeResumeFile req.body: ', req.body)
    const { resumeId, fileName } = req.body

    await Resume.findByIdAndUpdate(resumeId, {
        $pull: {
            uploads: {
                name: fileName,
                type: 'file'
            }
        }
    })
    res.status(200).json({ success: true })
})

// @desc      Reset resume views counter to 0
// @route     GET /api/v1/resumes/:id/resest-resume-counter
// @access    Private
exports.resetResumeCounter = asyncHandler(async (req, res, next) => {
    console.log('[resumes controller] @resetResumeCounter req.user.id: ', req.user.id)
    console.log('[resumes controller] @resetResumeCounter req.params: ', req.params)

    // return next(new ErrorResponse(`Resume not found with id of ${req.params.id}`, 404))

    const resume = await Resume.findByIdAndUpdate(
        req.params.id,
        { 'statistics.total_views_count': 200 },
        {
            new: true,
            runValidators: true,
            context: 'query'
        }
    )
    res.status(200).json({ success: true, data: resume })
})

// @desc      Reset resume uploads downloads counter
// @route     GET /api/v1/resumes/:id/resume-uploads-counter
// @access    Private
exports.resetUploadsCounter = asyncHandler(async (req, res, next) => {
    console.log('[resumes controller] @resetUploadsCounter req.user.id: ', req.user.id)
    console.log('[resumes controller] @resetUploadsCounter req.params: ', req.params)

    const resume = await Resume.findByIdAndUpdate(
        req.params.id,
        {
            $set: {
                'uploads.$[].statistics.total_downloads_count': 200
            }
        },
        {
            new: true,
            context: 'query'
        }
    )

    res.status(200).json({ success: true, data: resume })
})

// @desc      Delete resume file
// @route     DELETE /api/v1/resumes/file/:id
// @access    Private
exports.deleteResumeFile2 = asyncHandler(async (req, res, next) => {
    console.log('[resumes controller] @deleteResume req.user.id: ', req.user.id)
    console.log('[resumes controller] @deleteResume req.params: ', req.params)
    console.log('[resumes controller] @deleteResume req.params.fileName: ', req.params.fileName)
    // return next(new ErrorResponse(`Resume not found with id of ${req.params.id}`, 404))

    const userId = req.user.id
    const { fileName } = req.params

    // 1) Delete file in S3
    

    // console.log('DEF: ', s3DeletedObject)
    // 2) Delete file in DB
    await Resume.updateMany({ user: userId }, { $pull: { uploads: { name: fileName } } })

    res.status(200).json({ success: true })
})

// @desc      Delete resume
// @route     DELETE /api/v1/resumes/:id
// @access    Private
exports.deleteResume = asyncHandler(async (req, res, next) => {
    console.log('[resumes controller] @deleteResume req.params.id: ', req.params.id)
    const resume = await Resume.findById(req.params.id)

    if (!resume) {
        return next(new ErrorResponse(`Resume not found with id of ${req.params.id}`, 404))
    }

    // Make sure auth user is resume owner
    if (resume.user.toString() !== req.user.id) {
        return next(new ErrorResponse(`User ${req.params.id} is not authorized to delete this resume`, 401))
    }

    // 1) Delete files & images

    // 2) Delete resume
    resume.remove()

    res.status(200).json({ success: true, data: {} })
})
