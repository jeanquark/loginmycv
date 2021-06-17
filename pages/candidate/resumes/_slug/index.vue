<template>
    <v-container>
        <v-row no-gutters>
            <v-col cols="12">
                <h2 class="text-center">Edit resume {{ $route.params.slug }}</h2>
                step: {{ step }}<br />
                loading: {{ loading }}
                <br />
            </v-col>
        </v-row>
        <!-- errorsStepPersonalData: {{ errorsStepPersonalData }}<br /> -->
        <!-- errorsStepEducation: {{ errorsStepEducation }}<br /> -->
        <!-- errorsStepFilesUpload: {{ errorsStepFilesUpload }}<br /> -->
        <p>errors: {{ errors }}<br /></p>

        <v-row no-gutters>
            <v-col cols="12" class="">
                <client-only>
                    <ValidationObserver ref="form">
                        <!-- errors from vee-validate: {{ errors }}<br /><br /> -->
                        <!-- userResume: {{ userResume }}<br /><br /> -->
                        <!-- userResume.uploads: {{ userResume ? userResume.uploads : '' }}<br /><br /> -->
                        <v-form @submit.prevent="openUpdatingResumeDialog">
                            <v-stepper v-model="step">
                                <v-stepper-header>
                                    <v-stepper-step :step="1" editable v-if="!errorsStepTemplate">Choose Template</v-stepper-step>
                                    <v-stepper-step :step="1" editable :rules="[() => false]" v-else>Choose Template</v-stepper-step>

                                    <v-divider></v-divider>

                                    <v-stepper-step :step="2" editable v-if="!errorsStepPersonalData">General & Personal Data</v-stepper-step>
                                    <v-stepper-step :step="2" editable :rules="[() => false]" v-else>General & Personal Data</v-stepper-step>

                                    <v-divider></v-divider>

                                    <v-stepper-step :step="3" editable v-if="!errorsStepEducation">Education</v-stepper-step>
                                    <v-stepper-step :step="3" editable :rules="[() => false]" v-else>Education</v-stepper-step>

                                    <v-divider></v-divider>

                                    <!-- <v-stepper-step :step="4" editable v-if="!errorsStepWorkExperience">Work Experience</v-stepper-step>
                                <v-stepper-step :step="4" editable :rules="[() => false]" v-else>Work Experience</v-stepper-step>

                                <v-divider></v-divider> -->

                                    <v-stepper-step :step="5" editable v-if="!errorsStepSkills">Skills</v-stepper-step>
                                    <v-stepper-step :step="5" editable :rules="[() => false]" v-else>Skills</v-stepper-step>

                                    <v-divider></v-divider>

                                    <v-stepper-step :step="6" editable v-if="!errorsStepFilesUpload">File uploads</v-stepper-step>
                                    <v-stepper-step :step="6" editable :rules="[() => false]" v-else>File uploads</v-stepper-step>
                                </v-stepper-header>

                                <v-stepper-items>
                                    <!-- <v-stepper-content :step="1" style="background: lightgray"> -->
                                    <v-stepper-content :step="1" class="">
                                        <v-card flat class="mb-8">
                                            <!-- <div style="height: 300px; display: flex" v-if="loading">
                                            <img src="~/assets/loader.svg" style="margin: auto" />
                                        </div> -->
                                            <template-component :rules="rules" />
                                        </v-card>
                                    </v-stepper-content>

                                    <v-stepper-content :step="2">
                                        <v-card class="mb-8">
                                            <!-- <personal-data-component :errors="[]" :rules="rules" v-if="!loading" /> -->
                                            <personal-data-component :errors="errors" :rules="rules" v-if="!loading" />
                                        </v-card>
                                    </v-stepper-content>

                                    <v-stepper-content :step="3">
                                        <v-card class="mb-8">
                                            <!-- <education-component :errors="[]" :rules="rules" v-if="!loading" /> -->
                                            <!-- <education-component :errors="errors" :rules="rules" v-if="!loading" /> -->
                                        </v-card>
                                    </v-stepper-content>

                                    <v-stepper-content :step="4">
                                        <v-card class="mb-8"> </v-card>
                                    </v-stepper-content>

                                    <v-stepper-content :step="5">
                                        <v-card class="mb-8">
                                            <!-- <skills-component :errors="[]" :rules="rules" v-if="!loading" /> -->
                                            <!-- <skills-component :errors="errors" :rules="rules" v-if="!loading" /> -->
                                        </v-card>
                                    </v-stepper-content>
                                    <v-stepper-content :step="6">
                                        <v-card class="mb-8">
                                            <!-- <file-uploads-component :errors="[]" :rules="rules" :step="step" v-if="!loading" /> -->
                                            <!-- <file-uploads-component :errors="errors" :rules="rules" :step="step" v-if="!loading" /> -->
                                        </v-card>
                                    </v-stepper-content>
                                </v-stepper-items>

                                <v-card-actions class="justify-center mt-2">
                                    <v-btn small color="primary" @click.stop="moveOneStepBackward"> <v-icon>mdi-arrow-left</v-icon> Previous </v-btn>
                                    <v-btn small color="primary" @click.stop="moveOneStepForward"> Next <v-icon>mdi-arrow-right</v-icon> </v-btn>
                                </v-card-actions>
                                <v-row no-gutters justify="center" class="my-2">
                                    <v-btn class="success" type="submit" :loading="updatingResumeDialog">Update Resume</v-btn><br /><br />
                                    <!-- <v-btn class="success" @click="uploadResumeFiles">Upload Files</v-btn> -->
                                </v-row>
                            </v-stepper>
                        </v-form>
                    </ValidationObserver>
                </client-only>
            </v-col>
        </v-row>

        <!-- Modal to update resume -->
        <v-dialog v-model="updatingResumeDialog" max-width="500" persistent>
            <v-card light>
                <v-toolbar dark color="primary">
                    <v-toolbar-title>Update your resume</v-toolbar-title>
                </v-toolbar>

                <v-card-text class="">
                    <!-- loadingUpdateResume: {{ loadingUpdateResume }}<br /> -->
                    <!-- loadingUploadFiles: {{ loadingUploadFiles }}<br /> -->
                    <!-- uploadFilesError: {{ uploadFilesError }}<br /> -->
                    <!-- errors: {{ errors }}<br /> -->

                    <!-- Updating data -->
                    <div class="text-center my-3 pt-2" v-if="updateResumeDataProgress">
                        <v-progress-linear indeterminate height="15" color="primary"></v-progress-linear>
                        <p class="mt-2">Updating resume...</p>
                    </div>
                    <v-alert type="error" color="error" prominent text class="my-3" v-if="updateResumeDataError"
                        >An error occured while updating your resume data. Please check validation messages.</v-alert
                    >
                    <v-alert type="success" prominent text class="my-3" v-if="updateResumeDataSuccess">Updating resume data was successful.</v-alert>

                    <!-- Uploading profile picture -->
                    <div class="text-center my-3 pt-2" v-if="uploadResumeImageLoading">
                        <v-progress-linear indeterminate height="15" color="secondary"></v-progress-linear>
                        <p class="mt-2">Uploading images...</p>
                    </div>
                    <v-alert color="error" type="error" prominent text class="my-3" v-for="error in uploadResumeImageErrors" :key="error">{{ error }}</v-alert>
                    <v-alert type="success" prominent text class="my-3" v-for="success in uploadResumeImageSuccess" :key="success">{{ success }}</v-alert>

                    <!-- Uploading files -->
                    <div class="text-center my-3 pt-2" v-if="uploadResumeFileLoading">
                        <v-progress-linear indeterminate height="15" color="tertiary"></v-progress-linear>
                        <p class="mt-2">Uploading files...</p>
                    </div>
                    <v-alert color="error" type="error" prominent text class="my-3" v-for="error in uploadResumeFileErrors" :key="error">{{ error }}</v-alert>
                    <v-alert type="success" prominent text class="my-3" v-for="success in uploadResumeFileSuccess" :key="success">{{ success }}</v-alert>

                    <!-- Display errors -->
                    <div v-for="(error, index) in errors" :key="index">
                        <v-alert type="error" prominent text class="my-3">{{ error }}</v-alert>
                    </div>

                    <!-- <v-row no-gutters justify="center" v-if="loadingUploadFiles">
                        <v-alert :value="loadingUploadFiles" color="secondary" outlined>
                            <div class="text-xs-center"><v-progress-circular indeterminate color="secondary"></v-progress-circular> Uploading files...</div>
                        </v-alert>
                    </v-row>
                    <v-row no-gutters justify="center" v-if="loadingUpdateResume">
                        <v-alert :value="loadingUpdateResume" color="primary" outlined>
                            <div class="text-xs-center"><v-progress-circular indeterminate color="primary"></v-progress-circular> Updating resume...</div>
                        </v-alert>
                    </v-row> -->
                    <v-row no-gutters justify="center" class="mt-4">
                        <!-- <v-btn color="primary" @click.stop="updateResume" :loading="loadingUpdateResume || loadingUploadFiles">Update</v-btn> -->
                        <v-btn text color="secondary" @click.stop="updatingResumeDialog = false">Close</v-btn>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import validationRulesClient from '@/api/utils/validationRulesClient'
