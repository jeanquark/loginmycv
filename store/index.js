import jwt from 'jsonwebtoken'
// const User = require('./../api/models/User')
// const User = require('../api/models/User')

export const strict = false

export const state = () => ({
    loading: false,
    errors: [],
    successes: [],
    loadingUploadFiles: false,
    loadingCreateResume: false,
    loadingUpdateResume: false,
    loginModal: false,
    requestAuthorizationModal: false,
    snackbars: [],
    // dialog: false
})

export const mutations = {
    SET_LOADING(state, payload) {
        state.loading = payload
    },
    SET_LOADING_UPLOAD_FILES(state, payload) {
        state.loadingUploadFiles = payload
    },
    SET_LOADING_CREATE_RESUME(state, payload) {
        state.loadingCreateResume = payload
    },
    SET_LOADING_UPDATE_RESUME(state, payload) {
        state.loadingUpdateResume = payload
    },
    SET_ERRORS(state, payload) {
        state.errors = payload
    },
    ADD_ERROR(state, payload) {
        state.errors = state.errors.concat(payload)
    },
    CLEAR_ERROR(state) {
        // state.errors = null
        state.errors = []
    },
    OPEN_LOGIN_MODAL(state, payload) {
        console.log('OPEN_LOGIN_MODAL: ', payload)
        state.loginModal = true
    },
    CLOSE_LOGIN_MODAL(state) {
        state.loginModal = false
    },
    OPEN_REQUEST_AUTHORIZATION_MODAL(state) {
        state.requestAuthorizationModal = true
    },
    CLOSE_REQUEST_AUTHORIZATION_MODAL(state) {
        console.log('CLOSE_REQUEST_AUTHORIZATION_MODAL')
        state.requestAuthorizationModal = false
    },
    CLEAR_SNACKBAR(state) {
        state.snackbars = []
    },
    SET_SNACKBAR(state, payload) {
        console.log('SET_SNACKBAR: ', payload)
        state.snackbars = state.snackbars.concat(payload)
    },
    // SET_DIALOG(state, payload) {
    //     state.dialog = payload
    // },
    REMOVE_SNACKBAR(state, payload) {
        console.log('REMOVE_SNACKBAR: ', payload)
        const { index } = payload
        state.snackbars.splice(index, 1)
    }
}

export const actions = {
    async nuxtServerInit({ commit, state, dispatch }, { req, app }) {
        try {
            console.log('[nuxtServerInit] Date: ', new Date())
            // console.log('[nuxtServerInit]: req.headers.host: ', req.headers.host)
            // console.log("[nuxtServerInit]: req.headers.host.split('.')[0]: ", req.headers.host.split('.')[0])

            // Auth user
            const tokenUser = app.$cookies.get('token-user')
            console.log('[nuxtServerInit] tokenUser: ', tokenUser)
            if (tokenUser && tokenUser !== 'none') {
                const decoded = jwt.verify(tokenUser, process.env.JWT_SECRET_USER)
                console.log('[nuxtServerInit] tokenUser decoded: ', decoded)
                await dispatch('getUserById', decoded.id)
            }

            // Auth resume
            const tokenResume = app.$cookies.get('token-resume')
            console.log('[nuxtServerInit] tokenResume: ', tokenResume)
            if (tokenResume && tokenResume !== 'none') {
                const decoded = jwt.verify(tokenResume, process.env.JWT_SECRET_RESUME)
                console.log('[nuxtServerInit] tokenResume decoded: ', decoded)
                await dispatch('getResumeById', decoded.id)
            }

            console.log('[nuxtServerInit] process.env.HOST: ', process.env.HOST)
            console.log('[nuxtServerInit] OK!')
        } catch (error) {
            console.log('[nuxtServerInit] error:', error)
        }
    },

    // async getUserById_ORIGINAL({ commit }, userId) {
    //     const { data } = await this.$axios.$get(`/api/v1/users/${userId}`)
    //     console.log('[nuxtServerInit] data: ', data)
    //     commit('auth/SET_AUTH_USER', data)
    // },

    async getUserById({ commit }, userId) {
        const { data } = await this.$axios.$get('/api/v1/auth/user')
        // console.log('[nuxtServerInit] data: ', data)
        commit('auth/SET_AUTH_USER', data)
    },

    async getResumeById({ commit }, resumeId) {
        const { data } = await this.$axios.$get(`/api/v1/resumes/${resumeId}`)
        // const { data } = await this.$axios.$get('/api/v1/auth/resume')
        // console.log('[nuxtServerInit] data: ', data)
        commit('auth/SET_AUTH_RESUME', data)
    },
    async setSnackbar({ commit }, payload) {
        console.log('setSnackbar payload: ', payload)
        commit('CLEAR_SNACKBAR')

        payload.show = payload.show || true
        payload.text = payload.text || ''
        payload.color = payload.color || 'info'
        payload.timeout = payload.timeout || 5000
        payload.top = payload.top || false
        payload.right = payload.right || false
        // payload.confirmation = payload.confirmation || false
        // payload.bottom = payload.bottom || true
        // payload.left = payload.left || false
        commit('SET_SNACKBAR', payload)
        // console.log('then...')
    },
    // async setDialog({ commit }, payload) {
    //     console.log('setDialog payload: ', payload)
    //     payload.show = payload.show || true
    //     payload.title = payload.title || ''
    //     payload.text = payload.text || ''
    //     payload.color = payload.color || 'info'
    //     commit('SET_DIALOG', payload)
    // }
}

export const getters = {
    loading(state) {
        return state.loading
    },
    loadingUploadFiles(state) {
        return state.loadingUploadFiles
    },
    loadingCreateResume(state) {
        return state.loadingCreateResume
    },
    loadingUploadResume(state) {
        return state.loadingUpdateResume
    },
    errors(state) {
        return state.errors
    },
    loginModal(state) {
        return state.loginModal
    },
    requestAuthorizationModal(state) {
        return state.requestAuthorizationModal
    },
    snackbars(state) {
        return state.snackbars
    },
    // dialog(state) {
    //     return state.dialog
    // }
}
