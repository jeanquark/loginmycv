<template>
    <div>
        <!-- resume: {{ resume }}<br /> -->
        <div v-if="resume && resume.template && resume.template.id">
            <component :is="component" :resume="resume" v-if="component" />
        </div>
        <v-app v-else>
            <v-main>
                <v-container fluid class="fill-height">
                    <v-row justify="center" align="center">
                        <v-img src="/images/loader.gif" max-width="200px"></v-img>
                    </v-row>
                </v-container>
            </v-main>
        </v-app>
    </div>
</template>

<script>
// import Noty from 'noty'
export default {
    name: 'ResumeIndex',
    components: {},
    async created() {
    },
    async mounted() {
        try {
            // 1) Fetch resume if resume is active & public, or if it belongs to the auth user or if auth user has been registered as a visitor
            await this.$store.dispatch('resumes/fetchResumeBySlug', this.$route.params.slug)

            // 2) Fetch template associated with resume NOT NECESSARY???
            // await this.$store.dispatch('templates/fetchTemplateById', this.resume.template.id)
            // return (this.component = () => import(`~/components/templatesModels/${this.template.file}`))

            return (this.component = () => import(`~/components/templatesModels/${this.resume.template.file}`))
        } catch (error) {
            console.log('error: ', error)
            // console.log('error.response: ', error.response)
            // console.log('error.response.status: ', error.response.status)
            // console.log('error.response.data: ', error.response.data)
            // If resume is not public
            if (error.response && error.response.status === 401) {
                this.$router.push(`/resumes/${this.$route.params.slug}/login`)
            } else {
                this.$router.push({ name: 'index___en' })
            }
        }
    },
    data() {
        return {
            component: null,
        }
    },
    computed: {
        authUser() {
            return this.$store.getters['auth/authUser']
        },
        authResume() {
            return this.$store.getters['auth/authResume']
        },
        resume() {
            return this.$store.getters['resumes/resume']
        },
        // template() {
        //     return this.$store.getters['templates/template']
        // },
        // type() {
        //     // return `Template2`
        //     // if (this.$store.getters['resumes/loadedResume']) {
        //     // 	const id = this.$store.getters['resumes/loadedResume'].template
        //     // 	return `Template${id}`
        //     // }
        //     // if (resume && resume.template) {
        //     // 	return `Template${resume.template}`
        //     // } else {
        //     // 	return 'Template1'
        //     // }
        //     return null
        // },
    },
}
</script>

<style scoped></style>
