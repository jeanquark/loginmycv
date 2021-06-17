const mongoose = require('mongoose')

const LanguageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    slug: {
        type: String,
    },
    native_name: {
        type: String,
    },
    flag: {
        type: String,
    },
    code: {
        type: String,
        minlength: 2,
        maxlength: 3
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Language', LanguageSchema)
