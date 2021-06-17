<template>
    <v-container>
        <v-row no-gutters justify="center">
            <v-col cols="12" class="text-center my-3">
                <h2>Manage my account</h2>
                authUser: {{ authUser }}<br /><br />
                authUser.package: {{ authUser.package }}<br /><br />
                <!-- rules: {{ rules }}<br /><br /> -->
            </v-col>
        </v-row>

        <v-row no-gutters justify="center" class="my-8">
            <v-col cols="12" sm="8">
                <client-only>
                    <ValidationObserver ref="updateAccountForm" v-slot="{ valid, errors }">
                        valid: {{ valid }}<br />
                        errors: {{ errors }}
                        <v-form @submit.prevent="updateAccount">
                            <v-card>
                                <v-card-text>
                                    <v-row no-gutters>
                                        <v-col cols="12" sm="6" class="px-3">
                                            <ValidationProvider vid="firstname" name="firstname" v-slot="{ errors }" :rules="rules.register.firstname">
                                                <v-text-field :error-messages="errors" v-model="authUser.firstname">
                                                    <template v-slot:label>
                                                        Firstname
                                                        <font-awesome-icon :icon="['fas', 'edit']" />
                                                    </template>
                                                </v-text-field>
                                            </ValidationProvider>
                                        </v-col>
                                        <v-col cols="12" sm="6" class="px-3">
                                            <ValidationProvider vid="lastname" name="lastname" v-slot="{ errors }" :rules="rules.register.lastname">
                                                <v-text-field :error-messages="errors" v-model="authUser.lastname">
                                                    <template v-slot:label>
                                                        Lastname
                                                        <font-awesome-icon :icon="['fas', 'edit']" />
                                                    </template>
                                                </v-text-field>
                                            </ValidationProvider>
                                        </v-col>
                                        <v-col cols="12" sm="6" class="px-3">
                                            <v-text-field disabled v-model="authUser.email">
                                                <template v-slot:label>
                                                    Email
                                                    <!-- <font-awesome-icon :icon="['fas', 'ban']" /> -->
                                                </template>
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" class="px-3" v-if="authUser.role">
                                            <v-text-field disabled v-model="authUser.role">
                                                <template v-slot:label>
                                                    Status
                                                    <!-- <font-awesome-icon :icon="['fas', 'ban']" /> -->
                                                </template>
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" class="px-3">
                                            <v-text-field label="Account creation date" disabled :value="authUser.created_at | moment('ddd, MMMM Do YYYY HH:mm')"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" class="px-3">
                                            <v-text-field label="Last update" disabled :value="authUser.updated_at | moment('ddd, MMMM Do YYYY HH:MM')"></v-text-field>
                                        </v-col>
                                    </v-row>

                                    <v-row no-gutters class="mx-4 my-2 pa-2 private" v-if="authUser.package">
                                        <v-col cols="12" sm="6">
                                            <v-list class="mx-3">
                                                <v-list-item>
                                                    <v-list-item-content>
                                                        <v-list-item-title>
                                                            You have the <span class="tertiary--text">{{ authUser.package.name }}</span> package.<br />
                                                            <nuxt-link to="/packages" class="link"><font-awesome-icon :icon="['fas', 'arrow-right']" /> Upgrade</nuxt-link>
                                                        </v-list-item-title>
                                                    </v-list-item-content>
                                                </v-list-item>
                                                <v-list-item>
                                                    <v-list-item-content>
                                                        <v-list-item-title>
                                                            Valid until: 
                                                            <span v-if="authUser.package_valid_until">{{ authUser.package_valid_until | moment('ddd, MMM Do YYYY') }}</span>
                                                            <span v-else><i>No validity ending.</i></span>
                                                        </v-list-item-title>
                                                        
                                                    </v-list-item-content>
                                                </v-list-item>
                                            </v-list>
                                        </v-col>
                                        <v-col cols="12" sm="6">
                                            <v-list class="mx-3">
                                                <v-list-item>
                                                    <v-list-item-avatar>
                                                        <img :src="`/images/packages/${authUser.package.image_maximum_number_of_resumes}`" />
                                                    </v-list-item-avatar>

                                                    <v-list-item-content>
                                                        <v-list-item-title v-if="authUser.package.maxiumum_number_of_resume > 1"> Maximum number of resumes </v-list-item-title>
                                                        <v-list-item-title v-else> Maximum number of resume </v-list-item-title>
                                                    </v-list-item-content>
                                                </v-list-item>
                                                <v-list-item>
                                                    <v-list-item-avatar>
                                                        <img :src="`/images/packages/${authUser.package.image_number_of_available_templates}`" />
                                                    </v-list-item-avatar>

                                                    <v-list-item-content>
                                                        <v-list-item-title v-if="authUser.package.number_of_available_templates > 1"> Available templates </v-list-item-title>
                                                        <v-list-item-title v-else> Available template </v-list-item-title>
                                                    </v-list-item-content>
                                                </v-list-item>
                                                <v-list-item>
                                                    <v-list-item-avatar>
                                                        <img :src="`/images/packages/${authUser.package.image_total_space_in_bytes}`" />
                                                    </v-list-item-avatar>

                                                    <v-list-item-content>
                                                        <v-list-item-title> Total available space in MB </v-list-item-title>
                                                    </v-list-item-content>
                                                </v-list-item>
                                            </v-list>
                                        </v-col>
                                    </v-row>
                                </v-card-text>

                                <v-card-actions>
                                    <v-row no-gutters justify="center">
                                        <v-col cols="12">
                                            <div class="text-center">
                                                <v-btn type="submit" color="success" class="mx-2" :loading="loadingUpdate"> Update </v-btn>
                                                <v-btn outlined color="error" class="mx-2" :text="false" :loading="loading" @click.stop="dialog = true">
                                                    Delete account <v-icon right dark>mdi-alert-circle-outline</v-icon>
                                                </v-btn>
                                            </div>
                                        </v-col>
                                    </v-row>
                                </v-card-actions>
                            </v-card>
                        </v-form>
                    </ValidationObserver>
                </client-only>
            </v-col>
        </v-row>

        <v-row no-gutters justify="center" class="my-8">
            <v-col cols="12" sm="8">
                <v-card>
                    <client-only>
                        <ValidationObserver ref="updatePasswordForm" v-slot="{}">
                            <v-form @submit.prevent="updatePassword">
                                <v-card-text>
                                    <v-row no-gutters style="">
                                        <v-col cols="12" sm="6" class="px-3">
                                            <ValidationProvider vid="password" name="Password" rules="required" v-slot="{}">
                                                <v-text-field type="password" label="Current password" v-model="currentPassword"></v-text-field>
                                            </ValidationProvider>
                                        </v-col>
                                    </v-row>

                                    <v-row no-gutters>
                                        <v-col cols="12" sm="6" class="px-3">
                                            <ValidationProvider name="new password" v-slot="{ errors }" :rules="rulesPassword">
                                                <v-text-field type="password" label="New password" :error-messages="errors" v-model="newPassword"></v-text-field>
                                            </ValidationProvider>
                                        </v-col>

                                        <v-col cols="12" sm="6" class="px-3">
                                            <ValidationProvider v-slot="{}" vid="confirmation">
                                                <v-text-field type="password" label="New password confirmation" v-model="newPasswordConfirmation"></v-text-field>
                                            </ValidationProvider>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                                <v-card-actions>
                                    <v-row justify="center">
                                        <v-col cols="12">
                                            <div class="text-center">
                                                <v-btn type="submit" color="info" :loading="loadingPasswordUpdate">Update password</v-btn>
                                            </div>
                                        </v-col>
                                    </v-row>
                                </v-card-actions>
                            </v-form>
                        </ValidationObserver>
                    </client-only>
                </v-card>
            </v-col>
        </v-row>

        <v-row no-gutters>
            <v-col cols="12" class="text-center justify-center">
                <v-dialog v-model="dialog" width="500px">
                    <v-card>
                        <v-card-title class="headline error" primary-title> Deleting your account </v-card-title>

                        <v-card-text>
                            We are so sorry to see you go &#128546; But don't worry, you can come back anytime you want&#128077;! Please note that by deleting your account, we will suppress every bit
                            of information we have on you, that includes:
                            <br />
                            <ul>
                                <li>Your user profile</li>
                                <li>All your resumes</li>
                                <li>All the files you uploaded</li>
                            </ul>
                            <br />
                            There is no possibly to reverse the process. We hope you have appreciated your time with us and wish you all good for the future. Thank you for being part of loginMyCV!
                            <br /><br />
                            <v-text-field v-model="userEmail" label="Please type your email address" prepend-icon="mdi-account"></v-text-field>
                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                            <v-row no-gutters justify="center">
                                <v-btn color="secondary" :text="false" :disabled="disabled" :loading="loading" @click.stop="deleteAccount"> Delete my account </v-btn>
                            </v-row>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
