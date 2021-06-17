<template>
    <v-app v-cloak class="background-color" :style="cssProps" style="">
        <v-container class="" style="border: 0px solid red; margin-top: 0px">
            <p style="color: #000;">
            <!-- drawer: {{ drawer }}<br /><br /> -->
            <!-- resume: {{ resume }}<br /><br /> -->
            </p>

            <!--<v-navigation-drawer v-model="drawer" :expand-on-hover="true" :mini-variant="true" fixed dark>
                <v-list dense nav class="py-0">
                    <v-list-item two-line class="px-0">
                        <v-list-item-avatar>
                            <img src="https://randomuser.me/api/portraits/men/81.jpg" />
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title></v-list-item-title>
                            <v-list-item-subtitle>Subtext</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>

                    <v-divider></v-divider>

                    <v-list-item v-for="item in menuItems" :key="item.title" link v-scroll-to="{ el: `${item.anchor}` }">
                        <v-list-item-icon>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>-->

            <span class="text-color">
                <!-- resume: {{ resume }}<br /><br /> -->
                <!-- resume.colors: {{ resume.colors }}<br /><br /> -->
                <!-- isTemplateModel: {{ isTemplateModel }}<br /><br /> -->
                <!-- files: {{ files }}<br /><br /> -->
            </span>
            <!--<div v-scroll-spy="{ offset: 150 }">-->

            <!-- <v-row no-gutters style="margin-left: 56px;"> -->
            <v-row no-gutters class="my-5 section" id="top" style="">
                <v-col cols="12" sm="8" offset-sm="2">
                    <v-row no-gutters>
                        <v-col cols="12" :sm="profilePicture ? '6' : '12'" class="">
                            <v-chip class="primary-color-background text-color rounded-border py-2 px-3" v-if="resume.personal_data.greeting_phrase"
                                ><b>{{ resume.personal_data.greeting_phrase }}</b> </v-chip
                            ><br /><br />
                            <h1 id="fullName" :class="[profilePicture ? '' : 'text-center']">
                                {{ resume.personal_data.firstname }} {{ resume.personal_data.middlename ? resume.personal_data.middlename : '' }} {{ resume.personal_data.lastname }}
                            </h1>
                            <h2 :class="[profilePicture ? '' : 'text-center']">{{ resume.job_title }}</h2>
                            <br />

                            <div class="mb-1" :class="[profilePicture ? '' : 'text-center']"><font-awesome-icon :icon="['fas', 'envelope']" class="icon" />{{ resume.personal_data.email }}</div>
                            <div class="mb-1" :class="[profilePicture ? '' : 'text-center']" v-if="resume.personal_data.phone_number">
                                <font-awesome-icon :icon="['fas', 'phone']" class="icon" /> {{ resume.personal_data.phone_number }}
                            </div>
                            <div class="mb-1" :class="[profilePicture ? '' : 'text-center']">
                                <font-awesome-icon :icon="['fas', 'map-marker']" class="icon" /> {{ resume.personal_data.city }},
                                {{ resume.personal_data.country ? resume.personal_data.country.name : null }}
                            </div>
                            <div class="mb-1" :class="[profilePicture ? '' : 'text-center']" v-if="resume.personal_data.nationalities">
                                <font-awesome-icon :icon="['fas', 'flag-usa']" class="icon" />
                                <span v-for="(nationality, index) in resume.personal_data.nationalities" :key="index">
                                    {{ nationality.name }}<span v-if="index + 1 < resume.personal_data.nationalities.length">, </span>
                                </span>
                            </div>
                            <div class="mb-1" :class="[profilePicture ? '' : 'text-center']" v-if="resume.languages">
                                <font-awesome-icon :icon="['fas', 'language']" class="icon" />
                                <span v-for="(language, index) in resume.languages" :key="index"> {{ language.name }}<span v-if="index + 1 < resume.languages.length">, </span> </span>
                            </div>
                            <br />
                            <v-row justify="center">
                                <!-- <v-hover v-slot="{ hover }"> -->
                                    <v-chip
                                        label
                                        class="social-link"
                                        @click="redirectTo(social_network.link)"
                                        v-for="(social_network, index) in resume.social_networks"
                                        :key="index"
                                    >
                                        <font-awesome-icon :icon="['fab', social_network.icon]" size="2x" class="" />
                                    </v-chip>
                                <!-- </v-hover> -->
                            </v-row>
                        </v-col>
                        <v-col cols="6" v-if="profilePicture">
                            <v-row justify="center">
                                <v-avatar size="350" color="grey lighten-4">
                                    <v-img :src="profilePicture.downloadUrl" :lazy-src="profilePicture.downloadUrl" alt="Profile picture" />
                                </v-avatar>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>

            <!-- Section About -->
            <v-row no-gutters id="about" class="my-5 section" v-if="resume.personal_data.short_description">
                <v-col cols="12" sm="8" offset-sm="2">
                    <v-row align="center">
                        <v-col cols="12" sm="6" class="hidden-xs-only pr-5">
                            <v-img src="/images/ab-img.png"></v-img>
                        </v-col>
                        <v-col cols="12" sm="6" class="">
                            <h2>{{ (resume.menus && resume.menus['presentation']) || 'Presentation' }}</h2>
                            <p>{{ resume.personal_data.short_description }}</p>
                            <v-chip class="skill" v-for="(competence, index) in resume.key_competences" :key="index">{{ competence.name }}</v-chip>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>

            <!-- Section Education & Work experience -->
            <v-row no-gutters class="my-10 section" id="education">
                <v-col cols="12" sm="4" offset-sm="1" class="pr-4">
                    <h1 class="text-center">{{ (resume.menus && resume.menus['education']) || 'Education' }}</h1>
                    <br />
                    <v-card tile hover class="card" v-for="education in resume.education" :key="education.title">
                        <v-card-title class="card-title">
                            <span class="font-weight-bold no-break">{{ education.title }}&nbsp;</span
                            ><span class="font-weight-regular no-break">from&nbsp;<span class="primary-color-text font-italic">{{ education.school }}</span></span>
                        </v-card-title>
                        <v-card-text class="card-text text-color">
                            <p class="primary-color-text font-italic" v-if="!education.end_date">{{ education.start_date }}</p>
                            <p class="primary-color-text font-italic" v-else>{{ education.start_date }} - {{ education.end_date }}</p>
                            <p class="text-color">{{ education.description }}</p>
                        </v-card-text>
                    </v-card>
                </v-col>

                <v-col cols="12" sm="4" offset-sm="2" class="pl-4">
                    <h1 class="text-center">{{ (resume.menus && resume.menus['work_experience']) || 'Work experience' }}</h1>
                    <br />
                    <v-card class="card" v-for="(work_experience, index) in resume.work_experience" :key="index">
                        <v-card-title class="card-title">
                            <span class="font-weight-bold no-break">{{ work_experience.job_title }}&nbsp;</span>
                            <span class="font-weight-regular no-break">at&nbsp;<span class="primary-color-text font-italic no-break">{{ work_experience.company }}</span></span>
                        </v-card-title>
                        <v-card-text class="card-text">
                            <p class="primary-color-text font-italic" v-if="!work_experience.end_date">{{ work_experience.start_date }}</p>
                            <p class="primary-color-text font-italic" v-else>{{ work_experience.start_date }} - {{ work_experience.end_date }}</p>
                            <p class="text-color">{{ work_experience.job_description }}</p>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>

            <!-- Section Skills  -->
            <v-row no-gutters id="skills" class="my-10 section">
                <v-col cols="12" sm="8" offset-sm="2">
                    <h1 class="text-center">{{ (resume.menus && resume.menus['skills']) || 'Skills' }}</h1>
                    <br />
                    <v-card class="secondary-color-background">
                        <v-row justify="center">
                            <v-col cols="12" md="8" class="pa-3 text-center" v-for="(skill, index) in skills" :key="index">
                                <div>
                                    <h2 class="text-center mb-3">{{ skill[0].category }}</h2>
                                    <v-row no-gutters justify="center" align="center">
                                        <v-col cols="12" lg="6" class="mx-0 px-2" v-for="s in skill" :key="s.name">
                                            <div v-if="s.type === 'pie'">
                                                <v-row no-gutters justify="center">
                                                    <v-col cols="6">
                                                        <v-progress-circular :rotate="270" :size="100" :width="5" :value="s.value" :color="resume.colors.primary" style="border-radius: 50px">
                                                            {{ s.value }}% </v-progress-circular
                                                        ><br /><br />
                                                        <span class="no-break">{{ s.name }}</span>
                                                    </v-col>
                                                </v-row>
                                            </div>
                                            <div class="mb-4" v-else>
                                                <v-progress-linear :color="resume.colors.primary" height="15" :value="s.value" style="border-radius: 10px" class="mb-3"></v-progress-linear>
                                                <v-row no-gutters class="pb-0">
                                                    <v-col class="text-left">
                                                        <span class="no-break">{{ s.name }}</span>
                                                    </v-col>
                                                    <v-col class="text-right">
                                                        <span>{{ s.value }}%</span>
                                                    </v-col>
                                                </v-row>
                                            </div>
                                        </v-col>
                                    </v-row>
                                </div>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>

            <!-- Section Files -->
            <v-row id="files" class="my-10 section" v-if="files && files.length > 0">
                <v-col cols="12" sm="8" offset-sm="2">
                    <h1 class="text-center">{{ (resume.menus && resume.menus['files']) || 'Files' }}</h1>
                    <br />
                    <v-row no-gutters justify="center">
                        <v-col cols="6" md="4" lg="3" class="pa-2" v-for="(file, index) in files" :key="index">
                            <v-hover v-slot:default="{ hover }">
                                <v-card :elevation="hover ? '12' : '0'" @click="downloadFile(file)" class="secondary-color-background">
                                    <v-card-title class="">
                                        <v-row justify="center">
                                            <h6 class="text-center text-color">{{ file.title }}</h6>
                                        </v-row>
                                    </v-card-title>
                                    <v-card-text class="text-center">
                                        <font-awesome-icon :icon="['fas', 'file-pdf']" size="5x" :class="[hover ? 'tertiary-color' : 'primary-color-text']" /><br />
                                    </v-card-text>
                                </v-card>
                            </v-hover>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>

            <!-- Section Contact -->
            <v-row no-gutters id="contact" class="my-5 section" v-if="resume.parameters && resume.parameters.show_contact_form">
                <v-col cols="12" sm="8" offset-sm="2">
                    <h1 class="text-center">{{ (resume.menus && resume.menus['contact']) || 'Contact' }}</h1>
                    <br /><br />
                    <v-form>
                        <v-row no-gutters>
                            <v-col cols="6" class="pr-3">
                                <v-text-field
                                    outlined
                                    :label="resume.fields['firstname'] || 'Firstname'"
                                    :data-vv-as="resume.fields['firstname'] || 'Firstname'"
                                    v-model="contactForm.firstname"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" class="pl-3">
                                <v-text-field
                                    outlined
                                    dark
                                    :label="resume.fields['lastname'] || 'Lastname'"
                                    :data-vv-as="resume.fields['lastname'] || 'Lastname'"
                                    :color="resume.colors.primary"
                                    :background-color="resume.colors.primary"
                                    v-model="contactForm.lastname"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea
                                    outlined
                                    dark
                                    :label="resume.fields['message'] || 'Message'"
                                    :data-vv-as="resume.fields['message'] || 'Message'"
                                    :color="resume.colors.primary"
                                    :background-color="resume.colors.primary"
                                    v-model="contactForm.message"
                                ></v-textarea>
                            </v-col>
                            <v-btn rounded block large class="white--text" style="padding-top: 0px; padding-bottom: 0px" :color="resume.colors.primary" @click.prevent="sendMessage">{{
                                resume.fields['send_message'] || 'Send message'
                            }}</v-btn>
                        </v-row>
                    </v-form>
                </v-col>
            </v-row>
            <br />
            <!-- <Snackbar></Snackbar> -->
        </v-container>

        <v-footer :color="resume.colors.primary" class="white--text justify-center py-4" v-if="resume.colors">
            <nuxt-link to="/" class="link">
                <v-row no-gutters justify="center" align="center">
                    <img src="/images/logo_small.png" width="30" />&nbsp;
                    <span class="title">LoginMyCV</span>
                </v-row>
            </nuxt-link>
        </v-footer>
    </v-app>
    <!-- </div> -->
