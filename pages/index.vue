<template>
    <v-container style="">
        <!-- authUser: {{ authUser }}<br /><br /> -->
        <!-- authResume: {{ authResume }}<br /><br /> -->
        <!-- resumes: {{ resumes }}<br /><br /> -->
        <!-- userReceivedAuthorizations: {{ userReceivedAuthorizations }}<br /><br /> -->
        <!-- authUser.authorizations: {{ authUser.authorizations }}<br /><br /> -->
        <!-- abc<br /><br /> -->
        Last successful deployment: June 17<sup>th</sup> 16:29
        <v-snackbar :timeout="-1" :value="true" top color="tertiary">This website is a work in progress and will be made publicly available soon.</v-snackbar>

        <client-only>
            <masonry :cols="{ default: 4, 1904: 4, 1264: 3, 960: 2, 600: 1 }" :gutter="{ default: '30px', 1904: '30px', 600: '15px' }">
                <div v-for="resume of resumes" :key="resume.id">
                    <v-hover>
                        <v-card text class="my-4" :class="[`elevation-${hover ? 12 : 2}`]" slot-scope="{ hover }">
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
                                <div>
                                    <v-card-text style="max-width: 250px;">
                                        <h3 class="title mt-1 mb-0 text-center text-truncate" style="">{{ resume.job_title }}</h3>
                                        <div class="pt-1 px-2 text-center">{{ resume.job_description }}</div>
                                        <div class="pt-1 px-2 text-center">Visibility: {{ resume.visibility }}</div>
                                        <!-- <div class="pt-1 px-2 text-center">Public: {{ resume.public }}</div> -->
                                        <!-- <div class="pt-1 px-2 text-center">Slug: {{ resume.slug }}</div> -->
                                        <!-- <div class="pt-1 px-2 text-center">Country: {{ resume.personal_data }}</div> -->
                                        <!-- <div class="pt-1 px-2 text-center">Nationalities: {{ resume.personal_data }}</div> -->
                                    </v-card-text>
                                    <v-card-actions>
                                        <!-- public resumes -->
                                        <v-row no-gutters justify="center" v-if="resume.visibility === 'public'">
                                            <v-btn small color="success" class="white--text elevation-2" nuxt :to="`resumes/${resume.slug}`">View resume</v-btn>
                                        </v-row>
                                        <!-- semi-private resumes -->
                                        <v-row no-gutters justify="center" v-if="resume.visibility === 'semi-private'">
                                            <div v-if="authUser">
                                                <div v-if="userReceivedAuthorizations[resume.id]">
                                                    <v-btn
                                                        small
                                                        nuxt
                                                        color="success"
                                                        class="white--text elevation-2"
                                                        :to="`/resume/${resume.id}`"
                                                        v-if="
                                                            userReceivedAuthorizations[resume.id]['user']['id'] === authUser.id &&
                                                            userReceivedAuthorizations[resume.id].status &&
                                                            userReceivedAuthorizations[resume.id].status.slug === 'accorded'
                                                        "
                                                        >View resume</v-btn
                                                    >
                                                    <v-chip
                                                        small
                                                        color="info white--text"
                                                        v-if="userReceivedAuthorizations[resume.id].status && userReceivedAuthorizations[resume.id].status.slug === 'in_process'"
                                                        >Your access request is being processed</v-chip
                                                    >
                                                    <v-chip
                                                        small
                                                        color="warning white--text"
                                                        v-if="userReceivedAuthorizations[resume.id].status && userReceivedAuthorizations[resume.id].status.slug === 'revoked'"
                                                        >Your access request has been revoked</v-chip
                                                    >
                                                    <v-chip
                                                        small
                                                        color="error white--text"
                                                        v-if="userReceivedAuthorizations[resume.id].status && userReceivedAuthorizations[resume.id].status.slug === 'refused'"
                                                        >Your access request was refused</v-chip
                                                    >
                                                </div>
                                                <v-btn
                                                    small
                                                    color="primary"
                                                    class="white--text elevation-2"
                                                    @click="openRequestAuthorizationModal(resume)"
                                                    v-if="resume.user_id !== authUser.id && !userReceivedAuthorizations[resume.id]"
                                                    >Request access</v-btn
                                                >
                                                <v-btn small color="success" class="white--text elevation-2" nuxt :to="`resumes/${resume.slug}`">View resume</v-btn>
                                                <v-btn small color="success" class="white--text elevation-2" nuxt :to="`resume/${resume.id}`" v-if="resume.user_id === authUser.id"
                                                    >View my resume</v-btn
                                                >
                                            </div>
                                            <div v-else-if="authResume && authResume.id === resume.id">
                                                <v-btn small color="primary" class="white--text elevation-2" @click="openRequestAuthorizationModal(resume)">Request access</v-btn>
                                                <v-btn small color="success" class="white--text elevation-2" nuxt :to="`resumes/${resume.slug}`">View resume</v-btn>
                                            </div>
                                            <div v-else>
                                                <v-btn small color="primary" class="white--text elevation-2" @click="openRequestAuthorizationModal(resume)">Request access</v-btn>
                                                <v-btn small color="success" class="white--text elevation-2" nuxt :to="`resumes/${resume.slug}/login`">Login</v-btn>
                                            </div>
                                        </v-row>
                                    </v-card-actions>
                                </div>
                            </v-row>
                        </v-card>
                    </v-hover>
                </div>
            </masonry>
        </client-only>

        <v-row no-gutters>
            <!-- <v-dialog v-model="dialog" width="500" :persistent="false"> -->
            <v-dialog v-model="requestAuthorizationModal" width="500" :persistent="false">
                <!-- <RequestAuthorizationModal :resume="resume" @closeModal="dialog = false" /> -->
                <RequestAuthorizationModal :resume="resume" />
            </v-dialog>
        </v-row>
    </v-container>
