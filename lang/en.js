// import en from 'vee-validate/dist/locale/en'

const messages = {
    hello: 'Hello {msg}',
    validation: {
        // alpha: 'The {_field_} field may only contain alphabetic characters',
        alpha_num: 'The {_field_} field may only contain alpha-numeric characters',
        // alpha_dash: 'The {_field_} field may contain alpha-numeric characters as well as dashes and underscores',
        // alpha_spaces: 'The {_field_} field may only contain alphabetic characters as well as spaces',
        // between: 'The {_field_} field must be between {min} and {max}',
        // confirmed: 'The {_field_} field confirmation does not match',
        // digits: 'The {_field_} field must be numeric and exactly contain {length} digits',
        // dimensions: 'The {_field_} field must be {width} pixels by {height} pixels',
        email: 'The {_field_} field must be a valid email',
        // excluded: 'The {_field_} field is not a valid value',
        // ext: 'The {_field_} field is not a valid file',
        // image: 'The {_field_} field must be an image',
        // integer: 'The {_field_} field must be an integer',
        // length: 'The {_field_} field must be {length} long',
        // max_value: 'The {_field_} field must be {max} or less',
        // max_server: 'The field has too many characters',
        max: 'The {_field_} field may not be greater than {length} characters',
        // mimes: 'The {_field_} field must have a valid file type',
        // min_value: 'The {_field_} field must be {min} or more',
        min: 'The {_field_} field must be at least {length} characters',
        // numeric: 'The {_field_} field may only contain numeric characters',
        // oneOf: 'The {_field_} field is not a valid value',
        regex: 'The {_field_} field format is invalid',
        // required_if: 'The {_field_} field is required',
        required: 'The {_field_} field is required',
        // size: 'The {_field_} field size must be less than {size}KB',
        unique_slug: 'This identifier has already been taken',
        confirmed: 'The {_field_} field confirmation does not match',
        // title: "title",
        server: {
            alpha_num: 'The field may only contain alpha-numeric characters',
            email: 'The field must be a valid email',
            max: 'The field has too many characters',
            min: 'The field has not enough characters',
            regex: 'The field format is invalid',
            required: 'The field is required',
            invalid_credentials: 'Invalid credentials',
            max_number: 'Value is too big',
            min_number: 'Value is too small',
            user_does_not_exist: 'User with this email address not found',
            email_could_not_be_sent: 'Email could not be sent'
            // unique: 'Entry must be unique'
        }
    }
    // validation: en.messages
    // validation: {
    //     max: {
    //         numeric: 'The {attribute} may not be greater than {value}.',
    //         file: 'The {attribute} may not be greater than {value} kilobytes.',
    //         string: 'The {attribute} may not be greater than {value} characters.',
    //         array: 'The {attribute} may not have more than {value} items.',
    //     },
    //     min: {
    //         numeric: 'The {attribute} must be at least {value}.',
    //         file: 'The {attribute} must be at least {value} kilobytes.',
    //         string: 'The {attribute} must be at least {value} characters.',
    //         array: 'The {attribute} must have at least {value} items.',
    //     },
    // max_length: 'The {attribute} may not be greater than {max} characters.'
    // }
}
export default messages
