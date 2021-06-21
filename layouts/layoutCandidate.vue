<template>
    <v-app id="app" v-cloak :style="{ backgroundColor: $vuetify.theme.themes[theme].background }">
        <v-main>
            <v-navigation-drawer :expand-on-hover="true" :mini-variant.sync="miniSideBar" fixed permanent clipped>
                <v-list dense nav class="py-0">
                    <v-list-item two-line class="px-0">
                        <v-list-item-avatar v-if="authUser && authUser.picture">
                            <img :src="authUser.picture" />
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title></v-list-item-title>
                            <v-list-item-subtitle v-if="authUser">{{ authUser.firstname }} {{ authUser.lastname }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>

                    <v-divider></v-divider>

                    <v-list-item v-for="item in menuItems" :key="item.title" :to="item.link" link>
                        <v-list-item-icon>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
                <v-layout justify-center v-if="!miniSideBar">
                    <v-icon small color="yellow" class="mr-3">mdi-moon-waning-crescent </v-icon>
                    <v-switch :inset="true" style="" v-model="lightTheme" @change="updateTheme"></v-switch>
                    <v-icon small color="yellow" class="ml-0"> mdi-white-balance-sunny </v-icon>
                </v-layout>
            </v-navigation-drawer>
            <v-container fluid :class="[miniSideBar ? 'padding-left__small' : 'padding-left__big']">
                <v-row no-gutters class="pr-5" justify="end">
                    <div class="d-inline-flex">
                        <!-- <span class="menu-text" v-if="authUser">{{ authUser.firstname }} {{ authUser.lastname }}</span> -->
                        <nuxt-link to="/" class="menu-button">Back to Site</nuxt-link>
                        <div @click="logoutUser" class="menu-button">Logout</div>
                    </div>
                </v-row>

                <nuxt />

                <Snackbars></Snackbars>
                snackbars: {{ snackbars }}<br />
                <Confirm ref="confirm"></Confirm>
            </v-container>
        </v-main>

        <v-footer app fixed class="justify-center">
            <span>LoginMyCV &copy; {{ new Date().getFullYear() }}</span>
        </v-footer>
    </v-app>
</template>

<script>
// import Noty from 'noty'
import Avatar from 'vue-avatar'
import Snackbars from '~/components/Snackbars'
import Confirm from '~/components/Confirm'

export default {
    head: {
        meta: [{ name: 'robots', content: 'noindex' }],
    },
    name: 'layoutCandidate',
    middleware: ['authUser'],
    components: { Avatar, Confirm, Snackbars },
    async created() {},
    mounted() {
        // console.log('[layoutCandidate] mounted hook')
        this.$vuetify.theme.dark = this.authUser && this.authUser.user_preferences ? this.authUser.user_preferences.dark_theme : true
        this.loading = false
        this.$root.$confirm = this.$refs.confirm
        this.lightTheme = !this.$vuetify.theme.dark
    },
    data() {
        return {
            loading: true,
            miniSideBar: true,
            lightTheme: false,
            menuItems: [
                { title: 'My Resumes', link: '/candidate/resumes', icon: 'mdi-file-account-outline', icon2: '$resume' },
                { title: 'Account', link: '/candidate/account', icon: 'mdi-account', icon2: '$account' },
            ],
            fav: true,
            menu: false,
            message: false,
            hints: true,
        }
    },
    computed: {
        theme() {
            return this.$vuetify.theme.dark ? 'dark' : 'light'
        },
        availableLocales() {
            return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
        },
        authUser() {
            return this.$store.getters['auth/authUser']
        },
        snackbars() {
            return this.$store.getters['snackbars']
        },
        getUserAuthorizationsNotifications() {
            try {
                return this.loadedUser.notifications.filter((notification) => notification.type === 'authorization').length
            } catch (error) {
                return null
            }
        },
    },
    methods: {
        updateTheme(lightTheme) {
            console.log('updateTheme: ', lightTheme)
            this.$store.dispatch('users/updateUserAccount', {
                user_preferences: {
                    dark_theme: !lightTheme,
                },
            })
            if (lightTheme) {
                this.$vuetify.theme.dark = false
            } else {
                this.$vuetify.theme.dark = true
            }
        },
        async logoutUser() {
            console.log('logoutUser')
            await this.$store.dispatch('auth/logoutUser')
            this.$store.dispatch('setSnackbar', { show: true, text: `You have been successfully logged out!`, color: 'success', top: true, right: true })
            this.$router.replace('/')
        },
    },
}
</script>

<style scoped>
#app {
    background: url('/images/svg/background-candidate.svg');
    background-repeat: no-repeat;
    background-position: center top;
    background-size: 100% auto;
}
@media only screen and (min-width: 992px) {
}
.menu-text {
    text-decoration: none;
    color: var(--v-primary-base);
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
    color: var(--v-primary-base);
}
.slide-fade-enter-active {
    transition: all 0.5s ease;
}
.slide-fade-leave-active {
    transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
}
.padding-left__small {
    padding-left: 56px;
}
.padding-left__big {
    padding-left: 256px;
}
</style>
