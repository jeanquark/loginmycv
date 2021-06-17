<template>
    <v-card class="elevation-12">
        <v-toolbar dark color="primary">
            <v-toolbar-title>Register</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <ValidationObserver ref="form" v-slot="{ handleSubmit }">
                <!-- <v-form @submit.prevent="signUserUp('register')" data-vv-scope="register"> -->
                <v-form @submit.prevent="handleSubmit(signUserUp)">
                    <v-row no-gutters>
                        <!-- <v-alert
                        :value="error"
                        type="error"
                        color="error"
                        outline
                        class="mb-3"
                        v-if="error"
                    >
                        {{ error.message }}
                    </v-alert> -->

                        <v-col cols="6" class="pr-3">
                            <ValidationProvider vid="firstname" name="Firstname" :rules="rules.register.firstname" v-slot="{ errors }">
                                <!-- errors: {{ errors }}<br /> -->
                                <v-text-field
                                    label="Firstname"
                                    id="firstname"
                                    name="firstname"
                                    prepend-icon="mdi-account"
                                    :counter="rules.register.firstname.max"
                                    :error-messages="errors"
                                    v-model="form.firstname"
                                    :success="form.firstname.length > 0 ? true : false"
                                    :append-icon="errors.length < 1 && form.firstname.length > 0 ? 'mdi-check' : ''"
                                ></v-text-field>
                            </ValidationProvider>

                            <ValidationProvider vid="lastname" name="Lastname" :rules="rules.register.lastname" v-slot="{ errors }">
                                <v-text-field
                                    label="Lastname"
                                    id="lastname"
                                    name="lastname"
                                    prepend-icon="mdi-account"
                                    :counter="rules.register.lastname.max"
                                    :error-messages="errors"
                                    v-model="form.lastname"
                                    :success="form.lastname.length > 0 ? true : false"
                                    :append-icon="errors.length < 1 && form.lastname.length > 0 ? 'mdi-check' : ''"
                                ></v-text-field>
                            </ValidationProvider>

                            <ValidationProvider vid="email" name="Email" :rules="rules.register.email" v-slot="{ errors }">
                                <v-text-field
                                    label="Email"
                                    id="email"
                                    name="email"
                                    prepend-icon="mdi-email"
                                    :error-messages="errors"
                                    v-model="form.email"
                                    :success="form.email.length > 0 ? true : false"
                                    :append-icon="errors.length < 1 && form.email.length > 0 ? 'mdi-check' : ''"
                                ></v-text-field>
                            </ValidationProvider>
                        </v-col>

                        <v-col cols="6" class="pl-3">
                            <ValidationProvider vid="password" name="Password" :rules="rules.register.password" v-slot="{ errors }">
                                <v-text-field
                                    label="Password"
                                    name="password"
                                    prepend-icon="mdi-lock-question"
                                    type="password"
                                    ref="password"
                                    :error-messages="errors"
                                    data-vv-as="Password"
                                    :counter="rules.register.password.max"
                                    v-model="form.password"
                                    :success="form.password.length > 0 ? true : false"
                                    :append-icon="errors.length < 1 && form.password.length > 0 ? 'mdi-check' : ''"
                                ></v-text-field>
                            </ValidationProvider>

                            <ValidationProvider vid="password_confirmation" name="Password confirmation" :rules="rules.register.password_confirmation" v-slot="{ errors }">
                                <v-text-field
                                    label="Confirm Password"
                                    name="password_confirmation"
                                    prepend-icon="mdi-lock-question"
                                    type="password"
                                    :error-messages="errors"
                                    data-vv-as="Password"
                                    v-model="form.password_confirmation"
                                    :success="form.password_confirmation.length > 0 ? true : false"
                                    :append-icon="errors.length < 1 && form.password_confirmation.length > 0 ? 'mdi-check' : ''"
                                ></v-text-field>
                            </ValidationProvider>
                        </v-col>
                    </v-row>

                    <v-row justify="center">
                        <v-btn color="primary" type="submit" :loading="loading" :disabled="true">Register</v-btn>
                    </v-row>

                    <v-row class="mt-3 mb-2">
                        <v-col cols="12" sm="6" class="px-2">
                            <v-btn block color="#df4a32" class="white--text" :loading="loadingGoogle" :disabled="true" @click="signInWithGoogle"
                                >Register with Google &nbsp;<font-awesome-icon :icon="['fab', 'google']"
                            /></v-btn>
                        </v-col>
                        <v-col cols="12" sm="6" class="px-2">
                            <v-btn block color="#3c5a99" class="white--text" :loading="loadingFacebook" :disabled="true" @click="signInWithFacebook"
                                >Register with Facebook &nbsp;<font-awesome-icon :icon="['fab', 'facebook-f']"
                            /></v-btn>
                        </v-col>
                    </v-row>

                    <v-row justify="center">
                        <v-btn text color="primary" @click="switchToLogin">
                            Switch to login
                        </v-btn>
                        <v-btn text color="secondary" @click="closeModal">
                            Close
                        </v-btn>
                    </v-row>
                </v-form>
            </ValidationObserver>
        </v-card-text>
    </v-card>
