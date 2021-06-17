const mongoose = require('mongoose')

const contactFormFieldsSchema = new mongoose.Schema({

})

const contactFormValidationSchema = new mongoose.Schema({
    firstname: { type: String },
})

const menuSchema = new mongoose.Schema({

})

const mapSubdivisionSubSchema = new mongoose.Schema({
    name: { type: String },
    slug: { type: String },
    color: { type: String }
})

const TemplateSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name']
        },
        slug: {
            type: String
        },
        description: {
            type: String
        },
        file: {
            type: String
        },
        image: {
            type: String
        },
        template_specific_components: {
            name: { type: String },
            slug: { type: String },
            component: { type: String }
        },
        author: {
            firstname: {
                type: String,
                // required: [true, 'Please add a firstname'],
                minlength: [2, 'Firstname must be at least 2 characters length'],
                maxlength: [64, 'Firstname can have max 64 characters']
            },
            lastname: {
                type: String,
                minlength: [2, 'Firstname must be at least 2 characters length'],
                maxlength: [64, 'Firstname can have max 64 characters']
            },
            username: {
                type: String,
                minlength: [2, 'Firstname must be at least 2 characters length'],
                maxlength: [64, 'Firstname can have max 64 characters']
            }
        },
        package: {
            name: { type: String },
            slug: { type: String }
        },
        colors: {
            primary: { type: String },
            secondary: { type: String },
            tertiary: { type: String },
            background: { type: String },
            text: { type: String },
        },
        // map: {
        //     name: { type: String },
        //     slug: { type: String },
        //     geoJSON: { type: String },
        //     center: { type: Array }
        // },
        // map_subdivisions: [mapSubdivisionSubSchema],
        // image: { type: String },
        // coordinates: {
        //     type: [Number],
        //     index: '2dsphere'
        // },
        // contact_form_fields: [contactFormFieldsSchema],
        // contact_form_validation: [contactFormValidationSchema],
        // menus: [menuSchema],
        is_active: {
           type: Boolean,
           default: false 
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





module.exports = mongoose.model('Template', TemplateSchema)
