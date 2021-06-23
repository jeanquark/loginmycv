import Vue from 'vue'
import { upload } from '../api/utils/validationRulesServer'

export const state = () => ({
    resumes: [],
    resume: {},
    userResumes: [],
    // userResume2: {},
    // newResume2: {}
})

export const mutations = {
    SET_RESUMES(state, payload) {
        console.log('SET_RESUMES mutation called: ', payload)
        state.resumes = payload
    },
    SET_RESUME(state, payload) {
        console.log('SET_RESUME mutation called: ', payload)
        state.resume = payload
        // const activityId = parseInt(payload.id)
        // const index = state.activities.findIndex(activity => activity.id === activityId)
        // console.log('index: ', index)
        // state.activities[index] = payload
    },
    SET_USER_RESUMES(state, payload) {
        // console.log('SET_USER_RESUMES mutation: ', payload)
        state.userResumes = payload
    },
    // SET_NEW_RESUME2(state, payload) {
    //     console.log('SET_USER_RESUME mutation: ', payload)
    //     if (payload) {
    //         delete payload._id
    //         delete payload.id
    //         payload.slug = ''
    //         payload.statistics = {}
    //         payload.uploads.forEach(upload => {
    //             upload.statistics = {}
    //         })
    //         state.newResume = payload
    //     } else {
    //         const defaultTemplate = Object.keys(this.state.templates.templates)[0]
    //         console.log('defaultTemplate: ', defaultTemplate)
    //         state.newResume2 = {
    //             // template: defaultTemplate,
    //             template: {
    //                 id: defaultTemplate
    //             },
    //             slug: '',
    //             job_title: '',
    //             job_description: '',
    //             personal_data: {
    //                 firstname: '',
    //                 lastname: '',
    //                 email: ''
    //             },
    //             education: [],
    //             work_experience: [],
    //             skills: [],
    //             uploads: [],
    //             social_networks: [],
    //             languages: [],
    //             language: {},
    //             visibility: 'public',
    //             is_active: true,
    //             colors: {
    //                 primary: '',
    //                 secondary: '',
    //                 tertiary: '',
    //                 background: '',
    //                 text: ''
    //             },
    //             statistics: {},
    //             parameters: {},
    //             menus: {},
    //             fields: {},
    //             contact_form_validation: {},
    //             labels: [],
    //             others: []
    //         }
    //     }
    // },
    ADD_USER_RESUME(state, payload) {
        console.log('[vuex] resumes/ADD_USER_RESUME payload: ', payload)
        state.userResumes.push(payload)
    },
    UPDATE_USER_RESUME(state, payload) {
        console.log('UPDATE_USER_RESUME: ', payload)
        const resumeId = payload._id
        console.log('resumeId: ', resumeId)
        const index = state.userResumes.findIndex(resume => resume.id == resumeId)
        console.log('index: ', index)
        Vue.set(state.userResumes, index, payload)
    },
    // DELETE_PROFILE_PICTURE(state, payload) {
    //     console.log('DELETE_PROFILE_PICTURE mutation called: ', payload)
    //     const { resumeId } = payload
    //     const resumeIndex = state.userResumes.findIndex(resume => resume.id == resumeId)
    //     // const index = state.r
    //     console.log('resumeIndex: ', resumeIndex)
    //     // Vue.set(state.userResumes, resumeIndex, { abc: 'to_be_deleted' })
    //     const uploadIndex = state.userResumes[resumeIndex].uploads.findIndex(upload => upload.category === 'profile_picture')
    //     console.log('uploadIndex: ', uploadIndex)
    //     Vue.set(state.userResumes[resumeIndex]['uploads'], uploadIndex, payload.abc)
        
    //     // state.userResumes[resumeIndex]['uploads'][uploadIndex]['status'] = 'to_be_deleted'
    //     // state.userResumes[resumeIndex]['uploads'][uploadIndex] = null
    //     // console.log("state.userResumes[resumeIndex]['uploads'][uploadIndex]: ", state.userResumes[resumeIndex]['uploads'][uploadIndex])
    // },
    DELETE_RESUME(state, payload) {
        const resumeId = payload
        console.log('resumeId: ', resumeId)
        const index = state.userResumes.findIndex(resume => resume.id == resumeId)
        console.log('index: ', index)
        console.log('state.userResumes: ', state.userResumes)
        state.userResumes.splice(index, 1)
    }
}

