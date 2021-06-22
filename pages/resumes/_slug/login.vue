<template>
    <v-main>
        <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
                <v-col cols="12" sm="8" md="4">
                    <v-card class="elevation-12">
                        <v-toolbar flat>
                            <v-toolbar-title>Login resume {{ this.$route.params.slug }}</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-tooltip bottom>
                                <span>Source</span>
                            </v-tooltip>
                        </v-toolbar>
                        <client-only>
                            <ValidationObserver ref="form" v-slot="{ handleSubmit }">
                                <v-form @submit.prevent="handleSubmit(loginResume)">
                                    <!-- authResume: {{ authResume }}<br /><br /> -->
                                    <v-card-text>
                                        <v-text-field label="Slug" name="slug" prepend-icon="mdi-account" type="text" style="display: none" v-model="form.slug"></v-text-field>

                                        <ValidationProvider vid="password" name="Password" rules="required" v-slot="{ errors }">
                                            <v-text-field
                                                id="password"
                                                label="Password"
                                                name="password"
                                                prepend-icon="mdi-lock"
                                                :type="showPassword ? 'text' : 'password'"
                                                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                                @click:append="showPassword = !showPassword"
                                                :error-messages="errors"
                                                v-model="form.password"
                                            ></v-text-field>
                                        </ValidationProvider>
                                    </v-card-text>
                                    <v-card-actions class="justify-center">
                                        <v-btn nuxt color="light" to="/">Cancel</v-btn>
                                        <v-btn type="submit" color="primary" :loading="loading">Login Resume</v-btn>
                                    </v-card-actions>
                                </v-form>
                            </ValidationObserver>
                        </client-only>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>

<script>
export default {
    layout: 'layoutFront',
    name: 'ResumeLogin',
    mounted() {
        this.$store.commit('CLEAR_ERROR')
        this.$vuetify.theme.dark = true
    },
    data() {
        return {
            form: {
                slug: this.$route.params.slug,
                password: '',
            },
            showPassword: false,
        }
    },
    computed: {
        loading() {
            return this.$store.getters['loading']
        },
        error() {
            return this.$store.getters['error']
        },
        authResume() {
            return this.$store.getters['auth/authResume']
        },
    },
    methods: {
        async loginResume() {
            try {
                console.log('loginResume: ', this.form)
                this.$store.commit('SET_LOADING', true)
                await this.$store.dispatch('auth/loginResume', this.form)
                this.$store.commit('SET_LOADING', false)
                this.$router.push(`/resumes/${this.$route.params.slug}`)
            } catch (error) {
                this.$store.commit('SET_LOADING', false)
                console.log('error.response: ', error.response)
                console.log('error.response.data: ', error.response.data)
                console.log('error.response.data.error: ', error.response.data.error)
                this.$refs.form.setErrors({
                    password: this.$i18n.t(`validation.${error.response.data.error}`),
                })
            }
        },
    },
}
</script>

<style scoped>
[v-cloak] {
    display: none;
}
::v-deep .v-toolbar {
    margin-bottom: 0.5em;
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
