const mongoose = require('mongoose')

const educationSubSchema = new mongoose.Schema({
    title: {
        type: String,
        // ...validationRulesServer.education.title
    },
    description: {
        type: String,
        // ...validationRulesServer.education.description
    },
    school: {
        type: String,
        // ...validationRulesServer.education.school
    },
    city: {
        type: String,
        // ...validationRulesServer.education.city
    },
    country: {
        type: String,
        // ...validationRulesServer.education.country
    },
    start_date: {
        type: String,
        // ...validationRulesServer.education.start_date
    },
    end_date: {
        type: String,
        // ...validationRulesServer.education.end_date
    },
    image: {
        type: String
    },
    coordinates: {
        type: [Number],
        index: '2dsphere'
    }
})
const workExperienceSubSchema = new mongoose.Schema({
    job_title: {
        type: String,
        // ...validationRulesServer.work_experience.job_title
    },
    company: {
        type: String,
        // ...validationRulesServer.work_experience.company
    },
    city: {
        type: String,
        // ...validationRulesServer.work_experience.company
    },
    country: {
        type: String,
        // ...validationRulesServer.work_experience.country
    },
    start_date: {
        type: String,
        // ...validationRulesServer.work_experience.start_date
    },
    end_date: {
        type: String,
        // ...validationRulesServer.work_experience.end_date
    },
    coordinates: {
        type: [Number],
        index: '2dsphere'
    }
})
const skillSubSchema = new mongoose.Schema({
    name: {
        type: String,
        // ...validationRulesServer.skill.name
    },
    slug: {
        type: String,
        // ...validationRulesServer.skill.slug
    },
    category: {
        type: String,
        // ...validationRulesServer.skill.category
    },
    type: {
        type: String,
        // ...validationRulesServer.skill.type
    },
    value: {
        type: Number,
        // ...validationRulesServer.skill.value
    }
})
const uploadSubSchema = new mongoose.Schema({
    name: {
        type: String,
        // ...validationRulesServer.upload.name
    },
    title: {
        type: String,
        // ...validationRulesServer.upload.title
    },
    mime_type: {
        type: String,
        // ...validationRulesServer.upload.mime_type.name
    },
    type: {
        type: String,
        enum: ['file', 'image', 'other'],
        default: 'file'
    },
    category: {
        type: String,
        default: 'downloadable_file'
    },
    download_url: {
        type: String,
        // ...validationRulesServer.upload.download_url
    },
    size_in_bytes: {
        type: Number
    },
    statistics: {
        total_downloads_count: {
            type: Number,
            default: 0
        },
        last_visitors: [
            {
                user: {
                    type: mongoose.Schema.ObjectId,
                    ref: 'User',

                },
                date: {
                    type: Date,
                    default: Date.now()
                }
            }
        ],
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
const socialNetworkSubSchema = new mongoose.Schema({
    name: {
        type: String,
        // ...validationRulesServer.social_network.name
    },
    slug: {
        type: String,
        // ...validationRulesServer.social_network.slug
    },
    icon: {
        type: String,
        // ...validationRulesServer.social_network.icon
    },
    link: {
        type: String,
        // ...validationRulesServer.social_network.link
    }
})
const languageSubSchema = new mongoose.Schema({
    name: {
        type: String,
        // ...validationRulesServer.language.name
    },
    slug: {
        type: String,
        // ...validationRulesServer.language.slug
    },
    native_name: {
        type: String,
        // ...validationRulesServer.language.native_name
    },
    native_speaker: {
        type: Boolean,
        default: false
    },
    code: {
        type: String,
        // ...validationRulesServer.language.code
    },
    value: {
        type: Number,
        // ...validationRulesServer.language.value
    }
})

const nationalitySubSchema = new mongoose.Schema({
    name: {
        type: String,
        // ...validationRulesServer.nationality.name
    },
    slug: {
        type: String,
        // ...validationRulesServer.nationality.slug
    }
})

const ResumeModelSchema = new mongoose.Schema(
    {
        slug: {
            type: String,
            // ...validationRulesServer.slug
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            // ...validationRulesServer.user
        },
        template: {
            type: mongoose.Schema.ObjectId,
            ref: 'Template',
            // ...validationRulesServer.template
        },
        template_details: {
            type: Object
        },
        password: {
            type: String,
            select: false,
            // ...validationRulesServer.password
        },
        visibility: {
            type: String,
            enum: ['public', 'semi-private', 'private']
        },
        job_title: {
            type: String,
            // ...validationRulesServer.job_title
        },
        job_description: {
            type: String,
            // ...validationRulesServer.job_description
        },
        is_active: {
            type: Boolean,
            default: true
        },
        colors: {
            background: {
                type: String,
                // ...validationRulesServer.colors.background
            },
            text: {
                type: String,
                // ...validationRulesServer.colors.text
            },
            primary: {
                type: String,
                // ...validationRulesServer.colors.primary
            },
            secondary: {
                type: String,
                // ...validationRulesServer.colors.secondary
            },
            tertiary: {
                type: String,
                // ...validationRulesServer.colors.tertiary
            }
        },
        contact_form_validation: {
            email_is_required: {
                type: String,
                trim: true,
                lowercase: true,
                default: 'Email field is required'
            }
        },

        personal_data: {
            firstname: {
                type: String,
                // ...validationRulesServer.personal_data.firstname
            },
            lastname: {
                type: String,
                // ...validationRulesServer.personal_data.lastname
            },
            middlename: {
                type: String,
                // ...validationRulesServer.personal_data.middlename
            },
            email: {
                type: String,
                trim: true,
                // ...validationRulesServer.personal_data.email
            },
            phone_number: {
                type: String,
                // ...validationRulesServer.personal_data.phone_number
            },
            birthday: {
                type: Date
            },
            city: {
                type: String,
                // ...validationRulesServer.personal_data.city
            },
            country: {
                type: mongoose.Schema.ObjectId,
                ref: 'Country'
            },
            nationalities: [{ type: mongoose.Schema.ObjectId, ref: 'Country' }]
        },
        education: [educationSubSchema],
        work_experience: [workExperienceSubSchema],
        skills: [skillSubSchema],
        uploads: [uploadSubSchema],
        social_networks: [socialNetworkSubSchema],
        languages: [languageSubSchema],
        menus: {
            contact: {
                type: String,
                // ...validationRulesServer.menus.contact
            },
            education: {
                type: String,
                // ...validationRulesServer.menus.education
            },
            files: {
                type: String,
                // ...validationRulesServer.menus.files
            },
            home: {
                type: String,
                // ...validationRulesServer.menus.home
            },
            presentation: {
                type: String,
                // ...validationRulesServer.menus.presentation
            },
            skills: {
                type: String,
                // ...validationRulesServer.menus.skills
            },
            work_experience: {
                type: String,
                // ...validationRulesServer.menus.work_experience
            }
        },
        statistics: {
            total_views_count: {
                type: Number,
                default: 0
            },
            last_visitors: [
                {
                    user: {
                        type: mongoose.Schema.ObjectId,
                        ref: 'User'
                    },
                    date: {
                        type: Date,
                        default: Date.now
                    }
                }
            ]
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

module.exports = mongoose.model('ResumeModel', ResumeModelSchema)
