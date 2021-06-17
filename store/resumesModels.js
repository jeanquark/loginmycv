export const state = () => ({
    resumesModels: []
})

export const mutations = {
    SET_RESUMESMODELS (state, payload) {
        state.resumesModels = payload
    }
}

export const actions = {
    async fetchResumesModels ({ commit }, payload) {
        try {
            const { data } = await this.$axios.$get(`/api/v1/resumes-models`)
            console.log('data: ', data)
            commit('SET_RESUMESMODELS', data)
        } catch (error) {
            console.log('error: ', error)
            throw error
        }
    },
}

export const getters = {
    resumesModels (state) {
        return state.resumesModels
    }
}