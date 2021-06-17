<template>
    <div class="text-center mt-0 pa-4" style="">
        <!-- <div id="" style="height: 200px; width: 100%; z-index: 0;" v-if="expanded === 0">
            <client-only>
                <l-map :zoom=13 :center="[55.9464418,8.1277591]" style="">
                    <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
                </l-map>
            </client-only>
        </div> -->

        <div>
            <!-- userResume: {{ userResume }}<br /><br /> -->
            <!-- userResume.education: {{ userResume.education }}<br /><br /> -->
            errors: {{ errors }}<br /><br />
            rules: {{ rules }}<br /><br />
            <!-- errorsEducation: {{ errorsEducation }}<br /><br /> -->
            <!-- newEducation: {{ newEducation }}<br /><br /> -->
            <!-- loadedNewResume: {{ loadedNewResume }}<br /><br /> -->
            <!-- errors: {{ errors }}<br /><br /> -->
            <!-- educationErrors: {{ educationErrors }}<br /><br /> -->
            dyncamicComponent: {{ dynamicComponent }}<br /><br />
            expanded: {{ expanded }}<br /><br />
            <!-- candidateEducation: {{ candidateEducation }}<br /><br /> -->
            errorsEducationByIndex: {{ errorsEducationByIndex(0) }}<br />
        </div>
        <h2>Education</h2>
        <v-row no-gutters justify="center" class="pa-3" v-if="userResume">
            <v-alert :value="true" color="warning" icon="mdi-exclamation" outlined v-if="userResume.education && userResume.education.length < 1">
                There is no item in here, please click on the rounded pink button to add one
            </v-alert>
            <v-btn fab absolute bottom right color="pink" @click.stop="openNewEducationModal">
                <v-icon>mdi-plus</v-icon>
            </v-btn>

            <!-- <div id="" style="height: 200px; width: 100%; z-index: 0; border: 2px dashed orange;" v-if="expanded === 0">
                <client-only>
                    <l-map :zoom=13 :center="[55.9464418,8.1277591]" style="">
                        <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
                    </l-map>
                </client-only>
            </div> -->

            <v-dialog dark v-model="modalNewEducation" width="600" :persistent="false">
                <v-card>
                    <v-card-title class="headline" primary-title>
                        <v-row no-gutters justify="center"> New education entry newEducation: {{ newEducation }}<br /> </v-row>
                    </v-card-title>

                    <v-card-text>
                        <v-row no-gutters>
                            <v-col cols="12">
                                <!-- <ValidationProvider v-slot="{ errors }" name="title" rules="required|min:2|max:4"> -->
                                <ValidationProvider name="title" :rules="rules.education.title">
                                    <v-text-field label="Title" name="education_title" placeholder="Bachelor in Geography" data-vv-as="Title" :counter="50" v-model="newEducation.title"></v-text-field>
                                </ValidationProvider>
                            </v-col>
                            <v-col cols="12">
                                <ValidationProvider name="school" :rules="rules.education.school">
                                    <v-text-field
                                        label="University/School/Institute"
                                        name="education_school"
                                        placeholder="University of Geneva"
                                        data-vv-as="School"
                                        :counter="50"
                                        v-model="newEducation.school"
                                    ></v-text-field>
                                </ValidationProvider>
                            </v-col>
                            <v-col cols="6" class="pr-2">
                                <ValidationProvider name="city" :rules="rules.education.city">
                                    <v-text-field label="City" name="education_city" placeholder="Geneva" data-vv-as="City" :counter="50" v-model="newEducation.city"></v-text-field>
                                </ValidationProvider>
                            </v-col>
                            <v-col cols="6" class="pl-2">
                                <ValidationProvider name="country" :rules="rules.education.country">
                                    <v-text-field label="Country" name="education_country" placeholder="Switzerland" data-vv-as="Country" :counter="50" v-model="newEducation.country"></v-text-field>
                                </ValidationProvider>
                            </v-col>
                            <v-col cols="12">
                                <ValidationProvider name="description" :rules="rules.education.description">
                                    <v-textarea label="Description" name="education_description" data-vv-as="Description" :rows="3" :counter="500" v-model="newEducation.description"></v-textarea>
                                </ValidationProvider>
                            </v-col>
                            <v-col cols="6" class="pr-2">
                                <ValidationProvider name="start date" :rules="rules.education.start_date">
                                    <v-text-field label="Start date" name="education_start_date" data-vv-as="Start date" :counter="50" v-model="newEducation.start_date"></v-text-field>
                                </ValidationProvider>
                            </v-col>
                            <v-col cols="6" class="pl-2">
                                <ValidationProvider name="graduation date" :rules="rules.education.end_date">
                                    <v-text-field label="Graduation date" name="education_graduation_date" data-vv-as="Graduation date" :counter="50" v-model="newEducation.end_date"></v-text-field>
                                </ValidationProvider>
                            </v-col>
                            <v-col cols="12" class="mt-4 pl-2">
                                <!-- <component :is="dynamicComponent" :resumeSlug="'abc'" :newEducation="newEducation" @updateEducation="onUpdateEducation" v-if="dynamicComponent" /> -->
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions class="justify-center" style="padding-bottom: 20px">
                        <v-btn class="success" @click="addNewEducation()">Add</v-btn>&nbsp;
                        <v-btn text color="secondary" @click="closeModal">Cancel</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <v-expansion-panels :multiple="false" v-model="expanded">
                <draggable v-model="candidateEducation" group="education" @start="drag = true" @end="drag = false" style="width: 100%">
                    <v-expansion-panel v-for="(education, index) in candidateEducation" :key="index">
                        <v-expansion-panel-header>
                            <v-row no-gutters align="center">
                                <v-btn style="cursor: move" icon class="handle ml-0">
                                    <v-icon>mdi-drag</v-icon>
                                </v-btn>
                                <v-icon @click.native.stop="deleteItem(index)" class="mr-3 icon">mdi-delete</v-icon>
                                <!-- <v-icon class="mr-3" color="error" v-if="errorsEducation['Education'][index]['Title']">mdi-alert-circle</v-icon> -->
                                <v-icon class="mr-3" color="error" v-if="errorsEducationByIndex(index).length > 0">mdi-alert-circle</v-icon>
                                <span style="font-size: 1.5em">{{ education.title }}</span>
                                <!-- errorsEducation: {{ errorsEducation }}<br /> -->
                            </v-row>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content :eager="true" style="">
                            <v-card class="mb-5" style="background: black">
                                <v-card-text style="">
                                    <v-row no-gutters>
                                        <v-col cols="12" sm="6" class="pa-3">
                                            <!-- errors: {{ errors ? errors[`education.${index}.title`] : '' }}<br /> -->
                                            <!-- <ValidationProvider v-slot="{ errors }" :vid="`Education_${index}_Title`" name="title" rules="required|min:2|max:4"> -->
                                            <ValidationProvider v-slot="{ errors }" :vid="`education.${index}.title`" name="title" :rules="rules.education.title">
                                                <!-- index: {{ index }} errors: {{ errors }} -->

                                                <v-text-field
                                                    label="Title"
                                                    :name="`education_title_${index}`"
                                                    :error-messages="errors"
                                                    data-vv-as="Title"
                                                    :counter="rules.education.title.max"
                                                    v-model="candidateEducation[index].title"
                                                ></v-text-field>
                                            </ValidationProvider>
                                        </v-col>
                                        <v-col cols="12" sm="6" class="pa-3">
                                            <ValidationProvider v-slot="{ errors }" :vid="`education.${index}.school`" name="school" :rules="rules.education.school">
                                                <v-text-field
                                                    label="University/School/Institute name"
                                                    :name="`education_school_${index}`"
                                                    :error-messages="errors"
                                                    data-vv-as="University/School/Institute"
                                                    :counter="50"
                                                    v-model="candidateEducation[index].school"
                                                ></v-text-field>
                                            </ValidationProvider>
                                        </v-col>
                                        <v-col cols="12" sm="6" class="pa-3">
                                            <ValidationProvider v-slot="{ errors }" :vid="`education.${index}.city`" name="city" :rules="rules.education.city">
                                                <v-text-field
                                                    label="City"
                                                    :name="`education_city_${index}`"
                                                    :error-messages="errors"
                                                    data-vv-as="City"
                                                    :counter="50"
                                                    v-model="candidateEducation[index].city"
                                                ></v-text-field>
                                            </ValidationProvider>
                                        </v-col>
                                        <v-col cols="12" sm="6" class="pa-3">
                                            <ValidationProvider v-slot="{ errors }" :vid="`education.${index}.country`" name="country" :rules="rules.education.country">
                                                <v-text-field
                                                    label="Country"
                                                    :name="`education_country_${index}`"
                                                    :error-messages="errors"
                                                    data-vv-as="Country"
                                                    :counter="50"
                                                    v-model="candidateEducation[index].country"
                                                ></v-text-field>
                                            </ValidationProvider>
                                        </v-col>

                                        <v-col cols="12" sm="6" class="pa-3">
                                            <ValidationProvider v-slot="{ errors }" :vid="`education.${index}.start_date`" name="start date" :rules="rules.education.start_date">
                                                <v-text-field
                                                    label="Start date"
                                                    :name="`education_start_date_${index}`"
                                                    :error-messages="errors"
                                                    data-vv-as="Start date"
                                                    :counter="50"
                                                    v-model="candidateEducation[index].start_date"
                                                ></v-text-field>
                                            </ValidationProvider>
                                        </v-col>
                                        <v-col cols="12" sm="6" class="pa-3">
                                            <ValidationProvider v-slot="{ errors }" :vid="`education.${index}.end_date`" name="graduation date" :rules="rules.education.end_date">
                                                <v-text-field
                                                    label="Graduation date"
                                                    :name="`education_graduation_date_${index}`"
                                                    :error-messages="errors"
                                                    data-vv-as="Graduation date"
                                                    :counter="50"
                                                    v-model="candidateEducation[index].end_date"
                                                ></v-text-field>
                                            </ValidationProvider>
                                        </v-col>
                                        <v-col cols="12" sm="6" class="pa-3">
                                            <ValidationProvider v-slot="{ errors }" :vid="`education.${index}.description`" name="description" :rules="rules.education.description">
                                                <v-textarea
                                                    label="Education description"
                                                    :name="`education_description_${index}`"
                                                    :error-messages="errors"
                                                    data-vv-as="Description"
                                                    :rows="3"
                                                    :counter="200"
                                                    v-model="candidateEducation[index].description"
                                                ></v-textarea>
                                            </ValidationProvider>
                                        </v-col>
                                        <v-col cols="12" class="pa-3" style="border: 0px solid red">
                                            <!-- <div id="" style="height: 200px; width: 100%; z-index: 0; border: 0px dashed orange;" v-if="expanded === 0 && index === 0">
                                                <client-only>
                                                    <l-map ref="map" v-resize="onResize" :zoom=13 :center="[55.9464418,8.1277591]" style="">
                                                        <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
                                                    </l-map>
                                                </client-only>
                                            </div> -->

                                            <component :is="dynamicComponent" :index="index" @updateEducationCoordinates="updateEducationCoordinates" />
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </draggable>
            </v-expansion-panels>
        </v-row>
    </div>
