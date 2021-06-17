const mongoose = require('mongoose')

const CountrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    slug: {
        type: String,
    },
    continent: {
        type: String,
    },
    flag: {
        type: String,
    },
    alpha2: {
        type: String,
        minlength: 2,
        maxlength: 2
    },
    alpha3: {
        type: String,
        minlength: 3,
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

module.exports = mongoose.model('Country', CountrySchema)
