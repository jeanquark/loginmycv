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
            const accessToken = this.$route.hash.match(/access_token=([^&]*)/g)[0].replace('access_token=', '')
			// console.log('accessToken: ', accessToken)
			
			// Facebook OAuth
		    const facebookUserInfo = await this.$axios.$get(`https://graph.facebook.com/me?fields=name,email,gender,location,picture&access_token=${accessToken}`)
            // console.log('facebookUserInfo: ', facebookUserInfo)
            // picture.data['url']
            const { picture } = facebookUserInfo
            // const picture = undefined
            facebookUserInfo.picture = picture?.data?.url
            // console.log('facebookUserInfo: ', facebookUserInfo)
            await this.$store.dispatch('auth/loginUserOAuth', facebookUserInfo)
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
