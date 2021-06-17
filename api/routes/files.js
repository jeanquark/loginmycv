const express = require('express')
const ErrorResponse = require('../utils/errorResponse')

const { getFiles, getFile, uploadFile, deleteFile } = require('../controllers/files')

const router = express.Router()
const { authUser } = require('../middleware/auth')


router.route('/').get(getFiles)

router.route('/file').post(authUser, getFile)

router.route('/upload').post(authUser, uploadFile)

// router.route('/delete').post(authUser, deleteFile)
router.route('/:fileName').delete(authUser, deleteFile)

module.exports = router