</template>

<script>
import moment from 'moment'
import fileDownload from 'js-file-download' // Download data file
// import Snackbar from '~/components/Snackbar'

export default {
    name: 'Template002',
    components: { },
    props: ['resume', 'isTemplateModel'],
    mounted() {
        // this.resume.color.primary = this.colors.resume.color.primary
        // this.secondaryColor = this.colors.secondaryColor
        // this.tertiaryColor = this.colors.tertiaryColor
        // this.backgroundColor = this.colors.backgroundColor
        // this.textColor = this.colors.textColor
    },
    // beforeDestroy () {
    //   this.drawer = null
    // },
    data() {
        return {
            sidemenu: false,
            drawer: null,
            contactForm: {
                valid: true,
                firstname: '',
                lastname: '',
                email: '',
                message: '',
            },
            menuItems: [
                { title: 'Top', anchor: '#top', icon: 'mdi-view-dashboard' },
                { title: 'Education', anchor: '#education', icon: 'mdi-image' },
                { title: 'Skills', anchor: '#skills', icon: 'mdi-help-box' },
                { title: 'Files', anchor: '#files', icon: 'mdi-help-box' },
                { title: 'Contact', anchor: '#contact', icon: 'mdi-help-box' },
            ]
        }
    },
    computed: {
        cssProps() {
            return {
                '--primary-color': this.resume.colors?.primary,
                '--secondary-color': this.resume.colors?.secondary,
                '--tertiary-color': this.resume.colors?.tertiary,
                '--background-color': this.resume.colors?.background,
                '--text-color': this.resume.colors?.text,
            }
        },
        authUser () {
            return this.$store.getters['auth/authUser']
        },
        errors() {
            return this.$store.getters['errors']
        },
        skills() {
            if (this.resume.skills) {
                const res = this.resume.skills.reduce((acc, curr) => {
                    if (!acc[curr.category]) acc[curr.category] = [] //If this type wasn't previously stored
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
                return this.resume.uploads.filter((file) => file.category === 'downloadable_file')
            }
            return []
        },
        profilePicture() {
            if (this.resume.uploads) {
                return this.resume.uploads.find((upload) => upload.category === 'profile_picture')
            }
            return null
        },
    },
    methods: {
        async downloadFile(file) {
            try {
                const data = await this.$store.dispatch('resumes/fetchUserFile', {fileName: file.name, fileId: file._id, resumeId: this.resume.id, resumeUserId: this.resume.user, authUserId: this.authUser.id })
                fileDownload(data.Body, file.name.substring(file.name.indexOf('_') + 1))
            } catch (error) {
                console.log('error: ', error)
                this.$notifier.showMessage({ content: 'Unable to download requested file.', color: 'error'})
            }
        },
        calculateAge(birthday) {
            return moment().diff(birthday, 'years')
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
    },
}
</script>

<style scoped>
[v-cloak] {
    display: none;
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
    /*background-color: #000;*/
}
.text-color {
    color: var(--text-color);
}
/*.abc {
  background-color: #000;
}*/
.nav-item {
    color: #fff;
    text-decoration: none;
    font-size: 1.5em;
    font-weight: bolder;
    margin: 0px 20px;
    color: var(--primary-color-text);
}
.nav-item:hover {
    padding-bottom: 10px;
    cursor: pointer;
    color: var(--text-color);
}
.custom-active {
    padding-bottom: 10px;
    border-bottom: white solid 1px;
}
.label {
    margin-top: 5px;
    margin-right: 10px;
}
.label:hover {
    background-color: var(--primary-color-text);
}
#fullName {
    color: var(--primary-color-text);
}
.button {
    padding-top: 0px;
    padding-bottom: 0px;
}
.icon {
    margin-right: 10px;
}
.icon:hover {
    color: var(--primary-color-text);
}
.social-link {
    background-color: var(--primary-color) !important;
    margin: 0 10px;
}
.social-link:hover {
    background-color: var(--tertiary-color) !important;
    /*background-color: yellow;*/
    /*color: var(--text-color);*/
    /* color: pink; */
    cursor: pointer;
}

.skill {
    background-color: var(--background-color);
    color: var(--text-color);
    border: 1px solid var(--primary-color-text);
    border-radius: 4px;
}
.skill:hover {
    background-color: var(--primary-color-text);
}
.link {
    color: #fff;
    text-decoration: none;
}
.toolbar {
    display: inline;
    background: var(--secondary-color);
}
.section {
    color: var(--text-color);
}
.card {
    color: var(--text-color);
    background-color: var(--secondary-color);
    padding: 5px 0px;
    margin: 20px 0px;
}
.card-title {
    padding: 20px 20px;
    font-size: 1.3em;
}
.card-text {
    padding: 0px 20px;
}
.card-date {
    color: var(--primary-color);
    font-weight: 500;
    padding: 10px 0px;
}

.accentuate {
    font-weight: 500;
    white-space: nowrap;
}
.italic {
    font-style: italic;
}
.rounded-border {
    border-bottom-left-radius: 0px;
}
::v-deep .v-chip__content {
    cursor: pointer !important;
}
/*>>>.v-text-field--outline .v-label {
			color: var(--text-color);
		}*/
::v-deep .theme--dark.v-label {
    color: var(--text-color);
}

.no-break {

word-break: keep-all;
}
</style>
