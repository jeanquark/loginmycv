<template>
    <v-container>
        <v-row no-gutters>
            <v-col cols="12" class="mb-3">
                <h2 class="text-center">Create a new resume</h2>
            </v-col>

            <!-- loading: {{ loading }}<br /> -->
            <!-- step: {{ step }}<br /> -->
            <!-- errors from store: {{ errors }}<br /> -->
            <!-- errorsStepTemplate: {{ errorsStepTemplate }}<br /> -->
            <!-- errorsStepPersonalData: {{ errorsStepPersonalData }}<br /> -->
            <!-- errorsStepEducation: {{ errorsStepEducation }}<br /> -->
            <!-- validationProcess: {{ validationProcess }}<br /> -->
            <!-- userResumes: {{ userResumes }}<br /><br /> -->
            userResume: {{ userResume }}<br /><br />
            <!-- userResume.uploads: {{ userResume?.uploads }}<br /><br /> -->
            <!-- newResume: {{ newResume }}<br /><br /> -->
            <!-- resumesModels: {{ resumesModels }}<br /><br /> -->
            <!-- this.$validator: {{ this.$validator }}<br /><br /> -->
            <!-- newResume.uploads: {{ newResume.uploads }}<br /><br /> -->
            <!-- newResume.personal_data.picture: {{ newResume.personal_data.picture ? newResume.personal_data.picture.size : null }}<br /><br /> -->
            <!-- authUser: {{ authUser }}<br /><br /> -->
            <!-- loadingCreateResume: {{ loadingCreateResume }}<br /><br /> -->
            <!-- loadingUploadFiles: {{ loadingUploadFiles }}<br /><br /> -->
            <!-- stepEducationErrorsArray: {{ stepEducationErrorsArray }}<br /><br /> -->
            <!-- stepPersonalDataErrors: {{ stepPersonalDataErrors }}<br /><br /> -->
            <!-- acceptConditions: {{ acceptConditions }}<br /><br /> -->
            <!-- <h2>{{ $t('hello', { msg: 'Le monde' }) }}</h2> -->
            <!-- <h3>{{ $t('validation.max', { _field_: 'slug', length: 2 }) }}</h3> -->
            <!-- <h3>{{ $t('validation.max.string', { attribute: 'slug', value: 3 }) }}</h3> -->
            <!-- baseUrl: {{ baseUrl }}<br /><br /> -->
            <!-- <a target="_blank" href="https://loginmycv.com/terms-conditions">Terms & Conditions</a> -->
            <!-- userResumes.length: {{ userResumes.length }}<br /><br /> -->
            <!-- importedResume: {{ importedResume }}<br /><br /> -->
        </v-row>

        <v-row no-gutters justify="center" align="center" v-if="userResumes.length > 0">
            <v-col cols="8" class="pr-3 text-right"></v-col>
            <v-col cols="3" class="pr-3">
                <v-select label="Select a resume to import" :items="userResumes" item-text="slug" :return-object="true" :single-line="false" color="secondary" v-model="importedResume"> </v-select>
            </v-col>
            <v-col cols="1">
                <v-btn color="primary" @click="importDataFromResume">Import</v-btn>
            </v-col>
        </v-row>

        <v-row no-gutters>
            <v-col cols="12">
                <ValidationObserver ref="form" v-slot="{ errors }">
                    <!-- errors from vee-validate: {{ errors }} -->
                    <!-- <form @submit.prevent="handleSubmit(onSubmit)"> -->
                    <v-form @submit.prevent="openCreatingResumeDialog" v-if="rules">
                        <v-stepper v-model="step">
                            <v-stepper-header>
                                <!-- <v-stepper-step :step="1" editable v-if="Object.keys(errorsTemplate).length < 1">Choose Template</v-stepper-step> -->
                                <v-stepper-step :step="1" editable v-if="!errorsStepTemplate">Choose Template</v-stepper-step>
                                <v-stepper-step :step="1" editable :rules="[() => false]" v-else>Choose Template</v-stepper-step>
                                <!-- <v-stepper-step :step="1" editable :rules="[() => true]">Choose Template</v-stepper-step> -->

                                <v-divider></v-divider>

                                <v-stepper-step :step="2" editable v-if="!errorsStepPersonalData">General & Personal Data</v-stepper-step>
                                <v-stepper-step :step="2" editable :rules="[() => false]" v-else>General & Personal Data</v-stepper-step>

                                <v-divider></v-divider>

                                <v-stepper-step :step="3" editable v-if="!errorsStepEducation">Education</v-stepper-step>
                                <v-stepper-step :step="3" editable :rules="[() => false]" v-else>Education</v-stepper-step>

                                <v-divider></v-divider>

                                <v-stepper-step :step="4" editable v-if="!errorsStepWorkExperience">Work experience</v-stepper-step>
                                <v-stepper-step :step="4" editable :rules="[() => false]" v-else>Work experience</v-stepper-step>

                                <v-divider></v-divider>

                                <v-stepper-step :step="5" editable v-if="!errorsStepSkills">Skills</v-stepper-step>
                                <v-stepper-step :step="5" editable :rules="[() => false]" v-else>Skills</v-stepper-step>

                                <v-divider></v-divider>

                                <v-stepper-step :step="6" editable v-if="!errorsStepFilesUpload">File uploads</v-stepper-step>
                                <v-stepper-step :step="6" editable :rules="[() => false]" v-else>File uploads</v-stepper-step>
                            </v-stepper-header>

                            <v-stepper-items>
                                <v-stepper-content :step="1" style="">
                                    <v-card flat class="mb-8">
                                        <!-- <template-component :errorsTemplate="errorsTemplate" /> -->
                                        <!-- <template-component :errorsTemplate="errorsTemplate" :rules="rules" /> -->
                                        <template-component :rules="rules" />
                                    </v-card>
                                </v-stepper-content>

                                <v-stepper-content :step="2">
                                    <v-card class="mb-8">
                                        <!-- <personal-data-component :errors="[]" :rules="rules" /> -->
                                        <personal-data-component :errors="errors" :rules="rules" />
                                    </v-card>
                                </v-stepper-content>

                                <v-stepper-content :step="3">
                                    <v-card class="mb-8">
                                        <!-- <education-component :errors="[]" :rules="rules" /> -->
                                        <education-component :errors="errors" :rules="rules" />
                                    </v-card>
                                </v-stepper-content>

                                <v-stepper-content :step="4">
                                    <v-card class="mb-8">
                                        <!-- <work-experience-component :workExperienceErrors="stepWorkExperienceErrorsArray" /> -->
                                        <!-- <work-experience-component :errorsWorkExperience="errorsWorkExperience" v-if="step === 4 || errorsWorkExperience" /> -->
                                        <work-experience-component :errors="errors" :rules="rules" />
                                    </v-card>
                                </v-stepper-content>

                                <v-stepper-content :step="5">
                                    <v-card class="mb-8">
                                        <!-- <skills-component :errors="[]" :rules="rules" /> -->
                                        <skills-component :errors="errors" :rules="rules" />
                                    </v-card>
                                </v-stepper-content>

                                <v-stepper-content :step="6">
                                    <v-card class="mb-8">
                                        <!-- <file-uploads-component :errors="[]" :rules="rules" :step="step" /> -->
                                        <file-uploads-component :errors="errors" :rules="rules" :step="step" />
                                    </v-card>
                                </v-stepper-content>
                            </v-stepper-items>

                            <v-card-actions class="justify-center">
                                <v-btn color="primary" @click.stop="moveOneStepBackward"> <v-icon>mdi-arrow-left</v-icon> Previous </v-btn>
                                <v-btn color="primary" @click.stop="moveOneStepForward"> Next <v-icon>mdi-arrow-right</v-icon> </v-btn>
                            </v-card-actions>
                            <v-row no-gutters justify="center" class="mb-2">
                                <!-- <v-btn class="success" :loading="loadingCreateResume || loadingUploadFiles" @click.stop="creatingResumeDialog = true">Save</v-btn> -->
                                <v-btn class="success" type="submit">Create</v-btn>
                                <!-- <v-btn class="success" @click.stop="saveResume">Save</v-btn> -->
                            </v-row>
                        </v-stepper>
                    </v-form>
                </ValidationObserver>
            </v-col>
        </v-row>

        <!-- Modal to create resume -->
        <v-dialog v-model="creatingResumeDialog" width="500" persistent>
            <v-card light>
                <v-toolbar dark color="primary">
                    <v-toolbar-title>Create a new resume</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-icon @click.stop="creatingResumeDialog = false">mdi-close</v-icon>
                </v-toolbar>
                <!-- <v-card-title class="headline primary white--text justify-center" primary-title>
                    Create resume
                </v-card-title> -->

                <v-card-text>
                    <v-row no-gutters justify="center" align="center">
                        <v-col cols="2" sm="3" class="text-center">
                            <v-avatar size="46" color="grey lighten-4" class="mr-3">
                                <img src="/images/ivan-min.jpg" alt="avatar" />
                            </v-avatar>
                        </v-col>

                        <v-col cols="10" sm="9">
                            <p class="px-2 my-0">Your new online resume is about to be created.</p>
                            <ul>
                                <li v-if="!newResume.education">
                                    Oh no, you do not have any education&#128528;<br />
                                    That's OK, you can add new entries later on &#128077;
                                </li>
                                <li v-if="!newResume.work_experience">Oh no, you do not have any work experience&#128528;<br />That's OK, you can add new entries later on &#128077;</li>
                            </ul>
                        </v-col>
                    </v-row>

                    <v-row no-gutters justify="center">
                        <v-checkbox v-model="acceptConditions">
                            <template v-slot:label>
                                <div>
                                    I agree with the
                                    <!-- <a target="_blank" href="https://loginmycv.com/terms-conditions">abc</a> -->
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on }">
                                            <a target="_blank" href="/terms-conditions" @click.stop v-on="on">
                                                <!-- <a target="_blank" :href="`${baseUrl}/terms-conditions`" @click.stop v-on="on"> -->
                                                Terms & Conditions
                                            </a> </template
                                        >Opens in new window
                                    </v-tooltip>
                                </div>
                            </template>
                        </v-checkbox>
                    </v-row>

                    createResumeDataSuccess: {{ createResumeDataSuccess }}<br />
                    createResumeDataError: {{ createResumeDataError }}<br />
                    <!-- <v-row no-gutters justify="center">
                        <v-alert :value="loadingUploadFiles" color="secondary" outlined>
                            <div class="text-center"><v-progress-linear indeterminate height="5" color="secondary"></v-progress-linear> Uploading files...</div>
                        </v-alert>
                    </v-row>
                    <v-row no-gutters justify="center">
                        <v-alert :value="loadingCreateResume" color="primary" outlined>
                            <div class="text-center"><v-progress-linear indeterminate height="20" color="primary"></v-progress-linear> Saving resume...</div>
                        </v-alert>
                    </v-row> -->

                    <!-- <div class="text-center my-3 pt-2" v-if="createResumeDataProgress"><v-progress-linear indeterminate height="15" color="primary"></v-progress-linear><p>Creating resume...</p></div>
                    <v-alert type="error" color="error" prominent text class="my-3" v-if="createResumeDataError"
                        >An error occured while creating your resume data. Please check validation messages.</v-alert
                    >
                    <v-alert type="success" prominent text class="my-3" v-if="createResumeDataSuccess">Creating resume data was successful.</v-alert>

                    <div class="text-center my-3 pt-2" v-if="uploadResumeImagesProgress">
                        <v-progress-linear indeterminate height="15" color="secondary"></v-progress-linear><p>Uploading images...</p>
                    </div>
                    <v-alert color="error" type="error" prominent text class="my-3" v-if="uploadResumeImagesError">An error occured while uploading images.</v-alert>
                    <v-alert type="success" prominent text class="my-3" v-if="uploadResumeImagesSuccess">Uploading images was successful.</v-alert>

                    <div class="text-center my-3 pt-2" v-if="uploadResumeFilesProgress">
                        <v-progress-linear indeterminate height="15" color="tertiary"></v-progress-linear><p>Uploading files...</p>
                    </div>
                    <v-alert color="error" type="error" prominent text class="my-3" v-if="uploadResumeFilesError">An error occured while uploading files.</v-alert>
                    <v-alert type="success" prominent text class="my-3" v-if="uploadResumeFilesSuccess">Uploading files was successful.</v-alert> -->

                    <div class="text-center my-3 pt-2" v-if="createResumeDataProgress">
                        <v-progress-linear indeterminate height="15" color="primary"></v-progress-linear>
                        <p class="mt-2">Creating resume...</p>
                    </div>
                    <v-alert type="error" color="error" prominent text class="my-3" v-if="createResumeDataError"
                        >An error occured while creating your resume data. Please check validation messages.</v-alert
                    >
                    <v-alert type="success" prominent text class="my-3" v-if="createResumeDataSuccess">Creating resume data was successful.</v-alert>

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

                    <v-row no-gutters justify="center" class="">
                        <v-btn
                            color="primary"
                            @click.stop="createResume"
                            :disabled="!acceptConditions || createResumeDataError || uploadResumeImageErrors.length > 0 || uploadResumeFileErrors.length > 0"
                            :loading="loadingCreateResume || loadingUploadFiles"
                            >Create</v-btn
                        >
                        <!-- <v-btn text color="secondary" @click.stop="creatingResumeDialog = false">Close</v-btn> -->
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import TemplateComponent from '~/components/resume/TemplateComponent'
// import personalDataComponent from '~/components/resume/PersonalDataComponent'
// import educationComponent from '~/components/resume/EducationComponent'
// import workExperienceComponent from '~/components/resume/WorkExperienceComponent'
// import skillsComponent from '~/components/resume/SkillsComponent'
// import fileUploadsComponent from '~/components/resume/FileUploadsComponent'
// import axios from 'axios'
// import Noty from 'noty'
// import moment from 'moment'
// import { ValidationObserver, ValidationProvider } from 'vee-validate'
import validationRulesClient from '@/api/utils/validationRulesClient'
const delay = (ms) => new Promise((res) => setTimeout(res, ms))

