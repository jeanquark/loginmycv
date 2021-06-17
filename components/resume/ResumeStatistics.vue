<template>
    <v-row no-gutters>
        <v-col cols="12">
            <h2 class="text-center my-3">Statistics</h2>
            <!-- userResumes: {{ userResumes }}<br /><br /> -->
            <!-- last7Days: {{ last7Days }}<br /><br /> -->
            <!-- last7Weeks: {{ last7Weeks }}<br /><br /> -->
            <!-- last7Months: {{ last7Months }}<br /><br /> -->
            <!-- values: {{ values }}<br /><br /> -->
            <!-- labels {{ labels }}<br /><br /> -->
            <!-- timeframes: {{ timeframes }}<br /><br /> -->
            <!-- userResumesLength: {{ userResumesLength }}<br /><br /> -->
        </v-col>
        <v-col cols="12" sm="4" class="pa-2" v-for="(resume, index) in userResumes" :key="resume.id">
            <v-card class="mt-4 mx-auto" max-width="400">
                <v-sheet
                    class="v-sheet--offset mx-auto"
                    :color="timeframes[index] === 'days' ? 'primary' : timeframes[index] === 'weeks' ? 'secondary' : 'tertiary'"
                    elevation="12"
                    max-width="calc(100% - 32px)"
                >
                    <v-sparkline :labels="labels(index)" :value="values(index)" color="white" line-width="2" padding="16"></v-sparkline>
                </v-sheet>

                <v-card-text class="pt-0" v-if="resume.statistics">
                    <div class="title font-weight-light mb-2 text-truncate">Resume {{ resume.slug }}</div>
                    <div class="subheading font-weight-light grey--text my-2">
                        Total views: {{ resume.statistics.total_views_count }} <v-btn x-small class="mb-1" @click="confirmResetCounter(index, 'resume_views_count')">Reset</v-btn>
                    </div>
                    <div class="subheading font-weight-light grey--text my-2">
                        Total file downloads: {{ getResumeFileDownloads(index) }} <v-btn x-small class="mb-1" @click="confirmResetCounter(index, 'resume_downloads_count')">Reset</v-btn>
                    </div>
                    <div class="text-center my-2">
                        <v-btn x-small :color="timeframes[index] === 'days' ? 'primary' : ''" @click="setTimeframes(index, 'days')">Last 7 days</v-btn>
                        <v-btn x-small :color="timeframes[index] === 'weeks' ? 'secondary' : ''" @click="setTimeframes(index, 'weeks')">Last 7 weeks</v-btn>
                        <v-btn x-small :color="timeframes[index] === 'months' ? 'tertiary' : ''" @click="setTimeframes(index, 'months')">Last 7 months</v-btn>
                    </div>
                    <v-divider class="my-3"></v-divider>
                    <v-icon class="mr-2" small> mdi-clock </v-icon>
                    <span class="caption grey--text font-weight-light" v-if="resume.statistics.last_visitors.length > 0"
                        >Last view {{ resume.statistics.last_visitors[resume.statistics.last_visitors.length - 1]['date'] | moment('from')}}</span
                    >
                    <span class="caption grey--text font-weight-light" v-else>No views</span>
                    <v-btn
                        x-small
                        class="float-right"
                        @click="
                            bottomSheet = true
                            resumeIndex = index
                        "
                        >More +</v-btn
                    >
                </v-card-text>
            </v-card>
        </v-col>

        <v-bottom-sheet :scrollable="true" inset v-model="bottomSheet" height="300px">
            <v-card class="text-center">
                <v-card-text>
                    <v-btn class="my-6" text color="error" @click="bottomSheet = !bottomSheet"> close </v-btn>
                    <v-row no-gutters>
                        <v-col cols="5" v-if="userResumes[resumeIndex]['statistics']">
                            <h2 class="my-5 primary--text">Resume</h2>
                            <v-chip class="my-3" color="primary">{{ userResumes[resumeIndex]['statistics']['total_views_count'] }}</v-chip
                            >&nbsp;total views
                            <v-list dense>
                                <v-list-item-group color="primary" v-if="userResumes[resumeIndex]['statistics']['last_visitors'] && userResumes[resumeIndex]['statistics']['last_visitors'].length">
                                    <p class="subtitle-1 mb-0 text-center primary--text">Last 10 visits:</p>
                                    <v-list-item v-for="(item, i) in userResumes[resumeIndex]['statistics']['last_visitors'].slice().reverse()" :key="i">
                                        <v-list-item-content>
                                            <v-list-item-title>{{ item.date | moment('dddd, MMM. Do YYYY HH:mm') }}</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list-item-group>
                            </v-list>
                        </v-col>
                        <v-col cols="2">
                            <v-divider vertical></v-divider>
                        </v-col>
                        <v-col cols="5">
                            <h2 class="my-5 secondary--text">Documents</h2>
                            <v-chip class="my-5" color="secondary"> {{ getResumeFileDownloads(resumeIndex) }}</v-chip
                            >&nbsp;total downloads
                            <div v-if="userResumes[resumeIndex]['uploads']">
                                <div v-for="(upload, i) in userResumes[resumeIndex]['uploads']" :key="i">
                                    <font-awesome-icon :icon="['fas', 'file-pdf']" size="3x" class="mb-3" /><br />
                                    <small class="text-center">{{ upload.name }}</small
                                    ><br />
                                    <v-chip small color="tertiary" v-if="upload.statistics"> {{ upload.statistics.total_download_count || 0 }}</v-chip
                                    >&nbsp;document downloads
                                    <v-list dense v-if="upload.statistics && upload.statistics.last_visitors && upload.statistics.last_visitors.length">
                                        <v-list-item-group>
                                            <p class="subtitle-1 mb-0 text-center secondary--text">Last 10 downloads:</p>
                                            <v-list-item v-for="(lastVisitor, j) in upload.statistics.last_visitors.slice().reverse()" :key="j">
                                                <v-list-item-content>
                                                    <v-list-item-title>{{ lastVisitor.date | moment('dddd, MMM. Do YYYY HH:mm') }}</v-list-item-title>
                                                </v-list-item-content>
                                            </v-list-item>
                                        </v-list-item-group>
                                    </v-list>
                                    <v-divider class="my-3"></v-divider>
                                </div>
                            </div>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-bottom-sheet>
    </v-row>
