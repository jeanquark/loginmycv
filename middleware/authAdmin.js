export default function({ store, redirect, params, route }) {
    // if (store.getters['auth/authUser'] && store.getters['auth/authUser']['role'] === 'admin') {
    //     return
    // }

    if (!store.getters['auth/authUser']) {
        // alert('Not authenticated!')
        store.commit('OPEN_LOGIN_MODAL', { root: true })
        return redirect({ name: 'index' })
    } else if (store.getters['auth/authUser']['role'] !== 'admin') {
        // alert('Not admin authenticated!')
        return redirect({
            name: 'index'
        })
    } else {
        return
    }
}