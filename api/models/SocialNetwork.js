const mongoose = require('mongoose')

const SocialNetworkSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    slug: {
        type: String,
    },
    color: {
        type: String,
    },
    fontawesome: {
        type: String
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

module.exports = mongoose.model('SocialNetwork', SocialNetworkSchema)
