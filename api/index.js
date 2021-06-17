const express = require('express')
const path = require('path')
const morgan = require('morgan')
const dotenv = require('dotenv')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const mongoSanitize = require('express-mongo-sanitize')
const fileUpload = require('express-fileupload')
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')
const hpp = require('hpp')
const cors = require('cors')
const errorHandler = require('./middleware/error')

// Define models
// const Resume = require('./models/Resume')

// Connect to DB
const connectDB = require('./config/db')
connectDB()

// Define routes
const auth = require('./routes/auth')
const resumes = require('./routes/resumes')
const resumesModels = require('./routes/resumes-models')
const images = require('./routes/images')
const files = require('./routes/files')
const users = require('./routes/users')
const templates = require('./routes/templates')
const authorizations = require('./routes/authorizations')
const countries = require('./routes/countries')
const languages = require('./routes/languages')
const competences = require('./routes/competences')
const socialNetwork = require('./routes/social-networks')
const packages = require('./routes/packages')

console.log('api/index.js is running!')
const app = express()

// Body parser
app.use(express.json())

// Enforce https
// app.use(
//     redirectSSL.create({
//         enabled: process.env.NODE_ENV === 'production'
//     })
// )

// File upload on server
app.use(fileUpload())

// Cookie parser
app.use(cookieParser())

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Sanitize data
app.use(mongoSanitize())

// Set security headers
app.use(helmet())

// Prevent XSS attacks
app.use(xss())

// Rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 100
})
app.use(limiter)

// Prevent http param pollution
app.use(hpp())

// Enable CORS
app.use(cors())



// console.log('__dirname: ', __dirname)
// app.use(express.static(path.join(__dirname, 'public')))
// app.use(express.static('public'));

// app.use('/resumes', async (req, res) => {
//     console.log('[serverMiddleware] /api/resumes')
//     const resumes = await Resume.find({ is_active: true, $or: [{ visibility: 'public' }, { visibility: 'semi-private' }] }, 'user slug job_title visibility languages')
//     // const resumes = [{ name: 'resume #1'}, { name: 'resume #2' }]
//     res.status(200).json({ success: true, resumes })
// })

app.use('/v1/auth', auth)
app.use('/v1/resumes', resumes)
app.use('/v1/resumes-models', resumesModels)
app.use('/v1/images', images)
app.use('/v1/files', files)
app.use('/v1/users', users)
app.use('/v1/templates', templates)
app.use('/v1/authorizations', authorizations)
app.use('/v1/countries', countries)
app.use('/v1/languages', languages)
app.use('/v1/competences', competences)
app.use('/v1/social-networks', socialNetwork)
app.use('/v1/packages', packages)

// Set up server error responses middleware
app.use(errorHandler)

module.exports = {
    path: '/api',
    handler: app
}
