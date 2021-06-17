<template>
    <v-card class="elevation-12">
        <v-toolbar dark color="primary">
            <v-toolbar-title>Reset password</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <v-form>
                <v-text-field prepend-icon="mdi-account" name="email" label="Your email" type="text" hint="We will send you a link to reset your password using the provided email address." v-model="form.email"></v-text-field>
				<v-row no-gutters justify="center" class="mb-2">
                    <v-btn color="primary" class="ma-2" @click="resetPassword">Send link</v-btn>
                    <v-btn color="warning" text nuxt to="/" class="ma-2">Cancel</v-btn>
				</v-row>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
	export default {
        created () {
            this.$store.commit('CLEAR_ERROR')
            this.$store.commit('SET_LOADING', false)
        },
		data () {
			return {
				form: {
					email: ''
				}
			}
		},
		computed: {
		},
		methods: {
            async resetPassword () {
                try {
                    // await this.$store.dispatch('firebase-auth/resetPassword', this.form.email)
                    await this.$store.dispatch('auth/forgotPassword', this.form.email)
                } catch (error) {
                    console.log('error: ', error)
                }
            }
		}
	}

</script>

<style scoped>

</style>