// import Noty from 'noty'
import validationRulesClient from '@/api/utils/validationRulesClient'

export default {
    layout: 'layoutCandidate',
    created() {
        this.rules = validationRulesClient
    },
    data() {
        return {
            rules: null,
            // rules2: { required: true, email: true },
            // rules2: { confirmed: 'confirmation', .register.firstname},
            dialog: false,
            loadingUpdate: false,
            loadingPasswordUpdate: false,
            loadingDelete: false,
            userEmail: '',
            // form: {
            currentPassword: 'secret',
            newPassword: 'abc',
            newPasswordConfirmation: 'abc',
            // }
        }
    },
    computed: {
        errors() {
            return this.$store.getters['errors']
        },
        loading() {
            return this.$store.getters['loading']
        },
        authUser() {
            return this.$store.getters['auth/authUser']
        },
        disabled() {
            return this.userEmail !== this.authUser.email
        },
        rulesPassword() {
            return {
                confirmed: 'confirmation',
                ...this.rules.register.password,
            }
        },
    },
    methods: {
        async updateAccount() {
            try {
                this.loadingUpdate = true
                await this.$store.dispatch('users/updateUserAccount', {
                    id: this.authUser.id,
                    firstname: this.authUser.firstname,
                    lastname: this.authUser.lastname,
                })
                this.loadingUpdate = false
                // new Noty({
                //     type: 'success',
                //     text: 'Account info updated successfully &#128515;',
                //     timeout: 5000,
                //     theme: 'metroui',
                // }).show()
            } catch (error) {
                console.log('error: ', error)
                console.log('error.response: ', error.response)
                this.loadingUpdate = false
                Object.keys(error.response.data.error).forEach((item) => {
                    console.log('item: ', item)
                    this.$refs.updateAccountForm.setErrors({
                        [item]: this.$i18n.t(`validation.${error.response.data.error[item]}`),
                    })
                })
                // new Noty({
                //     type: 'error',
                //     text: 'Sorry, an error occured and your account info could not be updated successfully.',
                //     timeout: 5000,
                //     theme: 'metroui'
                // }).show()
            }
        },
        async updatePassword() {
            try {
                this.loadingPasswordUpdate = true
                await this.$store.dispatch('auth/updateUserPassword', { currentPassword: this.currentPassword, newPassword: this.newPassword })
                this.loadingPasswordUpdate = false
                // new Noty({
                //     type: 'success',
                //     text: 'Password updated successfully &#128515;',
                //     timeout: 5000,
                //     theme: 'metroui',
                // }).show()
            } catch (error) {
                console.log('error: ', error)
                console.log('error.response: ', error.response)
                console.log('error.response.data: ', error.response.data)
                console.log('error.response.data.error: ', error.response.data.error)
                this.loadingPasswordUpdate = false
                // Object.keys(error.response.data.error).forEach(item => {
                // console.log('item: ', item)
                this.$refs.updatePasswordForm.setErrors({
                    password: this.$i18n.t(`validation.${error.response.data.error}`),
                })
                // })
                // new Noty({
                //     type: 'error',
                //     text: 'Sorry, an error occured and the password could not be updated successfully &#128515;',
                //     timeout: 5000,
                //     theme: 'metroui'
                // }).show()
            }
        },
        async deleteAccount() {
            try {
                this.$store.commit('setLoading', true, { root: true })
                console.log('deleteAccount')
                await this.$store.dispatch('users/deleteUser')
                this.$store.commit('setLoading', false, { root: true })
                // new Noty({
                //     type: 'success',
                //     text: 'Successfully deleted your account &#128075;',
                //     timeout: 5000,
                //     theme: 'metroui',
                // }).show()
                this.$router.push('/')
            } catch (error) {
                console.log('error: ', error)
                this.$store.commit('setLoading', false, { root: true })
                this.dialog = false
                // new Noty({
                //     type: 'error',
                //     text: 'Sorry, an error occured and your account could not be deleted.',
                //     timeout: 5000,
                //     theme: 'metroui',
                // }).show()
            }
        },
    },
}
</script>

<style scoped>
.private {
    border: 2px solid var(--v-secondary-base);
    border-radius: 10px;
}
.link {
    color: var(--v-secondary-base);
}
</style>
