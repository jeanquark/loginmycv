<template>
    <v-container>
   	<!-- <div> -->
        <v-row no-gutters>
            <v-col cols="12">
                <!-- userResume: {{ userResume }}<br /><br /> -->
                candidateEducation: {{ candidateEducation }}<br /><br />
                userResume.uploads: {{ userResume.uploads }}<br /><br />
                <!-- candidateEducationImage: {{ candidateEducationImage }}<br /><br /> -->
                <h2>Education Dynamic Component goes here...</h2>
                index: {{ index }}
            </v-col>

            <v-col cols="12">
				<div v-if="candidateEducationImage">
					<v-img :src="candidateEducationImage" height="150" style="border: 2px solid red;"></v-img><br />
				</div>
            	<!-- <v-file-input chips accept="image/*" hint="For example: picture of the University main building" label="Illustration image" @change="onFilePicked"></v-file-input> -->
            	<v-file-input chips accept="image/*" hint="For example: picture of the University main building" label="Illustration image" ref="abc" @change="onFileChange" @click="removeImage"></v-file-input>
            	<!-- <v-file-input chips accept="image/*" hint="Example: picture of the university main building" label="Illustration image" v-model="candidateEducationImage"></v-file-input> -->
        	</v-col>
        </v-row>


       	<!-- <div id="map-wrap" style="height: 200px; width: 100%; z-index: 0;">
            <client-only>
                <l-map ref="map" v-resize="onResize" :zoom=13 :center="[55.9464418,8.1277591]">
                    <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
                    <l-marker :lat-lng="[55.9464418,8.1277591]"></l-marker>
                </l-map>
            </client-only>
        </div> -->


        <div style="width: 100%; height: 380px;">
            <!-- <div id="map-wrap" style=""> -->
            <!-- userResume.education[index]: {{ userResume.education[index] }}<br /><br /> -->
            <!-- userResume.education[index]['coordinates']: {{ userResume.education[index]['coordinates'] }}<br /><br /> -->
            <!-- position: {{ position }}<br /><br /> -->
            <!-- candidateEducation: {{ newEducation }}<br /><br /> -->
            <!-- index: {{ index }}<br /><br /> -->
            <!-- candidateEducation[index]: {{ candidateEducation[index] }}<br /><br /> -->

            <client-only>
                <l-map ref="map" v-resize="onResize" :zoom="3" :center="[51.47888889, 0]" style="background: rgb(171, 210, 225); z-index: 0; height: 300px; width: 100%; margin: 0px; padding: 0px;">
                    <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
                    <!-- <l-marker :lat-lng.sync="userResume.education[index]['coordinates']" :draggable="true" @update:latLng="moveMarker" v-if="userResume.education[index] && userResume.education[index]['coordinates']"> -->
                    <l-marker :lat-lng="candidateEducation[index].coordinates" :draggable="true" @update:latLng="moveMarker" v-if="candidateEducation[index]">
                        <l-popup>
                            <b>{{ userResume.education[index].title }}</b> {{ userResume.education[index].school }}<br />
                            {{ userResume.education[index].city }}, {{ userResume.education[index].country }}<br />
                            {{ userResume.education[index].start_date }} - {{ userResume.education[index].end_date }}
                        </l-popup>
                    </l-marker>
                    <!-- <l-marker :lat-lng.sync="newEducation.coordinates" :draggable="true" @update:latLng="moveMarker" v-if="newEducation">
                        <l-popup>
                            <b>{{ newEducation.title }}</b> {{ newEducation.school }}<br />
                            {{ newEducation.city }}, {{ newEducation.country }}<br />
                            {{ newEducation.start_date }} - {{ newEducation.end_date }}
                        </l-popup>
                    </l-marker> -->
                </l-map>
            </client-only>
        </div>
    </v-container>
	<!-- </div> -->

</template>

