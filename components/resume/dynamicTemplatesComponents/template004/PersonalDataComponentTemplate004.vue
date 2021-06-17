<template>
    <div>
        <!-- <v-layout> -->
		<v-row no-gutters>
            <!-- <v-flex xs12 class="my-2"> -->
			<v-col cols="12" class="my-2">
                index: {{ index }}<br /><br />
				userResume.personal_data.position: {{ userResume.personal_data.position }}<br /><br />
				<h3 class="text-center">Locate your home place</h3>
            <!-- </v-flex> -->
			</v-col>
        <!-- </v-layout> -->
		</v-row>
        <div style="width: 100%; height: 350px;">
            <!-- <div id="map-wrap" style=""> -->
            <!-- userResume.education[index]: {{ userResume.education[index] }}<br /><br /> -->
            <!-- position: {{ position }}<br /><br /> -->
            <!-- index: {{ index }}<br /><br /> -->

            <!-- <no-ssr> -->
			<client-only>
                <l-map :zoom="3" :center="[51.47888889, 0]" style="background: rgb(171, 210, 225); z-index: 0; height: 300px; width: 100%; margin: 0px; padding: 0px; position: relative;">
                    <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
                	<l-marker :lat-lng.sync="userResume.personal_data.position" :draggable="true" v-if="userResume.personal_data"></l-marker>
                    <!-- <l-marker :lat-lng.sync="newPersonalData.position" :draggable="true" @update:latLng="moveMarker" v-if="newPersonalData"></l-marker> -->
                </l-map>
            <!-- </no-ssr> -->
			</client-only>
        </div>
    </div>
</template>

<script>
	let L = { icon() {} }
	if (process.browser) {
		L = require('leaflet')
	}
	export default {
		props: ['resumeSlug', 'index', 'newPersonalData'],
		async created() {
			this.primaryColor = '#7A528F'
		},
		created() {
			try {
			// if (this.newPersonalData) {
			// 	this.newPersonalData.position = {
			// 		lat: 51.47888889,
			// 		lng: 0
			// 	}
			// 	// } else if (this.userResume.education[this.index] && !this.userResume.education[this.index].position) {
			// } else if (this.index) {
			// 	// this.userResume.education[this.index].position = {
			// 	// 	lat: 51.47888889,
			// 	// 	lng: 0
			// 	// }
			// }
			if (!this.userResume.personal_data.position) {
				this.userResume.personal_data.position = {
					lat: 51.47888889,
					lng: 0
				}
			}
			} catch (error) {
				console.log('error: ', error)
			}
		},
		mounted() {},
		data() {
			return {
				customIcon: L.icon({
					iconUrl: '/images/icons/SVG/method-draw-image.svg',
					iconSize: [35, 30],
					iconAnchor: [25, 25],
					popupAnchor: [-8, -30]
				}),
				primaryColor: '',
				secondaryColor: '#FFC107',
				// markers: [
				// 	{
				// 		position: [50.0, -85.0]
				// 	},
				// 	{
				// 		position: [45.0, -80.0]
				// 	}
				// ],
				color2: {
					hex: '#FFFF00',
					source: 'hex'
				}
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
			moveMarker(LatLng) {
				const { lat, lng } = LatLng
				this.$emit('updatePersonalData', { position: { lat, lng } })
			},
			// updateMarkerPosition() {
			// 	console.log('updateMarkerPosition')
			// }
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