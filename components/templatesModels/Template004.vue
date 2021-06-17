<template>
    <v-app v-cloak>
        colors: {{ colors }}<br /><br />
        markers: {{ markers }}<br /><br />
        resume: {{ resume }}<br /><br />
        isTemplateModel: {{ isTemplateModel }}<br /><br />
        <div style="height: 100vh">
            <!-- <no-ssr> -->
			<client-only>
                <l-map :zoom="3" :center="resume.template_details.map.center" style="background: #AADAFF">
                    <l-geo-json :geojson="geojson" :optionsStyle="styleFunction"></l-geo-json>
                    <!-- <l-marker :lat-lng="[45.508889, -73.561667]" :draggable="false" :icon="customIcon">
                        <l-popup style="font-size: 1.2rem;">Hello <b>Jean-Marc</b>! Lorsdfjsdfhj dfhsjkdfhdsj djfkjs<v-btn small color="success">Click me</v-btn>
                            <v-img src="/images/unibe.jpg" width="100"></v-img>
                        </l-popup>
                    </l-marker> -->
                    <!-- <l-marker :lat-lng="[abc.map_marker.lat, abc.map_marker.long]" :draggable="false" v-for="(abc, index) in markers" :key="index">
						<l-tooltip>Hello!</l-tooltip>
                    </l-marker> -->
					<l-marker v-for="item in markers" :key="item.key" :lat-lng="[item.position.lat, item.position.lng]" :visible="true">
						<l-icon :iconSize="[0, 0]" :iconAnchor="[18, 34]" :tooltipAnchor="[10, -20]">
                            <v-icon large :color="item.type === 'education' ? '#FFOOOO' : '#00FF00'">mdi-map-marker</v-icon>
							<!-- <v-icon large :color="item.type === 'education' ? colors.primaryColor : colors.secondaryColor">mdi-map-marker</v-icon> -->
                        </l-icon>
						<l-tooltip>
							<div>
								<h3>{{ item.title }}</h3>
								<p>{{ item.city }}, {{ item.country }}</p>
								<p>{{ item.start_date }} - {{ item.end_date }}</p>
								<v-img :src="`/images/${item.image}`" max-width="200" v-if="item.image"></v-img>
							</div>

						</l-tooltip>
					</l-marker>
                </l-map>
            <!-- </no-ssr> -->
			</client-only>
        </div>
    </v-app>
</template>

