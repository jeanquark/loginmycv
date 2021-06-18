<template>
    <v-card class="elevation-12">
        <v-toolbar dark color="primary">
            <v-toolbar-title>Login</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-icon @click="closeModal">mdi-close</v-icon>
        </v-toolbar>
        <v-card-text>
            <ValidationObserver ref="form" v-slot="{ handleSubmit }">
                <v-form @submit.prevent="handleSubmit(signUserIn)">
                    <ValidationProvider vid="email" name="E-mail" v-slot="{ errors }">
                        <v-text-field label="Email" type="email" prepend-icon="mdi-account" :error-messages="errors" v-model="form.email"></v-text-field>
                    </ValidationProvider>

                    <ValidationProvider vid="password" name="Password" rules="required" v-slot="{ errors }">
                        <v-text-field label="Password" name="password" type="password" prepend-icon="mdi-lock-question" :error-messages="errors" v-model="form.password"></v-text-field>
                    </ValidationProvider>

                    <v-row no-gutters justify="center" class="mt-3 mb-4">
                        <v-btn color="primary" type="submit" :loading="loading">Login</v-btn>
                    </v-row>

                    <v-row no-gutters class="my-5 px-5">
                        <v-col cols="12" sm="6" class="px-5">
                            <v-btn block small color="#df4a32" class="white--text" :loading="loadingGoogle" @click="signInWithGoogle"
                                >Login with Google &nbsp;<font-awesome-icon :icon="['fab', 'google']"
                            /></v-btn>
                        </v-col>
                        <v-col cols="12" sm="6" class="px-5">
                            <v-btn block small color="#3c5a99" class="white--text" :loading="loadingFacebook" :disabled="true" @click="signInWithFacebook"
                                >Login with Facebook &nbsp;<font-awesome-icon :icon="['fab', 'facebook-f']"
                            /></v-btn>
                        </v-col>
                    </v-row>

                    <v-row no-gutters class="my-5 px-5">
                        <v-col cols="12" sm="6" class="px-5">
                            <v-btn text color="secondary" @click="switchToForgotPassword"> I forgot my password </v-btn>
                            <!-- <v-btn text nuxt to="/auth/forgot-password" color="secondary">I forgot my password</v-btn> -->
                        </v-col>
                        <v-col cols="12" sm="6" class="px-5">
                            <v-btn text color="primary" @click="switchToRegister"> Switch to register </v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </ValidationObserver>
        </v-card-text>
    </v-card>
</template>

<script>
// import Noty from 'noty'
export default {
    data() {
        return {
            form: {
                email: 'john.doe@example.com',
                password: 'secre',
            },
            loadingGoogle: false,
            loadingFacebook: false,
            loadingSendVerificationEmail: false,
        }
    },
    computed: {
        loading() {
            return this.$store.getters['loading']
        },
        authUser() {
            return this.$store.getters['auth/authUser']
        },
    },
    methods: {
        closeModal() {
            this.$emit('closeLoginModal')
        },
        switchToRegister() {
            this.$emit('switchToRegisterModal')
        },
        switchToForgotPassword() {
            // this.$emit('switchToForgotPasswordModal')
            this.$emit('closeLoginModal')
            this.$router.push('/auth/forgot-password')
        },
        async sendVerificationEmail(authData) {
            try {
                // console.log('sendVerificationEmail: ', authData)
                this.loadingSendVerificationEmail = true
                await this.$store.dispatch('firebase-auth/sendVerificationEmail', authData)
                this.loadingSendVerificationEmail = false
                this.$store.commit('clearError')
                // new Noty({
                //     type: 'success',
                //     text: 'Email sent successfully!',
                //     timeout: 5000,
                //     theme: 'metroui',
                // }).show()
            } catch (error) {
                // console.log('error: ', error)
                this.loadingSendVerificationEmail = false
                // new Noty({
                //     type: 'error',
                //     text: 'Sorry, an error occured and the verification email could not be sent.',
                //     timeout: 5000,
                //     theme: 'metroui',
                // }).show()
                this.$sentry.captureException(new Error(error))
            }
        },
        async signUserIn() {
            try {
                this.$store.commit('SET_LOADING', true, { root: true })
                const user = await this.$store.dispatch('auth/loginUser', this.form)
                console.log('user: ', user)
                console.log('authUser.id: ', this.authUser.id)
                this.$store.commit('CLOSE_LOGIN_MODAL')
                this.$store.commit('SET_LOADING', false, { root: true })
                this.$store.dispatch('setSnackbar', { show: true, text: `Welcome back ${this.authUser.firstname}!`, color: 'success', top: true, right: true })
                this.$router.push('/candidate/resumes')
            } catch (error) {
                this.$refs.form.setErrors({
                    password: this.$i18n.t(`validation.${error.response.data.error}`),
                })
                this.$store.commit('SET_LOADING', false, { root: true })
            }
        },
        async signInWithGoogle() {
            try {
                console.log('signInWithGoogle')
                this.loadingGoogle = true
                await this.$auth.loginWith('google')
            } catch (error) {
                console.log('error: ', error)
                this.loadingGoogle = false
                // this.$sentry.captureException(new Error(error))
            }
        },
        async signInWithFacebook() {
            try {
                console.log('signInWithFacebook')
                this.loadingFacebook = true
                const abc = await this.$auth.loginWith('facebook')
                console.log('abc: ', abc)
            } catch (error) {
                console.log('error: ', error)
                this.loadingFacebook = false
                // this.$sentry.captureException(new Error(error))
            }
        },
        openRequestAuthorizationModal() {
            this.$store.commit('CLOSE_LOGIN_MODAL')
            this.$store.commit('OPENREQUESTAUTHORIZATIONMODAL')
            this.$router.replace('/')
        },
    },
}
</script>

<style scoped></style>
