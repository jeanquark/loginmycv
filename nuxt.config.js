// import redirectSSL from 'redirect-ssl'

export default {
	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: 'loginmycv',
		htmlAttrs: {
			lang: 'en'
		},
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: '' }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
		]
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [
	],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		'~/plugins/axios',
        // { src: '~/plugins/vue-notifications', ssr: false },
        { src: '~/plugins/vue-moment', ssr: false },
        { src: '~/plugins/vee-validate', ssr: false },
        { src: '~/plugins/vue-masonry-css', ssr: false },
        // { src: '~/plugins/notifier', ssr: false },
	],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	serverMiddleware: [
		// redirectSSL.create({enabled: process.env.NODE_ENV === 'production'}),
		'~/api/logger',
		'~/api'
	],

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		"@nuxtjs/vuetify"
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		'@nuxtjs/axios',
		'@nuxtjs/auth',
		'cookie-universal-nuxt',
		[
            'nuxt-i18n',
            {
                locales: [
                    {
                        name: 'English',
                        code: 'en',
                        iso: 'en-US',
                        file: 'en.js'
                    },
                    {
                        name: 'Français',
                        code: 'fr',
                        iso: 'fr-FR',
                        file: 'fr.js'
                    }
                ],
                // loadLanguagesAsync: true,
                parsePages: false,
                lazy: true,
                langDir: 'lang/',
                defaultLocale: 'en',
                seo: false
            }
        ],
		[
            'nuxt-fontawesome',
            {
                imports: [
                    // import whole set
                    {
                        set: '@fortawesome/free-solid-svg-icons',
                        icons: ['fas']
                    },
                    {
                        set: '@fortawesome/free-brands-svg-icons',
                        icons: ['fab']
                    }
                ]
            }
        ],
		// ['nuxt-leaflet', { /* module options */ }],
	],

	vuetify: {
		optionsPath: "./vuetify.options.js"
	},
	axios: {
		// proxyHeaders: false
		proxy: true // Important to set authorization header
	},
	auth: {
		redirect: {
			// callback: '/callback',
			logout: '/signed-out'
		},
		strategies: {
			google: {
				// https://console.developers.google.com/
				client_id: '411036483039-tk6vfv63ege4uru0b7slcas2peu6asov.apps.googleusercontent.com',
				redirect_uri: 'http://localhost:3000/callback-oauth-google'
			},
			facebook: {
				// https://developers.facebook.com/
				endpoints: {
					userInfo: 'https://graph.facebook.com/v2.12/me?fields=about,name,picture{url},email'
				},
				// client_id: '699909237207674',
				client_id: '2430445766977108',
				scope: ['public_profile', 'email'],
				redirect_uri: 'http://localhost:3000/callback-oauth-facebook'
			}
		},
		vuex: {
			namespace: 'auth-module'
		}
	},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		transpile: ['vee-validate/dist/rules'],
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {
            config.node = {
                fs: "empty"
            };
        }
	}
}
