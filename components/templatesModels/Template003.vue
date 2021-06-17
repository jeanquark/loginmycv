<template>
    <v-app :style="cssProps" v-cloak>
        <div class="fullpage-container text-color">
            <div class="button-group ma-4" v-if="resume.menus && (resume.education.length > 0 || resume.work_experience.length < 10 || resume.skills.length > 0)">
                <button type="button" :class="{active:index == 0}" @click="moveTo(0)">{{ resume.menus.presentation ? resume.menus.presentation : 'Presentation' }}</button>
                <button type="button" :class="{active:index == 1}" @click="moveTo(1)" v-if="resume.education && resume.education.length > 0">{{ resume.menus.education ? resume.menus.education : 'Education'}}</button>
                <button type="button" :class="{active:index == 2}" @click="moveTo(2)" v-if="resume.work_experience && resume.work_experience.length > 0">{{ resume.menus.work_experience ? resume.menus.work_experience : 'Work experience' }}</button>
                <button type="button" :class="{active:index == 3}" @click="moveTo(3)" v-if="resume.skills && resume.skills.length > 0">{{ resume.menus.skills ? resume.menus.skills : 'Skills' }}</button>
                <button type="button" :class="{active:index == 4}" @click="moveTo(4)">{{ resume.menus.contact ? resume.menus.contact : 'Contact' }}</button>
            </div>

            <div class="fullpage-wp" v-fullpage="opts" ref="fullpage">
                <!-- Section Personal Data -->
                <div class="page page-1" data-index="0" style="max-height: 100%; overflow-y: hidden;" ref="page">
                    <!-- resume: {{ resume }}<br /><br /> -->
                    <!-- isTemplateModel: {{ isTemplateModel }}<br /><br /> -->
                    <!-- index: {{ index }}<br /><br /> -->

                    <v-row no-gutters align="center" class="subpage" v-animate="{value: animationEffect}" style="">
                    <!-- <v-row no-gutters align="center" class="subpage" v-animate="{value: animationEffect}" style="height: 100%; border: 1px solid green;"> -->
                        <v-col cols="12" class="text-center pa-3 rounded-border" style="">
                            <v-row no-gutters justify="center">
                                <v-col cols="12" sm="6" class="text-center" v-if="profilePicture">
                                    <v-avatar :tile="false" :size="300" color="grey lighten-4">
                                        <v-img :src="profilePicture.downloadUrl" :lazy-src="profilePicture.downloadUrl" alt="profile picture" />
                                    </v-avatar>
                                </v-col>
                            </v-row>
                            <h1 class="primary-color-text">{{ resume.personal_data.firstname }} {{ resume.personal_data.middlename }} {{ resume.personal_data.lastname }}</h1><br />
                            <h2>{{ resume.job_title }}</h2><br />
                            <h4>{{ resume.job_description }}</h4>
                            <br /><br />
                            <v-row no-gutters justify="center" align="center" class="text-big">
                                <v-col cols="4" class="mb-3 text-center" v-if="resume.personal_data.city || resume.personal_data.country">
                                    <div v-if="resume.personal_data.city">
                                        <font-awesome-icon :icon="['fas', 'map-marker']" size="1x" /> {{ resume.personal_data.city }}, {{ resume.personal_data.country.name }}
                                    </div>
                                    <div v-else>
                                        <font-awesome-icon :icon="['fas', 'map-marker']" size="1x" /> {{ resume.personal_data.country.name }}
                                    </div>
                                </v-col>
                                <v-col cols="4" class="mb-3 text-center" v-if="resume.personal_data.email">
                                    <font-awesome-icon :icon="['fas', 'envelope']" size="1x" class="icon" /> {{ resume.personal_data.email }}
                                </v-col>
                                <v-col cols="4" class="mb-3" v-if="resume.personal_data.phone_number">
                                    <font-awesome-icon :icon="['fas', 'phone']" size="1x" class="icon" /> {{ resume.personal_data.phone_number }}
                                </v-col>
                                <v-col cols="4" class="mb-3" v-if="resume.personal_data.nationalities">
                                    <font-awesome-icon :icon="['fas', 'flag-usa']" size="1x" class="icon" />
                                    <span v-for="(nationality, index) in resume.personal_data.nationalities" :key="index">
                                        {{ nationality.name }}<span v-if="index + 1 < resume.personal_data.nationalities.length">, </span>
                                    </span>
                                </v-col>
                                <v-col cols="4" class="mb-3" v-if="resume.languages">
                                    <font-awesome-icon :icon="['fas', 'language']" size="1x" class="icon" />
                                    <v-chip :color="resume.colors.primary" class="px-2 py-1 ma-2 text-background-color" v-for="(language, index) in resume.languages" :key="index">
                                        {{ language.name }}
                                        <v-progress-linear :color="getLanguageLevelColor(language.value)" height="10" :value="language.value" bottom style="width: 30px; transform: rotate(-90deg);" v-if="language.value"></v-progress-linear>
                                    </v-chip>
                                </v-col>
                                <v-col cols="4" class="text-center" v-if="resume.social_networks">
                                    <font-awesome-icon :icon="['fab', social_network.icon]" size="2x" v-for="(social_network, index) in resume.social_networks" :key="index" @click="redirectTo(social_network.link)" class="social-link mx-3" />
                                </v-col>
                            </v-row>
                            <!--<v-row no-gutters class="mt-3 pa-4 centered" style="">
                                <div class="text-center mx-4" v-for="(file, index) in files" :key="index">
                                    <font-awesome-icon :icon="['fas', 'file-pdf']" size="5x" class="social-link" @click="redirectTo(file.downloadUrl)" />
                                    <br />
                                    <p>{{ file.name }}</p>
                                </div>
                            </v-row>-->
                        </v-col>
                    </v-row>
                </div>

                <!-- Section Education -->
                <div class="page page-2" data-index="1" style="">
                    <v-row no-gutters align="center" justify="center" class="subpage" v-if="resume.education && resume.education.length > 0" v-animate="{value: animationEffect}" style="">
                        <!-- index: {{ index }}<br /><br /> -->

                        <v-col cols="12" sm="6" md="4" v-for="education in resume.education" :key="education.title" class="pa-2" style="">
                            <v-card class="card text-color secondary-color-background">
                                <v-card-title class="card-title">
                                    <span class="text-color font-weight-bold">{{ education.title }}</span>&nbsp;from&nbsp;<span class="primary-color-text font-weight-bold font-italic">{{ education.school }}</span><br />
                                </v-card-title>
                                <v-card-text class="card-text text-color" style="">
                                    <p class="text-color" v-if="!education.end_date">{{ education.start_date }}</p>
                                    <p class="text-color" v-else>{{ education.start_date }} - {{ education.end_date }}</p>
                                    <p class="text-color">{{ education.description }}</p>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </div>

                <!-- Section Work experience -->
                <div class="page page-3" data-index="2" style="">
                    <v-row no-gutters align="center" justify="center" class="subpage" style="" v-if="resume.work_experience && resume.work_experience.length > 0">
                        <!-- index: {{ index }}<br /><br /> -->
                        <v-col cols="12" sm="6" md="4" v-for="(work_experience, index) in resume.work_experience" :key="index" v-animate="{value: animationEffect}" class="pa-2" style="">
                            <v-card class="card secondary-color-background" style="">
                                <v-card-title class="card-title text-color">
                                    <span class="font-weight-bold">{{ work_experience.job_title }}</span>&nbsp;at&nbsp;<span class="primary-color-text font-weight-bold font-italic">{{ work_experience.company }}</span><br />
                                </v-card-title>
                                <v-card-text class="card-text text-color">
                                    <p class="text-color font-italic" v-if="!work_experience.end_date">{{ work_experience.start_date }}</p>
                                    <p class="text-color font-italic" v-else>{{ work_experience.start_date }} - {{ work_experience.end_date }}</p>
                                    <p class="text-color">{{ work_experience.job_description }}</p>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </div>

                <!-- Section Skills -->
                <div class="page page-4" data-index="3" style="">
                    <v-row no-gutters align="center" justify="center" class="subpage" style="" v-animate="{value: animationEffect}" v-if="resume.skills && resume.skills.length > 0">
                        <v-col cols="12" sm="6" v-for="skill in skills" :key="skill.slug" class="pa-4 text-center" style="">
                            <h2 class="text-center mb-2">{{ skill[0].category }}</h2>
                            <v-row no-gutters justify="center">
                                <v-col cols="12" sm="6" class="my-4 mx-0 px-3" v-for="s in skill" :key="s.name">
                                    <div v-if="s.type === 'pie'" class="">
                                        <v-progress-circular :rotate="270" :size="100" :width="10" :value="s.value" :color="resume.colors.secondary" class="pie">
                                            <span class="text-color">{{ s.value }}%</span>
                                        </v-progress-circular><br /><br />
                                        {{ s.name }}
                                    </div>
                                    <div v-else class="">
                                        <v-row no-gutters>
                                            <v-col class="text-left py-2">
                                                <span>{{ s.name }}</span>
                                            </v-col>
                                            <v-col class="text-right py-2">
                                                <span>{{ s.value }}%</span>
                                            </v-col>
                                        </v-row>
                                        <v-progress-linear :color="resume.colors.secondary" height="20" :value="s.value" class="bar"></v-progress-linear>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </div>

                <!-- Section Contact -->
                <div class="page page-5" data-index="4" style="">
                    <v-row no-gutters align="center" justify="center" class="subpage" style="" v-animate="{value: animationEffect}">
                        <v-col cols="12" sm="8" offset-sm="2" class="pa-4" style="">
                            <v-form style="">
                                <v-row no-gutters>
                                    <v-col cols="6" class="pr-3">
                                        <v-text-field outlined name="firstname_template3" :label="resume.fields && resume.fields['firstname'] || 'Firstname'" :rules="contactForm.firstnameRules" v-model="contactForm.firstname"></v-text-field>
                                    </v-col>
                                    <v-col cols="6" class="pl-3">
                                        <v-text-field outlined name="lastname_template3" :label="resume.fields && resume.fields['lastname'] || 'Lastname'" :rules="contactForm.lastnameRules" v-model="contactForm.lastname"></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field outlined dark name="email_template3" :label="resume.fields && resume.fields['email'] || 'Email'" :rules="contactForm.emailRules" v-model="contactForm.email"></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-textarea outlined dark name="message_template3" :label="resume.fields && resume.fields['message'] || 'Message'" :rules="contactForm.messageRules" v-model="contactForm.message"></v-textarea>
                                    </v-col>
                                    <v-btn rounded block large class="white--text pt-0 pb-0" :color="resume.colors.primary">{{ resume.fields && resume.fields['send_message'] || 'Send message' }}</v-btn>
                                </v-row>
                            </v-form>
                        </v-col>
                    </v-row>
                </div>
            </div>
        </div>
    </v-app>
