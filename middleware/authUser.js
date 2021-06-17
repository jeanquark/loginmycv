export default function({ store, redirect, params, route }) {
    // Check if user is authenticated
    // console.log('window.location.pathname: ', window.location.pathname)
    // console.log('app: ', app)
    // console.log('app.store: ', app.store.$router)
    // console.log('store.app.router: ', store.app.router.history.current.path)
    console.log('params: ', params)
    console.log('route: ', route)
    if (!store.getters['auth/authUser']) {
        // alert('Not authenticated!')
        // return redirect({ name: 'login-user' })
        store.commit('OPEN_LOGIN_MODAL', { root: true })
        return redirect({ name: 'index' })
    }
}

// export default async (to, from, next) => {
// 	console.log('Call to [check-auth] middleware: ', to)
//   	// if (!store.getters['auth/check'] && store.getters['auth/token']) {
//     // 	try {
//     //   		await store.dispatch('auth/fetchUser')
//     // 	} catch (e) { }
//   	// }

//   	next()
// }