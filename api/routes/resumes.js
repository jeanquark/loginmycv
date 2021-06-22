const express = require('express')
// const multer = require('multer')
const fs = require('fs')
const ErrorResponse = require('../utils/errorResponse')

const {
    getResumes,
    getResumeById,
    getResumeBySlug,
    getUserResumes,
    createResume,
    updateResumeData,
    addResumeFile,
    updateResumeFiles,
    deleteResumeFile,
    deleteResume,
    uploadResumeProfilePicture,
    uploadResumeFiles,
    getUserImages,
    getUserFiles,
    // getResumeFile,
    resetResumeCounter,
    resetUploadsCounter,
    // getFile,
    addResumeImage,
    removeResumeImage,
    removeResumeFile
} = require('../controllers/resumes')

const Resume = require('../models/Resume')

const router = express.Router()

const advancedResults = require('../middleware/advancedResults')
const { authUser, authResume } = require('../middleware/auth')

router
    .route('/')
    // .get(advancedResults(Resume), getResumes)
    .get(getResumes)
    .post(authUser, createResume)

router.route('/user').get(authUser, getUserResumes)

// Routes to interact with images
router.route('/user-images').get(authUser, getUserImages)
router.route('/images/add').post(authUser, addResumeImage)
router.route('/images/remove').post(authUser, removeResumeImage)

// Routes to interact with files
router.route('/files').get(authUser, getUserFiles)
// router.route('/file').post(getResumeFile)
router.route('/files/add').post(authUser, addResumeFile)
router.route('/files').put(authUser, updateResumeFiles)
// router.route('/files/:fileName').delete(authUser, deleteResumeFile)
router.route('/files/remove').post(authUser, removeResumeFile)



// router.route('/get-file').post(getFile)

router.route('/slug/:slug').get(authResume, getResumeBySlug)

router.route('/:id/reset-resume-counter').get(authUser, resetResumeCounter)
router.route('/:id/reset-uploads-counter').get(authUser, resetUploadsCounter)

router
    .route('/:id')
    .get(authResume, getResumeById)
    .put(authUser, updateResumeData)
    .delete(authUser, deleteResume)


// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const userId  = req.user.id
//         const path = `static/images/users/${userId}`
//         fs.mkdirSync(path, { recursive: true })
//         return cb(null, path)
//     },
//     filename: (req, file, cb) => {
//         const fileName = file.originalname
//             .toLowerCase()
//             .split(' ')
//             .join('-')
//         cb(null, fileName)
//     }
// })
// const upload = multer({
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
//             cb(null, true)
//         } else {
//             cb(null, false)
//             return cb(new ErrorResponse('Only .png, .jpg and .jpeg format allowed!', 422))
//         }
//     }
// })

// router.route('/:id/upload-resume-profile-picture').post(authUser, uploadResumeProfilePicture)
// router.route('/:id/upload-resume-files').post(authUser, multer().array('files', 20), uploadResumeFiles)

module.exports = router
