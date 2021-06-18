<template>
    <v-app v-cloak class="background-color" :style="cssProps">
        <v-container class="">
            <!-- Section Personal Data -->
            <v-row no-gutters class="margin-top margin-bottom">
                <v-col cols="12" sm="8" offset-sm="2">
                    <!-- resume: {{ resume }}<br /><br /> -->
                    <!-- resume.fields: {{ resume.fields && resume.fields['firstname'] }}<br /><br /> -->
                    <!-- resume2: {{ resume2 }}<br /> -->
                    <!-- resume.colors: {{ resume.colors }}<br /> -->
                    <!-- colors: {{ colors }}<br /> -->
                    <!-- isTemplateModel: {{ isTemplateModel }}<br /><br /> -->
                    <!-- primaryColor: {{ primaryColor }}<br /> -->
                    <!-- files: {{ files }}<br /> -->
                    Template001
                    <v-card elevation-10 v-if="resume.personal_data" class="secondary-color-background">
                        <v-card-text>
                            <v-row no-gutters>
                                <v-col cols="12" class="my-5">
                                    <h1 class="text-center mb-4 text-color">{{ resume.job_title }}</h1>
                                    <h3 class="text-center mb-4 px-3">{{ resume.job_description }}</h3>
                                </v-col>
                            </v-row>
                            <v-row no-gutters align="start">
                                <v-col :cols="profilePicture ? '9' : '12'">
                                    <v-row no-gutters align="center" class="text-big">
                                        <v-col cols="12" sm="6" class="pa-2">
                                            <span
                                                >{{ (resume.fields && resume.fields['firstname']) || 'Firstname' }}: <b>{{ resume.personal_data.firstname }}</b></span
                                            >
                                        </v-col>
                                        <v-col cols="12" sm="6" class="pa-2" v-if="resume.personal_data.middlename">
                                            <span
                                                >{{ (resume.fields && resume.fields['middlename']) || 'Middlename' }}: <b>{{ resume.personal_data.middlename }}</b></span
                                            >
                                        </v-col>
                                        <v-col cols="12" sm="6" class="pa-2">
                                            <span
                                                >{{ (resume.fields && resume.fields['lastname']) || 'Lastname' }}: <b>{{ resume.personal_data.lastname }}</b></span
                                            >
                                        </v-col>
                                        <v-col cols="12" sm="6" class="pa-2" v-if="resume.personal_data.birthday">
                                            <span
                                                >{{ (resume.fields && resume.fields['age']) || 'Age' }}: <b>{{ calculateAge(resume.personal_data.birthday) }}</b></span
                                            >
                                        </v-col>
                                        <v-col cols="12" sm="6" class="pa-2" v-if="resume.personal_data.city">
                                            <span
                                                >{{ (resume.fields && resume.fields['city']) || 'City' }}: <b>{{ resume.personal_data.city }}</b></span
                                            >
                                        </v-col>
                                        <v-col cols="12" sm="6" class="pa-2" v-if="resume.personal_data.country">
                                            <span
                                                >{{ (resume.fields && resume.fields['country']) || 'Country' }}: <b>{{ resume.personal_data.country.name }}</b></span
                                            >
                                        </v-col>
                                        <v-col cols="12" sm="6" class="pa-2" v-if="resume.personal_data.email">
                                            <span
                                                >{{ (resume.fields && resume.fields['email']) || 'Email' }}: <b>{{ resume.personal_data.email }}</b></span
                                            >
                                        </v-col>
                                        <v-col cols="12" sm="6" class="pa-2" v-if="resume.personal_data.phone_number">
                                            <span
                                                >{{ (resume.fields && resume.fields['phone_number']) || 'Phone number' }}: <b>{{ resume.personal_data.phone_number }}</b></span
                                            >
                                        </v-col>
                                    </v-row>
                                    <v-row no-gutters class="pa-2 text-big" v-if="resume.personal_data.nationalities || resume.languages">
                                        <v-col cols="12" sm="6" v-if="resume.personal_data.nationalities">
                                            <div v-if="resume.personal_data.nationalities.length > 0" class="text-left">
                                                <span>{{ (resume.fields && resume.fields['nationalities']) || 'Nationalities' }}:</span>
                                                <ul class="list-horizontal">
                                                    <li v-for="(nationality, index) in nationalities" :key="index">
                                                        <b>{{ nationality.name }}</b>
                                                    </li>
                                                </ul>
                                            </div>
                                        </v-col>
                                        <v-col cols="12" sm="6" class="text-center pa-2" v-if="resume.languages">
                                            <div v-if="resume.languages.length > 1" class="text-center">
                                                <div class="mb-2 text-color">{{ (resume.fields && resume.fields['languages']) || 'Languages' }}:</div>
                                                <ul class="list-horizontal">
                                                    <li v-for="(language, index) in languages" :key="index">
                                                        <b>{{ language.name }}</b>
                                                        <span v-if="resume.parameters && resume.parameters.show_languages_levels"> - {{ getLanguageQualitativeLevel(language.level) }}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div v-else>
                                                <span>{{ (resume.fields && resume.fields['language']) || 'language' }}: {{ resume.languages[0] }}</span>
                                            </div>
                                        </v-col>
                                    </v-row>
                                    <v-row no-gutters class="my-3 px-2">
                                        <v-col cols="12" v-if="resume.personal_data.short_description">
                                            <span>{{ resume.personal_data.short_description }}</span>
                                        </v-col>
                                    </v-row>
                                    <!-- <v-row no-gutters class="my-3 px-2" v-if="resume.social_networks">
                                        <v-col cols="12" class="text-center">
                                            <span v-for="(social_network, index) in resume.social_networks" :key="index" @click="redirectTo(social_network.link)">
                                                <font-awesome-icon :icon="['fab', social_network.fontawesome]" size="2x" :color="resume.colors.primary" class="social-link" />
                                            </span>
                                        </v-col>
                                    </v-row> -->
                                    <v-row no-gutters class="my-3 px-2" v-if="resume.key_competences">
                                        <v-col cols="12">
                                            {{ (resume.fields && resume.fields['key_competences']) || 'Key competences' }}
                                        </v-col>
                                    </v-row>
                                </v-col>
                                <v-col cols="3" v-if="profilePicture" style="">
                                    <v-img :src="profilePicture.downloadUrl" :lazy-src="profilePicture.downloadUrl" max-width="100%" alt="profile picture" style="maring: 0 auto;" />
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" class="text-center">
                                    <span v-for="(social_network, index) in resume.social_networks" :key="index" @click="redirectTo(social_network.link)">
                                        <font-awesome-icon :icon="['fab', social_network.icon]" size="2x" :color="resume.colors.primary" class="social-link" />
                                    </span>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>

            <!-- Section Work experience -->
            <v-row no-gutters class="margin-bottom" v-if="resume.work_experience && resume.work_experience.length > 0" style="">
                <v-col cols="12" sm="8" offset-sm="2" style="">
                    <h2 class="text-center display-1 primary-color-text">{{ (resume.menus && resume.menus['work_experience']) || 'Work Experience' }}</h2>
                    <br />
                    <v-card class="">
                        <v-expansion-panels multiple accordion v-model="openedPanels">
                            <v-expansion-panel v-for="(work_experience, index) in resume.work_experience" :key="index" style="">
                                <v-expansion-panel-header class="secondary-color-background" style="">
                                    <v-row no-gutters align="center">
                                        <h3><v-icon :color="resume.colors.primary" class="mr-2">mdi-briefcase</v-icon> {{ work_experience.job_title }} at {{ work_experience.company }}</h3>
                                    </v-row>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content class="secondary-color-background" style="">
                                    <v-card flat>
                                        <v-card-text class="tertiary-color-background">
                                            <span v-if="!work_experience.end_date">
                                                <b>{{ work_experience.city }}</b> - {{ work_experience.country }},
                                                <i>since {{ work_experience.start_date }}</i>
                                            </span>
                                            <span v-else>
                                                <b>{{ work_experience.city }}</b> - {{ work_experience.country }},
                                                <i>from {{ work_experience.start_date }} to {{ work_experience.end_date }}</i>
                                            </span>
                                            <span>{{ work_experience.job_description }}</span>
                                        </v-card-text>
                                    </v-card>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </v-card>
                </v-col>
            </v-row>

            <!-- Section Education -->
            <v-row no-gutters class="margin-bottom" v-if="resume.education && resume.education.length > 0">
                <v-col cols="12" sm="8" offset-sm="2">
                    <h2 class="text-center display-1 primary-color-text">{{ (resume.menus && resume.menus['education']) || 'Education' }}</h2>
                    <br />
                    <v-card class="secondary-color-background">
                        <v-expansion-panels multiple accordion v-model="openedPanels">
                            <v-expansion-panel v-for="(education, index) in resume.education" :key="index">
                                <v-expansion-panel-header class="tertiary-color-background">
                                    <v-row no-gutters align="center">
                                        <h3><v-icon :color="resume.colors.primary" class="mr-2">mdi-school</v-icon> {{ education.title }}, {{ education.school }}</h3>
                                    </v-row>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content class="tertiary-color-background">
                                    <v-card flat>
                                        <v-card-text class="secondary-color-background">
                                            <span v-if="!education.end_date">
                                                {{ education.city }} - {{ education.country }},
                                                <i>since {{ education.start_date }}</i>
                                            </span>
                                            <span v-else>
                                                {{ education.city }} - {{ education.country }},
                                                <i>from {{ education.start_date }} to {{ education.end_date }}</i>
                                            </span>
                                            <span>{{ education.description }}</span>
                                        </v-card-text>
                                    </v-card>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </v-card>
                </v-col>
            </v-row>

            <!-- Section Skills -->
            <v-row no-gutters class="margin-bottom" v-if="resume.skills && resume.skills.length > 0">
                <v-col cols="12" sm="8" offset-sm="2" style="border: 0px dashed green;">
                    <h2 class="text-center display-1 primary-color-text">{{ (resume.menus && resume.menus['skills']) || 'Skills' }}</h2>
                    <br />
                    <v-card class="secondary-color-background" style="border: 0px solid lightblue;">
                        <v-row no-gutters justify="center">
                            <v-col cols="12" class="text-center pa-3" v-for="(skill, index) in skills" :key="index">
                                <h3 class="text-center mb-2">{{ skill[0].category }}</h3>
                                <v-row no-gutters justify="center" align="center">
                                    <v-col cols="12" sm="12" md="12" lg="12" class="py-3" v-for="s in skill" :key="s.name" style="border: 0px solid red;">
                                        <div v-if="s.type === 'pie'">
                                            <v-progress-circular :rotate="270" :size="100" :width="15" :value="s.value" :color="resume.colors.primary" style=""> {{ s.value }}% </v-progress-circular
                                            ><br />
                                            <span :color="resume.colors.text">{{ s.name }}</span>
                                        </div>
                                        <div class="px-3" v-else>
                                            <v-row no-gutters class="my-2">
                                                <v-col class="text-left">
                                                    <span>{{ s.name }}</span>
                                                </v-col>
                                                <v-col class="text-right">
                                                    <span>{{ s.value }}%</span>
                                                </v-col>
                                            </v-row>
                                            <v-progress-linear
                                                height="15"
                                                :value="s.value"
                                                :color="resume.colors.primary"
                                                class="my-2"
                                                style="border-radius: 10px; margin: 0px 0px;"
                                            ></v-progress-linear>
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>

            <!-- Section Files -->
            <v-row no-gutters class="margin-bottom" v-if="files && files.length > 0">
                <v-col cols="12" sm="8" offset-sm="2">
                    <h2 class="text-center display-1 primary-color-text">{{ (resume.menus && resume.menus['files']) || 'Files' }}</h2>
                    <br />
                    <v-row no-gutters justify="center">
                        <v-col cols="6" md="4" lg="3" class="pa-2" v-for="(file, index) in files" :key="index">
                            <v-hover v-slot:default="{ hover }">
                                <v-card @click="downloadFile(file)" :elevation="hover ? '12' : '0'" class="secondary-color-background">
                                    <v-card-title class="">
                                        <v-row no-gutters justify="center">
                                            <h5 class="text-center text-color">{{ file.title }}</h5>
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
            <v-row no-gutters class="margin-bottom" id="contact" v-if="resume.parameters && resume.parameters.show_contact_form">
                <v-col cols="12" sm="8" offset-sm="2">
                    <h2 class="text-center display-1 primary-color-text">{{ (resume.menus && resume.menus['contact']) || 'Contact' }}</h2>
                    <br />
                    <v-card class="secondary-color-background">
                        <v-form ref="form" lazy-validation v-model="contactForm.valid">
                            <v-row class=" pa-5 ">
                                <v-col xs="6" class="pr-3">
                                    <v-text-field
                                        name="contact_firstname"
                                        :label="(resume.fields && resume.fields['firstname']) || 'Firstname'"
                                        outlined
                                        :color="resume.colors.primary"
                                        :background-color="resume.colors.tertiary"
                                        :rules="contactForm.firstnameRules"
                                        v-model="contactForm.firstname"
                                    ></v-text-field>
                                </v-col>
                                <v-col xs="6" class="pl-3">
                                    <v-text-field
                                        outlined
                                        name="contact_lastname"
                                        :label="(resume.fields && resume.fields['lastname']) || 'Lastname'"
                                        :rules="contactForm.lastnameRules"
                                        :color="resume.colors.primary"
                                        :background-color="resume.colors.tertiary"
                                        dark
                                        v-model="contactForm.lastname"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        outlined
                                        dark
                                        name="contact_email"
                                        :label="(resume.fields && resume.fields['email']) || 'Email'"
                                        :rules="contactForm.emailRules"
                                        :color="resume.colors.primary"
                                        :background-color="resume.colors.tertiary"
                                        v-model="contactForm.email"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-textarea
                                        outlined
                                        dark
                                        name="contact_message"
                                        :label="(resume.fields && resume.fields['message']) || 'Message'"
                                        :rules="contactForm.messageRules"
                                        :color="resume.colors.primary"
                                        :background-color="resume.colors.tertiary"
                                        v-model="contactForm.message"
                                    ></v-textarea>
                                </v-col>
                                <v-col cols="12">
                                    <v-btn
                                        block
                                        large
                                        rounded
                                        class="white--text"
                                        style="padding-top: 0px; padding-bottom: 0px;"
                                        :color="resume.colors.tertiary"
                                        :disabled="!contactForm.valid"
                                        @click.prevent="sendMessage"
                                        >{{ (resume.fields && resume.fields['send_message']) || 'Send message' }}</v-btn
                                    >
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card>
                </v-col>
            </v-row>
            <!-- <Snackbar></Snackbar> -->
        </v-container>

        <v-footer :color="resume.colors.primary" class="white--text justify-center" style="" v-if="resume.colors">
            <nuxt-link to="/" class="link">
                <v-row no-gutters justify="center" align="center" class="py-4">
                    <img src="/images/logo_small.png" width="30" />&nbsp;
                    <span class="secondary-color-text">LoginMyCV</span>
                </v-row>
            </nuxt-link>
        </v-footer>
    </v-app>