<script>
	let L = { icon() {} }
	if (process.browser) {
	// if (process.client) {
		L = require('leaflet')
	}
	export default {
		props: ['index'],
		async created() {
			console.log('Education Dynamic Component created!')
		},
		mounted() {
			if (!this.userResume.education[this.index]['coordinates']) {
			// 	// this.newEducation.coordinates = [51.47888889, 0]
			// 	this.userResume.education[this.index]['coordinates'] = [51.47888889, 0]
			}
			if (!this.candidateEducation[this.index]['coordinates']) {
				this.candidateEducation[this.index]['coordinates'] = [51.47888889, 0]
			}
			// this.candidateEducationImage = this.userResume.uploads.find(upload => upload.type === `education_${this.index}_image`)
			// this.$refs('abc') = this.userResume.uploads.find(upload => upload.type === `education_${this.index}_image`)
		},
		data() {
			return {
				// candidateEducationImage: {}
			}
		},
		computed: {
			userResume() {
				if (this.$route.params.slug) {
	                return this.$store.getters['resumes/userResumes'].find(resume => resume.slug === this.$route.params.slug)
	            } else {
	                return this.$store.getters['resumes/newResume']
	            }
			},
			candidateEducationImage () {
				// get () {
					return this.userResume.uploads.find(upload => upload.type === `education_${this.index}_image`)
				// },
				// set(value) {
				// 	console.log('candidateEducationImage set: ', value)
				// }
			},
			// userResume2: {
			// 	get() {
			// 		return this.$store.getters['resumes/userResumes'].find(resume => resume.slug === this.$route.params.slug)
			// 	},
			// 	set(value) {
			// 		console.log('Set userResume: ', value)
			// 		this.userResume.education[this.index]['coordinates'] = value
			// 	}
			// },
			candidateEducation: {
	            get() {
	                return this.userResume.education
	            },
	            // set(value) {
	            //     this.userResume.education[this.index] = value
	            // },
	            set(value) {
                	this.userResume.education = value
            	}
	        }
		},
		methods: {
			onFileChange(file) {
				console.log('onFileChange: ', file)
				this.removeImage()
				if (file) {
					this.userResume.uploads.push({
	                    file: file,
	                    name: file.name,
	                    type: `education_${this.index}_image`,
	                    size_in_bytes: parseInt(file.size),
	                    new: true
	                })
				}
			},
			removeImage () {
				this.userResume.uploads = this.userResume.uploads.filter(upload => upload.type !== `education_${this.index}_image`)
			},
        	onFilePicked(file) {
        		console.log('onFilePicked: ', file)
	            // const file = file
	            console.log('file: ', file)
	            // console.log('file.name: ', file.name)
	            if (file) {
	            	this.userResume.uploads.push({
	                    file: file,
	                    name: file.name,
	                    type: 'education_image',
	                    size_in_bytes: parseInt(file.size),
	                    new: true
	                })
	            }
	            return
	            // if (files[0]) {
	            //     this.uploadingNewImage = true
	            //     this.userResume.uploads = this.userResume.uploads.filter(upload => upload.type !== 'profile_picture')
	            //     this.userResume.uploads.push({
	            //         file: files[0],
	            //         name: files[0].name,
	            //         type: 'education_image',
	            //         size_in_bytes: parseInt(files[0].size),
	            //         new: true
	            //     })

	            //     this.imageName = files[0].name
	            //     const fileReader = new FileReader()
	            //     fileReader.readAsDataURL(files[0])
	            //     fileReader.addEventListener('load', () => {
	            //         this.imageUrl = fileReader.result
	            //         this.uploadingNewImage = false
	            //     })
	            // }
	        },
			onResize() { // Necessary for Leaflet map to render correctly
				console.log('onResize: ', this.$refs.map)
            	this.$refs.map.mapObject._onResize();
        	},
			moveMarker(LatLng) {
				console.log('moveMarker: ', LatLng)
				const { lat, lng } = LatLng
				console.log('lat: ', lat)
				console.log('lng: ', lng)
				console.log('this.index: ', this.index)
				// this.userResume.education[this.index]['coordinates'] = [lat, lng]
				// this.$emit('updateEducationCoordinates', { coordinates: { lat, lng } })
				// this.candidateEducation = [lat, lng]
				this.candidateEducation[this.index]['coordinates'] = [lat, lng]
			}
			// updateMarkerPosition() {
			// 	console.log('updateMarkerPosition')
			// }
		},
		// watch: {
		// 	index: function () {
		// 		console.log('watch index')
		// 	}
		// }
	}
</script>

<style scoped>
</style>