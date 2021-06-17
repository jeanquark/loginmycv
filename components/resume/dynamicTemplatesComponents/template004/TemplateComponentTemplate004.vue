<template>
    <v-container>
        <h2>Dynamic Template Component goes here...</h2>
	</v-container>
</template>

<script>
	export default {
		props: [],
		components: {},
		created() {

		},
		mounted () {
		},
		data() {
			return {
			}
		},
		computed: {
			loading() {
				return this.$store.getters['loading']
			},
		},
		methods: {
		}
	}
</script>

<style scoped>
	.active {
		border: 4px solid var(--v-secondary-base);
	}
</style>