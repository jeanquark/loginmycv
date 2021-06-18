<template>
    <div>
        <h1>Resumes</h1>
        resumes: {{ resumes }}<br /><br />

        <div v-for="resume in resumes" :key="resume._id" class="card" @click="redirectToResume(resume)">
            {{ resume.job_title }}<br />
            {{ resume.user_id }}<br />
            {{ resume.visibility }}<br />
        </div>
    </div>
</template>

<script>
export default {
    name: 'Resumes',
    layout: 'layoutFront',
    async created () {
        await this.$store.dispatch('resumes/fetchResumes')
    },
    computed: {
        resumes () {
            return this.$store.getters['resumes/resumes']
        }
    },
    methods: {
        redirectToResume(resume) {
            console.log('resume: ', resume)
            this.$store.commit('resumes/SET_RESUME', resume)
            this.$router.push(`/resumes/${resume.slug}`)
        }
    }
}
</script>

<style scoped>
.card {
    border: 1px solid orangered;
    width: 200px;
    display: inline-block;
    margin: 20px;
    padding: 20px;
}
.card:hover {
    cursor: pointer;
    border: 2px solid lightblue;
}
</style>