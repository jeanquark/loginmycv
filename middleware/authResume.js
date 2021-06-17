export default function({ store, redirect, params, route }) {
    // console.log('[authResume middleware] route: ', route)
    // console.log("store.getters['resumes/resume']: ", store.getters['resumes/resume'])
    if (process.client) {
        console.log('[authResume middleware] process client')
        // 1) Check if resume visibility is public
        if (store.getters['resumes/resume']['visibility'] === 'public') {
            return
        }

        // 2) Check if resume is authenticated && authenticated resume slug is equal to route slug
        if (store.getters['auth/authResume'] && store.getters['auth/authResume']['slug'] === params.slug) {
            console.log('[authResume Middleware 1] authorized')
            return
            
        }

        // 3) Check if user is authenticated && has authorization
        if (store.getters['auth/authUser'] && store.getters['auth/authUser']['authorizations'] && store.getters['auth/authUser']['authorizations'].map(authorization => authorization.resume_slug).includes(params.slug)) {
            console.log('[authResume Middleware 2] authorized')
            return
        }

        // 4) Check if user is authenticated && owns the resume
        if (store.getters['auth/authUser'] && store.getters['auth/authUser']['resumes'] && store.getters['auth/authUser']['resumes'].map(resume => resume.slug).includes(params.slug)) {
            console.log('[authResume Middleware 3] authorized')
            return
        }

        alert('Not authenticated!')
        return redirect({ name: 'resumes-slug-login', params: { slug: params.slug } })
    } else {
        console.log('[authResume middleware] process.server')
    }
}
