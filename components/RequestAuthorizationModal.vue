<template>
    <!-- <h2>Request authorization Modal</h2> -->
    <v-card>
        <v-toolbar>
            <v-toolbar-title
                >Request access <span if="this.resume">to resume {{ this.resume.slug }}</span></v-toolbar-title
            >
            <v-spacer></v-spacer>
            <!-- <v-icon @click="$emit('closeModal')">mdi-close</v-icon> -->
            <v-icon @click="$store.commit('CLOSE_REQUEST_AUTHORIZATION_MODAL')">mdi-close</v-icon>
        </v-toolbar>

        <!-- resume: {{ resume }}<br /><br /> -->
        resume.id: {{ resume.id }}<br /><br />
        authUser: {{ authUser }}<br /><br />

        <v-card-text>
            <v-alert type="error" outlined dense v-if="!authUser">
                <!-- You must be authenticated to request an authorization. <nuxt-link :to="`/login-user?id=${this.resume.id}&slug=${this.resume.slug}`">Login</nuxt-link> -->
                You must be authenticated to request an authorization. <v-btn x-small color="primary" @click="openLoginModal()">Login</v-btn>
            </v-alert>

            <v-form @submit.prevent="sendAuthorizationRequest">
                <!-- <v-text-field
                    name="firstname"
                    label="Your firstname"
                    type="text"
                    prepend-icon="mdi-account"
                    required
                    :counter="50"
                    data-vv-as="Firstname"
                    :disabled="!authUser"
                    v-model="form.firstname"
                ></v-text-field>

                <v-text-field
                    name="lastname"
                    label="Your lastname"
                    type="text"
                    prepend-icon="mdi-lock"
                    required
                    :counter="50"
                    data-vv-as="Lastname"
                    :disabled="!authUser"
                    v-model="form.lastname"
                ></v-text-field>

                <v-text-field name="email" label="Your mail" type="email" prepend-icon="mdi-email" required data-vv-as="Email" :disabled="!authUser" v-model="form.email"></v-text-field> -->

                <v-textarea name="message" label="Your private message" prepend-icon="mdi-message" rows="3" :counter="500" data-vv-as="Message" :disabled="!authUser" v-model="form.message"></v-textarea>

                <div class="text-center">
                    <v-btn type="submit" color="primary" :disabled="!authUser" :loading="loading">Send request</v-btn>&nbsp;
                    <!-- <v-btn color="secondary" text @click="$emit('closeModal')">Close</v-btn> -->
                </div>
            </v-form>
        </v-card-text>

        <v-card-actions class="justify-center"> </v-card-actions>
    </v-card>
</template>

<script>
export default {
    props: ['resume'],
    async mounted() {
        this.$store.commit('SET_LOADING', false)
        // this.form.firstname = this.authUser ? this.authUser.firstname : 'John'
        // this.form.lastname = this.authUser ? this.authUser.lastname : 'Doe'
        // this.form.email = this.authUser ? this.authUser.email : 'john.doe@example.com'
    },
    data() {
        return {
            form: {
                firstname: '',
                lastname: '',
                email: '',
                message: 'Please let me have a look at your resume'
            }
        }
    },
    computed: {
        loading() {
            return this.$store.getters['loading']
        },
        // loadedUser() {
        //     return this.$store.getters['users/loadedUser']
        // },
        authUser() {
            return this.$store.getters['auth/authUser']
        },
    },
    methods: {
        openLoginModal () {
            // this.$store.commit('CLOSE_REQUEST_AUTHORIZATION_MODAL')
            this.$store.commit('OPEN_LOGIN_MODAL', { email: 'john.doe@example.com' })
        },
        // closeModal() {
        //     // this.$store.commit('closeRequestAuthorizationModal')
        //     // this.$store.commit('CLOSE_REQUEST_AUTHORIZATION_MODAL')
        //     this.$emit('closeModal')
        // },
        async sendAuthorizationRequest() {
            // await this.$validator.validateAll()

            // if (!this.errors.any()) {

            try {
                console.log('sendAuthorizationRequest')
                this.$store.commit('SET_LOADING', true, { root: true })

                const authorization = {
                    user: this.authUser.id,
                    resume: this.resume.id,
                    message: this.form.message
                    // resume: {
                    //     id: this.resume.resume_long_id,
                    //     user_id: this.resume.user_id,
                    //     firstname: this.resume.firstname,
                    //     lastname: this.resume.lastname,
                    //     email: this.resume.email
                    // },
                    // user: {
                    //     id: this.authUser.id,
                    //     firstname: this.form.firstname,
                    //     lastname: this.form.lastname,
                    //     email: this.form.email,
                    //     message: this.form.message
                    // }
                }

                // this.wait()
                // await axios.post('/create-resume-authorization', { authorization })
                this.$store.dispatch('authorizations/createAuthorization', authorization)
                this.$store.commit('SET_LOADING', false, { root: true })
                this.$emit('closeModal')
                // new Noty({
                //     type: 'success',
                //     text: 'Your authorization request was sent successfully.',
                //     timeout: 5000,
                //     theme: 'metroui'
                // }).show()
            } catch (error) {
                this.$store.commit('SET_LOADING', false, { root: true })
                // new Noty({
                //     type: 'error',
                //     text: 'Sorry, an error occured and your request could not be processed.',
                //     timeout: 5000,
                //     theme: 'metroui'
                // }).show()
            }
            // }
        }
    }
}
</script>

<style scoped>
.primaryColor {
    color: var(--v-primary-base);
}
/* ::v-deep .v-toolbar__content {
    background-image: url(/images/toolbar-background.svg)
}
.v-toolbar__title {
    font-weight: bold;
} */
</style>
