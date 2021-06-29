<template>
    <div style="">
        <h2 class="text-center">Profile picture</h2>
        <!-- userImages: {{ userImages }}<br /><br /> -->
        <!-- authUser: {{ authUser }}<br /> -->
        <!-- resumeSlug: {{ resumeSlug }}<br /><br /> -->
        <!-- userResumes: {{ userResumes }}<br /> -->
        <!-- userResume: {{ userResume }}<br /><br /> -->
        <!-- userResume.uploads: {{ userResume.uploads }}<br /><br /> -->
        <!-- currentProfilePicture: {{ currentProfilePicture }}<br /><br /> -->
        <!-- newProfilePicture: {{ newProfilePicture }}<br /><br /> -->
        <!-- profilePicture: {{ profilePicture }}<br /><br /> -->
        <!-- abc: {{ abc }}<br /><br /> -->
        <!-- newUploadPicture: {{ newUploadPicture }}<br /><br /> -->

        <v-row no-gutters justify="start" align="start" class="my-2">
            <v-col cols="4" style="">
                <!-- <input type="file" id="img-input" /> -->
                <v-file-input type="file" color="primary" label="Profile picture" prepend-icon="mdi-camera" v-model="newUploadPicture" @change="onFileChanged($event)"></v-file-input>
                <div class="text-center">
                    <v-btn @click="upload" color="primary" class="text-center">Upload</v-btn>
                </div>
            </v-col>
            <v-col cols="4" class="text-center" style="" v-if="currentProfilePicture">
                <v-chip x-small color="primary" class="mb-2">Current picture</v-chip><br />
                <v-row no-gutters justify="center">
                    <div class="image-wrapper">
                        <img :src="`/images/users/${authUser.id}/${currentProfilePicture.name}`" height="150" :class="[!profilePicture ? 'deleted' : '']" />
                        <div class="centered" v-if="!profilePicture">Deleted</div>
                    </div></v-row
                >
                <v-row no-gutters justify="center"> <v-btn small color="success" @click="restoreProfilePicture" v-if="!profilePicture">Restore</v-btn></v-row>
                <v-row no-gutters justify="center">
                    <v-btn small color="error" @click="deleteCurrentProfilePicture" v-if="profilePicture && !newProfilePicture">Delete</v-btn>
                </v-row>
            </v-col>
            <v-col cols="4" class="text-center" style="">
                <v-chip small color="secondary" class="mb-2" v-if="newProfilePicture"
                    >New picture
                    <v-icon small right color="success" v-if="verifiedImage">mdi-check</v-icon>
                    <font-awesome-icon :icon="['fas', 'spinner']" size="1x" spin class="ml-2" v-else /> </v-chip
                ><br />
                <v-row no-gutters justify="center">
                    <!-- {{ newProfilePicture }} -->
                    <!-- <img :src="`/images/users/${authUser.id}/${newProfilePicture.name}`" height="150" v-if="newProfilePicture" /> -->
                    <img :src="newProfilePicture" height="150" id="newPicture" class="mb-2" />
                    <span v-if="analyzingImage">Analyzing your image <font-awesome-icon :icon="['fas', 'spinner']" size="1x" spin class="ml-1" /></span>
                    <!-- <span v-if="verifiedImage">Image verified!</span> -->
                </v-row>
                <v-row no-gutters justify="center" class="my-2">
                    <v-chip x-small color="success" v-if="newProfilePicture && verifiedImage">Image verified!</v-chip>
                </v-row>
                <v-row no-gutters justify="center" v-if="newProfilePicture">
                    <v-btn small color="error" @click="removeNewProfilePicture">Cancel</v-btn>
                </v-row>
            </v-col>
        </v-row>

        <v-row no-gutters class="my-5 background-dark" style="" v-if="userImages.length">
            <v-col cols="12" class="text-center">
                <v-chip x-small color="tertiary" class="mb-2">Browse your image gallery</v-chip>
            </v-col>
            <v-col cols="6" sm="4" md="3" lg="2" v-for="(image, index) in userImages" :key="index" class="d-flex child-flex">
                <v-img :src="`/images/users/${authUser.id}/${image.name}`" :lazy-src="`/images/users/${authUser.id}/${image.name}`" aspect-ratio="1" class="image" @click="selectImage(image)">
                    <template v-slot:placeholder>
                        <v-row class="fill-height ma-0" align="center" justify="center">
                            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                        </v-row> </template
                ></v-img>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import * as nsfwjs from 'nsfwjs'
