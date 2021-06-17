// import axios from 'axios'

export const state = () => ({
    authorizations: [],
    // userReceivedAuthorizations: {}
    userAuthorizations: []
})

export const mutations = {
    SET_AUTHORIZATIONS(state, payload) {
        state.authorizations = payload
    },
    SET_USER_AUTHORIZATIONS(state, payload) {
        console.log('SET_USER_AUTHORIZATIONS: ', payload)
        state.userAuthorizations = payload
        // state.userAuthorizations = Object.assign({}, state.userAuthorizations, {
        //     [payload.id]: payload
        // })
    },
    DELETE_AUTHORIZATION (state, payload) {
        console.log('DELETE_AUTHORIZATION: ', payload)
        const authorizationId = parseInt(payload)
        const index = state.userAuthorizations.findIndex(authorization => authorization.id === authorizationId)
        console.log('index: ', index)
        state.userAuthorizations.splice(index, 1)
    }
}

export const actions = {
    async fetchAuthorizations ({ commit }) {
        try {
            const { data } = await this.$axios.$get('/api/v1/authorizations')
            commit('SET_AUTHORIZATIONS', data)
        } catch (error) {
            console.log('error: ', error)
            throw error
        }
    },
    async fetchUserAuthorizations ({ commit }) {
		try {
            console.log('Call to fetchUserReceivedAuthorizations')
            const { data } = await this.$axios.$get(`/api/v1/authorizations/user/authUser`)
            console.log('data2 ', data)
            commit('SET_USER_AUTHORIZATIONS', data)
		} catch (error) {
			console.log('error from fetchUserAuthorizations: ', error)
			throw error
		}
    },
    async createAuthorization ({ commit }, payload) {
        try {
            console.log('createAuthorization action: ', payload)
            const { data } = await this.$axios.$post(`/api/v1/authorizations`, payload)
            console.log('data: ', data)
        } catch (error) {
            console.log('error: ', error)
            throw error
        }
    },
    async deleteAuthorization ({ commit }, payload) {
        try {
            const { authorizationId } = payload
            await this.$axios.$delete(`/api/v1/authorizations/${authorizationId}`)
            commit('DELETE_AUTHORIZATION', authorizationId)
        } catch (error) {
            throw error
        }
    }
}

export const getters = {
    authorizations (state) {
        return state.authorizations
    },
    userAuthorizations (state) {
        return state.userAuthorizations
    }
    // userReceivedAuthorizations (state) {
	// 	return state.userReceivedAuthorizations
    // },
    // userGivenAuthorizations (state) {
	// 	return state.user_given_authorizations
	// },
}