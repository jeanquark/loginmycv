// export const strict = false

export const state = () => ({
	languages: []
})

export const mutations = {
	SET_LANGUAGES (state, payload) {
		state.languages = payload
	}
}

export const actions = {
	async fetchLanguages ({ commit }, payload) {
        const { data } = await this.$axios.$get('/api/v1/languages')
        console.log('data: ', data)
		commit('SET_LANGUAGES', data)
	}
}

export const getters = {
	languages (state) {
		return state.languages
	}
}