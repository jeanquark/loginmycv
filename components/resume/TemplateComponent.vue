<template>
    <div class="pa-4" style="">
        <v-row>
            <!-- resumeSlug: {{ this.resumeSlug }}<br /><br /> -->
            <!-- userResume: {{ userResume }}<br /><br /> -->
            <!-- userResume.colors: {{ userResume.colors }}<br /><br /> -->
            <!-- templates: {{ templates }}<br /><br /> -->
            <!-- template: {{ template }}<br /><br /> -->
            <!-- userResume.language: {{ userResume.language }}<br /><br /> -->
            <!-- userResume.template: {{ userResume.template }}<br /><br /> -->
            <!-- dynamicComponent: {{ dynamicComponent }}<br /><br /> -->
            <!-- loadDynamicComponent: {{ loadDynamicComponent }}<br /><br /> -->
            <!-- dialogResumePreview: {{ dialogResumePreview }}<br /><br /> -->
            <!-- loading: {{ loading }}<br /><br /> -->
            <!-- selectedTemplate: {{ selectedTemplate }}<br /><br /> -->
            <!-- templateResume: {{ templateResume }}<br /><br /> -->
            <!-- viewTemplateComponent: {{ viewTemplateComponent }}<br /><br /> -->
            <!-- resumesModels: {{ resumesModels }}<br /><br /> -->
        </v-row>

        <v-row no-gutters class="my-6 pa-2">
            <v-col cols="12">
                <v-card :elevation="12">
                    <v-card-title class="justify-center pb-0" v-if="template">
                        <h3 class="headline mb-3">Current template</h3>
                    </v-card-title>
                    <v-card-text v-if="template && template.image">
                        <v-row no-gutters justify="center" class="my-2">
                            <v-col cols="4">
                                <v-card tile class="">
                                    <v-img :src="`/images/templates/${template.image}`" :lazy-src="`/images/templates/${template.image}`" aspect-ratio="1.5"></v-img>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-card-text>

                    <v-card-title class="justify-center pb-0">
                        <h2 class="headline mb-3">Choose a template</h2>
                    </v-card-title>

                    <v-card-text>
                        <v-row no-gutters>
                            <v-col cols="12" sm="6" md="4" lg="3" v-for="template in templates" :key="template.id" class="pa-2">
                                <v-hover v-slot:default="{ hover }">
                                    <v-card
                                        tile
                                        :elevation="hover ? 16 : 2"
                                        :value="template.id"
                                        :class="[userResume && userResume.template && userResume.template.id === template.id ? 'active' : null]"
                                        @click="selectTemplate(template)"
                                    >
                                        <v-img :src="`/images/templates/${template.image}`" :lazy-src="`/images/templates/${template.image}`" aspect-ratio="1.5"> </v-img>
                                        <v-card-text class="pa-0" style="position: relative">
                                            <v-row no-gutters class="transparent-background pa-1">
                                                <v-row no-gutters justify="start" align="center">
                                                    <font-awesome-icon :icon="['fas', 'users']" class="ml-2" />&nbsp;<span class="mr-3">{{ template.count_users || 0 }}</span>
                                                    <font-awesome-icon :icon="['fas', 'cubes']" :class="[template.package.slug]" v-if="template.package" />&nbsp;<span
                                                        class="mr-3"
                                                        v-if="template.package"
                                                        >{{ template.package.name }}</span
                                                    >
                                                </v-row>
                                                <v-row no-gutters justify="end" align="center">
                                                    <v-btn small text color="secondary" @click.stop="openResumePreview(template)"> Preview </v-btn>
                                                </v-row>
                                            </v-row>
                                        </v-card-text>
                                    </v-card>
                                </v-hover>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <v-row no-gutters class="my-6 pa-2">
            <v-col cols="12">
                <v-card :elevation="12" class="pa-2" v-if="template">
                    <v-card-title class="justify-center">
                        <h2 class="text-center headline">{{ template.name }}</h2>
                    </v-card-title>
                    <v-card-subtitle class="">
                        <h3 class="text-center">{{ template.description }}</h3>
                    </v-card-subtitle>

                    <v-card-text>
                        <v-row no-gutters justify="center" align="center" class="my-3" v-if="userResume && userResume.colors">
                            <v-col cols="12" sm="12">
                                <div class="text-center">
                                    <v-btn
                                        class="ma-2"
                                        :class="[checkLuminescence(userResume.colors.primary) > 170 ? 'black--text' : 'white--text']"
                                        depressed
                                        :color="userResume.colors.primary"
                                        @click="selectedColor = 'primary'"
                                        >Primary color</v-btn
                                    >
                                    <v-btn
                                        class="ma-2"
                                        :class="[checkLuminescence(userResume.colors.secondary) > 170 ? 'black--text' : 'white--text']"
                                        depressed
                                        :color="userResume.colors.secondary"
                                        @click="selectedColor = 'secondary'"
                                        >Secondary color</v-btn
                                    >
                                    <v-btn
                                        class="ma-2"
                                        :class="[checkLuminescence(userResume.colors.tertiary) > 170 ? 'black--text' : 'white--text']"
                                        depressed
                                        :color="userResume.colors.tertiary"
                                        @click="selectedColor = 'tertiary'"
                                        >Tertiary color</v-btn
                                    >
                                    <v-btn
                                        class="ma-2"
                                        :class="[checkLuminescence(userResume.colors.background) > 170 ? 'black--text' : 'white--text']"
                                        depressed
                                        :color="userResume.colors.background"
                                        @click="selectedColor = 'background'"
                                        >Background color</v-btn
                                    >
                                    <v-btn
                                        class="ma-2"
                                        :class="[checkLuminescence(userResume.colors.text) > 170 ? 'black--text' : 'white--text']"
                                        depressed
                                        :color="userResume.colors.text"
                                        @click="selectedColor = 'text'"
                                        >Text color</v-btn
                                    >
                                </div>
                            </v-col>
                        </v-row>

                        <v-row no-gutters>
                            <v-col cols="12" sm="4" v-if="userResume && userResume.colors">
                                <v-color-picker flat mode="rgba" style="margin: 0 auto" v-model="userResume.colors[selectedColor]"></v-color-picker>
                            </v-col>

                            <v-col cols="12" sm="8">
                                <!-- userResume: {{ userResume }}<br /> -->
                                <!-- userResume.template: {{ userResume.template }} -->
                                <component :is="viewTemplateComponent" :resume="userResume" :isTemplateModel="true" v-if="viewTemplateComponent" style="height: 300px; overflow-y: scroll" />
                                <!-- <component :is="dynamicComponent" :resumeSlug="'abc'" :loadedTemplate="template" v-if="dynamicComponent" /> -->
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <v-dialog no-gutters v-model="dialogResumePreview" fullscreen hide-overlay transition="dialog-bottom-transition" style="">
            <v-card style="position: fixed; top: 0; left: 0; z-index: 999; width: 100%">
                <v-toolbar dark color="primary" class="align-center" style="height: 65px; cursor: pointer" @click="dialogResumePreview = false">
                    <h3 class="text-center mr-2">Preview <small>(click to exit)</small></h3>
                    <v-spacer></v-spacer>
                    <v-btn icon dark @click="dialogResumePreview = false" class="mr-2">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>

                <!-- <component
                    :is="viewTemplateComponent"
                    :resume="templateResume"
                    :isTemplateModel="true"
                    style="height: calc(100vh - 65px); overflow-y: scroll; border: 1px solid orange;"
                    v-if="viewTemplateComponent"
                /> -->
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    props: ['rules'],
    async created() {
        try {
            if (this.$store.getters['templates/templates'].length < 1) {
                await this.$store.dispatch('templates/fetchTemplates')
            }

            this.loadDynamicComponent()
                .then(() => {
                    this.dynamicComponent = () => this.loadDynamicComponent()
                })
                .catch(() => {
                    console.log('catch loadDynamicComponent')
                    this.dynamicComponent = null
                })
        } catch (error) {
            console.log('error: ', error)
        }
    },
    mounted() {
        try {
            // console.log('template1: ', this.template.file)
            // const abc = this.template?.file
            // this.viewTemplateComponent = () => import(`~/components/templatesModels/Template002`)
        } catch (error) {
            console.log('error: ', error)
        }
    },
    data() {
        return {
            resumeSlug: '',
            selectedColor: '',
            dialogResumePreview: false,
            viewTemplateComponent: null,
            dynamicComponent: null,
        }
    },
    computed: {
        loading() {
            return this.$store.getters['loading']
        },
        templates() {
            return this.$store.getters['templates/templates']
        },
        template() {
            if (this.userResume && this.userResume.template) {
                this.viewTemplateComponent = () => import(`~/components/templatesModels/${this.userResume.template.file}`)
                return this.templates[this.userResume.template.id]
            }
            return {}
        },
        userResume() {
            if (this.$route.params.slug) {
                return this.$store.getters['resumes/userResumes'].find((resume) => resume.slug === this.$route.params.slug)
            } else {
                // return this.$store.getters['resumesModels/resumesModels'][0]
                // return this.$store.getters['resumesModels/resumesModels']
                return this.$store.getters['resumes/userResumes'].find(resume => resume.status === 'new')
            }
        },
        resumesModels() {
            return this.$store.getters['resumesModels/resumesModels'].filter((resume) => resume.slug === 'model')
        },
        loadedLanguages() {
            return this.$store.getters['languages/languages']
        },
        loadDynamicComponent() {
            try {
                console.log('loadDynamicComponent Template: ', this.userResume)
                // return null
                return () => import(`~/components/resume/dynamicTemplatesComponents/${this.userResume?.template?.slug}/TemplateComponent`)
            } catch (error) {
                console.log('error loadDynamicComponent: ', error)
                // this.dynamicComponent = null
                return null
            }
        },
    },
    methods: {
        checkLuminescence(hexaColor) {
            try {
                var c = hexaColor.substring(3) // strip #
                var rgb = parseInt(c, 16) // convert rrggbb to decimal
                var r = (rgb >> 16) & 0xff // extract red
                var g = (rgb >> 8) & 0xff // extract green
                var b = (rgb >> 0) & 0xff // extract blue

                var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b // per ITU-R BT.709
                return luma
            } catch (error) {
                console.log('error: ', error)
                return 0
            }
        },
        submit() {
            this.$refs.observer.validate()
        },
        selectTemplate(template) {
            try {
                console.log('selectTemplate: ', template)
                this.userResume['template'] = template

                this.dynamicComponent = null
                if (template?.file) {
                    this.viewTemplateComponent = () => import(`~/components/templatesModels/${template.file}`)
                }
            } catch (error) {
                console.log('error: ', error)
            }
        },

        async openResumePreview(template) {
            try {
                this.viewTemplateComponent = () => import(`~/components/templatesModels/${template.file}`)
                this.dialogResumePreview = true
            } catch (error) {
                console.log('error: ', error)
            }
        },
    },
    watch: {
        valid() {
            console.log('valid: ', valid)
        },
    },
}
</script>

<style scoped>
.active {
    border: 4px solid var(--v-secondary-base);
}
.primaryColor {
    color: red;
}
.image {
    float: left;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    border: 1px solid #ebebeb;
    margin: 5px;
}
.transparent-background {
    background: rgba(122, 82, 143, 0.6);
}
.basic {
    color: var(--v-secondary-base);
}
.classic {
    color: var(--v-tertiary-base);
}
</style>
