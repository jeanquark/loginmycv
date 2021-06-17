// import { extend } from 'vee-validate'
import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend, configure } from 'vee-validate'
import { required, email, alpha, min, max, regex, confirmed } from 'vee-validate/dist/rules'
import validationMessages from 'vee-validate/dist/locale/en'
// import validationMessages from 'vee-validate/dist/locale/fr'

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

// extend('required', {
//     ...required,
//     message: 'The {_field_} is required'
// })

// extend('email', {
//     ...email,
//     message: 'The field must be an email'
// })

// extend('alpha', {
//     ...alpha,
//     message: 'This field must only contain alphabetic characters'
// })

// extend('min', {
//     ...min,
//     message: 'The {_field_} must have at least {length} characters'
// })

// extend('max', {
//     ...max,
//     message: 'The {_field_} cannot have more than {length} characters'
// })

// extend('regex', {
//     ...regex,
//     message: 'The {_field_} does not match rules'
// })

extend('required', required)
extend('alpha', alpha)
extend('min', min)
extend('max', max)
extend('email', email)
extend('regex', regex)
extend('confirmed', confirmed)

export default function VeeValidatePlugin({ app }) {
    configure({
        defaultMessage: (_, values) => app.i18n.t(`validation.${values._rule_}`, values)
    })
}

// import Vue from 'vue'
// import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
// import { required, min, max, email, regex } from 'vee-validate/dist/rules'

// Vue.component('ValidationProvider', ValidationProvider)
// Vue.component('ValidationObserver', ValidationObserver)

// extend('required', required)
// extend('min', min)
// extend('max', max)
// extend('email', email)
// extend('regex', regex)