<script>
	let L = { icon() {} }
	if (process.browser) {
		L = require('leaflet')
	}
	import axios from 'axios'
	// import GeoJSON from '~/static/geoJSON/usa_canada_with_states.json'
	// import GeoJSON from `~/static/geoJSON/${resume.template.map.geoJSON}`
	export default {
		// layout: 'layoutBack',
		props: ['resume', 'isTemplateModel', 'colors'],
		async created() {
			try {
				const { data } = await axios.get(`/geoJSON/${this.resume.template_details.map.geoJSON}`)
				console.log('data: ', data)
				this.geojson = data
			} catch (error) {
				console.log('error: ', error)
			}
		},
		mounted () {
			this.primaryColor = this.resume.colors && this.resume.colors.primaryColor ? this.resume.colors.primaryColor : '#7A528F'
			this.secondaryColor = this.resume.colors && this.resume.colors.secondaryColor ? this.resume.colors.secondaryColor : '#202026'
		},
		data() {
			return {
				// customIcon: this.defaultIcon
				customIcon: L.icon({
					// iconUrl: '/images/leaflet_markers/leaf-green.png',
					iconUrl: '/images/leaflet_markers/home.png',
					// shadowUrl: 'http://leafletjs.com/examples/custom-icons/leaf-shadow.png',
					iconSize: [35, 30],
					// shadowSize: [50, 64],
					iconAnchor: [25, 25],
					// shadowAnchor: [4, 62],
					popupAnchor: [-8, -30]
				}),
				// primaryColor: '',
				// secondaryColor: '#FFC107',
				// geojson: GeoJSON,
				geojson: null,
				// visitedCountries: [
				// 	{
				// 		name: 'Alberta',
				// 		brk_a3: 'CHE',
				// 		value: 10,
				// 		color: '#FFC107'
				// 	},
				// 	{
				// 		name: 'Sweden',
				// 		brk_a3: 'SWE',
				// 		value: 4,
				// 		color: 'yellow'
				// 	},
				// 	{
				// 		name: 'France',
				// 		brk_a3: 'FRA',
				// 		value: 3,
				// 		color: 'green'
				// 	}
				// ],
				position: [40.0, -70.0],
				// options: {
				// 	style: function(feature) {
				// 		console.log('feature: ', feature)
				// 		if (feature.properties.su_a3 === 'ALB') {
				// 			return {
				// 				weight: 2,
				// 				color: 'yellow',
				// 				fill: true,
				// 				fillColor: 'red',
				// 				fillOpacity: 1
				// 			}
				// 		} else {
				// 			return {
				// 				weight: 1,
				// 				color: 'yellow',
				// 				fill: true,
				// 				fillColor: 'green',
				// 				fillOpacity: 1
				// 			}
				// 		}
				// 	}
				// }
				primaryColor: '',
				secondaryColor: '',
				resume2: {
					template: {
						id: 'template004',
						map: {
							name: 'World',
							slug: 'world',
							geoJSON: 'world.json',
							center: [51.47777778, 0]
						},
						map_subdivisions: [
							{
								name: 'United Kingdom',
								slug: 'united_kingdom',
								color: 'rgb(234, 28, 28)'
							},
							{
								name: 'Switzerland',
								slug: 'switzerland',
								color: 'rgb(14, 247, 47)'
							},
							{
								name: 'Poland',
								slug: 'poland',
								color: 'rgb(14, 247, 47)'
							}
						]
					},
					job_title: 'Product Designer',
					job_description:
						'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
					personal_data: {
						firstname: 'Alex',
						middlename: '',
						lastname: 'Johnson',
						email: 'alex.johnson@example.com',
						phone: '+12 987 654 32 10',
						country: {
							name: 'United Kingdom',
							slug: 'united_kingdom',
							flag: 'united_kindom.png'
						},
						city: 'London',
						birthday: '1984-02-28'
					},
					picture: '/images/hero.png',
					languages: [
						{
							name: 'English',
							slug: 'english',
							flag: 'english.png',
							level: 100
						},
						{
							name: 'Spanish',
							slug: 'spanish',
							flag: 'spanish.png',
							level: 60
						}
					],
					social_networks: [
						{
							name: 'Github',
							slug: 'github',
							fontawesome: 'github',
							link: 'http://www.github.com',
							color: '#323131'
						},
						{
							name: 'Twitter',
							slug: 'twitter',
							fontawesome: 'twitter',
							link: 'http://www.twitter.com',
							color: '#1da1f3'
						},
						{
							name: 'LinkedIn',
							slug: 'linkedin',
							fontawesome: 'linkedin-in',
							link: 'http://www.linkedin.com',
							color: '#0274b3'
						}
					],
					education: [
						{
							title: 'Art & Multimedia',
							description:
								'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
							school: 'Oxford University',
							start_date: '2005',
							end_date: '2008',
							country: 'United Kingdom',
							city: 'Oxford',
							// type: 'education',
							image: '/oxford.jpg',
							position: {
								lat: 51.76412,
								lng: -1.26324,
							}
						},
						{
							title: 'Dramatic Arts',
							description:
								'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
							school: 'Cambridge University',
							start_date: '2002',
							end_date: '2005',
							country: 'United Kingdom',
							city: 'Cambridge',
							// type: 'education',
							image: '/cambridge.jpg',
							position: {
								lat: 52.20167,
								lng: 0.11779,
							}
						}
					],
					work_experience: [
						{
							job_title: 'UI/UX Designer',
							job_description:
								'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
							start_date: '2008',
							end_date: '2012',
							company: 'Answer Softwares Ltd',
							country: 'United Kingdom',
							city: 'London',
							// type: 'work_experience',
							position: {
								lat: 51.50735,
								lng: -0.12776,
							}
						},
						{
							job_title: 'Product Designer',
							job_description:
								'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
							start_date: '2012',
							end_date: '',
							company: 'Asco Int.',
							country: 'United Kingdom',
							city: 'London',
							// type: 'work_experience',
							position: {
								lat: 51.50956,
								lng: -0.07617,
							}
						}
					],
					skills: [
						{
							name: 'CSS',
							category: 'Technical skill',
							type: 'pie',
							value: 75
						},
						{
							name: 'Photoshop',
							category: 'Technical skill',
							type: 'pie',
							value: 80
						},
						{
							name: 'Communication',
							category: 'Soft skill',
							type: 'bar',
							value: 80
						},
						{
							name: 'Writing',
							category: 'Soft skill',
							type: 'bar',
							value: 60
						}
					],
					uploads: [
						{
							name: 'cv.pdf',
							title: 'My CV in pdf',
							type: 'downloadable_file'
						},
						{
							name: 'work_sample.pdf',
							title: 'Work Samples',
							type: 'downloadable_file'
						},
						{
							name: 'hero.png',
							title: 'Profile picture',
							type: 'profile_picture',
							downloadUrl: '/images/hero.png'
						}
					],
					menus: {
						presentation: 'Presentation',
						education: 'Education',
						skills: 'Skills',
						files: 'Files',
						contact: 'Contact'
					},
					fields: {},
					contact_form_validation: {},
					parameters: {
						show_contact_form: true,
						show_language_level: true
					},
					
				}
			}
		},
		computed: {
			// cssProps() {
			// 	return {
			// 		'--primary-color': this.primaryColor,
			// 		'--secondary-color': this.secondaryColor,
			// 		'--tertiary-color': this.tertiaryColor,
			// 		'--background-color': this.backgroundColor,
			// 		'--text-color': this.textColor
			// 	}
			// }
			markers() {
				const markersArray = []
				markersArray.push({ personal_data: this.resume.personal_data, skills: this.resume.skills, social_networks: this.resume.social_networks, uploads: this.resume.uploads, position: this.resume.personal_data.position })
				this.resume.education.forEach(education => {
					if (education.position) {
						// markersArray.push({ ...education, color: this.resume.colors ? this.resume.colors.primaryColor : this.primaryColor })
						markersArray.push({ ...education, type: 'education' })
					}
				})
				this.resume.work_experience.forEach(work_experience => {
					if (work_experience.position) {
						// markersArray.push({ ...work_experience, color: this.resume.colors ? this.resume.colors.secondaryColor : this.secondaryColor })
						markersArray.push({ ...work_experience, type: 'work_experience' })
					}
				})
				console.log('markersArray: ', markersArray)
				console.log('markersArray.filter: ', markersArray.filter(item => item.position))
				return markersArray.filter(item => item.position)
			},
			markers2() {
				const array = []
				this.resume.education.forEach(education => {
					if (education.map_marker) {
						array.push(education)
					}
				})
				this.resume.work_experience.forEach(work_experience => {
					if (work_experience.map_marker) {
						array.push(work_experience)
					}
				})
				// resume.education.map(education => {
				// 	return education.map_marker
				// })
				return array
			}
		},
		methods: {
			styleFunction(feature) {
				// console.log('feature: ', feature)
				// console.log('this.countriesVisited: ', this.visitedCountries)
				// const array = ['CHE', 'SWE', 'FRA']
				// if (array.includes(feature.properties.brk_a3)) {
				// const country = this.visitedCountries.find(
				const country = this.resume.template_details.map_subdivisions.find(
					// country => country.name === feature.properties.name
					country => country.slug === feature.properties.slug
				)
				if (country) {
					// console.log('abc')
					// const country = this.visitedCountries.find(country => country.brk_a3 === feature.properties.brk_a3)
					console.log('country: ', country)
					return {
						weight: 0,
						color: 'yellow',
						fill: true,
						fillColor: country.color,
						fillOpacity: 1
					}
				} else {
					return {
						weight: 1,
						color: '#ccc',
						fill: true,
						fillColor: '#efeeec',
						// fillColor: this.colors.backgroundColor,
						fillOpacity: 1
					}
				}

				// if (feature.properties.brk_a3 === 'CHE') {
				// 	return {
				// 		weight: 2,
				// 		color: 'yellow',
				// 		fill: true,
				// 		fillColor: 'orange',
				// 		fillOpacity: 1
				// 	}
				// } else {
				// 	return {
				// 		weight: 1,
				// 		color: 'yellow',
				// 		fill: true,
				// 		fillColor: 'blue',
				// 		fillOpacity: 1
				// 	}
				// }
			},
			// polystyle() {
			// 	return {
			// 		fillColor: 'yellow',
			// 		weight: 1,
			// 		opacity: 0.6,
			// 		color: 'white', //Outline color
			// 		fillOpacity: 0.7
			// 	}
			// }
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