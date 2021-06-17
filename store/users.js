export const strict = false

export const state = () => ({
    users: [],
})

export const mutations = {
    SET_USERS (state, payload) {
        state.users = payload
    }
}

export const actions = {
    async fetchUsers ({ commit }, payload) {
		try {
            const { limit, page, sort } = payload
            const data = await this.$axios.$get(`/api/v1/users?select=firstname,lastname,email,role,created_at&limit=${limit}&page=${page}&sort=${sort}`)
            console.log('data2: ', data)
            // commit('SET_USERS', data.data)
            return data
        } catch (error) {
            console.log('error from vuex: ', error)
            throw error
        }
    },
    async updateUserAccount ({ commit }, payload) {
        try {
            console.log('updateUserAccount action: ', payload)
            const { data } = await this.$axios.$put(`/api/v1/users/${payload.id}`, payload)
            console.log('data: ', data)
        } catch (error) {
            console.log('error: ', error)
            throw error
        }
    },
    // async fetchUser ({ commit }) {
	// 	try {
    //         // const { data } = await this.$axiosUser.$get('/api/v1/users')
    //         const { data } = await this.$axios.$get('/api/v1/users/5e66fbd716b536f1880127e5')
    //         // const { data } = await ctx.$axiosUser.$get('/api/v1/users')
    //         console.log('data: ', data)
    //         // commit('SET_USER', data)
    //     } catch (error) {
    //         console.log('error from vuex: ', error)
    //         throw error
    //     }
    // }
}

export const getters = {
    users (state) {
        return state.users
    }
}