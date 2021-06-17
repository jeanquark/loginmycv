<template>
    <v-card>
        <!-- userResumes: {{ userResumes }}<br /><br /> -->
        <!-- abc: {{ abc }}<br /><br /> -->
        <!-- def: {{ def }}<br /><br /> -->
        uploadedFiles: {{ uploadedFiles }}<br /><br />
        <v-card-title class="primary white--text title"> Files directory <v-btn small color="secondary" class="mx-2" @click="fetchUserFiles">Fetch user files</v-btn> </v-card-title>
        <v-row class="pa-4" justify="space-between">
            <v-col cols="5">
                <v-treeview :active.sync="active" :items="items" :load-children="fetchUploadedFiles" item-key="name" :open.sync="open" activatable color="secondary" open-on-click transition>
                    <template v-slot:prepend="{ item }">
                        <font-awesome-icon :icon="['fas', 'file']" v-if="!item.children" />
                        <!-- <font-awesome-icon :icon="['fas', 'folder']" v-if="item.children && !item[0]" /> -->
                        <!-- <font-awesome-icon :icon="['fas', 'file-pdf']" v-if="!item.children && item.mime_type === 'application/pdf'" /> -->
                        <!-- <font-awesome-icon :icon="['fas', 'image']" v-if="!item.children && item.mime_type !== 'application/pdf'" /> -->
                    </template>
                </v-treeview>
            </v-col>

            <v-divider vertical></v-divider>

            <v-col class="d-flex text-center">
                <v-scroll-y-transition mode="out-in">
                    <div v-if="!selected" class="title grey--text text--lighten-1 font-weight-light" style="align-self: center">
                        <!-- selected: {{ selected }}<br />
                        active: {{ active }}<br /> -->
                        open: {{ open }}<br />
                        <!--- open.length: {{ open.length }}<br />
                        Select a File -->
                    </div>
                    <v-card v-if="selected && selected.name" :key="selected._id" class="pt-6 mx-auto" flat max-width="500">
                        <v-card-text>
                            selected: {{ selected }}<br /><br />
                            active: {{ active }}<br /><br />
                            open: {{ open }}<br /><br />
                            <!-- open.length: {{ open.length }}<br /> -->
                            <v-icon>mid-picture-as-pdf</v-icon>
                            <font-awesome-icon :icon="['fas', 'file-pdf']" size="5x" v-if="selected.mime_type === 'application/pdf'" />
                            <font-awesome-icon :icon="['fas', 'image']" size="5x" v-else />
                            <h3 class="headline mb-2">
                                {{ selected.title }}
                            </h3>
                            <v-btn small class="primary" @click="$emit('download-resume-file', selected)">Download</v-btn>
                            <v-btn small class="secondary" @click="$emit('add-file-to-list', selected)">Add to resume</v-btn>
                            <v-btn small class="error" @click="deleteFile(selected)">Delete</v-btn>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-row align="center" class="text-left" tag="v-card-text">
                            <v-col class="text-right" tag="strong" cols="3">Resume(s)</v-col>
                            <v-col cols="9"><v-chip color="tertiary" v-for="(resume, index) in selected.resumes" :key="index">{{ resume.resumeSlug }}</v-chip></v-col>
                            <v-col class="text-right" tag="strong" cols="3"> name: </v-col>
                            <v-col cols="9">{{ selected.name }}</v-col>
                            <v-col class="text-right" tag="strong" cols="3"> size: </v-col>
                            <v-col cols="9">{{ (selected.size_in_bytes / 1000).toFixed(2) }} KB</v-col>
                        </v-row>
                    </v-card>
                    <v-card class="mx-auto" v-if="selected && !selected.name">
                        <v-card-text> <p class="text-center">This file is not linked to any of your resume(s)</p>
                            selected: {{ selected }}<br />
                            active[0]: {{ this.active[0] }}<br />
                        </v-card-text>
                        <v-card-actions>
                            <v-btn small class="primary" @click="$emit('download-resume-file', active[0])">Download</v-btn>
                            <v-btn small class="secondary" @click="$emit('add-file-to-list', active[0])">Add to resume</v-btn>
                            <v-btn small class="error" @click="deleteFile(selected)">Delete</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-scroll-y-transition>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
