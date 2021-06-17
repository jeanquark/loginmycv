<template>
    <div style="border: 1px solid orange;">
        <h1>Example Component</h1>
        abc: {{ abc }}<v-btn @click="filter">Filter</v-btn><v-btn @click="add">Add</v-btn><br />
        <!-- def: {{ def }} -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            abc: [
                {
                    name: 'abc2'
                },
                {
                    name: 'def'
                }
            ]
        }
    },
    computed: {
        // abc () {
        //     return [
        //         {
        //             name: 'abc'
        //         },
        //         {
        //             name: 'def'
        //         }
        //     ]
        // },
        // def () {
        //     return this.abc.splice(0, 1)
        // }
    },
    methods: {
        add() {
            console.log('add')
            this.abc.push({
                name: 'ghi'
            })
        },
        filter () {
            console.log('filter')
            // this.abc.splice(0, 1)
        }
    }
}
</script>