</template>

<script>
// import axios from 'axios'
// import Noty from 'noty'
import validationRulesClient from '@/api/utils/validationRulesClient'
export default {
    // inject: ['$validator'], // inject parent validator
    created() {
        this.$store.commit('CLEAR_ERROR')
        this.$store.commit('SET_LOADING', false)
        this.rules = validationRulesClient
    },
    data() {
        return {
            form: {
                firstname: '',
                lastname: '',
                email: '',
                password: '',
                password_confirmation: ''
            },
            loadingGoogle: false,
            loadingFacebook: false,
            rules: null
        }
    },
    computed: {
        loading() {
            return this.$store.getters['loading']
        },
        errors() {
            return this.$store.getters['errors']
        }
    },
    methods: {
        switchToLogin() {
            this.$emit('switchToLoginModal')
        },
        closeModal() {
            this.$emit('closeRegisterModal')
        },
        async signUserUp(scope) {
            // await this.$validator.validateAll(scope)
            if (!this.errors.any()) {
                // console.log('signUserUp!')
                try {
                    this.$store.commit('SET_LOADING', true, { root: true })
                    await this.$store.dispatch('firebase-auth/signUserUp', this.form)
                    this.$store.commit('SET_LOADING', false, { root: true })
                    // new Noty({
                    //     type: 'success',
                    //     text: `Registration went successfully. Please check your inbox at ${this.form.email} to confirm your identity. Welcome aboard &#128522;!`,
                    //     timeout: 5000,
                    //     theme: 'metroui'
                    // }).show()
                    this.switchToLogin()
                } catch (error) {
                    // console.log('error2: ', error)
                    this.$store.commit('SET_ERROR', error)
                    this.$store.commit('SET_LOADING', false, { root: true })
                    if (error.code === 'auth/email-already-in-use') {
                        // new Noty({
                        //     type: 'error',
                        //     text: error.message,
                        //     timeout: 5000,
                        //     theme: 'metroui'
                        // }).show()
                    } else {
                        // new Noty({
                        //     type: 'error',
                        //     text: 'Sorry, an error occured and the registration process was interrupted.',
                        //     timeout: 5000,
                        //     theme: 'metroui'
                        // }).show()
                        // this.$sentry.captureException(new Error(error))
                    }
                }
            }
        },
        async signInWithGoogle() {
            try {
                // console.log('signInWithGoogle')
                this.loadingGoogle = true
                await this.$store.dispatch('firebase-auth/signInWithGooglePopup')
                // new Noty({
                //     type: 'success',
                //     text: 'Login went successfully!',
                //     timeout: 5000,
                //     theme: 'metroui'
                // }).show()
                this.loadingGoogle = false
                this.$router.replace('/candidate/resumes')
            } catch (error) {
                // console.log('error: ', error)
                this.loadingGoogle = false
                // new Noty({
                //     type: 'error',
                //     text: 'Sorry, an error occured and you could not log in.',
                //     timeout: 5000,
                //     theme: 'metroui'
                // }).show()
                // this.$sentry.captureException(new Error(error))
            }
        },
        async signInWithFacebook() {
            try {
                // console.log('signInWithFacebook')
                this.loadingFacebook = true
                await this.$store.dispatch('firebase-auth/signInWithFacebookPopup')
                // new Noty({
                //     type: 'success',
                //     text: 'Login went successfully!',
                //     timeout: 5000,
                //     theme: 'metroui'
                // }).show()
                this.loadingFacebook = false
                this.$router.replace('/candidate/resumes')
            } catch (error) {
                // console.log('error: ', error)
                this.loadingFacebook = false
                // new Noty({
                //     type: 'error',
                //     text: 'Sorry, an error occured and you could not log in.',
                //     timeout: 5000,
                //     theme: 'metroui'
                // }).show()
                // this.$sentry.captureException(new Error(error))
            }
        }
    }
}
</script>

<style scoped>
/* >>> .v-input__icon--append .v-icon { 
    	color: yellow !important;
	} */
</style>