// import Noty from 'noty'

export default {
    mounted () {
        console.log('[LOAD FileUploadsDirectoryComponent]')
    },
    data() {
        return {
            active: [],
            open: [],
            uploadedFiles: [],
        }
    },
    computed: {
        userResumes() {
            return this.$store.getters['resumes/userResumes']
        },
        items() {
            // return this.userResumes.flatMap(resume => resume.uploads)
            return [
                {
                    name: 'Files',
                    children: this.uploadedFiles,
                },
            ]
        },
        selected() {
            console.log('selected: ', this.active[0])
            if (!this.active.length) return undefined
            const fileName = this.active[0]
            // console.log('id: ', id)
            // return this.uploadedFiles.find(upload => upload._id.toString() === id)
            // for (let { upload } of this.userResumes) {
            //     newData.find(upload => upload.name === '5e66fbd716b536f1880127e5_def.jpg')
            // }
            const uploadedFile = { resumes: [] }
            this.userResumes.forEach((resume) => {
                if (resume.uploads) {
                    const upload = resume.uploads.find((upload) => upload.name === fileName)
                    if (upload) {
                        uploadedFile.name = upload.name
                        uploadedFile.size_in_bytes = upload.size_in_bytes
                        uploadedFile.type = 'image/png'
                        uploadedFile.resumes.push({
                            resumeSlug: resume.slug,
                        })
                    }
                }
            })
            console.log('uploadedFile: ', uploadedFile)
            return uploadedFile
        },
        selected_ORIGINAL() {
            console.log('selected: ', this.active[0])
            if (!this.active.length) return undefined
            const id = this.active[0]
            // console.log('id: ', id)
            return this.uploadedFiles.find((upload) => upload._id.toString() === id)
        },
        abc() {
            return this.userResumes.map(({ id, slug, uploads }) => ({ id, slug, uploads }))
            // return []
        },
        def() {
            let array = []

            for (let i = 0; i < this.abc.length; i++) {
                if (this.abc[i]['uploads']) {
                    for (let j = 0; j < this.abc[i]['uploads'].length; j++) {
                        array.push({
                            resumeId: this.abc[i]['id'],
                            resumeSlug: this.abc[i]['slug'],
                            upload: this.abc[i]['uploads'][j],
                        })
                    }
                }
            }
            return array
        },
    },

    methods: {
        clickTree() {
            console.log('clickTree')
        },
        async fetchUserFiles() {
            const abc = await this.$store.dispatch('resumes/fetchUserFiles')
            console.log('abc: ', abc)
        },
        async fetchUploadedFiles(item) {
            try {
                await pause(800)
                console.log('fetchUploadedFiles: ', item)

                // const abc = await this.$store.dispatch('resumes/fetchUserFiles')
                // console.log('abc: ', abc)
                // return item.children.push(...this.userResumes.flatMap(resume => resume.uploads))

                const data = await this.$store.dispatch('resumes/fetchUserFiles')
                console.log('data: ', data)
                return item.children.push(...data)
            } catch (error) {
                console.log('error')
            }
        },
        async fetchUploadedFiles_ORIGINAL(item) {
            await pause(800)
            return item.children.push(...this.userResumes.flatMap((resume) => resume.uploads))
        },
        async deleteFile(file) {
            try {
                console.log('deleteFile: ', file)

                await this.$store.dispatch('resumes/deleteResumeFile', { fileName: file.name })
                // new Noty({
                //     type: 'success',
                //     text: 'Your file was successfully deleted.',
                //     timeout: 5000,
                //     theme: 'metroui',
                // }).show()
            } catch (error) {
                console.log('error: ', error)
                // new Noty({
                //     type: 'error',
                //     text: 'An error occured and your file could not be deleted',
                //     timeout: 5000,
                //     theme: 'metroui',
                // }).show()
            }
        },
    },
}
</script>
