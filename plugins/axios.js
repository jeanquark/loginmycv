// export default function ({ axios, store }) {
// 	axios.onRequest((config) => {
// 		//  config.headers.common['access-token'] = store.state.user.headers.access_token
// 		 config.headers.common['access-token'] = window.localStorage.getItem('token')
// 		 config.headers.common['token-type'] = store.state.user.headers.token_type
// 		 config.headers.common['client'] = store.state.user.headers.client
// 		 config.headers.common['expiry'] = store.state.user.headers.expiry
// 		 config.headers.common['uid'] = store.state.user.headers.uid
// 	})
//    }

// export default function({ $axios, redirect }) {
//     $axios.onRequest(config => {
// 		console.log('Call to axios plugin')
//         $axios.setToken(localStorage.getItem('token'), 'Bearer')
//     })
// }

// export default ({app: { $axios }}) => {
// 	console.log('Call to axios plugin')
// 	// $axios.setToken(localStorage.getItem('token'), 'Bearer')
// 	// $axios.setToken(localStorage.getItem('token-resume'), 'Bearer-resume')
// 	// $axios.setToken(localStorage.getItem('token-user'), 'Bearer-user')

// 	$axios.setHeader('Authorizationuser', localStorage.getItem('token-user'))
// 	$axios.setHeader('Authorizationresume', localStorage.getItem('token-resume'))
// }

// export default function({ $axios, redirect }, inject) {
//     // Create a custom axios instance
//     // const api = $axios.create({
//     //     headers: {
//     //         'Authorization': `Bearer ${localStorage.getItem('token-user')}`
//     //     }
// 	// })
//     const axiosUser = $axios.create()
//     // let token = ctx.app.$auth.getToken('token-user');
//     // axiosUser.setToken(token, 'Bearer')
//     if (process.client) {

//         // axiosUser.setToken(localStorage.getItem('token-user'), 'Bearer')
//     }

//     // Inject to context as $axiosUser
// 	inject('axiosUser', axiosUser)

//     const axiosResume = $axios.create()
//     if (process.client) {

//         axiosResume.setToken(localStorage.getItem('token-resume'), 'Bearer')
//     }

//     // Inject to context as $axiosResume
//     inject('axiosResume', axiosResume)

// }

// import Noty from 'noty'
export default function({ $axios, store, redirect }) {
    $axios.onRequest(config => {
        console.log(`Making ${config.method} request to ${config.url}`)
    })

    $axios.onError(error => {
        // console.log('$axios.onError: ', error)
        //   this.$toast.error('API error')
        if (error.response && error.response.status) {
            console.log('error.response: ', error.response)
            const code = parseInt(error.response.status)
            console.log('code: ', code)
            if (error.response.data) {
                // console.log('error: ', error)
                // console.log('error.response: ', error.response)
                // console.log('error.response.data: ', error.response.data)
                // console.log('error.response.data.error: ', error.response.data.error)
                // console.log('JSON.stringify(error.response.data.error): ', JSON.stringify(error.response.data.error))
                // console.log('JSON.parse(JSON.stringify(error.response.data.error)): ', JSON.parse(JSON.stringify(error.response.data.error)))
                // console.log('error.response.data.error.split(", "): ', error.response.data.error.split(', '))
                // console.log('error.response.data.error[slug]: ', error.response.data.error['slug'])
                // error.response.data.error.forEach((error) => {
                //     console.log('error2: ', error)
                // })
                // store.commit('SET_ERRORS', error.response.data.error)
                // console.log('i18n: ', $i18n)
            }
            switch (code) {
                case 401:
                    store.dispatch('setSnackbar', { show: true, text: 'Authorization error. You\'re missing the required authorization to process the request. Try reconnecting.', color: 'error', timeout: 5000, top: true, right: true })
                    break
                case 404:
                    store.dispatch('setSnackbar', { show: true, text: 'Not found error. Data could not be retrieved.', color: 'error', timeout: 5000, top: true, right: true })
                    break
                case 422:
                    store.dispatch('setSnackbar', { show: true, text: 'Please check validation errors.', color: 'error', top: true })
                    break
                case 500:
                    store.dispatch('setSnackbar', { show: true, text: 'Server error: Data could not be retrieved.', color: 'error', top: true })
                    break
                default:
                    store.dispatch('setSnackbar', { show: true, text: 'General server error: Data could not be retrieved.', color: 'error', top: true })
            }
        }
    })
}
