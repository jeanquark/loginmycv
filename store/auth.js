export const strict = false

export const state = () => ({
    // loading: false,
    authUser: null,
    authResume: null
})

export const mutations = {
    // SET_LOADING (state, payload) {
    //     state.loading = payload
    // },
    SET_AUTH_USER (state, payload) {
        // console.log('SET_AUTH_USER: ', payload)
        state.authUser = payload
    },
    SET_AUTH_RESUME (state, payload) {
        state.authResume = payload
    }
}

export const actions = {
    async loginUser ({ commit }, payload) {
		try {
            console.log('loginUser: ', payload)
            const { user } = await this.$axios.$post('/api/v1/auth/login-user', payload)
            // const abc = await this.$axiosUser.$post('/api/v1/auth/login-user', payload)
			// const abc = await this.$axios.$get('/api/api/v1/auth/me')
            console.log('user: ', user)
            commit('SET_AUTH_USER', user)

			// Add token in localStorage
			// window.localStorage.setItem('token-user', `${abc.token}`)
            // console.log("localStorage.getItem('token-user'): ", localStorage.getItem('token-user'))

			// Set authorization header for axios requests
            // this.$axios.setToken(localStorage.getItem('token-user'), 'Bearer-user')
            // this.$axios.setHeader('Authorizationuser', localStorage.getItem('token-user'))
            // this.$axiosUser.setToken(localStorage.getItem('token-user'), 'Bearer')
            // this.$api.setHeader('Authorization', localStorage.getItem('token-user'))


			// return user
        } catch (error) {
            console.log('[VUEX] auth/loginUser error: ', error)
            throw error
        }
    },
    async loginUserOAuth ({ commit }, payload) {
        try {
            // const { email } = payload
            const { user } = await this.$axios.$post('/api/v1/auth/login-user-oauth', payload)
            console.log('user: ', user)
            commit('SET_AUTH_USER', user)
        } catch (error) {
            console.log('[VUEX] auth/loginUserOAuth error: ', error)
            throw error
        }
    },
    async logoutUser ({ commit }, payload) {
        try {
            await this.$axios.$get('/api/v1/auth/logout-user')
            commit('SET_AUTH_USER', null)
        } catch (error) {
            console.log('[VUEX] auth/logoutUser error: ', error)
            throw error
        }
    },
    async loginResume ({ commit }, payload) {
        try {
            const { resume } = await this.$axios.$post('/api/v1/auth/login-resume', payload)
            // const abc = await this.$axios.$get('/api/api/v1/auth/me')
            // const abc = await this.$axiosResume.$post('/api/v1/auth/login-resume', payload)
            console.log('resume2: ', resume)
            commit('SET_AUTH_RESUME', resume)
            
            // Add token in localStorage
            // window.localStorage.setItem('token-resume', `${abc.token}`)
            // Set authorization header for axios requests
            // this.$axios.setToken(localStorage.getItem('token-resume'), 'Bearer-resume')
            // this.$axios.setHeader('Authorizationresume', localStorage.getItem('token-resume'))
            // this.$axiosResume.setToken(localStorage.getItem('token-resume'), 'Bearer')
            // return abc
        } catch (error) {
            console.log('[VUEX] auth/loginResume error: ', error)
            throw error
            // throw new Error(error)
        }
    },
    async loginUserOAuth ({ commit }, payload) {
        try {
            // const { email } = payload
            console.log('loginUserOAuth: ', payload)
            const { user } = await this.$axios.$post('/api/v1/auth/login-user-oauth', payload)
            console.log('user: ', user)
            commit('SET_AUTH_USER', user)
        } catch (error) {
            console.log('error from vuex: ', error)
            throw error
        }
    },
    async logoutUser ({ commit }, payload) {
        try {
            await this.$axios.$get('/api/v1/auth/logout-user')
            commit('SET_AUTH_USER', null)
        } catch (error) {
            console.log('error logoutUser: ', error)
            throw error
        }
    },
    async logoutResume ({ commit }, payload) {
        try {
            await this.$axios.$get('/api/v1/auth/logout-resume')
            commit('SET_AUTH_RESUME', null)
        } catch (error) {
            console.log('[VUEX] auth/logoutResume error: ', error)
            throw error
        }
    },
    async fetchAuthUser({ commit }) {
        try {
            const { user } = await this.$axios.get('/api/v1/auth/user')
            console.log('[VUEX] auth/fetchAuthUser: ', user)

            // commit(types.FETCH_USER_SUCCESS, { user: data })
            commit('SET_AUTH_USER', user)
        } catch (error) {
            // commit(types.FETCH_USER_FAILURE)
            console.log('[VUEX] auth/fetchAuthUser error: ', error)
        }
    },
    async fetchAuthResume({ commit }) {
        try {
            const { data } = await this.$axios.get('/api/v1/auth/resume')
            console.log('data from fetchAuthResume: ', data)

            // commit(types.FETCH_USER_SUCCESS, { user: data })
            commit('SET_AUTH_RESUME', { resume: data })
        } catch (error) {
            // commit(types.FETCH_USER_FAILURE)
            console.log('error: ', error)
        }
    },
    async TOBEDELETED_updateUser2 ({ commit }, payload) {
        try {
            console.log('updateUser: ', payload)
            const { data } = await this.$axios.put('/api/v1/auth/user-update', payload)
            console.log('data2: ', data)
        } catch (error) {
            console.log('error: ', error)
            throw error
        }
    },
    async forgotPassword ({ }, payload) {
        try {
            console.log('forgotPassword: ', payload)
            const { data } = await this.$axios.post('/api/v1/auth/forgotpassword', { email: payload })
            console.log('data: ', data)
        } catch (error) {
            console.log('error from forgotPassword: ', error)
            throw error
        }
    },
    async refreshToken ({ getters }) {
        try {
            console.log('refreshToken')
            const user = getters.authUser
            const {data } = await this.$axios.post('/api/v1/auth/refreshtoken', {
                user
            })
            console.log('data: ', data)
        } catch (error) {
            console.log('error: ', error)
            throw error
        }
    },
    async resetPassword ({ }, payload) {
        try {
            console.log('forgotPassword: ', payload)
            const { resetToken, password } = payload
            console.log('resetToken: ', resetToken)
            console.log('password: ', password)
            const { data } = await this.$axios.put(`/api/v1/auth/resetpassword/${resetToken}`, { password })
            console.log('data: ', data)
        } catch (error) {
            console.log('error from resetPassword: ', error)
            throw error
        }
    },
    async updateUserPassword ({ commit }, payload) {
        try {
            console.log('updateUserPassword action: ', payload)
            const { data } = await this.$axios.put('/api/v1/auth/update-password', payload)
        } catch (error) {
            console.log('error from updateUserPassword action: ', error)
            throw error
        }
    },
    
}

export const getters = {
    // loading (state) {
    //     return state.loading
    // },
    authUser (state) {
        return state.authUser
    },
    authResume (state) {
        return state.authResume
    }
}