<template>
    <div class="text-center pa-4" style="margin-top: 0px;">
        <p>
            <!-- loadedUserResume: {{ loadedUserResume }}<br /><br /> -->
            <!-- loadedNewResume: {{ loadedNewResume }}<br /><br /> -->
            <!-- userResume: {{ userResume }}<br /><br /> -->
            <!-- userSkills: {{ userSkills }}<br /><br /> -->
            candidateSkills: {{ candidateSkills }}<br /><br />
            errors: {{ errors }}<br /><br />
        </p>
        <h2>Skills</h2>
        <br />
        <v-row no-gutters justify="center" class="pa-3">
            <v-alert :value="true" color="warning" icon="mdi-exclamation" outlined v-if="userResume && (!userResume.skills || userResume.skills.length < 1)">
                You have no item in here, please click on the rounded pink button to add one
            </v-alert>
            <v-btn fab absolute bottom right color="pink" @click.stop="openNewSkillModal">
                <v-icon>mdi-plus</v-icon>
            </v-btn>

            <v-dialog v-model="modalNewSkill" width="500" :persistent="false">
                <v-card>
                    <v-card-title class="headline justify-center" primary-title>
                        Add a new skill<br />
                        <!-- newSkill: {{ newSkill }} -->
                    </v-card-title>

                    <v-card-text>
                        <v-row no-gutters>
                            <v-col cols="12">
                                <ValidationProvider v-slot="{ errors }" vid="skill_name" name="skill name" :rules="rules.skill.name">
                                    <v-text-field
                                        label="Skill name"
                                        name="skill_name"
                                        data-vv-as="Skill name"
                                        :counter="rules.job_title.max"
                                        :error-messages="errors"
                                        v-model="newSkill.name"
                                    ></v-text-field>
                                </ValidationProvider>
                            </v-col>

                            <v-col cols="12">
                                <v-select label="Category" :items="userSkillsCategories" no-data-text="No category available. Add one below." color="secondary" v-model="newSkill.category"></v-select>
                            </v-col>
                        </v-row>

                        <v-row no-gutters justify="center" align="center" class="mb-8 mx-5 px-4 border-secondary" style="border-radius: 10px;">
                            <v-col cols="8">
                                <ValidationProvider v-slot="{ errors }" vid="new_category_name" name="new category name" :rules="rules.skill.new_category_name">
                                    <v-text-field
                                        label="Category name"
                                        name="category_name"
                                        class="mr-2"
                                        :counter="rules.skill.new_category_name.max"
                                        :error-messages="errors"
                                        v-model="newSkillCategory"
                                    ></v-text-field>
                                </ValidationProvider>
                            </v-col>
                            <v-col cols="4">
                                <v-btn small color="primary" class="text-center" :disabled="errors.new_category_name && errors.new_category_name.length > 0" @click="addSkillCategory"
                                    >Add category</v-btn
                                >
                            </v-col>
                        </v-row>

                        <v-row no-gutters>
                            <v-col cols="12">
                                <v-slider label="Skill Value" :max="100" :min="0" :step="10" v-model="newSkill.value" color="secondary" style="margin-bottom: 0px;"></v-slider>
                                <p class="text-center">{{ newSkill.value }}/100</p>
                            </v-col>
                        </v-row>

                        <v-row no-gutters justify="center">
                            <v-col cols="12" class="text-center">
                                <p>Display:</p>
                                <v-row no-gutters justify="center" align="center">
                                    <v-col cols="6" class="px-2">
                                        <v-card :flat="true" class="card" :class="{ active: newSkill.type === 'pie' }" @click="newSkill.type = 'pie'">
                                            <v-card-text>
                                                <v-progress-circular :rotate="270" :size="100" :width="15" :value="75" color="primary">75%</v-progress-circular><br />
                                                <p class="text-center" style="margin-bottom: 0px;">Pie</p>
                                            </v-card-text>
                                        </v-card>
                                    </v-col>
                                    <v-col cols="6" class="px-2">
                                        <v-card :flat="true" class="card" :class="{ active: newSkill.type === 'bar' }" @click="changeSkillType('bar')">
                                            <v-card-text>
                                                <v-progress-linear height="15" :value="75" color="primary" class="" style="border-radius: 10px; margin: 0px 0px;"></v-progress-linear>
                                                <p class="text-center" style="margin-bottom: 0px;">Bar</p>
                                            </v-card-text>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>

                        <br /><br />
                    </v-card-text>
                    <v-card-actions class="justify-center">
                        <v-btn class="success" :disabled="errors.skill_name && errors.skill_name.length > 0" @click="addNewSkill()">Add Skill</v-btn>&nbsp;
                        <v-btn text color="secondary" @click="closeModal">Cancel</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <v-expansion-panels :multiple="false" v-model="expanded">
                <draggable v-model="candidateSkills" group="skills" @start="drag = true" @end="drag = false" style="width: 100%;">
                    <v-expansion-panel v-for="(skill, index) in candidateSkills" :key="index">
                        <v-expansion-panel-header>
                            <v-row no-gutters align="center">
                                <v-btn style="cursor: move;" icon class="handle ml-0">
                                    <v-icon>mdi-drag</v-icon>
                                </v-btn>
                                <v-icon @click.native.stop="deleteItem(index)" class="mr-3 icon">mdi-delete</v-icon>
                                <!-- <v-icon class="mr-3" color="error" v-if="errorsEducation['Education'][index]['Title']">mdi-alert-circle</v-icon> -->
                                <!-- <v-icon class="mr-3" color="error" v-if="errorsEducationByIndex(index).length > 0">mdi-alert-circle</v-icon> -->
                                <v-icon class="mr-3" color="error" v-if="errorsSkillsByIndex(index).length > 0">mdi-alert-circle</v-icon>
                                <span style="font-size: 1.5em;">{{ skill.name }}</span>
                                <!-- errorsEducation: {{ errorsEducation }}<br /> -->
                            </v-row>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content :eager="true" style="">
                            <v-card class="mb-5 background-dark" style="background: black;">
                                <v-card-text style="">
                                    <v-row no-gutters justify="center">
                                        <v-alert :value="true" color="warning" icon="priority_high" outlined v-if="!candidateSkills[index] || candidateSkills[index].length < 1">
                                            You have no item in this category, please hit the small rounded pink button to add one
                                        </v-alert>
                                        <v-col cols="12" sm="6" class="pa-3">
                                            <ValidationProvider v-slot="{ errors }" :vid="`skill.${index}.name`" name="skill name" :rules="rules.skill.name">
                                                <v-text-field
                                                    label="Skill name"
                                                    :name="`skill_name_${index}`"
                                                    :error-messages="errors"
                                                    :counter="rules.skill.name.max"
                                                    v-model="candidateSkills[index].name"
                                                ></v-text-field>
                                            </ValidationProvider>
                                        </v-col>

                                        <v-col cols="12" sm="6" class="pa-3">
                                            <v-select
                                                label="Skill Category"
                                                v-model="candidateSkills[index].category"
                                                no-data-text="No category available. Add one below."
                                                :items="userSkillsCategories"
                                            ></v-select>
                                        </v-col>

                                        <v-col cols="12" sm="6" class="pa-3">
                                            <v-slider
                                                v-model="candidateSkills[index].value"
                                                label="Skill Value"
                                                :max="candidateSkills[index].maxValue ? candidateSkills[index].maxValue : 100"
                                                :min="0"
                                                :step="candidateSkills[index].maxValue ? candidateSkills[index].maxValue / 10 : 10"
                                                color="secondary"
                                            ></v-slider>
                                            <div class="text-center">{{ candidateSkills[index].value }}/{{ candidateSkills[index].maxValue ? candidateSkills[index].maxValue : 100 }}</div>
                                        </v-col>

                                        <v-col cols="12" sm="6" class="pa-3">
                                            <span>Display</span><br />
                                            <v-radio-group row v-model="candidateSkills[index].type" class="">
                                                <v-radio label="Pie" value="pie" color="secondary" class=""></v-radio>
                                                <v-radio label="Bar" value="bar" color="secondary"></v-radio>
                                            </v-radio-group>
                                        </v-col>
                                    </v-row>

                                    <v-row no-gutters align="center" class="pa-3">
                                        <v-col cols="8" sm="4">
                                            <ValidationProvider v-slot="{ errors }" vid="new_category_name" name="new category name" :rules="rules.skill.new_category_name">
                                                <v-text-field
                                                    label="Category name"
                                                    :name="`category_name_${index}`"
                                                    :error-messages="errors"
                                                    :counter="rules.skill.new_category_name.max"
                                                    v-model="newSkillCategory"
                                                ></v-text-field>
                                            </ValidationProvider>
                                        </v-col>
                                        <v-col cols="4" sm="2">
                                            <v-btn small color="primary" @click="addSkillCategory">Add category</v-btn>
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
export default {
    props: ['errors', 'rules'],
    components: { Draggable },
    async created() {
        // const resumeSlug = this.$route.params.slug
        // console.log('resumeSlug: ', resumeSlug)
        // this.resumeSlug = resumeSlug
    },
    mounted() {
        try {
            // if (this.userResume) {
            this.userResume?.skills?.forEach(skill => {
                if (!this.userSkillsCategories.includes(skill.category)) {
                    this.userSkillsCategories.push(skill.category)
                }
            })
            this.userResume?.skills?.forEach(skill => {
                if (skill.subcategory != null && !this.userSkillsSubCategories.includes(skill.subcategory)) {
                    this.userSkillsSubCategories.push(skill.subcategory)
                }
            })
            // }
        } catch (error) {
            console.log('error: ', error)
        }
    },
    data() {
        return {
            expanded: [], // Control expansion panel open/close state.
            // resumeSlug: '',
            modalCategory: false,
            modalNewSkill: false,
            // reference: '',
            // newSkillCategory2: {
            //     name: '',
            //     // slug: '',
            //     // children: []
            // },
            // newSkillSubCategory: {
            //     name: ''
            // },
            newSkillCategory: '',
            newSkill: {
                name: '',
                category: '',
                value: 0,
                type: 'bar'
            },
            // items: [
            //     'abc',
            //     'def'
            // ],
            userSkillsCategories: [],
            userSkillsSubCategories: []
            // skills: [
            //     {
            //         name: 'Professional skills',
            //         slug: 'professional_skills',
            //         children: [
            //             {
            //                 name: 'Communication',
            //                 slug: 'communication',
            //                 value: 70
            //             },
            //             {
            //                 name: 'Leadershipe',
            //                 slug: 'leadership',
            //                 value: 85
            //             },
            //             {
            //                 name: 'Confidence',
            //                 slug: 'confidence',
            //                 value: 85
            //             }
            //         ]
            //     },
            //     {
            //         name: 'Software skills',
            //         slug: 'software_skills',
            //         children: [
            //             {
            //                 name: 'Adobe Photoshop',
            //                 slug: 'adobe_photoshop',
            //                 value: 85
            //             },
            //             {
            //                 name: 'Adobe Illustrator',
            //                 slug: 'adobe_illustrator',
            //                 value: 85
            //             },
            //             {
            //                 name: 'Adobe Fireworks',
            //                 slug: 'adobe_fireworks',
            //                 value: 40
            //             },
            //             {
            //                 name: 'Gimp 2',
            //                 slug: 'gimp2',
            //                 value: 50
            //             }
            //         ]
            //     }
            // ]
        }
    },
    computed: {
        // errors() {
        // 	return this.$store.getters['errors']
        // },
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
        candidateSkills: {
            get() {
                if (this.userResume) {
                    return this.userResume.skills
                }
                return []
            },
            set(value) {
                this.userResume.skills = value
            }
        }
    },
    methods: {
        errorsSkillsByIndex(index) {
            return Object.keys(this.errors).filter(key => key.includes(`skill.${index}`) && this.errors[key].length > 0)
        },
        changeSkillType(type) {
            console.log('changeSkillType: ', type)
            this.newSkill.type = type
        },
        openNewSkillModal() {
            // console.log('createNewEducation')
            if (this.userResume && this.userResume.skills && this.userResume.skills.length < 30) {
                this.modalNewSkill = true
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
            this.modalNewSkill = false
            this.newSkill = {}
        },
        addSkillCategory() {
            // console.log('addSkillCategory')
            if (this.newSkillCategory && !this.userSkillsCategories.includes(this.newSkillCategory)) {
                this.userSkillsCategories.push(this.newSkillCategory)
                this.newSkillCategory = ''
                // new Noty({
                //     type: 'success',
                //     text: 'New category added!',
                //     timeout: 5000,
                //     theme: 'metroui'
                // }).show
            }
        },
        addNewSkill() {
            if (this.userResume.skills.length > 10) {
                // new Noty({
                //     type: 'warning',
                //     text: 'No more than 10 items allowed!',
                //     timeout: 5000,
                //     theme: 'metroui'
                // }).show()
                return
            }
            this.modalNewSkill = false
            this.userResume.skills.push({
                name: this.newSkill.name,
                category: this.newSkill.category,
                type: this.newSkill.type,
                value: this.newSkill.value
            })
            this.newEducation = {}
            // new Noty({
            //     type: 'success',
            //     text: 'New skill added!',
            //     timeout: 5000,
            //     theme: 'metroui'
            // }).show()
        },
        deleteItem(index) {
            // console.log('index: ', index)
            this.candidateSkills.splice(index, 1)
        }
    }
}
</script>

<style scoped>
.v-input--selection-controls {
    margin-top: 10px;
}
.errorTitle {
    color: var(--v-error-base);
}
.border-secondary {
    border: 1px solid var(--v-secondary-base);
}
.card {
}
.card:hover {
    cursor: pointer;
    background: var(--v-dark-base);
}
.active {
    background: var(--v-dark-base);
}
background-dark {
    background: var(--v-dark-base);
}
</style>