</template>

<script>
import moment from 'moment'
import fileDownload from 'js-file-download' // Download data file
// import Snackbar from '~/components/Snackbar'
// import Snackbars from '~/components/Snackbars'
export default {
    name: 'Template001',
    components: {},
    props: ['resume', 'isTemplateModel'],
    mounted() {
        // if (this.colors) {
        //     this.primaryColor = this.colors.primary
        //     this.secondaryColor = this.colors.secondary
        //     this.tertiaryColor = this.colors.tertiary
        //     this.backgroundColor = this.colors.background
        //     this.textColor = this.colors.text
        // } else {
        //     this.primaryColor = this.resume.colors.primary
        //     this.secondaryColor = this.resume.colors.secondary
        //     this.tertiaryColor = this.resume.colors.tertiary
        //     this.backgroundColor = this.resume.colors.background
        //     this.textColor = this.resume.colors.text
        // }
    },
    data() {
        return {
            openedPanels: [0],
            contactForm: {
                valid: true,
                firstname: '',
                lastname: '',
                email: '',
                message: ''
            }
            // primaryColor: '',
            // secondaryColor: '',
            // tertiaryColor: '',
            // backgroundColor: '',
            // textColor: ''
        }
    },
    computed: {
        cssProps() {
            return {
                '--primary-color': this.resume.colors?.primary,
                '--secondary-color': this.resume.colors?.secondary,
                '--tertiary-color': this.resume.colors?.tertiary,
                '--background-color': this.resume.colors?.background,
                '--text-color': this.resume.colors?.text
            }
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
                return this.resume.uploads.filter(file => file.category === 'downloadable_file')
            }
            return []
        },
        profilePicture() {
            if (this.resume.uploads) {
                return this.resume.uploads.find(upload => upload.category === 'profile_picture')
            }
            return null
        }
    },
    methods: {
        async downloadFile(file) {
            try {
                const data = await this.$store.dispatch('resumes/fetchUserFile', { fileName: file.name, resumeUserId: this.resume.user })
                fileDownload(data.Body, file.name.substring(file.name.indexOf('_') + 1))
            } catch (error) {
                console.log('error: ', error)
                this.$notifier.showMessage({ content: 'Unable to download file', color: 'error' })
            }
        },
        sendMessage() {
            if (!isTemplateModel) {
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
        }
    }
}
</script>

<style scoped>
p,
span,
h1,
h2,
h3,
h4,
li {
    color: var(--text-color);
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
    /*background-color: #ccc;*/
}
.text-color {
    color: var(--text-color);
}
.text-big {
    font-size: 1.2em;
}
ul.list-horizontal {
    padding: 0px;
}
.list-horizontal li {
    display: inline-block;
    margin-right: 10px;
}
.list-horizontal li:before {
    content: '\2022';
    color: var(--text-color);
    font-weight: bold;
    display: inline-block;
    width: 1em;
}
.button {
    padding-top: 0px;
    padding-bottom: 0px;
}

.margin-top {
    margin-top: 80px;
}
.margin-bottom {
    margin-bottom: 80px;
}
.link {
    text-decoration: none;
}
.social-link {
    margin: 0 8px;
    cursor: pointer;
}
.social-link:hover {
    color: var(--background-color);
}
.progress-linear {
    border-radius: 10px;
    margin: 0px 0px;
    background: var(--primary-color);
    color: var(--primary-color);
}
::v-deep .theme--dark.v-label {
    color: var(--text-color);
}
</style>
