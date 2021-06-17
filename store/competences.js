// export const strict = false

export const state = () => ({
	competences: []
})

export const mutations = {
	SET_COMPETENCES (state, payload) {
		state.competences = payload
	}
}

export const actions = {
	async fetchCompetences ({ commit }, payload) {
        const { data } = await this.$axios.$get('/api/v1/competences')
        console.log('data: ', data)
		commit('SET_COMPETENCES', data)
	}
}

export const getters = {
	competences (state) {
		return state.competences
	}
}