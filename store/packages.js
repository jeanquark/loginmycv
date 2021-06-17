export const strict = false

export const state = () => ({
    packages: [],
})

export const mutations = {
    SET_PACKAGES (state, payload) {
        console.log('SET_PACKAGES: ', payload)
        state.packages = payload
    }
}

export const actions = {
    async fetchPackages ({ commit }, payload) {
		try {
            const { data } = await this.$axios.$get('/api/v1/packages')
            console.log('data: ', data)
            commit('SET_PACKAGES', data)
        } catch (error) {
            console.log('error from vuex fetchPackages: ', error)
            console.log('error from vuex fetchPackages 2: ', error.response)
            // throw error
        }
    }
}

export const getters = {
    packages (state) {
        return state.packages
    }
}