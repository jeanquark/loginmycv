const express = require('express')
const { getFiles, getFiles2, getFiles3, getFiles4, getFiles5 } = require('../controllers/files')

const router = express.Router()

router
    .route('/')
    .get(getFiles)

    router
    .route('/2')
    .get(getFiles2)

    router
    .route('/3')
    .get(getFiles3)

    router
    .route('/4')
    .get(getFiles4)

    router
    .route('/5')
    .get(getFiles5)

module.exports = router