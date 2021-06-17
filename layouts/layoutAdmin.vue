<template>
    <v-app id="app">
        <v-navigation-drawer v-model="drawer" app clipped>
            <v-list dense>
                <v-list-item to="/admin" link ripple>
                    <v-list-item-action>
                        <v-icon>mdi-view-dashboard</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Dashboard</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item to="/admin/users" link ripple>
                    <v-list-item-action>
                        <v-icon>mdi-account</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Users</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
				<v-list-item to="/" ripple>
                    <v-list-item-action>
                        <v-icon>mdi-arrow-left</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Back to site</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
				<v-list-item @click="logoutUser()" ripple>
                    <v-list-item-action>
                        <v-icon>mdi-logout</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Logout</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app clipped-left>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>LoginMyCV Admin</v-toolbar-title>
        </v-app-bar>

        <v-content>
            <v-container>
                <nuxt />
            </v-container>
        </v-content>

        <v-footer app>
            <span>&copy; 2020</span>
        </v-footer>
    </v-app>
</template>

<script>
export default {
    head: {
        meta: [{ name: 'robots', content: 'noindex' }]
    },
    name: 'layoutAdmin',
    middleware: ['authAdmin'],
    props: {
        source: String
    },

    data: () => ({
        drawer: null
    }),

    created() {
        this.$vuetify.theme.dark = true
	},
	computed: {
		authUser () {
			return this.$store.getters['auth/authUser']
		}
	},
	methods: {
		async logoutUser() {
            console.log('logoutUser')
            // await this.$store.dispatch('firebase-auth/signOut')
            await this.$store.dispatch('auth/logoutUser')
            // new Noty({
            //     type: 'success',
            //     text: "You've been successfully logged out!",
            //     timeout: 5000,
            //     theme: 'metroui'
            // }).show()
            this.$router.replace('/')
        }
	}
}
</script>