</template>

<script>
	import moment from 'moment'
	export default {
        name: 'Template003',
        props: ['resume', 'isTemplateModel'],
        head() {
            return {
                title: this.title,
                meta: [{ hid: 'description', name: 'description', content: 'Ma description personnalisée' }],
                link: [{ rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css' }]
            }
        },
        mounted() {
            // this.primaryColor = this.resume.colors && this.resume.colors.primaryColor ? this.resume.colors.primaryColor : '#7A528F'
            // this.secondaryColor = this.resume.colors && this.resume.colors.secondaryColor ? this.resume.colors.secondaryColor : '#202026'
            // this.tertiaryColor = this.resume.colors && this.resume.colors.tertiaryColor ? this.resume.colors.tertiaryColor : '#424242'
            // this.backgroundColor = this.resume.colors && this.resume.colors.backgroundColor ? this.resume.colors.backgroundColor : '#7A528F'
            // this.textColor = this.resume.colors && this.resume.colors.textColor ? this.resume.colors.textColor : '#FFF'
            // this.profilePicture = this.resume.uploads.find(upload => upload.type === 'profile_picture')
        },
        data() {
            return {
                index: 0,
                pageNum: 0,
                opts: {
                    start: 0,
                    dir: 'v',
                    loop: false,
                    duration: 300,
                    beforeChange: (el, current, next) => {
                        console.log('beforeChange', current, next)
                        // this.index = next
                    },
                    afterChange: (el, current) => {
                        // this.index = current
                        console.log('afterChange', current)
                        console.log('this.index: ', this.index)
                        this.index = current
                    }
                },
                contactForm: {
                    firstname: '',
                    lastname: '',
                    email: '',
                    message: ''
                },
                // primaryColor: '',
                // secondaryColor: '',
                // tertiaryColor: '',
                // backgroundColor: '',
                // textColor: '',
                profilePicture: {},
                column: 6,
                animationEffect: 'zoomIn'
            }
        },
        computed: {
            cssProps() {
                return {
                    '--primary-color': this.resume.colors.primary,
                    '--secondary-color': this.resume.colors.secondary,
                    '--tertiary-color': this.resume.colors.tertiary,
                    '--background-color': this.resume.colors.background,
                    '--text-color': this.resume.colors.text
                }
            },
            loading() {
                return this.$store.getters['loading']
            },
            errors() {
                return this.$store.getters['errors']
            },
            snackbar() {
                return this.$store.getters['snackbar']
            },
            clearSnackbar() {
                return this.$store.commit('clearSnackbar', false, { root: true })
            },
            skills() {
                if (this.resume.skills) {
                    const res = this.resume.skills.reduce((acc, curr) => {
                        if (!acc[curr.category]) acc[curr.category] = [] // If this type wasn't previously stored
                        acc[curr.category].push(curr)
                        return acc
                    }, {})
                    return res
                }
            },
            nationalities() {
                if (this.resume.personal_data.nationalities) {
                    return this.resume.personal_data.nationalities.slice(0).sort((a, b) => a.priority - b.priority)
                }
            },
            languages() {
                if (this.resume.languages) {
                    return this.resume.languages.slice(0).sort((a, b) => b.level - a.level)
                }
            },
            files() {
                if (this.resume.uploads) {
                    return this.resume.uploads.filter(file => file.type === 'downloadable_file')
                }
            },
            presentationColumns() {
                if (this.files && this.files.length > 0) {
                    return 6
                }
                return 12
            }
        },
        methods: {
            // setIndex(newIndex) {
            //     // console.log('newIndex: ', newIndex)
            //     this.index = newIndex
            // },
            moveTo: function(index) {
                console.log('moveTo: ', index)
                this.$refs.fullpage.$fullpage.moveTo(index, true)
                this.index = index
            },
            showPage: function() {
                this.pageNum++
                this.$refs.fullpage.$fullpage.$update()
            },
            calculateAge(birthday) {
                return moment().diff(birthday, 'years')
            },
            getLanguageLevelColor(level) {
                if (level < 25) {
                    return 'error'
                } else if (level <= 50) {
                    return 'warning'
                } else if (level <= 75) {
                    return 'info'
                } else {
                    return 'success'
                }
            },
            getLanguageQualitativeLevel(level) {
                console.log('level: ', level)
                if (level < 20) {
                    return 'Beginner'
                } else if (level < 40) {
                    return 'Low intermediate'
                } else if (level < 60) {
                    return 'Intermediate'
                } else if (level < 80) {
                    return 'High intermediate'
                } else if (level < 100) {
                    return 'Advanced'
                } else if ((level = 100)) {
                    return 'Mother tongue'
                }
            },
            async sendMessage() {
                try {
                    this.$store.commit('setLoading', true)
                    await this.$validator.validateAll()
                    if (this.errors && this.errors.items && this.errors.items.length > 0) {
                        this.$store.commit('setLoading', false)
                        // new Noty({
                        //     type: 'error',
                        //     text: 'Please check validation errors.',
                        //     timeout: 5000,
                        //     theme: 'metroui'
                        // }).show()
                    } else {
                        console.log('sendMessage: ', this.form)
                        await axios.post('/send-contact-form-message', {
                            data: this.contactForm,
                            receiverAddress: this.resume.personal_data.email,
                            resumeSlug: this.resume.slug
                        })
                        this.$store.commit('setLoading', false)
                        // new Noty({
                        //     type: 'success',
                        //     text: 'Your message was sent successfully.',
                        //     timeout: 5000,
                        //     theme: 'metroui'
                        // }).show()
                        this.$store
                    }
                } catch (error) {
                    console.log('error: ', error)
                    this.$store.commit('setLoading', false)
                    // new Noty({
                    //     type: 'error',
                    //     text: 'Sorry, an error ocurred and your message could not be sent.',
                    //     timeout: 5000,
                    //     theme: 'metroui'
                    // }).show()
                }
            },
            redirectTo(link) {
                window.open(link, '_blank')
            }
        }
	}
</script>

<style scoped>
	[v-cloak] {
		display: none;
	}
	body {
		margin: 0;
	}
    h3,
    p {
        font-size: 16px;
    }
    .primary-color-text {
        color: var(--primary-color);
    }
    .primary-color-background {
        background-color: var(--primary-color);
    }
    .secondary-color-text {
        color: var(--secondary-color);
    }
    .secondary-color-background {
        background-color: var(--secondary-color);
    }
    .tertiary-color-text {
        color: var(--tertiary-color);
    }
    .tertiary-color-background {
        background-color: var(--tertiary-color);
    }
    .background-color {
         background-color: var(--background-color); 
    }
    .text-color {
        color: var(--text-color);
    }
	.fullpage-container {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}
	.page {
        height: 100%;
        overflow-y: auto;
        display: block;
		text-align: center;
		font-size: 26px;
		color: #eee;
        border: 2px solid blue;
	}
    .subpage {
        height: 100%;
        overflow-y: auto;
        /*padding-top: 80px;*/
        /*padding-bottom: 20px;*/
        border: 2px dashed orange;
    }
	.page-1 {
		padding-top: 100px;
		/*background: #1bbc9b;*/
        background-color: var(--background-color);
	}
	.page-2 {
		padding-top: 100px;
		/*background-color: rgb(75, 191, 195);*/
        background-color: var(--tertiary-color);
	}
	.page-3 {
		padding-top: 100px;
		/*background: #aabbcc;*/
        background-color: var(--background-color);
	}
    .page-4 {
        padding-top: 100px;
        background-color: var(--tertiary-color);
    }
    .page-5 {
        padding-top: 100px;
        background-color: var(--background-color);
    }

	.button-group {
		position: absolute;
		top: 10px;
		left: 10px;
		z-index: 9;
	}
	.button-group button {
		display: inline-block;
		margin: 10px;
		color: #000;
		background: #fff;
		background: rgba(255, 255, 255, 0.5);
		-webkit-border-radius: 10px;
		border-radius: 10px;
		padding: 9px 18px;
		border: none;
		outline: none;
	}
	.button-group button.active {
		background: rgba(0, 0, 0, 0.5);
		color: #fff;
	}
    .pie {
        background: var(--primary-color);
        border-radius: 50px;
    }
    .bar {
        border-radius: 10px;
        margin: 0px 0px;
    }
    .rounded-border {
        border-radius: 10px;
    }
    .social-link {
        color: var(--text-color);
    }
    .social-link:hover {
        color: var(--primary-color);
        cursor: pointer;
    }
</style>