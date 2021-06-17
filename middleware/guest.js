export default function({ store, redirect, params, route }) {
    console.log('params: ', params)
    console.log('route: ', route)
    if (store.getters['auth/authUser']) {
        return redirect({ name: 'index' })
    }
}