</template>

<script>
// import Noty from 'noty'
import Draggable from 'vuedraggable'
// import { ValidationProvider } from 'vee-validate'
// import validationRulesClient from '@/api/utils/validationRulesClient'

export default {
    components: { Draggable },
    props: ['errors', 'rules'],
    created() {
        // const resumeSlug = this.$route.params.slug
        // console.log('resumeSlug: ', resumeSlug)
        // this.resumeSlug = resumeSlug
        // this.rules = validationRulesClient
        // this.loadDynamicComponent()
        //     .then(() => {
        //         this.dynamicComponent = () => this.loadDynamicComponent()
        //     })
        //     .catch(error => {
        //         // console.log('error loadDynamicComponent: ', error)
        //         this.dynamicComponent = null
        //     })
    },
    mounted() {
        // this.loadDynamicComponent().then(() => {
        //     this.dynamicComponent = () => this.loadDynamicComponent()
        // })
        // .catch(() => {
        //     console.log('catch')
        //     this.dynamicComponent = null
        // })
    },
    data() {
        return {
            dynamicComponent: null,
            expanded: [], // Control expansion panel open/close state. Necessary for the map inside Leaflet component (template004) to render on mounted
            // resumeSlug: '',
            modalNewEducation: false,
            modalEditEducation: false,
            newEducation: {
                name: '',
                title: '',
                school: '',
                city: '',
                country: '',
                description: '',
                start_date: '',
                end_date: ''
            }
        }
    },
    computed: {
        // errors () {
        //     return this.$store.getters['errors']
        // },

        // loadDynamicComponent() {
        //     console.log('this.userResume: ', this.userResume)
        //     return () => import(`~/components/resume/dynamicTemplatesComponents/${this.userResume.template_id}/EducationComponent`)
        // },
        loadDynamicComponent() {
            try {
            } catch (error) {
                console.log('error loadDynamicComponent: ', error)
                return null
            }
        },
        loadDynamicComponent2() {
            try {
                console.log('loadDynamicComponent Education: ', this.userResume)
                // return null
                if (this.userResume.template) {
                    return () => import(`~/components/resume/dynamicTemplatesComponents/${this.userResume.template.slug}/EducationComponent`)
                }
                return null
            } catch (error) {
                console.log('error loadDynamicComponent: ', error)
                // this.dynamicComponent = null
                return null
            }
        },
        // errors() {
        //     return this.$store.getters['errors']
        // },
        userResume2() {
            return this.$store.getters['resumes/userResumes'].find(resume => resume.slug === this.$route.params.slug)
        },
        // userResume() {
        //     if (this.$route.params.slug) {
        //         return this.$store.getters['resumes/userResumes'].find(resume => resume.slug === this.$route.params.slug)
        //     } else {
        //         return this.$store.getters['resumes/newResume']
        //     }
        // },
        userResume() {
            if (this.$route.params.slug) {
                return this.$store.getters['resumes/userResumes'].find((resume) => resume.slug === this.$route.params.slug)
            } else {
                // return this.$store.getters['resumesModels/resumesModels'][0]
                return this.$store.getters['resumes/userResumes'].find(resume => resume.status === 'new')
            }
        },
        loadedNewResume() {
            return this.$store.getters['resumes/loadedNewResume']
        },
        candidateEducation: {
            get() {
                return this.userResume.education
            },
            set(value) {
                this.userResume.education = value
            }
        }
        // candidateEducation () {
        //     return this.userResume.education
        //     // const educationEmptyArray = []
        // }
        // hasError2 () {
        //     return true
        // },
    },
    methods: {
        onResize2() {
            this.$refs.map[0].mapObject._onResize()
        },
        errorsEducationByIndex(index) {
            return Object.keys(this.errors).filter(key => key.includes(`education.${index}`) && this.errors[key].length > 0)
        },
        openNewEducationModal() {
            console.log('createNewEducation')
            if (this.userResume.education && this.userResume.education.length < 30) {
                this.modalNewEducation = true
            } else {
                // new Noty({
                //     type: 'warning',
                //     text: 'No more than 30 items allowed!',
                //     timeout: 5000,
                //     theme: 'metroui'
                // }).show()
            }
        },
        closeModal() {
            this.modalNewEducation = false
            this.newEducation = {}
            // this.errors.items.filter(item => item.field.includes('education'))
        },
        updateEducationCoordinates(e) {
            console.log('updateEducationCoordinates: ', e)
            const { lat, lng } = e.coordinates
            console.log('lat: ', lat)
            console.log('lng: ', lng)
            // this.newEducation['position'] = 'abc'
            this.userResume.education[1]['coordinates'] = [lat, lng]
        },
        saveEducation() {
            console.log('saveEducation')
            console.log(this.form)
        },
        addNewEducation() {
            this.modalNewEducation = false
            // this.userResume.education.push({
            // 	title: this.newEducation.title,
            // 	school: this.newEducation.school,
            // 	country: this.newEducation.country,
            // 	city: this.newEducation.city,
            // 	description: this.newEducation.description,
            // 	start_date: this.newEducation.start_date,
            // 	end_date: this.newEducation.end_date
            // })
            this.userResume.education.push(this.newEducation)
            this.newEducation = {}
            this.expanded.push(this.userResume.education.length - 1)
            // this.expanded.push(0)
            // new Noty({
            //     type: 'success',
            //     text: 'New Education added!',
            //     timeout: 5000,
            //     theme: 'metroui'
            // }).show()
        },
        editEducation(education) {
            console.log('editEducation')
            // console.log('reference: ', reference)
            this.modalEditEducation = false
        },
        deleteItem(index) {
            console.log('delete: ', index)
            this.candidateEducation.splice(index, 1)
        }
    }
}
</script>

<style scoped>
.errorTitle {
    /* background: none; */
    color: var(--v-error-base);
}
.icon:hover {
    color: var(--v-error-base);
}
</style>