const delay = (ms) => new Promise((res) => setTimeout(res, ms))

export default {
    props: ['resumeSlug'],
    async mounted() {
        try {
            // this.userImages = await this.$store.dispatch('resumes/fetchUserImages')

            const currentProfilePicture = this.userResume?.uploads?.find((upload) => upload.category === 'profile_picture')
            if (currentProfilePicture) {
                this.currentProfilePicture = JSON.parse(JSON.stringify(currentProfilePicture))
            }
        } catch (error) {
            console.log('error: ', error)
        }
    },
    data() {
        return {
            userImages: [],
            currentProfilePicture: null,
            newProfilePicture: null,
            newUploadPicture: null,
            analyzingImage: false,
            verifiedImage: false,
        }
    },
    computed: {
        authUser() {
            return this.$store.getters['auth/authUser']
        },
        userResumes() {
            return this.$store.getters['resumes/userResumes']
        },
        userResume() {
            if (this.$route.params.slug) {
                return this.$store.getters['resumes/userResumes'].find((resume) => resume.slug === this.$route.params.slug)
            } else {
                return this.$store.getters['resumes/userResumes'].find((resume) => resume.status === 'new')
            }
        },
        profilePicture() {
            return this.userResume?.uploads?.find((upload) => upload.category === 'profile_picture' && !upload.status)
        },
    },
    methods: {
        async onFileChanged(file) {
            try {
                console.log('onFileChanged: ', file)
                if (file) {
                    const fileReader = new FileReader()
                    fileReader.readAsDataURL(file)
                    fileReader.addEventListener('load', () => {
                        this.newProfilePicture = fileReader.result
                    })

                    console.log('Analyzing your image...')
                    this.analyzingImage = true
                    this.verifiedImage = false
                    const img = document.getElementById('newPicture')
                    this.$emit('imageVerifying', true)
                    const model = await nsfwjs.load()
                    const predictions = await model.classify(img, 5)
                    await delay(3000)
                    console.log('predictions: ', predictions)

                    if (predictions[0].className === 'Neutral' || predictions[0].className === 'Drawing') {
                        await delay(2000)
                        console.log('Ok, continue!')
                        this.analyzingImage = false
                        this.verifiedImage = true
                        this.$emit('imageVerifying', false)
                    } else {
                        throw new Error('Not a valid image!')
                    }

                    // 1) Add new profile picture
                    const profilePictureIndex = this.userResume.uploads.findIndex((upload) => upload.category === 'profile_picture')
                    console.log('profilePictureIndex: ', profilePictureIndex)
                    if (profilePictureIndex != -1) {
                        // this.userResume.uploads.splice(profilePictureIndex, 1, {
                        //     file,
                        //     name: file.name,
                        //     title: 'Profile picture',
                        //     category: 'profile_picture',
                        //     type: 'image',
                        //     size_in_bytes: parseInt(file.size),
                        //     status: 'new'
                        // })
                        this.userResume.uploads[profilePictureIndex]['status'] = 'to_be_removed_from_db'
                    }
                    this.userResume.uploads.push(
                        {
                            file,
                            name: file.name,
                            title: 'Profile picture',
                            category: 'profile_picture',
                            type: 'image',
                            size_in_bytes: parseInt(file.size),
                            status: 'to_be_saved_on_disc',
                        },
                        {
                            file,
                            name: file.name,
                            title: 'Profile picture',
                            category: 'profile_picture',
                            type: 'image',
                            size_in_bytes: parseInt(file.size),
                            status: 'to_be_added_to_db',
                        }
                    )

                    // 2) Remove old profile picture
                    if (this.currentProfilePicture) {
                        console.log('currentProfilePicture.name: ', this.currentProfilePicture.name)
                        const currentImageArray = this.userResumes.flatMap((resume) => resume.uploads.filter((upload) => upload.name === this.currentProfilePicture.name))
                        console.log('currentImageArray: ', currentImageArray)
                        if (currentImageArray.length === 1) {
                            this.userResume.uploads.push({
                                name: this.currentProfilePicture.name,
                                type: this.currentProfilePicture.type,
                                category: this.currentProfilePicture.category,
                                status: 'to_be_deleted_from_disc',
                            })
                        }
                    }
                } else {
                    this.newProfilePicture = null
                }
            } catch (error) {
                console.log('error: ', error)
            }
        },
        selectImage(image) {
            try {
                console.log('selectImage: ', image)
                this.deleteCurrentProfilePicture()
                this.userResume.uploads.push({
                    name: image.name,
                    title: 'Profile picture',
                    category: 'profile_picture',
                    type: 'image',
                    size_in_bytes: parseInt(image.size),
                    status: 'to_be_added_to_db',
                })
                this.newProfilePicture = `/images/users/${this.authUser.id}/${image.name}`
            } catch (error) {
                console.log('error: ', error)
                alert('Image was not found in DB!')
            }
        },
        async removeNewProfilePicture() {
            try {
                console.log('removeNewProfilePicture')
                this.restoreProfilePicture()
                this.newProfilePicture = null
                this.newUploadPicture = null
            } catch (error) {
                console.log('error: ', error)
            }
        },
        async deleteCurrentProfilePicture() {
            try {
                console.log('deleteCurrentProfilePicture')
                const profilePictureIndex = this.userResume.uploads.findIndex((upload) => upload.category === 'profile_picture')
                console.log('profilePictureIndex: ', profilePictureIndex)
                if (profilePictureIndex != -1) {
                    this.userResume.uploads[profilePictureIndex]['status'] = 'to_be_removed_from_db'
                    const currentImageArray = this.userResumes.flatMap((resume) => resume.uploads.filter((upload) => upload.name === this.currentProfilePicture.name))
                    console.log('currentImageArray: ', currentImageArray)
                    if (currentImageArray.length === 1) {
                        this.userResume.uploads.push({
                            name: this.currentProfilePicture.name,
                            type: this.currentProfilePicture.type,
                            category: this.currentProfilePicture.category,
                            status: 'to_be_deleted_from_disc',
                        })
                    }
                }
            } catch (error) {
                console.log('error: ', error)
            }
        },
        async restoreProfilePicture() {
            try {
                console.log('restoreProfilePicture')
                const profilePictureIndexRemovedFromDB = this.userResume.uploads.findIndex((upload) => upload.category === 'profile_picture' && upload.status === 'to_be_removed_from_db')
                console.log('profilePictureIndexRemovedFromDB: ', profilePictureIndexRemovedFromDB)
                if (profilePictureIndexRemovedFromDB != -1) {
                    this.userResume.uploads[profilePictureIndexRemovedFromDB]['status'] = null
                }

                const profilePictureIndexAddedToDB = this.userResume.uploads.findIndex((upload) => upload.category === 'profile_picture' && upload.status === 'to_be_added_to_db')
                console.log('profilePictureIndexAddedToDB: ', profilePictureIndexAddedToDB)
                if (profilePictureIndexAddedToDB != -1) {
                    this.userResume.uploads.splice(profilePictureIndexAddedToDB, 1)
                }

                const profilePictureIndexDeletedFromDisc = this.userResume.uploads.findIndex((upload) => upload.category === 'profile_picture' && upload.status === 'to_be_deleted_from_disc')
                console.log('profilePictureIndexDeletedFromDisc: ', profilePictureIndexDeletedFromDisc)
                if (profilePictureIndexDeletedFromDisc != -1) {
                    this.userResume.uploads.splice(profilePictureIndexDeletedFromDisc, 1)
                }
                this.newProfilePicture = null
                this.newUploadPicture = null
            } catch (error) {
                console.log('error: ', error)
            }
        },
        async upload() {
            try {
                var img = document.getElementById('img')
                console.log('img: ', img)

                // Load model from my S3.
                // const model = await nsfwjs.load()
                // console.log('nsfwjs loaded!')

                // // Classify the image
                // const predictions = await model.classify(img)
                // console.log('Predictions: ', predictions)
            } catch (error) {
                console.log('error: ', error)
            }
        },
    },
}
</script>

<style scoped>
.image {
    /* border: 2px solid blue; */
    border: 2px solid transparent;
    /* border: 3px solid green; */
}
::v-deep .image:hover {
    border: 2px solid var(--v-secondary-base);
    /* border: 3px solid green; */
    cursor: pointer;
}

.image-wrapper {
    position: relative;
    text-align: center;
    color: white;
}
.centered {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.deleted {
    opacity: 0.2;
}
.border-primary {
    border: 2px solid var(--v-primary-base);
    border-radius: 1em;
    padding: 1em;
}
.border-secondary {
    border: 2px solid var(--v-secondary-base);
    border-radius: 1em;
    padding: 1em;
}
.border-tertiary {
    border: 2px solid var(--v-tertiary-base);
    border-radius: 1em;
    padding: 1em;
}
.background-dark {
    background: var(--v-background-base);
    border-radius: 1em;
    padding: 1em;
}
</style>
