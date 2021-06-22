<template>
    <v-container>
        <v-row no-gutters>
            <v-col>
                <!-- <b>authUser:</b> {{ authUser }}<br /><br /> -->
                <!-- <b>authUser.package:</b> {{ authUser.package }}<br /><br /> -->
                <!-- <v-icon v-text="authorizations"></v-icon><br /><br /> -->
                <!-- <v-icon>mdi-authorizations</v-icon><br /><br /> -->
                <!-- <v-icon>$vuetify.icons.product</v-icon><br /><br /> -->
                <!-- <v-icon>$switch</v-icon><br /><br /> -->
                <!-- <v-icon v-text="$vuetify.icons.values.ionic"></v-icon><br /><br /> -->
                <!-- <v-icon>$vuetify.icons.iconic</v-icon><br /><br /> -->
                <!-- <v-icon>$ionic</v-icon><br /><br /> -->
                <!-- <v-icon>$authorizations</v-icon><br /><br /> -->
                <!-- <v-icon>$logo</v-icon><br /><br /> -->
                <!-- <b>userResumes:</b> {{ userResumes }}<br /><br /> -->
                <!-- userResumesUploads: {{ userResumesUploads }}<br /><br /> -->
                <!-- getStatistics: {{ getStatistics }}<br /><br /> -->
                <!-- dark: {{ dark }}<br /><br /> -->
                <!-- new Date("2019-01-01"): {{ new Date("2019-01-01") }}<br /><br />
			minDate: {{ minDate }}<br /><br />
     		minDate2: {{ minDate2 }}<br /><br />-->
                <!-- loadedDarkTheme: {{ loadedDarkTheme }}<br /><br /> -->
                <!-- chartOptions2.backgroundColor: {{ chartOptions2.backgroundColor }}<br /><br /> -->
                <!-- loadingArray: {{ loadingArray }}<br /><br /> -->
                <!-- errors: {{ errors }}<br /><br /> -->
                <!-- resumesNames: {{ resumesNames }}<br /><br /> -->
                <!-- newResumeNameMap: {{ newResumeNameMap }}<br /><br /> -->
                <!-- <div id="myDiv">
                <h1>abc</h1>
				<p>def</p>
            </div> -->
                <!-- userResume.statstics: {{ userResume.statistics }}<br /><br /> -->
            </v-col>

            <v-col cols="12">
                <h2 class="text-center my-3">My resumes</h2>
            </v-col>
        </v-row>

        <v-row no-gutters justify="start" class="" style="">
            <v-col cols="4" class="pa-2" v-for="resume of userResumes" :key="resume.id">
                <v-hover>
                    <v-card text class="card my-4" :class="[`elevation-${hover ? 12 : 2}`]" slot-scope="{ hover }">
                        <v-row no-gutters>
                            <v-col cols="12" style="white-space: nowrap">
                                <div class="country-flag" v-if="resume.personal_data && resume.personal_data.country">
                                    <v-img :src="`/images/countries/${resume.personal_data.country.flag}`" width="20" class="mb-1"></v-img>
                                </div>
                                <div class="language-flag">
                                    <v-img :src="`/images/languages/${language.slug}.png`" width="20" class="mb-1" v-for="(language, index) in resume.languages" :key="index"></v-img>
                                </div>
                                <v-avatar :size="78" class="mb-2" v-if="resume.picture">
                                    <img :src="`${resume.picture}`" alt="Candidate picture" />
                                </v-avatar>
                                <v-row justify="center" v-else>
                                    <avatar justify-center :username="`${resume.firstname} ${resume.lastname}`" :size="78" class="text-center mb-2"></avatar>
                                </v-row>
                            </v-col>
                        </v-row>
                        <v-row justify="space-around" align="center" class="fill-height">
                            <div class="text-truncate">
                                <v-card-text class="" style="max-width: 380px">
                                    <h3 class="headline mb-0 text-center text-truncate">{{ resume.job_title }}</h3>
                                    <div class="pt-1 px-2 text-center">{{ resume.job_description }}</div>
                                    <div class="text-center my-2">
                                        <p class="text-truncate">{{ resume.slug }}</p>
                                    </div>
                                    <div class="text-center my-2">
                                        <v-chip :color="chipColor(resume.visibility)" class="">{{ resume.visibility }}</v-chip>
                                    </div>
                                    <div class="text-center my-2">
                                        Last updated 
                                        {{ resume.updated_at | moment('from', 'now') }}
                                    </div>
                                    
                                    <br />
                                    Created: {{ resume.created_at }}<br />
                                    Last update: {{ resume.updated_at }}<br />
                                    <v-row no-gutters justify="center" align="center" class="fill-height">
                                        <v-btn text icon target="_blank" :href="`/resume/${resume.slug}`">
                                            <v-icon small color="secondary">mdi-open-in-new</v-icon>
                                        </v-btn>
                                        <v-btn text icon nuxt :to="`/candidate/resumes/${resume.slug}`">
                                            <v-icon small color="success">mdi-pencil</v-icon>
                                        </v-btn>
                                        <v-btn text icon @click="deleteResumeConfirmation(resume)">
                                            <v-icon small color="error">mdi-delete</v-icon>
                                        </v-btn>
                                    </v-row>
                                </v-card-text>
                            </div>
                        </v-row>
                    </v-card>
                </v-hover>
            </v-col>
            <v-col cols="4" class="pa-2 d-flex justify-center align-center" style="min-height: 200px">
                <NuxtLink to="/candidate/resumes/create" class="" style="">
                    <font-awesome-icon :icon="['fas', 'plus']" size="4x" class="icon" style="" />
                </NuxtLink>
            </v-col>
        </v-row>

        <v-row no-gutters class="my-5">
            <v-col cols="12" v-if="userResumes.length">
                <resume-statistics></resume-statistics>
            </v-col>
        </v-row>

        <v-row no-gutters>
            <v-snackbar :value="snackbarNoResume" :timeout="-1" :bottom="true">
                <v-avatar size="48" color="grey lighten-4" class="mr-3">
                    <img src="/images/logo_512_512.png" alt="avatar" />
                </v-avatar>

                <span class="pa-2" style="font-size: 1.3em"
                    >It seems you have no resume at the moment. Start off by clicking the
                    <v-btn fab small class="ml-0 disabled-button">
                        <v-icon color="primary">mdi-plus-box</v-icon>
                    </v-btn>
                    button.</span
                >

                <template v-slot:action="{ attrs }">
                    <v-btn color="pink" text v-bind="attrs" @click="snackbarNoResume = false"> Close </v-btn>
                </template>
            </v-snackbar>
        </v-row>
    </v-container>
