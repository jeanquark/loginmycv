// export const strict = false

export const state = () => ({
	socialNetworks: []
})

export const mutations = {
	SET_SOCIAL_NETWORKS (state, payload) {
		state.socialNetworks = payload
	}
}

export const actions = {
	async fetchSocialNetworks ({ commit }) {
        const { data } = await this.$axios.$get('/api/v1/social-networks')
        console.log('data: ', data)
		commit('SET_SOCIAL_NETWORKS', data)
	}
}

export const getters = {
	socialNetworks (state) {
		return state.socialNetworks
	}
}