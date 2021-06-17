import Logo from '~/components/icons/Logo'
import LoginMyCV from '~/components/icons/LoginMyCV'
import IonicIcon from '~/components/icons/IonicIcon'
import AuthorizationsIcon from '~/components/icons/Authorizations'
import ResumeIcon from '~/components/icons/Resume'
import AccountIcon from '~/components/icons/Account'

export default {
    theme: {
        dark: true,
        themes: {
            light: {
                primary: '7A528F', // light purple
                accent: 'E0E0E0', // grey lighten-1
                secondary: '#FFC107', // amber
                tertiary: '#E11566', // pink
                dark: '#7e7e7e', // dark-grey
                background: '#ffffff' // white,
            },
            dark: {
                primary: '7A528F', // light purple
                accent: 'E0E0E0', // grey lighten-1
                secondary: '#FFC107', // amber
                tertiary: '#E11566', // pink,
                dark: '#7e7e7e', // dark-grey
                background: '#424242' // dark
            }
        },
        options: {
            customProperties: true
        }
    },
    icons: {
        values: {
            logo: {
                component: Logo
            },
            loginmycv: {
                component: LoginMyCV
            },
            ionic: {
                component: IonicIcon
            },
            authorizations: {
                component: AuthorizationsIcon
            },
            resume: {
                component: ResumeIcon
            },
            account: {
                component: AccountIcon
            }
        }
    }
};
