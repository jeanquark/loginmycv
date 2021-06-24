<template>
    <v-app id="app" v-cloak :style="{ backgroundColor: $vuetify.theme.themes[theme].background }">
    <!-- <v-app id="app" v-cloak> -->
        <v-navigation-drawer v-model="drawer" absolute temporary>
            <v-list nav dense>
                <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
                    <v-list-item class="px-2">
                        <v-list-item-avatar>
                            <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
                        </v-list-item-avatar>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-title @click="openLoginModal">Login</v-list-item-title>
                    </v-list-item>

                    <v-list-item style="display: none">
                        <v-list-item-title @click="openRegisterModal">Register</v-list-item-title>
                    </v-list-item>

                    <v-list-item to="/candidate/resumes">
                        <v-list-item-title>My resumes</v-list-item-title>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>

        <div class="text-left pa-4 hidden-md-and-up">
            <v-icon size="60" @click.stop="drawer = !drawer">mdi-menu</v-icon>
        </div>

        <v-main>
            <v-container fluid :class="{ 'ml-20': $vuetify.breakpoint.smAndDown, 'pl-0': $vuetify.breakpoint.mdAndUp }">
                <v-row no-gutters class="pt-0 pr-5 hidden-sm-and-down" justify="end">
                    <nuxt-link to="/" class="menu-button">Home</nuxt-link>
                    <!-- <v-text-field
                        type="text"
                        label="Search resume..."
                        :filled="false"
                        :solo="true"
                        :clearable="true"
                        rounded
                        dense
                        append-icon="mdi-magnify"
                        @click:append="search"
                        class="search-input"
                        style="max-width: 240px; margin-top: 4px"
                    ></v-text-field> -->

                    <div class="d-inline-flex" v-if="authUser">
                        <nuxt-link to="/candidate/resumes" class="menu-button">
                            <div class="text-center">
                            {{ authUser.firstname }} {{ authUser.lastname }}<br />
                            <small class="">My resumes</small>
                            </div>
                        </nuxt-link>
                        <nuxt-link to="/admin" class="menu-button" v-if="authUser.role && authUser.role === 'admin'">Admin</nuxt-link>

                        <div @click="logoutUser" class="menu-button">Logout</div>
                    </div>
                    <div class="d-inline-flex" v-else>
                        <div @click="openLoginModal" class="menu-button" style="border: 0px solid red">Login</div>
                        <div @click="openRegisterModal" class="menu-button" style="border: 0px solid red; display: none">Register</div>
                    </div>
                </v-row>

                <v-row class="my-10"></v-row>

                <nuxt />

                <v-row>
                    <!-- Login Candidate Modal -->
                    <!-- v-model="loginModal" -->
                    <v-dialog :value="loginModal" width="600" :persistent="loading ? true : false" @input="closeLoginModal">
                        <Login v-on:switchToRegisterModal="switchToRegister" v-on:switchToForgotPasswordModal="switchToForgotPassword" v-on:closeLoginModal="closeLoginModal" />
                    </v-dialog>

                    <!-- Register Candidate Modal -->
                    <v-dialog v-model="registerModal" width="750" :persistent="loading ? true : false">
                        <Register v-on:switchToLoginModal="switchToLogin" v-on:closeRegisterModal="closeRegisterModal" />
                    </v-dialog>

                    <!-- Forgot Password Modal -->
                    <v-dialog v-model="forgotPasswordModal" width="750">
                        <ForgotPassword />
                    </v-dialog>
                </v-row>
                <br /><br /><br /><br />
                <!-- <Snackbars>Click <v-btn small color="primary">here</v-btn></Snackbars> -->
                <Snackbars></Snackbars>
                snackbars: {{ snackbars }}<br />
                <!-- <v-btn color="primary" @click="refreshToken">Refresh token</v-btn> -->
                <!-- <v-snackbar
                    :color="snackbar.color"
                    :timeout="-1"
                    v-for="(snackbar, index) in snackbars.filter((s) => s.show)"
                    :key="index"
                    :style="`bottom: ${index * 55 + 5}px`"
                    v-model="snackbar.show"
                >
                    {{ snackbar.text }}
                    <template v-slot:action="{ attrs }">
                        <v-btn color="tertiary" text v-bind="attrs" @click="abc(index)"> Close </v-btn>
                    </template>
                </v-snackbar> -->
            </v-container>
        </v-main>

        <v-footer padless class="secondary--text hidden-sm-and-down" style="background: url('/images/svg/footer-background.svg') no-repeat; background-size: cover; border: 0px dashed red">
            <v-container class="pa-0" style="">
                <v-row no-gutters align="center" justify="center" class="my-3" style="border: 0px solid blue">
                    <v-col cols="12" class="text-center mt-3">
                        <v-btn v-for="(link, index) in links" :key="index" :to="link.route" color="white" text rounded class="my-2 font-weight-medium">
                            {{ link.name }}
                        </v-btn>
                    </v-col>
                    <v-col cols="12" align-self="end" class="text-center">{{ new Date().getFullYear() }} — <strong>&copy;LoginMyCV</strong></v-col>
                </v-row>
            </v-container>
        </v-footer>

        <v-footer :absolute="false" :fixed="false" :padless="true" class="hidden-md-and-up">
            <v-card flat tile width="100%" class="primary text-center">
                <v-card-text>
                    <v-btn v-for="icon in icons" :key="icon" class="mx-4" icon>
                        <v-icon size="24px">
                            {{ icon }}
                        </v-icon>
                    </v-btn>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-text class="white--text"> {{ new Date().getFullYear() }} — <strong>LoginMyCV</strong> </v-card-text>
            </v-card>
        </v-footer>
    </v-app>
