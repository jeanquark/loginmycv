<template>
    <div>
        <!-- <v-layout> -->
		<v-row no-gutters>
            <!-- <v-flex xs12> -->
			<v-col cols="12">
                index: {{ index }}<br /><br />
                newWorkExperience: {{ newWorkExperience }}<br /><br />
                userResume.work_experience[index]: {{ userResume.work_experience[index] }}<br /><br />
            <!-- </v-flex> -->
			</v-col>
        <!-- </v-layout> -->
		</v-row>
        <div style="width: 100%; height: 400px;">
            <!-- <div id="map-wrap" style=""> -->
            <!-- userResume.education[index]: {{ userResume.education[index] }}<br /><br /> -->
            <!-- position: {{ position }}<br /><br /> -->
            <!-- candidateEducation: {{ candidateEducation }}<br /><br /> -->
            <!-- index: {{ index }}<br /><br /> -->

            <no-ssr>
			<!-- <client-only> -->
                <l-map :zoom="3" :center="[51.47888889, 0]" style="background: rgb(171, 210, 225); z-index: 0; height: 300px; width: 100%; margin: 0px; padding: 0px; position: relative;">
                    <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
                    <l-marker :lat-lng.sync="userResume.work_experience[index].position" :draggable="true" v-if="userResume.work_experience[index]"></l-marker>
                    <l-marker :lat-lng.sync="newWorkExperience.position" :draggable="true" v-if="newWorkExperience"></l-marker>
                </l-map>
            </no-ssr>
			<!-- </client-only> -->
        </div>
    </div>
</template>

<script>
	let L = { icon() {} }
	if (process.browser) {
		L = require('leaflet')
	}
	export default {
		props: ['resumeSlug', 'index', 'newWorkExperience'],
		async created() {
			this.primaryColor = '#7A528F'
		},
		created() {
			try {

		
			if (this.newWorkExperience) {
				this.newWorkExperience.position = {
					lat: 51.47888889,
					lng: 0
				}
			}
			} catch (error) {
				console.log('error: ', error)
			}
			// console.log('userResume.work_experience[this.index]: ', this.userResume.work_experience[this.index])
			// if (this.userResume.work_experience[this.index] && !this.userResume.work_experience[this.index].position) {
			// 	this.userResume.work_experience[this.index].position = {
			// 		lat: 51.47888889,
			// 		lng: 0
			// 	}
			// }
		},
		mounted() {},
		data() {
			return {
				// customIcon: L.icon({
				// 	iconUrl: '/images/icons/SVG/method-draw-image.svg',
				// 	iconSize: [35, 30],
				// 	iconAnchor: [25, 25],
				// 	popupAnchor: [-8, -30]
				// }),
				// primaryColor: '',
				// secondaryColor: '#FFC107',
				// markers: [
				// 	{
				// 		position: [50.0, -85.0]
				// 	},
				// 	{
				// 		position: [45.0, -80.0]
				// 	}
				// ],
				// color2: {
				// 	hex: '#FFFF00',
				// 	source: 'hex'
				// }
			}
		},
		computed: {
			userResume() {
				return this.$store.getters['resumes/loadedUserResumes'].find(
					resume => resume.slug === this.resumeSlug
				)
			}
		},
		methods: {
			// moveMarker(LatLng) {
			// 	console.log('moveMarker: ', LatLng)
			// 	// this.userResume.work_experience[this.index].position.lat = 'abc'
			// 	this.userResume.work_experience[this.index].position = {
			// 		lat: 50,
			// 		lng: 10
			// 	}
			// 	// const { lat, lng } = LatLng
			// 	// this.$emit('updateEducation', { position: { lat, lng } })
			// },
			updateMarkerPosition() {
				console.log('updateMarkerPosition')
			}
		}
	}
</script>

<style scoped>
	.primary-color {
		color: var(--v-primary-lighten5);
	}
	.abc {
		color: yellow;
	}
	>>> .leaflet-popup-content-wrapper {
		background: yellow;
	}
	>>> .leaflet-popup-tip {
		background: yellow;
	}
	>>> .leaflet-container a.leaflet-popup-close-button {
		color: red;
	}
</style>