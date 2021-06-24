<template>
    <div>
        <v-snackbar :top="snackbar.top" :right="snackbar.right" :color="snackbar.color" :timeout="snackbar.timeout" v-for="(snackbar, index) in snackbars.filter((s) => s.show)" :key="index" :style="`bottom: ${index * 55 + 5}px`" v-model="snackbar.show">
            <div v-html="snackbar.text"></div>
            <div v-if="snackbar.showRefreshTokenButton">
                Your session has expired. Click <v-btn x-small color="primary" @click="refreshToken(index)">here</v-btn> to refresh it.
            </div>
            <!-- <span v-html="snackbar.html"></span> -->
            <!-- {{ snackbar.html }} -->
            <!-- <slot></slot> -->
            <!-- <slot name="refreshTokenButton"></slot> -->
            <template v-slot:action="{ attrs }">
                <v-btn color="tertiary" icon v-bind="attrs" @click="removeSnackbar(index)"><v-icon>mdi-close</v-icon></v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    computed: {
        snackbars() {
            return this.$store.getters['snackbars']
        },
        
    },
    methods: {
        removeSnackbar(index) {
            console.log('removeSnackbar: ', index)
            this.$store.commit('REMOVE_SNACKBAR', { index })
        },
        refreshToken (index) {
            this.$store.dispatch('auth/refreshToken')
        },
    },
}
</script>

<style scoped>
</style>