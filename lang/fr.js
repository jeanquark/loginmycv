// import fr from 'vee-validate/dist/locale/fr'

const messages = {
    hello: 'Bonjour {msg}',
    validation: {
        alpha_num: 'Le champ {_field_} ne peut contenir que des caractères alpha-numériques',
        // alpha_dash: 'Le champ {_field_} ne peut contenir que des caractères alpha-numériques, tirets ou soulignés',
        // alpha_spaces: 'Le champ {_field_} ne peut contenir que des lettres ou des espaces',
        // between: 'Le champ {_field_} doit être compris entre {min} et {max}',
        // confirmed: 'Le champ {_field_} ne correspond pas',
        // digits: 'Le champ {_field_} doit être un nombre entier de {length} chiffres',
        // dimensions: 'Le champ {_field_} doit avoir une taille de {width} pixels par {height} pixels',
        email: 'Le champ {_field_} doit être une adresse e-mail valide',
        // excluded: 'Le champ {_field_} doit être une valeur valide',
        // ext: 'Le champ {_field_} doit être un fichier valide',
        // image: 'Le champ {_field_} doit être une image',
        // integer: 'Le champ {_field_} doit être un entier',
        // length: 'Le champ {_field_} doit contenir {length} caractères',
        // max_value: 'Le champ {_field_} doit avoir une valeur de {max} ou moins',
        max: 'Le champ {_field_} ne peut pas contenir plus de {length} caractères',
        // mimes: 'Le champ {_field_} doit avoir un type MIME valide',
        // min_value: 'Le champ {_field_} doit avoir une valeur de {min} ou plus',
        min: 'Le champ {_field_} doit contenir au minimum {length} caractères',
        // numeric: 'Le champ {_field_} ne peut contenir que des chiffres',
        // oneOf: 'Le champ {_field_} doit être une valeur valide',
        regex: 'Le champ {_field_} est invalide',
        required: 'The champ {_field_} est requis',
        // required_if: 'Le champ {_field_} est obligatoire lorsque {target} possède cette valeur',
        // size: 'Le champ {_field_} doit avoir un poids inférieur à {size}KB',
        unique_slug: 'Cet identifiant est déjà pris',
        confirmed: 'Le champ {_field_} ne correspondent pas',
        server: {
            alpha_num: 'Le champ spécifié ne peut contenir que des lettres',
            email: 'Le champ doit être une adresse e-mail valide',
            max: 'Le champ contient trop de caractères',
            min: 'Le champ ne contient pas assez de caractères',
            regex: 'Le champ est invalide',
            required: 'Le champ est obligatoire',
            invalid_credentials: 'Les informations d\'identification ne sont pas correctes',
            // unique: 'Le champ spécifié doit être unique'
            user_does_not_exist: 'Pas d\'utilisateur trouvé',
            email_could_not_be_sent: 'L\'e-mail n\'a pas pu être envoyé'
        }
    }
    // validation: fr.messages
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
    //     // max_length: 'Le {0} ne peut pas avoir plus de {1} caractères',
    // }
}
export default messages
