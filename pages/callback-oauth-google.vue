<template>
    <v-app>
        <v-container fill-height fluid>
            <v-row no-gutters align="center" justify="center">
                <v-col cols="12">
                    <div class="text-center">
                        <h2>Redirecting to your homepage...</h2>
                        <img src="~/assets/loader.svg" alt="Loading..." style="" />
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
export default {
    async mounted() {
        try {
            // console.log('this.$route: ', this.$route)
            const accessToken = this.$route.hash.match(/access_token=([^&]*)/g)[0].replace('access_token=', '')
            // console.log('accessToken: ', accessToken)
            // Google OAuth
            const googleUserInfo = await this.$axios.$get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`)
            // console.log('googleUserInfo: ', googleUserInfo)
            await this.$store.dispatch('auth/loginUserOAuth', googleUserInfo)
            this.$store.dispatch('setSnackbar', { show: true, text: `Welcome back!`, color: 'success', top: true, right: true })
            this.$router.push('/candidate/resumes')
        } catch (error) {
            console.log('error: ', error)
            this.$store.dispatch('setSnackbar', { show: true, text: `Sorry, an error occured.`, color: 'error', top: true, right: true })
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>

</style>
