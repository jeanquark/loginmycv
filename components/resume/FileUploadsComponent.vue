<template>
    <div class="text-center" style="padding: 30px; margin-top: 0px">
        <p></p>
        <h2>File uploads</h2>
        <!-- userResume: {{ userResume }}<br /><br /> -->
        userResume.uploads: {{ userResume.uploads }}<br /><br />
        userResumeFiles: {{ userResumeFiles }}<br /><br />
        <!-- files: {{ files }}<br /><br /> -->
        <!-- currentFiles: {{ currentFiles }}<br /><br /> -->
        <!-- abc: {{ abc }}<br /><br /> -->
        <!-- userResume.uploads:<br /> -->
        <!-- <ul>
            <li v-for="(upload, index) in userResume.uploads" :key="index">{{ upload.title }} - {{ upload.name }} - {{ upload.status }}</li>
        </ul> -->

        <!-- <v-row no-gutters v-if="userResumeFiles"> -->
        <v-row no-gutters>
            <!-- <v-layout > -->
            <v-col cols="12" sm="6" md="4" v-for="(file, index) of userResumeFiles" :key="index">
                <!-- <v-col cols="12" sm="6" md="4" v-for="(file, index) of userResume.uploads" :key="index" v-if="file.type === 'file' && file.status != 'to_be_saved_on_disc' && file.status != 'to_be_deleted_from_disc'"> -->
                <v-card rounded :color="file.status === 'to_be_removed_from_db' ? 'error' : 'grey darken-3'" class="ma-2 primary-border" style="">
                    <v-card-title primary-title class="justify-center" v-if="fileUploadErrors">
                        <h3 class="headline mb-0" :class="{ errorTitle: fileUploadErrors[index] }">File #{{ index + 1 }}</h3>
                    </v-card-title>

                    <v-card-text>
                        <ValidationProvider v-slot="{ errors }" :vid="`uploads.${index}.title`" name="title" :rules="rules.upload.title">
                            file.status: {{ file.status }}<br />
                            index: {{ index }}
                            <v-text-field
                                label="File Title"
                                :name="`file_title_${index}`"
                                :error-messages="errors"
                                placeholder="eg. My CV, Letter for X, etc."
                                prepend-icon="mdi-format-title"
                                data-vv-as="File title"
                                :counter="rules.upload.title.max"
                                v-model="userResumeFiles[index].title"
                                v-if="file.status != 'to_be_removed_from_db'"
                            ></v-text-field>
                            <font-awesome-icon :icon="['fas', 'times']" size="3x" class="mb-3" v-else />
                        </ValidationProvider>
                        <!-- v-model="userResumeFiles[index].title" -->
                        <!-- <br /> -->

                        <!-- <v-form @submit.prevent="onUpload2"> -->
                        <v-file-input
                            type="file"
                            :multiple="false"
                            :clearable="false"
                            color="primary"
                            label="File input"
                            placeholder=""
                            outlined
                            :show-size="1000"
                            @change="onFileChanged($event, index)"
                            v-if="file.status === 'new'"
                        >
                            <template v-slot:selection="{}">
                                {{ file ? file.name : '' }}
                            </template>
                        </v-file-input>
                        <div v-else>
                            <p v-if="file.name">{{ file.name }} ({{ (file.size_in_bytes / 1000).toFixed(2) }} KB)</p>
                            <v-btn color="primary" @click="getResumeFile(file)" v-if="!file.status">Download</v-btn>
                        </div>
                        <!-- </v-form> -->
                    </v-card-text>

                    <v-card-actions class="justify-center">
                        <v-btn text color="success" @click="restoreUpload(index, file)" v-if="file.status === 'to_be_removed_from_db'">Restore</v-btn>
                        <v-btn text color="error" @click="removeUpload(file)" v-else>Remove</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <!-- </v-layout> -->
        </v-row>

        <v-btn fab absolute bottom right color="tertiary" slot="activator" @click.stop="addUpload">
            <v-icon>mdi-plus</v-icon>
        </v-btn>
    </div>
</template>