</template>

<script>
// import Noty from 'noty'
import moment from 'moment'
import Avatar from 'vue-avatar'
import ResumeStatistics from '~/components/resume/ResumeStatistics'

export default {
    name: 'CandidateResumes',
    components: { Avatar, ResumeStatistics },
    layout: 'layoutCandidate',
    async created() {
        this.$store.commit('SET_LOADING', false)
        // this.$store.getters['auth/authUser']

        // if (!this.userResumes || this.userResumes.length < 1) {
        if (this.authUser && this.userResumes.length < 1) {
            // await this.$store.dispatch('resumes/fetchUserResumes', this.authUser.id)
            await this.$store.dispatch('resumes/fetchUserResumes')
            if (this.userResumes.length < 1) {
                this.snackbarNoResume = true
            }
        }
    },
    async mounted() {},
    data() {
        return {
            headers: [
                { text: 'N°', value: 'index' },
                { text: 'Name (not public)', value: 'name', sortable: true },
                { text: 'Active?', value: 'active' },
                { text: 'Identifier', value: 'slug' },
                { text: 'Language', value: 'language' },
                { text: 'Job title', value: 'job_title' },
                { text: 'Created at', value: 'created_at' },
                { text: 'Last update', value: 'updated_at' },
                { text: 'Actions', align: 'center', sortable: false },
            ],
            // snackbarDeleteResume: false,
            snackbarNoResume: false,
            confirm: false,
            // resume: {},
            // chartOptions: {
            //     chart: {
            //         title: 'Resumes statistics',
            //         subtitle: 'Number of clicks on each resume',
            //     },
            //     width: '100%',
            //     height: 400,
            //     chartArea: { width: '85%', height: '70%' },
            //     // bar: { groupWidth: "95%" },
            //     backgroundColor: '#424242',
            //     colors: ['#7A528F', '#FFC107', '#E11566', '#AF97BB', '#FFE083', '#F08AB2', '#D7CBDD', '#FFEFC1', '#F7C4D8'],
            //     hAxis: {
            //         baselineColor: '#FFF',
            //         gridlines: {
            //             color: 'transparent',
            //         },
            //         textStyle: {
            //             color: '#FFF',
            //         },
            //         viewWindow: {
            //             min: moment().subtract('1', 'months').toDate(),
            //             max: moment().toDate(),
            //         },
            //     },
            //     vAxis: {
            //         baselineColor: '#FFF',
            //         textStyle: {
            //             color: '#FFF',
            //         },
            //     },
            //     legend: {
            //         position: 'top',
            //         alignment: 'center',
            //         textStyle: {
            //             color: '#FFF',
            //         },
            //     },
            //     animation: {
            //         duration: 1000,
            //         easing: 'out',
            //     },
            // },
            date: new Date().toISOString().substr(0, 10),
            minDate: moment().subtract('1', 'months').format('YYYY-MM-DD'),
            maxDate: moment().format('YYYY-MM-DD'),
            modalMinDate: false,
            modalMaxDate: false,
            loadingArray: [],
            resumesNames: [],
            newResumeName: '',
            newResumeNameMap: new Map(),
        }
    },
    computed: {
        errors() {
            return this.$store.getters['errors']
        },
        authUser() {
            return this.$store.getters['auth/authUser']
        },
        userResumes() {
            return this.$store.getters['resumes/userResumes'].filter((resume) => resume.slug != '')
        },
        userResumesUploads() {
            return this.userResumes.flatMap((resume) => resume.uploads)
        },
        getStatistics() {
            const statistics = []
            this.userResumes.forEach((resume) => {
                if (resume.statistics_last_visits) {
                    statistics.push(
                        resume.statistics_last_visits.map((visit) => {
                            return new Date(moment(visit * 1000).format('YYYY-MM-DD'))
                        })
                    )
                }
            })
            return statistics
        },
        loadedDarkTheme() {
            return this.$store.getters['loadedDarkTheme']
        },
        // resumesNames () {
        // 	const resumesNames = []
        // 	this.userResumes.forEach(resume => {
        // 	// if (resume) {
        // 		console.log('resume.name: ', resume.name)
        // 		if (resume.name) {
        // 			// resumesNames.push(resume.name)
        // 			resumesNames.push(JSON.parse(JSON.stringify(resume.name)))
        // 		} else {
        // 			// resumesNames.push('')
        // 		}
        // 		// const resumeName = JSON.parse(JSON.stringify(resume.name))
        // 	// }
        // 	})
        // 	return resumesNames
        // }
    },
    methods: {
        // convertToPdf(resumeSlug) {
        //     console.log('convertToPdf: ', resumeSlug)
        // },
        chipColor(visibility) {
            switch (visibility) {
                case 'public':
                    return 'success'
                case 'semi-private':
                    return 'info'
                case 'private':
                    return 'warning'
                default:
                    return 'primary'
            }
        },
        updateName($event, resumeId) {
            // console.log('updateName: ', $event, resumeId)
            this.newResumeNameMap.set(resumeId, $event)
            // console.log(this.newResumeNameMap)
        },
        async updateResumeName(payload) {
            try {
                // console.log('payload: ', payload)
                this.loadingArray = new Array(payload.index + 1)
                this.loadingArray.splice(payload.index, 1, true)

                await this.$store.dispatch('resumes/updateResumeName', payload)
                this.loadingArray = []
                // new Noty({
                //     type: 'success',
                //     text: 'Updated resume name successfully!',
                //     timeout: 5000,
                //     theme: 'metroui',
                // }).show()
                this.$store.dispatch('setSnackbar', { show: true, color: 'success', text: 'Updated resume name successfully!' })
            } catch (error) {
                this.loadingArray = []
                console.log('error: ', error)
                // new Noty({
                //     type: 'error',
                //     text: 'Sorry, an error occured and the name of the resume could not be updated.',
                //     timeout: 5000,
                //     theme: 'metroui',
                // }).show()
                this.$store.dispatch('setSnackbar', { show: true, color: 'error', text: 'Sorry, an error occured and the name of the resume could not be updated.' })
                // this.$sentry.captureException(new Error(error))
            }
        },
        async updateResumeActiveStatus(payload) {
            try {
                await this.$store.dispatch('resumes/updateResumeActiveStatus', payload)
                // new Noty({
                //     type: 'success',
                //     text: 'Updated resume status successfully!',
                //     timeout: 5000,
                //     theme: 'metroui',
                // }).show()
                this.$store.dispatch('setSnackbar', { show: true, color: 'success', text: 'Updated resume status successfully!' })
            } catch (error) {
                // console.log('error: ', error)
                // new Noty({
                //     type: 'error',
                //     text: 'Sorry, an error occured and the status of the resume could not be updated.',
                //     timeout: 5000,
                //     theme: 'metroui',
                // }).show()
                this.$store.dispatch('setSnackbar', { show: true, color: 'error', text: 'Sorry, an error occured and the status of the resume could not be updated.' })
                // this.$sentry.captureException(new Error(error))
            }
        },
        addResume() {
            try {
                console.log('addResume')
                // return
                const currentNumberResumes = this.userResumes.length
                const maxNumberResumes = this.authUser && this.authUser.private ? this.authUser.private.maximum_number_of_resumes : 3
                // console.log('currentNumberResumes: ', currentNumberResumes)
                // console.log('maxNumberResumes: ', maxNumberResumes)
                if (currentNumberResumes < maxNumberResumes) {
                    this.$router.push('/candidate/resumes/create')
                } else {
                    // new Noty({
                    //     type: 'warning',
                    //     text: `Sorry, but you are currently limited to ${maxNumberResumes} ${maxNumberResumes > 1 ? 'resumes' : 'resume'}.`,
                    //     timeout: 5000,
                    //     theme: 'metroui',
                    //     closeWith: ['button'],
                    // }).show()
                }
            } catch (error) {
                console.log('error: ', error)
            }
        },
        editResume() {
            this.$router.replace('/candidate/resumes/edit')
        },
        async deleteResumeConfirmation(resume) {
            try {
                const confirm = await this.$root.$confirm.open('Delete resume', `Are you sure you want to delete resume <b>${resume.slug}</b>?`, { color: 'warning' })
                if (confirm) {
                    this.deleteResume(resume)
                }
            } catch (error) {
                console.log('error: ', error)
            }
        },
        async deleteResume(resume) {
            try {
                console.log('deleteResume: ', resume)
                // 1) Delete resume data
                // await this.$store.dispatch('resumes/deleteResume', { resumeId: this.resume.id })

                // 2) Delete images that are not used in other resumes
                const imagesToDelete = []
                let count
                for (let image of resume.uploads.filter((upload) => upload.type === 'image')) {
                    count = this.userResumesUploads.filter((upload) => upload.name === image.name).length
                    if (count == 1) {
                        imagesToDelete.push(image)
                    }
                }
                for (let image of imagesToDelete) {
                    console.log('image: ', image)
                    await this.$store.dispatch('images/deleteImage', { imageName: image.name })
                }

                // 3) Delete files that are not used in other resumes
                const filesToDelete = []
                for (let file of resume.uploads.filter((upload) => upload.type === 'file')) {
                    count = this.userResumesUploads.filter((upload) => upload.name === file.name).length
                    if (count == 1) {
                        filesToDelete.push(file)
                    }
                }
                for (let file of filesToDelete) {
                    await this.$store.dispatch('files/deleteFile', { fileName: file.name })
                }

                this.$store.dispatch('setSnackbar', { show: true, color: 'success', text: 'Resume successfully deleted!' })
            } catch (error) {
                console.log('error: ', error)
                this.$store.dispatch('setSnackbar', { show: true, color: 'error', text: 'Sorry, an error occured and your resume could not be deleted.' })
                // this.$sentry.captureException(new Error(error))
            }
        },
    },
    watch: {
        // loadedDarkTheme() {
        //     if (this.loadedDarkTheme) {
        //         this.chartOptions.backgroundColor = '#424242'
        //         this.chartOptions.hAxis.textStyle.color = '#FFF'
        //         this.chartOptions.vAxis.textStyle.color = '#FFF'
        //         this.chartOptions.legend.textStyle.color = '#FFF'
        //     } else {
        //         this.chartOptions.backgroundColor = '#FFF'
        //         this.chartOptions.hAxis.textStyle.color = '#424242'
        //         this.chartOptions.vAxis.textStyle.color = '#424242'
        //         this.chartOptions.legend.textStyle.color = '#424242'
        //     }
        // },
    },
}
</script>

<style scoped>
.primary-color {
    color: var(--v-primary-base);
}
.secondary-color {
    color: var(--v-secondary-base);
}
.country-flag {
    position: absolute;
    top: 15px;
    left: 0px;
}
.language-flag {
    position: absolute;
    top: 15px;
    right: 0px;
}
.card:hover {
    cursor: pointer;
}
.icon {
    color: var(--v-primary-base);
}
.icon:hover {
    color: var(--v-secondary-base);
    cursor: pointer;
}
.disabled {
    color: #ccc;
    cursor: default;
}
.disabled:hover {
    color: '#ccc';
    cursor: default;
}
.v-input--selection-controls {
    padding-top: 10px;
}
.disabled-button {
    pointer-events: none;
}
.btn-animate {
    animation: pulse 5s infinite;
}
@keyframes pulse {
    0%,
    100% {
        background-color: var(--v-tertiary-base);
        transform: scale(1);
    }
    50% {
        background-color: var(--v-primary-base);
        transform: scale(1.2);
    }
}
</style>
