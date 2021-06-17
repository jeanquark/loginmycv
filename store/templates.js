export const state = () => ({
    templates: [],
    template: {}
})

export const mutations = {
	SET_TEMPLATES (state, payload) {
        console.log('SET_TEMPLATES vuex mutation: ', payload)

        payload.forEach(template => {
            state.templates = Object.assign({}, state.templates, {
                [template.id]: template
            })
        })
    },
    SET_TEMPLATE (state, payload) {
		console.log('SET_TEMPLATE vuex mutation: ', payload)
        state.template = payload
        // state.templates = Object.assign({}, state.templates, {
        //     [payload.id]: payload
        // })
	}
}

export const actions = {
    async fetchTemplates ({ commit, state }) {
        try {
            console.log('fetchTemplates vuex action')
            const { data } = await this.$axios.$get('/api/v1/templates?is_active=true')
            console.log('data: ', data)
            commit('SET_TEMPLATES', data)
        } catch (error) {
            console.log('error: ', error)
            throw error
        }
    },
	// async fetchTemplates ({ commit, state }) {
	// 	try {
	// 		console.log('Call to fetchTemplates action')
	// 		let snapshot = {}
	// 		// Fetch page 1 of templates
	// 		if (state.templates.length < 1) {
	// 			snapshot = await firestore.collection('templates').where('active', '==', true).orderBy(firebase.firestore.FieldPath.documentId()).limit(2).get()
	// 			const lastVisible = snapshot.docs[snapshot.docs.length - 1]
	// 			commit('SET_LAST_VISIBLE', lastVisible.id)
	// 		} else {
	// 			// Fetch subsequent pages of templates
	// 			const lastVisible = state.lastVisible
	// 			console.log('lastVisible: ', lastVisible)
	// 			snapshot = await firestore.collection('templates').where('active', '==', true).orderBy(firebase.firestore.FieldPath.documentId()).startAfter(lastVisible).limit(2).get()
	// 			console.log('snapshot: ', snapshot)
	// 			const updatedLastVisible = snapshot.docs[snapshot.docs.length - 1]
	// 			console.log('updatedLastVisible: ', updatedLastVisible)
	// 			if (updatedLastVisible) {
	// 				commit('SET_LAST_VISIBLE', updatedLastVisible.id)
	// 			} 
	// 		}

	// 		const templatesArray = []
	// 		snapshot.forEach(doc => {
	// 			templatesArray.push({...doc.data(), id: doc.id})
	// 		})
	// 		console.log('templatesArray: ', templatesArray)
	// 		// commit('setTemplates', templatesArray)
	// 		commit('ADD_TEMPLATES', templatesArray)
	// 	} catch (error) {
	// 		throw error
	// 	}
    // },
    async fetchTemplateById ({ commit }, id) {
        try {
            console.log('fetchTemplateById vuex action: ', id)
            const { data } = await this.$axios.$get(`/api/v1/templates/${id}`)
            console.log('data: ', data)
            commit('SET_TEMPLATE', data)
        } catch (error) {
            console.log('error: ', error)
            throw error
        }
    }
	// async fetchTemplateById ({ commit }, payload) {
	// 	try {
	// 		console.log('Call to fetchTemplate action: ', payload)
	// 		const doc = await firestore.collection('templates').doc(payload).get()
	// 		if (doc.exists) {
	// 			console.log('doc.data(): ', doc.data())
	// 			return doc.data()
	// 		}
	// 		throw 'no_template_found'
	// 	} catch (error) {
	// 		console.log('error: ', error)
	// 		throw error
	// 	}
	// }
}

export const getters = {
	templates (state) {
		return state.templates
    },
    template (state) {
        return state.template
    }
}