export default {
    // $_veeValidate: {
    // 	validator: 'new' // Give me my own validator scope.
    // },
    name: 'CandidateCreateResume',
    components: {
        TemplateComponent,
        PersonalDataComponent: () => import('~/components/resume/PersonalDataComponent'),
        EducationComponent: () => import('~/components/resume/EducationComponent'),
        WorkExperienceComponent: () => import('~/components/resume/WorkExperienceComponent'),
        SkillsComponent: () => import('~/components/resume/SkillsComponent'),
        FileUploadsComponent: () => import('~/components/resume/FileUploadsComponent'),
        // ValidationObserver,
        // ValidationProvider
    },
    layout: 'layoutCandidate',
    async created() {
        try {
            this.$store.commit('SET_LOADING', true, { root: true })

            if (!this.resumesModels || this.resumesModels.length < 1) {
                await this.$store.dispatch('resumesModels/fetchResumesModels')
            }

            if (!this.userResumes || this.userResumes.length < 1) {
                await this.$store.dispatch('resumes/fetchUserResumes')
            }

            if (this.$store.getters['templates/templates'].length < 1) {
                await this.$store.dispatch('templates/fetchTemplates')
            }

            // this.$store.commit('clearError')
            // await this.$store.commit('resumes/SET_NEW_RESUME')
            const newResume = { ...this.resumesModels.find(model => model.slug === ''), user: this.authUser, status: 'new' }
            await this.$store.commit('resumes/ADD_USER_RESUME', newResume)

            this.rules = validationRulesClient
            this.$store.commit('SET_LOADING', false, { root: true })
            this.$store.commit('SET_LOADING_UPLOAD_FILES', false, { root: true })
            this.$store.commit('SET_LOADING_CREATE_RESUME', false, { root: true })
        } catch (error) {
            console.log('error: ', error)
        }
    },
    mounted() {
        // this.errors.clear()
        // this.$store.commit('setLoadingFiles', false, { root: true })
        // this.$store.commit('setLoadingResume', false, { root: true })
        // console.log(this.$i18n.locale)
        // console.log(process.env.baseUrl)
    },
    data() {
        return {
            step: 1,
            rules: null,
            acceptConditions: false,
            newResume: {},
            importedResume: {},
            creatingResumeDialog: false,
            createResumeDataProgress: false,
            createResumeDataError: false,
            createResumeDataSuccess: false,
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
            baseUrl: process.env.baseUrl,
        }
    },
    computed: {
        loading() {
            return this.$store.getters['loading']
        },
        errors() {
            return this.$store.getters['errors']
        },
        authUser() {
            return this.$store.getters['auth/authUser']
        },
        loadingCreateResume() {
            return this.$store.getters['loadingCreateResume']
        },
        loadingUploadFiles() {
            return this.$store.getters['loadingUploadFiles']
        },
        userResumes() {
            return this.$store.getters['resumes/userResumes']
        },
        userResume() {
            // return this.$store.getters['resumes/newResume']
            // return this.$store.getters['resumesModels/resumesModels'][0]
            return this.$store.getters['resumes/userResumes'].find(resume => resume.status === 'new')
        },
        resumesModels () {
            return this.$store.getters['resumesModels/resumesModels']
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
            if (this.step < 6) {
                this.step += 1
            } else {
                this.step = 1
            }
        },
        moveOneStepBackward() {
            if (this.step != 1) {
                this.step -= 1
            } else {
                this.step = 6
            }
        },
        importDataFromResume() {
            try {
                console.log('importDataFromResume: ', this.importedResume)
                const resume = JSON.parse(JSON.stringify(this.importedResume))
                this.$store.commit('resumes/SET_NEW_RESUME', resume)
                // this.userResume = this.importResume
                this.$store.dispatch('setSnackbar', { show: true, text: 'Import was successful!', color: 'success' })
            } catch (error) {
                console.log('error: ', error)
                this.$store.dispatch('setSnackbar', { show: true, text: 'Please select a resume.', color: 'error' })
            }
        },
        onInput(val) {
            this.steps = parseInt(val)
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
        async openCreatingResumeDialog() {
            try {
                // this.createResumeDataSuccess = false
                // this.createResumeDataError = false
                // this.uploadResumeFilesSuccess = false
                // this.uploadResumeFilesError = false
                // const valid = await this.$refs.form.validate()
                // // const valid = true
                // console.log('valid: ', valid)
                // if (valid) {
                //     this.creatingResumeDialog = true
                // } else {
                //     this.checkStepsErrors(this.$refs.form.errors)
                //     // this.$notifier.showMessage({ content: 'Please check validation errors', color: 'error' })
                //     this.$store.dispatch('setSnackbar', { show: true, text: 'Please check validation errors.', color: 'error' })
                // }

                const valid = await this.$refs.form.validate()
                console.log('valid: ', valid)
                if (valid) {
                    this.creatingResumeDialog = true
                    // this.createResume()
                } else {
                    this.checkStepsErrors(this.$refs.form.errors)
                    // this.$notifier.showMessage({ content: 'Please check validation errors', color: 'errors' })
                    this.$store.dispatch('setSnackbar', { show: true, text: 'Please check validation errors.', color: 'error' })
                }
            } catch (error) {
                console.log('error: ', error)
            }
        },
        async createResume() {
            try {
                console.log('createResume')
                this.createResumeDataSuccess = false
                this.createResumeDataError = false
                // this.uploadResumeImagesSuccess = false
                // this.uploadResumeImagesError = false
                // this.uploadResumeFilesSuccess = false
                // this.uploadResumeFilesError = false
                // await this.createResumeData()
                await this.uploadResumeImages()
                // await this.uploadResumeFiles()
                // await delay(2000)
                await this.$store.dispatch('resumes/fetchUserResumes')
                this.$store.dispatch('setSnackbar', { show: true, text: 'Resume created successfully!', color: 'success'})
                this.$router.push('/candidate/resumes')
                // await this.$store.dispatch('resumes/fetchUserResumes')
                // this.$store.dispatch('setSnackbar', { show: true, text: 'Resume updated successfully!', color: 'success'})
                // this.$router.push('/candidate/resumes')
            } catch (error) {
                console.log('error from createResume: ', error)
                // alert('error from createResume')
                this.$store.dispatch('setSnackbar', { show: true, text: 'Please check validation errors.', color: 'error', top: true, right: true })
            }
        },
        async createResumeData() {
            try {
                console.log('createResumeData')
                this.createResumeDataProgress = true
                console.log('userResume: ', this.userResume)
                // throw new Error('error')
                await this.$store.dispatch('resumes/createResumeData', this.userResume)
                await delay(3000)
                this.createResumeDataProgress = false
                this.createResumeDataSuccess = true
            } catch (error) {
                console.log('error from createResumeData: ', error)
                this.createResumeDataProgress = false
                this.createResumeDataError = true

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
                // this.uploadResumeImagesProgress = true
                this.$store.commit('images/CLEAR_UPLOAD_IMAGE_STATUS')
                this.$store.commit('images/SET_UPLOAD_IMAGE_LOADING', true)

                const images = this.userResume.uploads.filter((upload) => upload.type === 'image')
                console.log('images: ', images)
                // return
                for (let i = 0; i < images.length; i++) {
                    console.log('images[i]: ', images[i])
                    if (images[i].status === 'to_be_saved_on_disc') {
                        // console.log('UPLOAD IMAGE: ', images[i])
                        const formData = new FormData()
                        formData.append('file', images[i].file)
                        await this.$store.dispatch('images/uploadImage', { uploadImage: formData })
                    }
                    if (images[i].status === 'to_be_added_to_db') {
                        await this.$store.dispatch('resumes/addResumeImage', { resumeId: this.userResume.id, image: images[i] })
                    }
                    if (images[i].status === 'to_be_removed_from_db') {
                        // console.log('DELETE IMAGE: ', images[i])
                        await this.$store.dispatch('resumes/removeResumeImage', { resumeId: this.userResume.id, imageName: images[i].name })
                    }
                    if (images[i].status === 'to_be_deleted_from_disc') {
                        await this.$store.dispatch('images/deleteImage', { resumeId: this.userResume.id, imageName: images[i].name })
                    }
                }
                console.log('Now update DB!')
                console.log('userResume.uploads: ', this.userResume.uploads)
                // await this.$store.dispatch('resumes/updateResumeImages', images)
                // Update image title
                // await this.$store.dispatch('resumes/updateResumeImages', { resumeId: this.userResume.id, resumeImages: images })
                await delay(2000)
                this.$store.commit('images/SET_UPLOAD_IMAGE_LOADING', false)
                // this.uploadResumeImagesProgress = false
                // this.uploadResumeImagesSuccess = true
            } catch (error) {
                console.log('error: ', error)
                this.$store.commit('images/SET_UPLOAD_IMAGE_LOADING', false)
                // this.uploadResumeImagesProgress = false
                // this.uploadResumeImagesError = true
            }
        },
        async uploadResumeFiles() {
            try {
                console.log('uploadResumeFile: ', this.userResume.uploads)
                // this.uploadResumeFilesProgress = true
                this.$store.commit('files/CLEAR_UPLOAD_FILE_STATUS')
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
                // this.uploadResumeFilesError = true
                this.$store.commit('files/SET_UPLOAD_FILE_LOADING', false)
                // alert('Error uploading file')
                await delay(10000)
            }
        },
        async uploadResumeFiles2() {
            try {
                console.log('uploadResumeFiles: ', this.userResume.uploads)
                this.uploadResumeFilesProgress = true
                const formData = new FormData()
                let array = []
                for (const i of Object.keys(this.userResume.uploads)) {
                    formData.append('files', this.userResume.uploads[i]['file'])
                    array.push({
                        title: this.userResume.uploads[i]['title'],
                        name: this.userResume.uploads[i]['name'],
                        category: this.userResume.uploads[i]['category'],
                        mime_type: this.userResume.uploads[i]['type'],
                        status: this.userResume.uploads[i]['status'],
                    })
                }
                formData.append('array', JSON.stringify(array))
                console.log('formData: ', formData)

                const abc = await this.$store.dispatch('resumes/uploadResumeFiles', { resumeId: this.userResume.id, uploads: formData })
                console.log('abc: ', abc)
                await delay(2000)
                this.uploadResumeFilesProgress = false
                this.uploadResumeFilesSuccess = true
            } catch (error) {
                console.log('error from uploadResumeFiles: ', error)
                this.uploadResumeFilesProgress = false
                this.uploadResumeFilesError = true
                // console.log('error.response.data: ', error.response.data)

                // Display serverside errors
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
        // async saveResume2() {
        //     try {
        //         console.log('saveResume')
        //         this.filteredErrors(this.errors, 'Education')
        //         return

        //         this.newResume['user_id'] = this.authUser.id
        //         // this.creatingResumeDialog = true

        //         // this.$validator.validateAll().then(result => {
        //         // 	console.log('result: ', result)
        //         // })
        //         this.loadAllComponents = true
        //         // validator.validate();
        //         // await this.$validator.validateAll()
        //         // await this.$validator.validateAll()
        //         console.log('validateAll done!')
        //         console.log('this.errors: ', this.errors)
        //         // return

        //         if (this.errors && this.errors.items && this.errors.items.length > 0) {
        //             // Display errors in red in components
        //             // console.log('Validation error!')

        //             const templateErrors = this.errors.items.filter(item => item.field.includes('menu') || item.field.includes('field'))
        //             if (templateErrors.length > 0) {
        //                 this.stepTemplateErrors = true
        //             }

        //             const inputs = ['slug', 'job_title', 'job_description', 'firstname', 'lastname', 'email', 'visibiliy', 'password']
        //             if (this.errors.items.some(e => inputs.includes(e.field))) {
        //                 // console.log('Personal data errors')
        //                 this.stepPersonalDataErrors = true
        //             }

        //             const educationErrors = this.errors.items.filter(item => item.field.includes('education'))
        //             if (educationErrors.length > 0) {
        //                 this.stepEducationErrorsArray = new Array(this.newResume.education.length)
        //                 educationErrors.forEach(error => {
        //                     const number = error.field.match(/\d+/g)
        //                     if (number && number.length > 0) {
        //                         // console.log(parseInt(number[0]))
        //                         this.stepEducationErrorsArray.splice(parseInt(number[0]), 1, true)
        //                     }
        //                 })
        //             }

        //             const workExperienceErrors = this.errors.items.filter(item => item.field.includes('work_experience'))
        //             if (workExperienceErrors.length > 0) {
        //                 this.stepWorkExperienceErrorsArray = new Array(this.newResume.work_experience.length)
        //                 workExperienceErrors.forEach(error => {
        //                     const number = error.field.match(/\d+/g)
        //                     if (number && number.length > 0) {
        //                         // console.log(parseInt(number[0]))
        //                         this.stepWorkExperienceErrorsArray.splice(parseInt(number[0]), 1, true)
        //                     }
        //                 })
        //             }

        //             const skillErrors = this.errors.items.filter(item => item.field.includes('skill'))
        //             if (skillErrors.length > 0) {
        //                 this.stepSkillErrorsArray = new Array(this.newResume.skills.length)
        //                 skillErrors.forEach(error => {
        //                     const number = error.field.match(/\d+/g)
        //                     if (number && number.length > 0) {
        //                         // console.log(parseInt(number[0]))
        //                         this.stepSkillErrorsArray.splice(parseInt(number[0]), 1, true)
        //                     }
        //                 })
        //             }

        //             const fileUploadErrors = this.errors.items.filter(item => item.field.includes('file_title'))
        //             if (fileUploadErrors.length > 0) {
        //                 this.stepFileUploadErrorsArray = new Array(this.newResume.uploads.length)
        //                 fileUploadErrors.forEach(error => {
        //                     const number = error.field.match(/\d+/g)
        //                     if (number && number.length > 0) {
        //                         // console.log(parseInt(number[0]))
        //                         this.stepFileUploadErrorsArray.splice(parseInt(number[0]), 1, true)
        //                     }
        //                 })
        //             }

        //             this.creatingResumeDialog = false
        //             new Noty({
        //                 type: 'error',
        //                 text: 'Please check validation errors.',
        //                 timeout: 5000,
        //                 theme: 'metroui'
        //             }).show()
        //         } else {
        //             // console.log('OK, done!')
        //             // return
        //             this.$store.commit('setLoadingResume', true, { root: true })
        //             await this.$store.dispatch('resumes/storeResume', this.newResume)
        //             this.$store.commit('setLoadingFiles', false, { root: true })
        //             this.$store.commit('setLoading', false, { root: true })
        //             this.creatingResumeDialog = false
        //             new Noty({
        //                 type: 'success',
        //                 text: 'Your resume was successfully created &#128515;',
        //                 timeout: 5000,
        //                 theme: 'metroui'
        //             }).show()
        //             this.$router.push('/candidate/resumes')
        //         }
        //     } catch (error) {
        //         this.creatingResumeDialog = false
        //         this.$store.commit('setLoadingFiles', false, { root: true })
        //         this.$store.commit('setLoadingResume', false, { root: true })
        //         this.$store.commit('setLoading', false, { root: true })

        //         new Noty({
        //             type: 'error',
        //             text: 'Sorry, an error occured and your resume could not be created.',
        //             timeout: 5000,
        //             theme: 'metroui'
        //         }).show()
        //         Object.entries(error).forEach(([key, value]) => {
        //             if (key === 'server_error' || key === 'slug' || key === 'not_enough_space') {
        //                 // console.log('key: ', key)
        //                 // console.log('value: ', value)
        //                 const field = key.substr(key.indexOf('.') + 1)

        //                 this.$validator.errors.add({
        //                     field: field,
        //                     msg: value
        //                 })

        //                 if (key === 'slug') {
        //                     this.stepPersonalDataErrors = true
        //                 }
        //                 if (key === 'not_enough_space') {
        //                     this.stepFileUploadErrorsArray.push(true)
        //                 }

        //                 new Noty({
        //                     type: 'warning',
        //                     text: value,
        //                     timeout: 8000,
        //                     theme: 'metroui'
        //                 }).show()
        //             } else {
        //                 console.log('error: ', error)
        //                 // if (process.env.NODE_ENV === 'production') {
        //                 this.$sentry.captureException(new Error(error))
        //                 // }
        //             }
        //         })
        //     }
        // }
    },
}
</script>

<style scoped>
.active {
    border: 2px solid var(--v-secondary-base);
}
.theme--dark.v-stepper .v-stepper__step--active .v-stepper__label {
    text-shadow: none;
}
.error2 {
    color: var(--v-error-base);
    text-shadow: none;
}
::v-deep .v-toolbar {
    margin-bottom: 1em;
}
::v-deep .v-toolbar__content {
    background: url('/images/svg/toolbar-background.svg') no-repeat;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
}
::v-deep .v-toolbar__title {
    font-weight: bold;
}
</style>
