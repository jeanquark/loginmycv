<template>
    <div class="text-center" style="padding: 30px; margin-top: 0px" v-if="userResume">
        <p></p>
        <h2>File uploads</h2>
        step: {{ step }}<br />
        errors: {{ errors }}<br />
        totalUsedSpace: {{ totalUsedSpace }}<br />
        <br />
        <!-- totalUsedSpace: {{ totalUsedSpace }}<br /><br /> -->
        <!-- userAllocatedSpace: {{ userAllocatedSpace }}<br /><br /> -->
        <!-- authUser: {{ authUser }}<br /><br /> -->
        <!-- authUser.package: {{ authUser.package }}<br /><br /> -->
        <!-- userResumes: {{ userResumes }}<br /><br /> -->
        <!-- userResumesUploads: {{ userResumesUploads }}<br /><br /> -->
        userResume.uploads: {{ userResume.uploads }}<br /><br />

        <v-progress-circular :rotate="-90" :size="100" :width="15" :value="totalUsedSpacePercent" :color="totalUsedSpacePercent > 100 ? 'error' : 'secondary'">
            {{ totalUsedSpacePercent }}%
        </v-progress-circular>
        of your total space ({{ (userAllocatedSpace / (1000 * 1000)).toFixed(0) }} MB) <br /><br />

        <file-uploads-directory :is="step === 6 ? 'file-uploads-directory' : ''" class="my-10" @download-resume-file="getResumeFile" @add-file-to-list="def"></file-uploads-directory>

        <v-row no-gutters v-if="userResume.uploads">
            <v-col cols="12" sm="6" md="4" v-for="(file, index) of userResume.uploads" :key="index">
                <v-card rounded :color="file.status === 'delete' ? 'error' : 'grey darken-3'" class="ma-2 primary-border" style="">
                    <v-card-title primary-title class="justify-center" v-if="fileUploadErrors">
                        <h3 class="headline mb-0" :class="{ errorTitle: fileUploadErrors[index] }">File #{{ index + 1 }}</h3>
                    </v-card-title>

                    <v-card-text>
                        <ValidationProvider v-slot="{ errors }" :vid="`uploads.${index}.title`" name="title" :rules="rules.upload.title">
                            <v-text-field
                                label="File Title"
                                :name="`file_title_${index}`"
                                :error-messages="errors"
                                placeholder="eg. My CV, Letter for X, etc."
                                prepend-icon="mdi-format-title"
                                data-vv-as="File title"
                                :counter="rules.upload.title.max"
                                v-model="userResume.uploads[index].title"
                                v-if="file.status != 'delete'"
                            ></v-text-field>
                            <font-awesome-icon :icon="['fas', 'times']" size="3x" class="mb-3" v-else />
                        </ValidationProvider>

                        <!-- v-if="file.file_type === 'downloadable_file'" -->

                        <v-text-field label="File Title" value="Profile picture" readonly v-if="file.type === 'profile_picture'"></v-text-field>

                        <br />

                        <!-- <v-text-field
                            label="My File"
                            prepend-icon="mdi-paperclip"
                            :disabled="file.type === 'profile_picture'"
                            @click="pickFile(`file${index}`)"
                            v-model="userResume.uploads[index].name"
                        ></v-text-field>

                        <input
                            type="file"
                            style="display: none"
                            :ref="`file${index}`"
                            :accept="file.type === 'downloadable_file' ? 'application/pdf' : 'image/*'"
                            @change="onFilePicked($event, index)"
                        /> -->

                        <v-form @submit.prevent="onUpload2">
                            <!-- selectedFile: {{ selectedFile }}<br /> -->
                            <!-- files: {{ files }}<br /> -->
                            <!-- userResume.uploads: {{ userResume.uploads }}<br /> -->
                            <!-- <input type="file" name="myImage" accept="image/*" @change="onFileChanged" v-model="abc" /> -->
                            <v-file-input
                                type="file"
                                :multiple="false"
                                color="primary"
                                label="File input"
                                placeholder="Select your file"
                                outlined
                                :show-size="1000"
                                @change="onFileChanged($event, index)"
                                v-if="file.status === 'new'"
                            ></v-file-input>
                            <div v-else>
                                <!-- {{ file.download_url }}<br /> -->
                                <p v-if="file.name">{{ file.name.substring(file.name.indexOf('_') + 1) }} {{ (file.size_in_bytes / 1000).toFixed(2) }} KB</p>
                                <v-btn color="primary" @click="getResumeFile(file)" v-if="file.status != 'delete'">Download</v-btn>
                            </div>
                            <!-- <input type="file" label="File input" multiple placeholder="Select your files" @change="onFileChanged2" /> -->
                            <!-- <v-btn color="primary" type="submit">Upload File</v-btn> -->
                        </v-form>

                        <!-- Carousel 1<v-img src="https://loginmycv.s3.eu-central-1.amazonaws.com/5e66fbd716b536f1880127e5/1605612709004_carousel1.png" width="100"></v-img>
						Carousel 2<v-img src="https://loginmycv.s3.eu-central-1.amazonaws.com/5e66fbd716b536f1880127e5/1605613051773_carousel2.png" width="100"></v-img>
						Carousel 3<v-img src="https://loginmycv.s3.eu-central-1.amazonaws.com/5e66fbd716b536f1880127e5/1605613180932_carousel3.png" width="100"></v-img>

						<a href="https://loginmycv.s3.eu-central-1.amazonaws.com/5e66fbd716b536f1880127e5/1605610233607_abc.pdf" download="abc">Download the pdf</a> -->

                        <!-- <form action="/api/v1/multiple" enctype="multipart/form-data" method="POST">
                            <input type="file" name="myImage" accept="image/*" />
                            <input type="submit" value="Upload Photo" />
                        </form> -->
                    </v-card-text>

                    <v-card-actions class="justify-center">
                        <v-btn text color="success" @click="restoreUpload(index)" v-if="file.status === 'delete'">Restore</v-btn>
                        <v-btn text color="error" @click="removeUpload(index, file)" v-else>Remove</v-btn>
                    </v-card-actions>
                </v-card>

                <v-card style="display: none">
                    <v-card-text>
                        User files:<br />
                        {{ userFiles }}<br />
                        <!-- <v-img src="https://loginmycv.s3.eu-central-1.amazonaws.com/5e66fbd716b536f1880127e5/1605612709004_carousel1.png" width="100"></v-img> -->
                        <v-btn small color="secondary" @click="getUserFiles">Get user files</v-btn><br />
                        <!-- <b-btn small color="secondary">Make public</b-btn> -->
                        <!-- <b-btn small color="secondary">Make private</b-btn> -->
                        Image1:<br />
                        <img :src="`data:image/jpeg;base64,${encode(image1.Body.data)}`" width="200" v-if="image1 && image1.Body" />
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <v-btn fab absolute bottom right color="pink" slot="activator" @click.stop="newUpload">
            <v-icon>mdi-plus</v-icon>
        </v-btn>
    </div>
