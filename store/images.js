import Vue from 'vue'

export const state = () => ({
    uploadImageLoading: false,
    uploadImageSuccess: [],
    uploadImageErrors: []
})

export const mutations = {
    SET_UPLOAD_IMAGE_LOADING(state, payload) {
        state.uploadImageLoading = payload
    },
    ADD_UPLOAD_IMAGE_SUCCESS(state, payload) {
        // state.uploadImageSuccess = state.uploadImageSuccess.concat(payload)
        state.uploadImageSuccess.push(payload)
    },
    ADD_UPLOAD_IMAGE_ERROR(state, payload) {
        // state.uploadImageErrors = state.uploadImageErrors.concat(payload)
        state.uploadImageErrors.push(payload)
    },
    CLEAR_UPLOAD_IMAGE_STATUS(state) {
        state.uploadImageLoading = false
        state.uploadImageSuccess = []
        state.uploadImageErrors = []
    }
}

export const actions = {
    async getImage ({}, payload) {
        try {

        } catch (error) {
            console.log('error: ', error)
        }
    },
    async uploadImage ({}, payload) {
        try {
            const { uploadImage } = payload
            console.log('[VUEX] images/uploadImage: ', uploadImage)
            await this.$axios.$post(`/api/v1/images/upload`, uploadImage)
        } catch (error) {
            console.log('[VUEX] error: ', error)
            throw error
        }
    },
    async deleteImage ({}, payload) {
        try {
            const { imageName } = payload
            console.log('[VUEX] images/deleteImage: ', imageName)
            // await this.$axios.$post(`/api/v1/images/delete`, { resumeId, imageName })
            await this.$axios.$delete(`/api/v1/images/${imageName}`)
        } catch (error) {
            console.log('[VUEX] error: ', error)
            throw error
        }
    }
}

export const getters = {
    uploadImageLoading(state) {
        return state.uploadImageLoading
    },
    uploadImageSuccess(state) {
        return state.uploadImageSuccess
    },
    uploadImageErrors(state) {
        return state.uploadImageErrors
    }
}