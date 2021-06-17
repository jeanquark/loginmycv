const mongoose = require('mongoose')

const PackageSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        slug: {
            type: String,
            required: true
        },
        is_active: {
            type: Boolean,
            default: false
        },
        maximum_number_of_resumes: {
            type: Number,
            min: [0, 'Number of resumes cannot be less than 0'],
            max: [100, 'Number of resumes cannot be more than 100']
        },
        number_of_available_templates: {
            type: Number,
            min: [0, 'Number of available templates cannot be less than 0'],
            max: [100, 'Number of available templates cannot be more than 100']
        },
        total_space_in_bytes: {
            type: Number,
            min: [0, 'Number of space in bytes cannot be less than 0'],
            max: [1000000000, 'Number of space in bytes cannot be more than 1Gb']
        },
        price: {
            type: Number,
            min: [0, 'Price cannot be less than 0'],
            max: [100000, 'Price cannot be more than 100000']
        },
        currency: {
            type: String,
            required: true
        },
        image_maximum_number_of_resumes: {
            type: String
        },
        image_number_of_available_templates: {
            type: String
        },
        image_total_space_in_bytes: {
            type: String
        },
        color: {
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
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)

// Reverse populate with virtuals
PackageSchema.virtual('users', {
    ref: 'User',
    localField: '_id',
    foreignField: 'package',
    justOne: false
})

module.exports = mongoose.model('Package', PackageSchema)
