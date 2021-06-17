const express = require('express')
const ErrorResponse = require('../utils/errorResponse')

const { getImage, uploadImage, deleteImage } = require('../controllers/images')

const router = express.Router()
const { authUser } = require('../middleware/auth')


router
.route('/')
.get(getImage)
// .delete(authUser, deleteImage)

router.route('/upload').post(authUser, uploadImage)

// router.route('/delete').post(authUser, deleteImage)
router.route('/:imageName').delete(authUser, deleteImage)

module.exports = router