</template>

<script>
// import Noty from 'noty'
import Login from '~/components/Login'
import Register from '~/components/Register'
import ForgotPassword from '~/components/ForgotPassword'
import Snackbars from '~/components/Snackbars'
export default {
    head: {
        meta: [{ name: 'robots', content: 'noindex' }],
    },
    name: 'layoutFront',
    components: { Login, Register, ForgotPassword, Snackbars },
    // middleware: [''],
    mounted() {
        window.addEventListener('scroll', this.onScroll)
        // this.$vuetify.theme.dark = true
        this.$vuetify.theme.dark = this.authUser && this.authUser.user_preferences ? this.authUser.user_preferences.dark_theme : true
        // this.$store.dispatch('setSnackbar', { show: true, text: 'Disappears after default time.', color: 'success', timeout: 10000 })
        // this.$store.dispatch('setSnackbar', { show: true, text: 'Disappears after 2000 milliseconds', color: 'primary', timeout: 5000 })
        // this.$store.dispatch('setSnackbar', { show: true, text: 'Disappears after 10000 milliseconds.', color: 'warning' })
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.onScroll)
    },
    data() {
        return {
            registerModal: false,
            forgotPasswordModal: false,
            links: [
                // {
                //     name: 'About',
                //     route: '/about',
                // },
                // {
                //     name: 'Packages',
                //     route: '/packages',
                // },
                // {
                //     name: 'Terms & Conditions',
                //     route: '/terms-conditions',
                // },
                // {
                //     name: 'FAQ',
                //     route: '/faq',
                // },
                // {
                //     name: 'Contact Us',
                //     route: '/contact',
                // },
            ],
            showFooter: true,
            lastScrollPosition: 0,
            alignments: ['start', 'center', 'end'],
            // miniSideBar: true,
            drawer: false,
            group: null,
            icons: ['mdi-home', 'mdi-email', 'mdi-calendar', 'mdi-delete'],
        }
    },
    computed: {
        loading() {
            return this.$store.getters['loading']
        },
        authUser() {
            return this.$store.getters['auth/authUser']
        },
        theme() {
            return this.$vuetify.theme.dark ? 'dark' : 'light'
            // if (this.authUser) {
            //     return this.authUser.user_preferences?.theme
            // } else {
            //     return 'light'
            // }
        },
        snackbars() {
            return this.$store.getters['snackbars']
        },
        loginModal() {
            return this.$store.getters['loginModal']
        },
    },
    methods: {
        // refreshToken () {
        //     this.$store.dispatch('setSnackbar', { show: true, showRefreshTokenButton: true, color: 'error', timeout: 5000, top: true, right: true })
        // },
        switchToLogin() {
            this.registerModal = false
            this.$store.commit('OPEN_LOGIN_MODAL')
        },
        switchToRegister() {
            this.$store.commit('CLOSE_LOGIN_MODAL')
            this.registerModal = true
        },
        switchToForgotPassword() {
            this.$store.commit('CLOSE_LOGIN_MODAL')
            this.forgotPasswordModal = true
        },
        openLoginModal() {
            this.$store.commit('CLEAR_ERROR')
            this.$store.commit('SET_LOADING', false)
            this.$store.commit('OPEN_LOGIN_MODAL')
        },
        closeLoginModal() {
            this.$store.commit('CLOSE_LOGIN_MODAL')
        },
        openRegisterModal() {
            this.$store.commit('CLEAR_ERROR')
            this.$store.commit('SET_LOADING', false)
            this.registerModal = true
        },
        closeRegisterModal() {
            this.registerModal = false
        },
        async logoutUser() {
            await this.$store.dispatch('auth/logoutUser')
            // new Noty({
            //     type: 'success',
            //     text: 'You have successfully logged out!',
            //     timeout: 5000,
            //     theme: 'metroui',
            // }).show()
            // this.$router.replace('/')
            // this.$router.replace({ name: 'index___en' })
        },
        onScroll() {
            // Get the current scroll position
            const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
            // Because of momentum scrolling on mobiles, we shouldn't continue if it is less than zero
            if (currentScrollPosition < 0) {
                return
            }

            // Stop executing this function if the difference between
            // current scroll position and last scroll position is less than some offset
            if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 60) {
                return
            }
            // Here we determine whether we need to show or hide the footer
            this.showFooter = currentScrollPosition < this.lastScrollPosition
            // Set the current scroll position as the last scroll position
            this.lastScrollPosition = currentScrollPosition
        },
        abc(index) {
            console.log('abc: ', index)
            // snackbars[index]['show'] = false
            this.$store.commit('REMOVE_SNACKBAR', { index })
        },
    },
    watch: {
        group() {
            this.drawer = false
        },
    },
}
</script>

<style scoped>
[v-cloak] {
    display: none;
}
#app {
    background: url('/images/svg/background.svg');
    background-repeat: no-repeat;
    background-position: center top;
    background-size: 100% auto;
}
@media only screen and (min-width: 992px) {
}

.link {
    text-decoration: none;
    color: #fff;
}
.sidebar {
    color: #fff;
    background: var(--v-primary-lighten1);
}
.menu-text {
    text-decoration: none;
    color: #fff;
    padding: 0.5em 0.5em;
    font-size: 1.2em;
}
.menu-button {
    text-decoration: none;
    padding: 0.5em 0.5em;
    color: #fff;
    font-size: 1.2em;
    font-weight: 2em;
}
.menu-button:hover {
    cursor: pointer;
    color: var(--v-secondary-base);
}
.nuxt-link-exact-active {
    color: var(--v-secondary-base);
}
.padding-left__small {
    padding-left: 56px;
}
.padding-left__big {
    padding-left: 256px;
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