<script>
import moment from 'moment'
// var fileDownload = require('js-file-download');
import fileDownload from 'js-file-download'
export default {
    props: ['errors', 'rules', 'step', 'fileUploadErrors'],
    async created() {
        try {
            const index = this.userResume.uploads.findIndex((upload) => upload.status === 'new')
            if (index > -1) {
                this.userResume.uploads.splice(index, 1)
            }
        } catch (error) {
            console.log('error: ', error)
        }
    },
    async mounted() {
        try {
            // this.userFiles = await this.$store.dispatch('files/fetchUserFiles')
            // const currentFiles = this.userFiles.uploads.find((upload) => upload.category === 'profile_picture')
            // if (currentProfilePicture) {
            //     this.currentProfilePicture = JSON.parse(JSON.stringify(currentProfilePicture))
            // }
        } catch (error) {
            console.log('error: ', error)
        }
    },
    data() {
        return {
            files: [],
            currentFiles: null,
        }
    },
    computed: {
        authUser() {
            return this.$store.getters['auth/authUser']
        },
        userResumes() {
            return this.$store.getters['resumes/userResumes']
        },
        // userResume() {
        //     if (this.$route.params.slug) {
        //         return this.$store.getters['resumes/userResumes'].find((resume) => resume.slug === this.$route.params.slug)
        //     } else {
        //         return this.$store.getters['resumes/userResumes'].find((resume) => resume.status === 'new')
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
        userResumeFiles() {
            // return this.userResume.uploads
            return this.userResume?.uploads?.filter((upload) => upload.type === 'file' && upload.status != 'to_be_saved_on_disc' && upload.status != 'to_be_deleted_from_disc')
            // return this.userResume?.uploads?.filter((upload) => upload.type === 'file')
        },
        // abc() {
        //     return [
        //         {
        //             name: 'abc.pdf',
        //         },
        //         {
        //             name: 'def.pdf',
        //         },
        //     ]
        // },
    },
    methods: {
        onFileChanged(files, index) {
            try {
                console.log('onFileChanged files: ', files, index)
                console.log('files[0]: ', files[0])
                // return
                if (files.length > 0) {
                    this.userResumeFiles[index]['file'] = files[0]
                    this.userResumeFiles[index]['name'] = files[0]['name']
                    this.userResumeFiles[index]['status'] = 'to_be_saved_on_disc'

                    this.userResume.uploads.push({
                        name: files[0].name,
                        category: 'downloadable_file',
                        type: 'file',
                        size_in_bytes: parseInt(files[0].size),
                        status: 'to_be_added_to_db',
                    })

                    // // Original code
                    // this.userResumeFiles[index]['status'] = 'to_be_added_to_db'
                    // this.userResumeFiles[index]['name'] = files[0].name
                    // this.userResumeFiles[index]['size_in_bytes'] = files[0].size
                    // this.userResumeFiles[index]['mime_type'] = files[0].type

                    // this.userResume.uploads.push({
                    //     file: files[0],
                    //     name: files[0].name,
                    //     title: this.userResumeFiles[index].title,
                    //     category: 'downloadable_file',
                    //     type: 'file',
                    //     size_in_bytes: parseInt(files[0].size),
                    //     status: 'to_be_saved_on_disc',
                    // })
                }
            } catch (error) {
                console.log('error: ', error)
            }
        },
        addUpload() {
            try {
                this.userResume.uploads.push({
                    file: {},
                    // title: '',
                    name: '',
                    // size_in_bytes: 0,
                    // mime_type: '',
                    type: 'file',
                    // category: 'downloadable_file',
                    status: 'new',
                })
            } catch (error) {
                console.log('error: ', error)
            }
        },
        async removeUpload(file) {
            try {
                console.log('removeUpload: ', file)
                // return
                let index
                if (file.status === 'new') {
                    index = this.userResume.uploads.findIndex((upload) => upload.name === file.name && file.status === 'new')
                    if (index > -1) {
                        this.userResume.uploads.splice(index, 1)
                    }
                    return
                }
                if (file.status === 'to_be_added_to_db') {
                    index = this.userResume.uploads.findIndex((upload) => upload.name === file.name && upload.status === 'to_be_added_to_db')
                    if (index > -1) {
                        this.userResume.uploads.splice(index, 1)
                    }

                    index = this.userResume.uploads.findIndex((upload) => upload.name === file.name && upload.status === 'to_be_saved_on_disc')
                    if (index > -1) {
                        this.userResume.uploads.splice(index, 1)
                    }
                    return
                }

                index = this.userResume.uploads.findIndex((upload) => upload.name === file.name)
                console.log('index: ', index)
                if (index > -1) {
                    let newArray = [...this.userResume.uploads]
                    newArray[index] = { ...newArray[index], status: 'to_be_removed_from_db' }
                    this.userResume.uploads = newArray
                }

                const filesArray = this.userResumes.flatMap((resume) => resume.uploads.filter((upload) => upload.name === file.name))
                console.log('filesArray: ', filesArray)
                if (filesArray.length == 1) {
                    this.userResume.uploads.push({
                        name: file.name,
                        type: file.type,
                        category: file.category,
                        status: 'to_be_deleted_from_disc',
                    })
                }
            } catch (error) {
                console.log('error: ', error)
            }
        },
        restoreUpload(index, file) {
            try {
                console.log('restoreUpload: ', index, file)
                // this.userResumeFiles[index]['status'] = null
                this.userResume.uploads[index]['status'] = null
            } catch (error) {
                console.log('error: ', error)
            }
        },
        async getResumeFile(file) {
            try {
                console.log('getResumeFile: ', file)

                const data = await this.$store.dispatch('files/getFile', {
                    userId: `${this.authUser.id}`,
                    fileName: file.name,
                })

                // const data = await this.$axios.$post(
                //     `/api/v1/files/file`,
                //     {
                //         userId: `${this.authUser.id}`,
                //         fileName: file.name
                //     },
                //     {
                //         responseType: 'blob'
                //     }
                // )
                console.log('data: ', data)
                fileDownload(data, file.name.substring(file.name.indexOf('_') + 1))
            } catch (error) {
                console.log('error: ', error)
            }
        },
        // async onUpload2() {
        //     try {
        //         console.log('onUpload2')
        //         // const formData = new FormData()
        //         // for (const i of Object.keys(this.userResume.uploads)) {
        //         //     console.log('i: ', i)
        //         //     formData.append('files', this.userResume.uploads[i])
        //         // }
        //         // console.log('formData: ', formData)
        //         // const data = await this.$axios.$post('/api/v1/resumes', formData, {
        //         //     onUploadProgress: (progressEvent) => {
        //         //         console.log('progress: ', progressEvent.loaded / progressEvent.total)
        //         //     },
        //         // })
        //         // console.log('data: ', data)
        //     } catch (error) {
        //         console.log('error: ', error)
        //     }
        // }
    },
}
</script>

<style scoped>
.errorTitle {
    color: var(--v-error-base);
}
.primary-border {
    border: 2px solid var(--v-primary-base);
}
</style>