</template>

<script>
import moment from 'moment'
// import Noty from 'noty'
// import axios from 'axios'
import fileDownload from 'js-file-download' // Download data file
// import fileUploadsDirectory from '~/components/resume/FileUploadsDirectoryComponent'
export default {
    // components: { fileUploadsDirectory },
    components: { 'file-uploads-directory': () => import('~/components/resume/stepSpecificComponents/FileUploadsDirectoryComponent') },
    props: ['errors', 'rules', 'step', 'fileUploadErrors'],
    async created() {
        const resumeSlug = this.$route.params.slug
        console.log('resumeSlug: ', resumeSlug)
        this.resumeSlug = resumeSlug
    },
    async mounted() {
        const resume = await this.$store.getters['resumes/userResumes'].find((resume) => resume.slug === this.resumeSlug)
        if (resume) {
            this.loading = new Array(resume.length)
        }
        if (this.$store.getters['resumes/userResumes'].length < 1) {
        }
        console.log('NODE_ENV: ', process.env.NODE_ENV)
        console.log('AWS_S3_BUCKET_NAME: ', process.env.AWS_S3_BUCKET_NAME)
        console.log('USER_DEFAULT_ALLOCATED_SPACE_IN_BYTES: ', process.env.USER_DEFAULT_ALLOCATED_SPACE_IN_BYTES)
        console.log('NUXT_ENV_USER_DEFAULT_ALLOCATED_SPACE_IN_BYTES: ', process.env.NUXT_ENV_USER_DEFAULT_ALLOCATED_SPACE_IN_BYTES)
    },
    data() {
        return {
            totalUploadSize: 0,
            selectedFile: null,
            files: null,
            userFiles: null,
            image1: null,
            // loadFileUploadsComponent: 'file-uploads-directory'
            // loadFileUploadsComponent: step === 6 ? 'file-uploads-directory' : ''
        }
    },
    computed: {
        authUser() {
            return this.$store.getters['auth/authUser']
        },
        // errors() {
        //     return this.$store.getters['errors']
        // },
        userResumes() {
            return this.$store.getters['resumes/userResumes']
        },
        userResume() {
            // if (this.resumeSlug) {
            //     return this.$store.getters['resumes/userResumes'].find((resume) => resume.slug === this.resumeSlug)
            // } else {
            //     return this.$store.getters['resumes/loadedNewResume']
            // }
            if (!this.resumeSlug) {
                return this.$store.getters['resumes/newResume']
            } else {
                return this.$store.getters['resumes/userResumes'].find((resume) => resume.slug === this.resumeSlug)
            }
        },
        
        // userResumesUploads() {
        //     return this.userResumes.flatMap(resume => resume.uploads)
        // },
        // loadedNewResume() {
        //     return this.$store.getters['resumes/loadedNewResume']
        // },
        totalUsedSpace() {
            let sum = 0
            const userResumesUploads = this.userResumes.flatMap((resume) => resume.uploads)

            if (userResumesUploads) {
                userResumesUploads.forEach((upload) => {
                    sum += upload.size_in_bytes || 0
                })
            }
            return sum
        },
        totalUsedSpacePercent() {
            // return this.totalUsedSpace / 100
            return ((this.totalUsedSpace * 100) / this.userAllocatedSpace).toFixed(1)
        },
        userAllocatedSpace() {
            if (this.authUser.package && this.authUser.package.total_space_in_bytes) {
                return this.authUser.package.total_space_in_bytes
            } else {
                // return process.env.USER_DEFAULT_ALLOCATED_SPACE_IN_BYTES
                return 100000
            }
        },
    },
    methods: {
        pickFile(index) {
            console.log('pickFile: ', index)
            this.$refs[index][0].click()
        },
        async onFilePicked(e, index) {
            const files = e.target.files
            console.log('files: ', files)
            console.log('index: ', index)
            if (files[0]) {
                console.log('files[0]: ', files[0])
                this.userResume.uploads.splice(index, 1, {
                    file: files[0],
                    name: files[0].name,
                    type: 'downloadable_file',
                    size_in_bytes: parseInt(files[0].size),
                    new: true,
                })
            }
        },
        newUpload() {
            if (this.userResume.uploads && this.userResume.uploads.length < 20) {
                this.userResume.uploads.push({
                    file: {},
                    title: '',
                    name: '',
                    size_in_bytes: 0,
                    mime_type: '',
                    category: 'downloadable_file',
                    // new: true,
                    status: 'new',
                    _updated_at: moment().unix(),
                })
            } else {
                // new Noty({
                //     type: 'warning',
                //     text: 'No more than 20 items allowed!',
                //     timeout: 5000,
                //     theme: 'metroui',
                // }).show()
            }
        },
        async removeUpload(index, file) {
            console.log('index: ', index)
            console.log('file: ', file)
            // this.userResume.uploads.splice(index, 1)
            if (this.userResume.uploads[index]['status'] === 'new') {
                this.userResume.uploads.splice(index, 1)
            } else {
                let newArray = [...this.userResume.uploads]
                newArray[index] = { ...newArray[index], status: 'delete' }
                this.userResume.uploads = newArray
            }
            // this.getCurrentFiles.filter(file => file.name !== file.name)
            // this.userResume.uploads = this.userResume.uploads.filter(upload => (upload.name !== file.name))
            // this.userResume.uploads = []
            // this.userResume.uploads = this.userResume.uploads.filter(up)
            // this.getCurrentFiles.splice(index, 1)
            // console.log(this.userResume.uploads.filter(upload => upload.format === 'file'))
            // this.userResume.uploads.filter(upload => upload.format === 'file').splice(index, 1)
            // const abc = this.userResume.uploads.splice(0, 1)
        },
        restoreUpload(index) {
            this.userResume.uploads[index]['status'] = null
        },
        // async totalUsedSpace2 () {
        // 	let sum = 0
        // 	const userResumes = this.$store.getters['resumes/userResumes']
        // 	userResumes.forEach(resume => {
        // 		const uploadsArray = resume.uploads
        // 		if (uploadsArray) {
        // 			uploadsArray.forEach(upload => {
        // 				sum += upload.size_in_bytes
        // 			})
        // 		}
        // 	})
        // 	// console.log('sum: ', sum)
        // 	this.totalUploadSize = sum
        // },
        // getUserFiles() {
        //     if (this.userResume.uploads) {
        //         return this.userResume.uploads.filter(upload => upload.type === 'downloadable_file')
        //     }
        //     return []
        // },

        getFileIndex(index) {
            if (index < this.userResume.uploads.length - this.getUserFiles.length) {
                return index + 1
            } else {
                return index - (this.userResume.uploads.length - this.getUserFiles.length) + 1
            }
        },

        async TOBEDELETED_uploadFileToS3() {
            console.log('uploadFileToS3: ', this.userResume.uploads[0])
            let formData = new FormData()
            formData.append('files', this.userResume.uploads[0].file)
            formData.append('files', this.userResume.uploads[0].file)

            const data = await this.$axios.$post(`/api/v1/resumes`, this.userResume.uploads[0], {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            console.log('data: ', data)
        },

        // onFileChanged(event) {
        //     this.selectedFile = event.target.files[0]
        // },
        // onFileChanged2(event) {
        //     console.log('onFileChanged2 event: ', event.target.files)
        //     this.files = event.target.files
        // },
        TOBEDELETED_onFileChanged(files) {
            console.log('onFileChanged files: ', files)
            this.files = files
        },
        onFileChanged(files, index) {
            console.log('onFileChanged files: ', files)
            console.log('index: ', index)
            // if (files[index]) {
            //     files[index]['new'] = true
            //     // files[index]['category'] = 'downloadable_file'
            //     // files[index]['mime_type'] = file.type
            // }
            console.log('files: ', files)
            console.log('...files: ', ...files)
            if (files[0]) {
                console.log('files[0]: ', files[0])
                // this.userResume.uploads.splice(index, 1, ...files)
                // this.userResume.uploads.splice(index, 1, files[0])
                this.userResume.uploads.splice(index, 1, {
                    file: files[0],
                    name: files[0].name,
                    category: 'downloadable_file',
                    type: files[0].type,
                    size_in_bytes: parseInt(files[0].size),
                    title: this.userResume.uploads[index]['title'],
                    status: 'new',
                })
            }
        },
        async onUpload() {
            try {
                console.log('onUpload')
                // const data = await this.$axios.$post('/api/v1/resumes', this.selectedFile, {
                //     headers: {
                //         'Content-Type': 'multipart/form-data'
                //     }
                // })
                // console.log('userResume: ', this.userResume)
                // const data = await this.$axios.post('/api/v1/resumes', this.userResume)
                // const formData = new FormData()
                // formData.append('updatedResume', JSON.stringify(this.userResume))
                // formData.append('image', this.selectedFile)
                // formData.append('file2', this.selectedFile, this.selectedFile.name)
                // const data = await this.$axios.$post('/api/v1/resumes', formData, {
                //     headers: {
                //         'Content-Type': 'multipart/form-data'
                //     }
                // })
                // let config = {
                //     headers: { 'Content-Type': 'multipart/form-data' }
                // }
                // const data = await axios.post('/api/v1/resumes', formData, config)

                const formData = new FormData()
                for (const i of Object.keys(this.files)) {
                    formData.append('files', this.files[i])
                }
                console.log('formData: ', formData)
                // const data = await this.$axios.$post('/api/v1/multiple', formData, {})
                const data = await this.$axios.$post('/api/v1/resumes', formData, {
                    onUploadProgress: (progressEvent) => {
                        console.log('progress: ', progressEvent.loaded / progressEvent.total)
                    },
                })
                console.log('data: ', data)
            } catch (error) {
                console.log('error: ', error)
            }
        },
        async onUpload2() {
            try {
                console.log('onUpload2')
                const formData = new FormData()
                for (const i of Object.keys(this.userResume.uploads)) {
                    console.log('i: ', i)
                    formData.append('files', this.userResume.uploads[i])
                }
                console.log('formData: ', formData)
                const data = await this.$axios.$post('/api/v1/resumes', formData, {
                    onUploadProgress: (progressEvent) => {
                        console.log('progress: ', progressEvent.loaded / progressEvent.total)
                    },
                })
                console.log('data: ', data)
            } catch (error) {
                console.log('error: ', error)
            }
        },
        async getUserFiles() {
            try {
                const data = await this.$axios.$get('/api/v1/resumes/user-files')
                console.log('data: ', data)
                this.image1 = data.objects[0]
            } catch (error) {
                console.log('error: ', error)
            }
        },
        abc(file) {
            console.log('abc: ', file)
        },
        async def(file) {
            console.log('def2: ', file)
            // 1) Get file
            const data = await this.$axios.$post('/api/v1/resumes/file', {
                userId: `${this.authUser.id}`,
                fileName: file.name,
                // mimeType: 'image/jpg'
            })
            console.log('data: ', data)

            // 2) Add file to list
            this.userResume.uploads.push({
                name: file.name,
                category: 'downloadable_file',
                size_in_bytes: data.ContentLength,
            })
        },
        async getResumeFile(file) {
            try {
                console.log('getResumeFile: ', file)
                // const resumeId = '5e66fc21e6e3aed76df5dc44'
                // const fileId = '5fb5c194b488693c68598122'
                // const data = await this.$axios.$get(`/api/v1/resumes/${resumeId}/file/${file._id}`, {
                //     responseType: 'blob',
                //     headers: {
                //         Accept: file.mime_type
                //     }
                // })
                const data = await this.$axios.$post(
                    `/api/v1/resumes/file`,
                    {
                        // userId: 'new1/5e66fbd716b536f1880127e5',
                        userId: `${this.authUser.id}`,
                        fileName: file.name,
                        // mimeType: file.mime_type
                    },
                    {
                        responseType: 'blob',
                        // headers: {
                        //     Accept: file.mime_type
                        // }
                    }
                )
                console.log('data: ', data)
                fileDownload(data.Body, file.name.substring(file.name.indexOf('_') + 1))
            } catch (error) {
                console.log('error: ', error)
            }
        },
        encode(data) {
            console.log('data: ', data)
            const str = data.reduce(function (a, b) {
                return a + String.fromCharCode(b)
            }, '')
            return btoa(str).replace(/.{76}(?=.)/g, '$&\n')
        },
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
