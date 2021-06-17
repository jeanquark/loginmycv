<template>
    <svg viewBox="0 0 512 512">
        <path
            d="M 277.71075,181.39083 H 412.76271 L 277.71075,46.338873 V 181.39083 M 105.82643,9.5065225 H 302.26565 L 449.59506,156.83595 v 294.65882 a 49.109804,49.109804 0 0 1 -49.10981,49.10979 H 105.82643 c -27.255946,0 -49.109809,-22.09939 -49.109809,-49.10979 V 58.616327 c 0,-27.255942 21.853863,-49.1098045 49.109809,-49.1098045 M 326.82056,402.38496 V 353.27515 H 105.82643 v 49.10981 h 220.99413 m 73.66469,-98.2196 V 255.05555 H 105.82643 v 49.10981 z"
            id="path2"
            inkscape:connector-curvature="0"
            :class="$vuetify.theme.dark ? 'accent-color' : 'primary-color'"
            style="stroke-width:24.55490303"
        />
    </svg>
</template>

<script>
export default {
}
</script>

<style scoped>
    .primary-color {
        fill: var(--v-primary-base);
    }
    .secondary-color{
        fill: var(--v-secondary-base);
    }
    .accent-color {
        fill: var(--v-accent-base);
    }
</style>