</template>

<script>
import moment from 'moment'
export default {
    mounted() {
        try {
            for (let i = 0; i < this.userResumes.length; i++) {
            this.setTimeframes(i, 'days')
        }
        } catch (error) {
            console.log('error: ', error)
        }
    },
    data() {
        return {
            timeframes: {},
            bottomSheet: false,
            index: 0,
            resumeIndex: 0
        }
    },
    computed: {
        userResumes() {
            return this.$store.getters['resumes/userResumes']
        },
        // values() {
        //     let index = 1
        //     if (this.userResumes[index] && this.userResumes[index]['statistics']) {
        //         if (this.timeframe === 'days') {
        //             let resumeLastVisitorsByDay = {}
        //             resumeLastVisitorsByDay = this.userResumes[index]['statistics']['last_visitors']
        //                 .map((a) => moment(a.date).format('YYYY-MM-DD'))
        //                 .reduce((acc, date) => ((acc[date] = (acc[date] || 0) + 1), acc), {})
        //             return this.last7Days.map((day) => resumeLastVisitorsByDay[day] || 0)
        //         } else if (this.timeframe === 'weeks') {
        //         } else if (this.timeframe === 'months') {
        //         }
        //     }
        //     return []
        // },
        // labels() {
        //     return this.last7Days.map((day) => moment(day).format('ddd'))
        // },
        // timeframes() {
        //     let obj = {}
        //     for (let i = 0; i < this.userResumes.length; i++) {
        //         obj[i] = 'days'
        //     }
        //     return obj
        // },
        // timeframes: {
        //     get: function() {
        // 		let obj = {}
        //         for (let i = 0; i < this.userResumes.length; i++) {
        //             obj[i] = 'days'
        //         }
        //         return obj
        // 	},
        // 	set: function(value) {
        // 		console.log("setter called with value", value)
        // 		// this.timeframes[0] = value
        // 	}
        // },
        last7Days() {
            let array = []
            for (let i = 6; i >= 0; i--) {
                array.push(
                    moment()
                        .subtract(i, 'days')
                        .format('YYYY-MM-DD')
                )
            }
            return array
        },
        last7Weeks() {
            let array = []
            for (let i = 6; i >= 0; i--) {
                array.push(
                    moment()
                        .subtract(i, 'weeks')
                        .week()
                )
            }
            return array
        },
        last7Months() {
            let array = []
            for (let i = 6; i >= 0; i--) {
                array.push(
                    moment()
                        .subtract(i, 'months')
                        .month()
                )
            }
            return array
        }
    },
    methods: {
        values(index) {
            if (this.userResumes[index] && this.userResumes[index]['statistics']) {
                if (this.timeframes[index] === 'days') {
                    let resumeLastVisitorsByDay = {}
                    resumeLastVisitorsByDay = this.userResumes[index]['statistics']['last_visitors']
                        .map(a => moment(a.date).format('YYYY-MM-DD'))
                        .reduce((acc, date) => ((acc[date] = (acc[date] || 0) + 1), acc), {})
                    return this.last7Days.map(day => resumeLastVisitorsByDay[day] || 0)
                } else if (this.timeframes[index] === 'weeks') {
                    let resumeLastVisitorsByWeek = this.userResumes[index]['statistics']['last_visitors']
                        .map(a => moment(a.date).week())
                        .reduce((acc, week) => ((acc[week] = (acc[week] || 0) + 1), acc), {})
                    return this.last7Weeks.map(week => resumeLastVisitorsByWeek[week] || 0)
                } else if (this.timeframes[index] === 'months') {
                    let resumeLastVisitorsByMonth = this.userResumes[index]['statistics']['last_visitors']
                        .map(a => moment(a.date).month())
                        .reduce((acc, month) => ((acc[month] = (acc[month] || 0) + 1), acc), {})
                    return this.last7Months.map(month => resumeLastVisitorsByMonth[month] || 0)
                }
            }
            return []
        },
        labels(index) {
            if (this.timeframes[index] === 'days') {
                return this.last7Days.map(day => moment(day).format('ddd'))
            } else if (this.timeframes[index] === 'weeks') {
                return this.last7Weeks
            } else if (this.timeframes[index] === 'months') {
                return this.last7Months.map(month => moment(month + 1, 'M').format('MMM'))
            }
        },
        setTimeframes(index, value) {
            console.log('setTimeframes: ', index, value, this.timeframes[index])
            this.$set(this.timeframes, index, value)
        },
        getResumeFileDownloads(index) {
            if (this.userResumes[index] && this.userResumes[index]['uploads']) {
                return this.userResumes[index]['uploads'].map(upload => upload.statistics).reduce((acc, statistics) => acc + (statistics ? statistics.total_downloads_count : 0), 0)
            }
        },
        async confirmResetCounter(resumeIndex, counter) {
            console.log('confirmReset: ', resumeIndex, counter)
            const confirm = await this.$dialog.warning({
                text: 'Do you really want to reset counter?',
                title: 'Warning'
            })
            console.log('confirm: ', confirm)
            if (confirm) {
                if (counter === 'resume_views_count') {
                    await this.$store.dispatch('resumes/resetResumeCounter', { resumeId: this.userResumes[resumeIndex]['id'] })
                } else if (counter === 'resume_downloads_count') {
                    console.log('resume_downloads_count')
                    await this.$store.dispatch('resumes/resetUploadsCounter', { resumeId: this.userResumes[resumeIndex]['id'] })
                }
            }
        }
    }
}
</script>

<style scoped>
::v-deep .v-sheet--offset {
    top: -24px;
    position: relative;
}
</style>
