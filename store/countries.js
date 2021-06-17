// export const strict = false

export const state = () => ({
	countries: []
})

export const mutations = {
	SET_COUNTRIES (state, payload) {
		state.countries = payload
	}
}

export const actions = {
	async fetchCountries ({ commit }, payload) {
        const { data } = await this.$axios.$get('/api/v1/countries')
        console.log('data: ', data)
		commit('SET_COUNTRIES', data)
	}
}

export const getters = {
	countries (state) {
		return state.countries
	}
}