export const actions = {
    async fetchResumes({ commit }) {
        try {
            console.log('fetchResumes vuex action')
            const { data } = await this.$axios.$get('/api/v1/resumes')
            console.log('data: ', data)
            commit('SET_RESUMES', data)
        } catch (error) {
            console.log('error from fetchResumes vuex: ', error)
            throw error
        }
    },
    async fetchResumeById({ commit }, id) {
        try {
            console.log('fetchResumeById action called: ', id)
            // const { data } = await this.$axiosResume.$get(`/api/v1/resumes/${slug}`)
            const { data } = await this.$axios.$get(`/api/v1/resumes/${id}`)
            console.log('data: ', data)
            commit('SET_RESUME', data)
        } catch (error) {
            console.log('error from vuex: ', error)
            throw error
        }
    },
    async fetchResumeBySlug({ commit }, slug) {
        try {
            console.log('fetchResumeBySlug action called: ', slug)
            const { data } = await this.$axios.$get(`/api/v1/resumes/slug/${slug}`)
            commit('SET_RESUME', data)
        } catch (error) {
            console.log('error from vuex fetchResumeBySlug: ', error)
            throw error
        }
    },
    async fetchUserResumes({ commit }) {
        try {
            console.log('fetchUserResumes')
            const { data } = await this.$axios.$get(`/api/v1/resumes/user`)
            console.log('vuex fetchUserResumes data: ', data)
            commit('SET_USER_RESUMES', data)
        } catch (error) {
            console.log('error from vuex: ', error)
            throw error
        }
    },
    async fetchUserImages({ commit }) {
        try {
            console.log('[VUEX] fetchUserImages')
            const { data } = await this.$axios.$get(`/api/v1/resumes/user-images`)
            console.log('fetchUserImages data: ', data)
            return data
        } catch (error) {
            console.log('error from vuex: ', error)
            throw error
        }
    },
    async fetchUserFiles({}) {
        try {
            console.log('[VUEX] fetchUserFiles')
            const { data } = await this.$axios.$get(`/api/v1/resumes/files`)
            console.log('data: ', data)
            return data
        } catch (error) {
            console.log('error from vuex: ', error)
            throw error
        }
    },
    async fetchUserFile({}, payload) {
        try {
            console.log('payload: ', payload)
            const { fileName, fileId, resumeId, resumeUserId, authUserId } = payload
            const data = await this.$axios.$post(
                `/api/v1/resumes/file`,
                {
                    fileName,
                    fileId,
                    resumeId,
                    resumeUserId,
                    authUserId
                },
                {
                    responseType: 'blob'
                }
            )
            // const data = await this.$axios.$get(`/api/v1/resumes/${resumeId}/files/${fileId}`)
            console.log('data: ', data)
            return data
        } catch (error) {
            console.log('error: ', error)
            throw error
        }
    },
    // async TOBEDELETED_createResume({ commit }, payload) {
    //     try {
    //         console.log('createResume: ', payload)
    //         commit('SET_LOADING_CREATE_RESUME', true, { root: true })
    //         const { data } = await this.$axios.$post(`/api/v1/resumes`, payload)
    //         console.log('data2: ', data)
    //         commit('ADD_USER_RESUME', data)
    //     } catch (error) {
    //         console.log('error from createResume store: ', error)
    //         throw error
    //     }
    // },
    async createResumeData({ commit }, payload) {
        try {
            const { data } = await this.$axios.$post(`/api/v1/resumes`, payload)
            console.log('[VUEX] resume/createResumeData data: ', data)
            // commit('ADD_USER_RESUME', data)
        } catch (error) {
            console.log('[VUEX] resume/createResumeData: error: ', error)
            throw error
        }
    },
    async updateResumeData({ commit }, payload) {
        try {
            console.log('[VUEX] updateResume: ', payload)

            // Update resume data
            commit('SET_LOADING_UPDATE_RESUME', true, { root: true })
            // const updatedResume = { ...payload }
            // delete updatedResume['uploads']
            const { data } = await this.$axios.$put(`/api/v1/resumes/${payload.id}`, payload)
            console.log('[VUEX] resume/updateResumeData data: : ', data)
            commit('SET_LOADING_UPDATE_RESUME', false, { root: true })
            // commit('UPDATE_USER_RESUME', data)
        } catch (error) {
            commit('SET_LOADING_UPDATE_RESUME', false, { root: true })
            console.log('[VUEX] resume/updateResumeData error: : ', error)
            throw error
        }
    },
    async updateResumeImages({}, payload) {
        try {
            console.log('[VUEX] updateResumeImages: ', payload)
            const data = await this.$axios.$put(`/api/v1/resumes/images`, payload)
            console.log('[VUEX] resume/updateResumeImages data: : ', data)
        } catch (error) {
            console.log('[VUEX] resume/updateResumeImage error: : ', error)
        }
    },
    async updateResumeFiles({ commit }, payload) {
        try {
            console.log('[VUEX] updateResumeFiles: ', payload)
            // const { resumeId, resumeFiles } = payload
            const data = await this.$axios.$put(`/api/v1/resumes/files`, payload)
            console.log('[VUEX] resume/updateResumeFiles data: : ', data)
        } catch (error) {
            console.log('[VUEX] resume/updateResumeFiles error: : ', error)
        }
    },
    async addResumeImage({}, payload) {
        try {
            console.log('VUEX addResumeImage: ', payload)
            const { resumeId, image } = payload
            await this.$axios.$post(`/api/v1/resumes/images/add`, { resumeId, image })
        } catch (error) {
            console.log('error: ', error)
        }
    },
    async addResumeFile({}, payload) {
        try {
            console.log('[VUEX] addResumeFile: ', payload)
            const { resumeId, file } = payload
            await this.$axios.$post(`/api/v1/resumes/files/add`, { resumeId, file })
        } catch (error) {
            console.log('error: ', error)
        }
    },
    async removeResumeImage({}, payload) {
        try {
            console.log('[VUEX] removeResumeImage: ', payload)
            const { resumeId, imageName } = payload
            await this.$axios.$post(`/api/v1/resumes/images/remove`, { resumeId, imageName } )
        } catch (error) {
            console.log('error: ', error)
        }
    },
    async uploadResumeFiles2({ commit }, payload) {
        try {
            // Upload resume files (jpeg, png & pdf)
            console.log('uploadResumeFiles: ', payload)
            const { resumeId, uploads } = payload
            commit('SET_LOADING_UPLOAD_FILES', true, { root: true })

            // const { files } = await this.$axios.$put(`/api/v1/resumes/${resumeId}/files`, { name: 'abc', uploads })
            const { files } = await this.$axios.$post(`/api/v1/resumes/${resumeId}/upload-resume-files`, uploads)
            console.log('files: ', files)
            commit('SET_LOADING_UPLOAD_FILES', false, { root: true })
        } catch (error) {
            console.log('error: ', error)
            commit('SET_LOADING_UPLOAD_FILES', false, { root: true })
            throw error
        }
    },

    

    async removeResumeFile({}, payload) {
        try {
            console.log('[VUEX] removeResumeFile: ', payload)
            const { resumeId, fileName } = payload
            await this.$axios.$post(`/api/v1/resumes/files/remove`, { resumeId, fileName })
        } catch (error) {
            console.log('error: ', error)
            throw error
        }
    },
    // async incrementViewsCount({ commit }, payload) {
    //     try {
    //         console.log('payload: ', payload)
    //         const { data } = await this.$axios.$post(`/api/v1/resumes/increment-views-count`)
    //         console.log('data: ', data)
    //     } catch (error) {

    //     }
    // },
    async resetResumeCounter({ commit }, payload) {
        try {
            console.log('[VUEX] resetResumeCounter: ', payload)
            const { resumeId } = payload
            const { data } = await this.$axios.$get(`/api/v1/resumes/${resumeId}/reset-resume-counter`)
            console.log('data: ', data)
            commit('UPDATE_USER_RESUME', data)
        } catch (error) {
            console.log('error: ', error)
            throw error
        }
    },

    async resetUploadsCounter({ commit }, payload) {
        try {
            console.log('resetUploadsCounter: ', payload)
            const { resumeId } = payload
            const { data } = await this.$axios.$get(`/api/v1/resumes/${resumeId}/reset-uploads-counter`)
            console.log('data: ', data)
            commit('UPDATE_USER_RESUME', data)
        } catch (error) {
            console.log('error: ', error)
            throw error
        }
    },

    async deleteResume({ commit }, payload) {
        try {
            const { resumeId } = payload
            await this.$axios.$delete(`/api/v1/resumes/${resumeId}`)
            commit('DELETE_RESUME', resumeId)
        } catch (error) {
            console.log('error: ', error)
            throw error
        }
    }
}
export const getters = {
    resumes(state) {
        return state.resumes
    },
    resume(state) {
        return state.resume
    },
    userResumes(state) {
        return state.userResumes
    },
    // userResume2(state) {
    //     return state.userResume
    // },
    // newResume2(state) {
    //     return state.newResume
    // }
}