import TemplateComponent from '~/components/resume/TemplateComponent'
// import Noty from 'noty'
// import { uploadResumeFiles } from '~/api/controllers/resumes'
const delay = (ms) => new Promise((res) => setTimeout(res, ms))

export default {
    name: 'CandidateUpdateResume',
    components: {
        TemplateComponent,
        // templateComponent: () => import('~/components/resume/TemplateComponent'),
        PersonalDataComponent: () => import('~/components/resume/PersonalDataComponent'),
        EducationComponent: () => import('~/components/resume/EducationComponent'),
        WorkExperienceComponent: () => import('~/components/resume/WorkExperienceComponent'),
        SkillsComponent: () => import('~/components/resume/SkillsComponent'),
        FileUploadsComponent: () => import('~/components/resume/FileUploadsComponent'),
    },
    layout: 'layoutCandidate',
    // middleware: [],
    async created() {
        this.$store.commit('SET_LOADING', true, { root: true })
        if (!this.userResumes || this.userResumes.length < 1) {
            await this.$store.dispatch('resumes/fetchUserResumes')
            await delay(1000)
        }
        // await this.$store.commit('resumes/SET_NEW_RESUME')

        this.rules = validationRulesClient

        this.$store.commit('files/CLEAR_UPLOAD_FILE_STATUS')
        this.$store.commit('SET_LOADING', false, { root: true })
    },
    async mounted() {},
    data() {
        return {
            step: 1,
            rules: null,
            updatingResumeDialog: false,
            updateResumeDataProgress: false,
            updateResumeDataError: false,
            updateResumeDataSuccess: false,
            // uploadResumeImagesProgress: false,
            // uploadResumeImagesError: false,
            // uploadResumeImagesSuccess: false,
            // uploadResumeFilesProgress: false,
            // uploadResumeFilesError: false,
            // uploadResumeFilesSuccess: false,
            errorsStepTemplate: false,
            errorsStepPersonalData: false,
            errorsStepEducation: false,
            errorsStepWorkExperience: false,
            errorsStepSkills: false,
            errorsStepFilesUpload: false,
        }
    },
    computed: {
        loading() {
            return this.$store.getters['loading']
        },
        errors() {
            return this.$store.getters['errors']
        },
        userResumes() {
            return this.$store.getters['resumes/userResumes']
        },
        userResume() {
            return this.$store.getters['resumes/userResumes'].find((resume) => resume.slug === this.$route.params.slug)
        },
        uploadResumeImageLoading() {
            return this.$store.getters['images/uploadImageLoading']
        },
        uploadResumeImageSuccess() {
            return this.$store.getters['images/uploadImageSuccess']
        },
        uploadResumeImageErrors() {
            return this.$store.getters['images/uploadImageErrors']
        },
        uploadResumeFileLoading() {
            return this.$store.getters['files/uploadFileLoading']
        },
        uploadResumeFileSuccess() {
            return this.$store.getters['files/uploadFileSuccess']
        },
        uploadResumeFileErrors() {
            return this.$store.getters['files/uploadFileErrors']
        },
    },
    methods: {
        moveOneStepForward() {
            if (this.step < 7) {
                this.step += 1
            } else {
                this.step = 1
            }
        },
        moveOneStepBackward() {
            if (this.step != 1) {
                this.step -= 1
            } else {
                this.step = 7
            }
        },
        checkStepsErrors(errors) {
            console.log('checkStepsErrors: ', errors)
            this.errorsStepTemplate = false
            this.errorsStepPersonalData = false
            this.errorsStepEducation = false
            this.errorsStepWorkExperience = false
            this.errorsStepSkills = false
            this.errorsStepFilesUpload = false
            Object.keys(errors).forEach((item) => {
                console.log('item from checkStepsErrors: ', item)

                // Step template
                let inputs = ['field', 'menu']
                if (inputs.includes(item) && errors[item].length > 0) {
                    this.errorsStepTemplate = true
                }

                // Step personal data
                inputs = [
                    'slug',
                    'job_title',
                    'job_description',
                    'visibility',
                    'password',
                    'personal_data.firstname',
                    'personal_data.lastname',
                    'personal_data.middlename',
                    'personal_data.email',
                    'personal_data.website',
                    'personal_data.phone_number',
                    'personal_data.city',
                ]
                if (inputs.includes(item) && errors[item].length > 0) {
                    console.log('Personal data errors: ', item)
                    this.errorsStepPersonalData = true
                }

                // Step education
                if (item.includes('education') && errors[item].length > 0) {
                    this.errorsStepEducation = true
                }

                // Step skills
                if (item.includes('skill') && errors[item].length > 0) {
                    this.errorsStepSkills = true
                }

                // Step files upload
                if (item.includes('uploads') && errors[item].length > 0) {
                    this.errorsStepFilesUpload = true
                }
            })
        },
        async openUpdatingResumeDialog() {
            try {
                const valid = await this.$refs.form.validate()
                console.log('valid: ', valid)
                if (valid) {
                    this.updatingResumeDialog = true
                    this.updateResume()
                } else {
                    this.checkStepsErrors(this.$refs.form.errors)
                    this.$notifier.showMessage({ content: 'Please check validation errors', color: 'errors' })
                }
            } catch (error) {
                console.log('error: ', error)
            }
        },
        async updateResume() {
            try {
                console.log('updateResume')
                // this.updateResumeDataSuccess = false
                // this.updateResumeDataError = false
                // this.uploadResumeImagesSuccess = false
                // this.uploadResumeImagesError = false
                // this.uploadResumeFilesSuccess = false
                // this.uploadResumeFilesError = false
                // this.$store.commit('CLEAR_ERROR')

                await this.updateResumeData()
                await this.uploadResumeImages()
                await this.uploadResumeFiles()

                await this.$store.dispatch('resumes/fetchUserResumes')
                this.$store.dispatch('setSnackbar', { show: true, text: 'Resume updated successfully!', color: 'success' })
                this.$router.push('/candidate/resumes')
            } catch (error) {
                console.log('error from updateResume: ', error)
                // this.$notifier.showMessage({ content: 'An error occured and your resume could not be updated.', color: 'error' })
                this.$store.dispatch('setSnackbar', { show: true, text: 'Resume could not be updated.', color: 'error' })
            }
        },
        async updateResumeData() {
            try {
                console.log('updateResumeData')
                this.updateResumeDataProgress = true
                console.log('userResume.uploads: ', this.userResume.uploads)
                // throw new Error('error')
                await this.$store.dispatch('resumes/updateResumeData', this.userResume)
                await delay(3000)
                this.updateResumeDataProgress = false
                this.updateResumeDataSuccess = true
            } catch (error) {
                console.log('error: ', error)
                this.updateResumeDataProgress = false
                this.updateResumeDataError = true

                // Display server-side errors
                Object.keys(error.response.data.error).forEach((item) => {
                    console.log('item: ', item)
                    this.$refs.form.setErrors({
                        [item]: this.$i18n.t(`validation.${error.response.data.error[item]}`),
                    })
                })
                this.checkStepsErrors(error.response.data.error)
                throw error
            }
        },
        async uploadResumeImages() {
            try {
                console.log('uploadResumeImages: ', this.userResume.uploads)
                this.$store.commit('images/CLEAR_UPLOAD_IMAGE_STATUS')
                this.$store.commit('images/SET_UPLOAD_IMAGE_LOADING', true)
                // return
                // this.uploadResumeImagesProgress = true

                const images = this.userResume.uploads.filter((upload) => upload.type === 'image')
                console.log('images: ', images)
                // return
                for (let i = 0; i < images.length; i++) {
                    console.log('images[i]: ', images[i])
                    if (images[i].status === 'to_be_saved_on_disc') {
                        try {
                            console.log('to_be_saved_on_disc')
                            const formData = new FormData()
                            formData.append('file', images[i].file)
                            await this.$store.dispatch('images/uploadImage', { uploadImage: formData })
                            this.$store.commit('images/ADD_UPLOAD_IMAGE_SUCCESS', `Successfully uploaded image "${images[i]['name']}".`)
                        } catch (error) {
                            this.$store.commit('images/ADD_UPLOAD_IMAGE_ERROR', error.response.data.error)
                            console.log('error to_be_saved_on_disc')
                            break
                        }
                    }
                    if (images[i].status === 'to_be_added_to_db') {
                        console.log('to_be_added_to_db')
                        await this.$store.dispatch('resumes/addResumeImage', { resumeId: this.userResume.id, image: images[i] })
                    }
                    if (images[i].status === 'to_be_deleted_from_disc') {
                        try {
                            console.log('to_be_deleted_from_disc')
                            await this.$store.dispatch('images/deleteImage', { imageName: images[i].name })
                        } catch (error) {
                            this.$store.commit('ADD_ERROR', error.response.data.error, { root: true })
                            console.log('error to_be_deleted_from_disc')
                            break
                        }
                    }
                    if (images[i].status === 'to_be_removed_from_db') {
                        console.log('to_be_removed_from_db')
                        await this.$store.dispatch('resumes/removeResumeImage', { resumeId: this.userResume.id, imageName: images[i].name })
                    }                    
                }
                console.log('Now update DB!')
                console.log('userResume.uploads: ', this.userResume.uploads)
                // await this.$store.dispatch('resumes/updateResumeImages', images)
                await delay(2000)
                this.$store.commit('images/SET_UPLOAD_IMAGE_LOADING', false)
                // this.uploadResumeImagesProgress = false
                // this.uploadResumeImagesSuccess = true
            } catch (error) {
                console.log('error from uploadResumeImage: ', error)
                console.log('error.response: ', error.response)
                console.log('error.response.data: ', error.response.data)
                console.log('error.response.data.error: ', error.response.data.error)
                // this.$store.commit('ADD_ERROR', error.response.data.error)
                // this.uploadResumeImagesProgress = false
                // this.uploadResumeImagesError = true

                this.$store.commit('images/SET_UPLOAD_IMAGE_LOADING', false)
                await delay(10000)
            }
        },
        async uploadResumeFiles() {
            try {
                console.log('uploadResumeFile')
                this.$store.commit('files/CLEAR_UPLOAD_FILE_STATUS')
                // this.uploadResumeFilesProgress = true
                this.$store.commit('files/SET_UPLOAD_FILE_LOADING', true)
                const files = this.userResume.uploads.filter((upload) => upload.type === 'file')
                console.log('files: ', files)

                // 1) Group all files with similar name in order to account for potential disk operation failures. In such a case, do not update DB.
                let filesObject = {}
                for (let i = 0; i < files.length; i++) {
                    console.log('files[i]: ', files[i])
                    if (!filesObject[files[i]['name']]) {
                        filesObject[files[i]['name']] = []
                        filesObject[files[i]['name']].push(files[i])
                    } else {
                        filesObject[files[i]['name']].push(files[i])
                    }
                }
                console.log('filesObject: ', filesObject)

                // 2) Upload array of files grouped by name
                for (const fileObject in filesObject) {
                    console.log('fileObject: ', fileObject)
                    console.log('filesObject[fileObject]: ', filesObject[fileObject])
                    const files = filesObject[fileObject]
                    for (let i = 0; i < files.length; i++) {
                        if (files[i].status === 'to_be_saved_on_disc') {
                            try {
                                console.log('to_be_saved_on_disc')
                                const formData = new FormData()
                                formData.append('file', files[i].file)
                                await this.$store.dispatch('files/uploadFile', { uploadFile: formData })
                                this.$store.commit('files/ADD_UPLOAD_FILE_SUCCESS', `Successfully uploaded file "${files[i]['name']}".`)
                            } catch (error) {
                                this.$store.commit('files/ADD_UPLOAD_FILE_ERROR', error.response.data.error)
                                console.log('error to_be_saved_on_disc')
                                break
                            }
                        }
                        if (files[i].status === 'to_be_added_to_db') {
                            console.log('to_be_added_to_db')
                            await this.$store.dispatch('resumes/addResumeFile', { resumeId: this.userResume.id, file: files[i] })
                        }
                        if (files[i].status === 'to_be_deleted_from_disc') {
                            try {
                                console.log('to_be_deleted_from_disc')
                                await this.$store.dispatch('files/deleteFile', { fileName: files[i].name })
                            } catch (error) {
                                this.$store.commit('ADD_ERROR', error.response.data.error, { root: true })
                                console.log('error to_be_deleted_from_disc')
                                break
                            }
                        }
                        if (files[i].status === 'to_be_removed_from_db') {
                            await this.$store.dispatch('resumes/removeResumeFile', { resumeId: this.userResume.id, fileName: files[i].name })
                        }
                    }
                }

                console.log('Now update DB!')
                console.log('userResume.uploads: ', this.userResume.uploads)
                // Update file title
                // await this.$store.dispatch('resumes/updateResumeFiles', { resumeId: this.userResume.id, resumeFiles: files })
                await delay(2000)
                // this.uploadResumeFilesProgress = false
                this.$store.commit('files/SET_UPLOAD_FILE_LOADING', false)
                // this.uploadResumeFilesSuccess = true
            } catch (error) {
                console.log('error: ', error)
                // this.uploadResumeFilesProgress = false
                this.$store.commit('files/SET_UPLOAD_FILE_LOADING', false)
                // this.uploadResumeFilesError = true
                // this.$store.commit('ADD_ERROR', error.response.data.error)
                await delay(10000)
                // alert('Error uploading file')
            }
        },
        // async uploadResumeFiles2() {
        //     try {
        //         console.log('uploadResumeFiles: ', this.userResume.uploads)
        //         // return
        //         this.uploadResumeFilesProgress = true
        //         // await delay(3000)
        //         // throw new Error('error')

        //         // console.log(
        //         //     'filter: ',
        //         //     this.userResume.uploads.filter((file) => file.new === true)
        //         // )
        //         const formData = new FormData()
        //         let array = []
        //         for (const i of Object.keys(this.userResume.uploads)) {
        //             formData.append('files', this.userResume.uploads[i]['file'])
        //             array.push({
        //                 title: this.userResume.uploads[i]['title'],
        //                 name: this.userResume.uploads[i]['name'],
        //                 category: this.userResume.uploads[i]['category'],
        //                 mime_type: this.userResume.uploads[i]['type'],
        //                 status: this.userResume.uploads[i]['status'],
        //             })
        //         }
        //         formData.append('array', JSON.stringify(array))
        //         console.log('formData: ', formData)
        //         console.log('userResume.id: ', this.userResume.id)
        //         const abc = await this.$store.dispatch('resumes/uploadResumeFiles', { resumeId: this.userResume.id, uploads: formData })
        //         console.log('abc: ', abc)
        //         await delay(2000)
        //         this.uploadResumeFilesProgress = false
        //         this.uploadResumeFilesSuccess = true
        //     } catch (error) {
        //         console.log('error: ', error)
        //         this.uploadResumeFilesProgress = false
        //         this.uploadResumeFilesError = true
        //         // console.log('error.response.data: ', error.response.data)

        //         // Display serverside errors
        //         Object.keys(error.response.data.error).forEach((item) => {
        //             console.log('item: ', item)
        //             this.$refs.form.setErrors({
        //                 [item]: this.$i18n.t(`validation.${error.response.data.error[item]}`),
        //             })
        //         })
        //         this.checkStepsErrors(error.response.data.error)
        //         throw error
        //     }
        // },
        validateResume() {
            this.$validator.validateAll()
        },
    },
    watch: {
        steps(val) {
            if (this.e1 > val) {
                this.e1 = val
            }
        },
    },
}
</script>

<style scoped>
/* .active {
    border: 2px solid #ffc107;
} */
</style>
