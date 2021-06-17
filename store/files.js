export const state = () => ({
    uploadFileLoading: false,
    uploadFileSuccess: [],
    uploadFileErrors: []
})

export const mutations = {
    SET_UPLOAD_FILE_LOADING(state, payload) {
        state.uploadFileLoading = payload
    },
    ADD_UPLOAD_FILE_SUCCESS(state, payload) {
        // state.uploadFileSuccess = state.uploadFileSuccess.concat(payload)
        state.uploadFileSuccess.push(payload)
    },
    ADD_UPLOAD_FILE_ERROR(state, payload) {
        // state.uploadFileErrors = state.uploadFileErrors.concat(payload)
        state.uploadFileErrors.push(payload)
    },
    CLEAR_UPLOAD_FILE_STATUS(state) {
        state.uploadFileLoading = false
        state.uploadFileSuccess = []
        state.uploadFileErrors = []
    }
}

export const actions = {
    async getFile({ }, payload) {
        try {
            console.log('[VUEX] files/getFile: ', payload)
            const { userId, fileName } = payload
            const data = await this.$axios.$post(
                `/api/v1/files/file`,
                {
                    userId,
                    fileName
                },
                {
                    responseType: 'blob'
                }
            )
            return data
        } catch (error) {
            console.log('error: ', error)
        }
    },
    async fetchUserFiles({ }) {
        try {
            console.log('[VUEX] files/fetchUserFiles')
            const { data } = await this.$axios.$get(`/api/v1/files`)
            console.log('data: ', data)
        } catch (error) {
            console.log('error: ', error)
            throw error
        }
    },
    async uploadFile({ commit }, payload) {
        try {
            const { uploadFile } = payload
            console.log('[VUEX] files/uploadFile: ', uploadFile)
            await this.$axios.$post(`/api/v1/files/upload`, uploadFile)
        } catch (error) {
            console.log('[VUEX] error: ', error)
            throw error
        }
    },
    async deleteFile({ }, payload) {
        try {
            const { fileName } = payload
            console.log('[VUEX] files/deleteFile: ', fileName)
            // await this.$axios.$post(`/api/v1/files/delete`, { resumeId, fileName })
            await this.$axios.$delete(`/api/v1/files/${fileName}`)
        } catch (error) {
            console.log('[VUEX] error: ', error)
            throw error
        }
    }
}

export const getters = {
    uploadFileLoading(state) {
        return state.uploadFileLoading
    },
    uploadFileSuccess(state) {
        return state.uploadFileSuccess
    },
    uploadFileErrors(state) {
        return state.uploadFileErrors
    }
}