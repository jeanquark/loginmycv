<template>
    <div>
        <!-- info: {{ info }}<br /> -->
        <!-- snackbars: {{ snackbars }}<br /> -->
        <!--  -->
        <v-snackbar :top="snackbar.top" :right="snackbar.right" :color="snackbar.color" :timeout="snackbar.timeout" v-for="(snackbar, index) in snackbars.filter((s) => s.show)" :key="index" :style="`bottom: ${index * 55 + 5}px`" v-model="snackbar.show">
            <div v-html="snackbar.text"></div>
            <!-- {{ snackbar.text }} -->
            <template v-slot:action="{ attrs }">
                <!-- <v-btn color="success" text v-bind="attrs" @click="confirmAction(index)" v-if="snackbar.confirmation">Yes</v-btn> -->
                <v-btn color="tertiary" icon v-bind="attrs" @click="removeSnackbar(index)"><v-icon>mdi-close</v-icon></v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // info: 'info',
            // snackbars2: 'snackbars2'
        }
    },
    computed: {
        snackbars() {
            // return []
            return this.$store.getters['snackbars']
        },
    },
    methods: {
        removeSnackbar(index) {
            console.log('removeSnackbar: ', index)
            this.$store.commit('REMOVE_SNACKBAR', { index })
        },
        // confirmAction(index) {
        //     console.log('confirmAction: ', index)
        //     this.$store.commit('REMOVE_SNACKBAR', { index })
        // }
    },
}
</script>

<style scoped>
</style>