</template>

<script>
import Avatar from 'vue-avatar'
import RequestAuthorizationModal from '~/components/RequestAuthorizationModal'
import fileDownload from 'js-file-download' // Download data file
export default {
    name: 'Homepage',
    components: { Avatar, RequestAuthorizationModal },
    layout: 'layoutFront',
    async created() {
        try {
            if (this.resumes.length < 1) {
                await this.$store.dispatch('resumes/fetchResumes')
            }
        } catch (error) {
            console.log('error', error)
            console.log('error.response: ', error.response)
        }
    },
    async mounted() {
        // console.log('$nuxt.$route.name: ', $nuxt.$route.name)
    },
    data() {
        return {
            // dialog: false,
            resume: {},
        }
    },
    computed: {
        authUser() {
            return this.$store.getters['auth/authUser']
        },
        authResume() {
            return this.$store.getters['auth/authResume']
        },
        resumes() {
            return this.$store.getters['resumes/resumes']
        },
        userReceivedAuthorizations() {
            const initialValue = {}
            return this.authUser.authorizations.reduce((obj, item) => {
                return {
                    ...obj,
                    [item['resume_id']]: item,
                }
            }, initialValue)
        },
        requestAuthorizationModal() {
            return this.$store.getters['requestAuthorizationModal']
        },
    },
    methods: {
        async showAuthModal() {},
        openRequestAuthorizationModal(resume) {
            this.resume = resume
            // this.dialog = true
            this.$store.commit('OPEN_REQUEST_AUTHORIZATION_MODAL')
        },
        async getFile(fileName) {
            try {
                console.log('getFile: ', fileName)
                const data = await this.$axios.$post(
                    `/api/v1/resumes/get-file`,
                    {
                        fileName,
                    },
                    {
                        responseType: 'blob',
                    }
                )
                console.log('data: ', data)
                fileDownload(data, fileName)
            } catch (error) {
                console.log('error: ', error)
            }
        },
    },
}
</script>

<style scoped>
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
</style>
