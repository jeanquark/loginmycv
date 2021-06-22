<template>
    <div class="pa-4" v-if="userResume" style="">
        <div>
            <!-- resumeSlug: {{ this.resumeSlug }}<br /><br /> -->
            <!-- userResume: {{ userResume }}<br /><br /> -->
            <!-- loadedNewResume: {{ loadedNewResume }}<br /><br /> -->
            <!-- candidateLongResume.image: {{ candidateLongResume.image }}<br /><br /> -->
            <!-- imageUrl: {{ imageUrl }}<br /><br /> -->
            <!-- imageFile: {{ imageFile }}<br /><br /> -->
            <!-- uploadingNewImage: {{ uploadingNewImage }}<br /><br /> -->
            <!-- error: {{ error }}<br /><br /> -->
            <!-- resumeSlug: {{ this.resumeSlug }}<br /><br /> -->
            <!-- personalData: {{ this.personalData }}<br /><br /> -->
            <!-- userResume: {{ userResume }}<br /><br /> -->
            <!-- userResume.uploads: {{ this.userResume.uploads }}<br /><br /> -->
            <!-- errors: {{ errors }}<br /><br /> -->
            <!-- getCurrentPicture: {{ getCurrentPicture }}<br /><br /> -->
            <!-- <v-btn color="primary" @click="addUpload">Add upload</v-btn> -->
            <!-- countries: {{ countries }}<br /><br /> -->
            <!-- this.userResume.visibility: {{ userResume.visibility }}<br /> -->
            <!-- originalVisibility: {{ originalVisibility }}<br /> -->
            <!-- this.userResume.updateResumeSlug: {{ userResume.updateResumeSlug }}<br /> -->
            <!-- userResume.language: {{ userResume.language }}<br /><br /> -->
            <!-- step: {{ step }}<br /><br /> -->
            <!-- rules: {{ rules }}<br /><br /> -->
            <!-- errorsPersonalData: {{ errorsPersonalData }}<br /><br /> -->
            <!-- userResume.personal_data: {{ userResume.personal_data }}<br /><br /> -->
            <!-- profilePicture: {{ profilePicture }}<br /><br /> -->
            <!-- newProfilePicture: {{ newProfilePicture }}<br /><br /> -->
        </div>
        <v-row no-gutters class="pa-2">
            <v-col cols="12">
                <v-card :elevation="12">
                    <v-card-title class="justify-center pb-0">
                        <h2 class="headline mb-0">General Info</h2>
                        <br />
                    </v-card-title>
                    <div class="text-center">
                        <small>(entries with an * are compulsory)</small><br />
                        <!-- <small v-if="userResume.visibility !== 'private'">(all entries with an <v-icon small>mdi-eye</v-icon> are public since your resume is not private.)</small> -->
                        <!-- <small v-else>All entries are private</small> -->
                    </div>

                    <v-card-text>
                        <v-row no-gutters>
                            <v-col :cols="this.userResume.slug ? '4' : '12'" class="px-3" v-if="!this.resumeSlug">
                                <!-- <ValidationProvider v-slot="{ errors }" vid="PersonalData_Slug" name="identifier" :rules="{ regex: /^[a-z0-9-]+$/, min: 2, max: 4 }"> -->
                                <ValidationProvider v-slot="{ errors }" vid="slug" name="identifier" :rules="rules.slug">
                                    <!-- <ValidationProvider v-slot="{ errors }" vid="personal_data.slug" name="identifier" :rules="rules.personal_data.slug"> -->
                                    <v-text-field name="slug" hint="Must be globally unique." :persistent-hint="true" data-vv-as="Resume identifier" :error-messages="errors" v-model="userResume.slug">
                                        <template v-slot:label> Resume identifier* </template>
                                        <font-awesome-icon :icon="['fas', 'address-card']" size="1x" slot="prepend" style="margin-top: 4px" />
                                    </v-text-field>
                                </ValidationProvider>
                            </v-col>
                            <v-col cols="8" class="px-3" v-if="userResume.slug">
                                <v-text-field label="Path to your resume" :value="userResume.slug ? `https://www.loginmycv.com/resumes/${userResume.slug}` : ''" readonly class="no-underline">
                                    <font-awesome-icon :icon="['fas', 'link']" size="1x" slot="prepend" style="margin-top: 4px" />
                                </v-text-field>
                            </v-col>
                        </v-row>

                        <v-row no-gutters>
                            <v-col cols="4" class="px-3">
                                <!-- errors: {{ errors && errors.job_title ? $t(errors.job_title.message, { attribute: 'Job title', value: errors.job_title.value }) : '' }} -->
                                <!-- <ValidationProvider v-slot="{ errors }" vid="PersonalData_JobTitle" name="job title" :rules="{ required: true, max: 2 }"> -->
                                <ValidationProvider v-slot="{ errors }" vid="job_title" name="job title" :rules="rules.job_title">
                                    <v-text-field id="job_title" name="job_title" data-vv-as="Job title" :counter="rules.job_title.max" :error-messages="errors" v-model="userResume.job_title">
                                        <template v-slot:label> Job title* </template>
                                        <font-awesome-icon :icon="['fas', 'briefcase']" size="1x" slot="prepend" style="margin-top: 4px" />
                                    </v-text-field>
                                </ValidationProvider>
                            </v-col>

                            <v-col cols="8" class="px-3">
                                <!-- <ValidationProvider v-slot="{ errors }" vid="PersonalData_JobDescription" name="job description" :rules="{ required: true, max: 25 }"> -->
                                <ValidationProvider v-slot="{ errors }" vid="job_description" name="job description" :rules="rules.description">
                                    <v-textarea
                                        :rows="3"
                                        id="job_description"
                                        name="job_description"
                                        data-vv-as="Job description"
                                        :counter="rules.job_description.max"
                                        :error-messages="errors"
                                        v-model="userResume.job_description"
                                    >
                                        <template v-slot:label> Job description* </template>
                                        <font-awesome-icon :icon="['fas', 'briefcase']" size="1x" slot="prepend" style="margin-top: 4px" />
                                    </v-textarea>
                                </ValidationProvider>
                            </v-col>
                        </v-row>

                        <v-row no-gutters v-if="userResume.personal_data">
                            <v-col cols="12" sm="4" class="px-3">
                                <!-- <ValidationProvider v-slot="{ errors }" vid="PersonalData_Firstname" name="firstname"> -->
                                <ValidationProvider v-slot="{ errors }" vid="personal_data.firstname" name="firstname" :rules="rules.personal_data.firstname">
                                    <v-text-field
                                        name="firstname"
                                        data-vv-as="First name"
                                        :counter="rules.personal_data.firstname.max"
                                        :error-messages="errors"
                                        v-model="userResume.personal_data.firstname"
                                    >
                                        <template v-slot:label> First name* </template>
                                        <font-awesome-icon :icon="['fas', 'user']" size="1x" slot="prepend" style="margin-top: 4px" />
                                    </v-text-field>
                                </ValidationProvider>
                            </v-col>

                            <v-col cols="12" sm="4" class="px-3">
                                <!-- <ValidationProvider v-slot="{ errors }" vid="PersonalData_Lastname" name="lastname" :rules="{ required: true, max: 5 }"> -->
                                <ValidationProvider v-slot="{ errors }" vid="personal_data.lastname" name="lastname" :rules="rules.personal_data.lastname">
                                    <v-text-field
                                        name="lastname"
                                        data-vv-as="Last name"
                                        :counter="rules.personal_data.lastname.max"
                                        :error-messages="errors"
                                        v-model="userResume.personal_data.lastname"
                                    >
                                        <template v-slot:label> Last name* </template>
                                        <font-awesome-icon :icon="['fas', 'user']" size="1x" slot="prepend" style="margin-top: 4px" />
                                    </v-text-field>
                                </ValidationProvider>
                            </v-col>

                            <v-col cols="12" sm="4" class="px-3">
                                <!-- <ValidationProvider v-slot="{ errors }" vid="PersonalData_Middlename" name="middlename" :rules="{ max: 5 }"> -->
                                <ValidationProvider v-slot="{ errors }" vid="personal_data.middlename" name="middlename" :rules="rules.personal_data.middlename">
                                    <v-text-field
                                        name="middlename"
                                        data-vv-as="Middle name"
                                        :counter="rules.personal_data.middlename.max"
                                        :error-messages="errors"
                                        v-model="userResume.personal_data.middlename"
                                    >
                                        <template v-slot:label> Middle name </template>
                                        <font-awesome-icon :icon="['fas', 'user']" size="1x" slot="prepend" style="margin-top: 4px" />
                                    </v-text-field>
                                </ValidationProvider>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <br />

        <v-row no-gutters class="pa-2">
            <v-col cols="12">
                <v-card :elevation="12">
                    <v-card-title class="justify-center">
                        <h2 class="headline mb-0">Contact & Social</h2>
                    </v-card-title>
                    <v-card-text>
                        <v-row no-gutters class="" v-if="userResume.personal_data">
                            <v-col cols="12" sm="4" class="pa-4">
                                <!-- <ValidationProvider v-slot="{ errors }" vid="PersonalData_Email" name="email" rules="required|email"> -->
                                <ValidationProvider v-slot="{ errors }" vid="personal_data.email" name="email" :rules="rules.personal_data.email">
                                    <v-text-field label="Email*" name="email" type="email" data-vv-as="Email" :error-messages="errors" v-model="userResume.personal_data.email">
                                        <font-awesome-icon :icon="['fas', 'envelope']" size="1x" slot="prepend" style="margin-top: 4px" />
                                    </v-text-field>
                                </ValidationProvider>
                            </v-col>
                            <v-col cols="12" sm="4" class="pa-4">
                                <!-- <ValidationProvider v-slot="{ errors }" vid="PersonalData_Website" name="website"> -->
                                <ValidationProvider v-slot="{ errors }" vid="personal_data.website" name="website" :rules="rules.personal_data.website">
                                    <v-text-field
                                        label="Personal Website"
                                        name="website"
                                        hint="https://www.example.com"
                                        persistent-hint
                                        prefix="https://"
                                        :error-messages="errors"
                                        v-model="userResume.personal_data.website"
                                    >
                                        <font-awesome-icon :icon="['fab', 'chrome']" slot="prepend" style="margin-top: 4px" />
                                    </v-text-field>
                                </ValidationProvider>
                            </v-col>

                            <v-col cols="12" sm="4" class="pa-4">
                                <!-- <ValidationProvider v-slot="{ errors }" vid="PersonalData_Phone" name="phone" :rules="{ regex: /^[a-z0-9-]+$/, min: 8, max: 40 }"> -->
                                <ValidationProvider v-slot="{ errors }" vid="personal_data.phone_number" name="phone_number" :rules="rules.personal_data.phone_number">
                                    <v-text-field label="Phone number" name="phone" :error-messages="errors" v-model="userResume.personal_data.phone_number">
                                        <font-awesome-icon :icon="['fas', 'phone']" slot="prepend" style="margin-top: 4px" />
                                    </v-text-field>
                                </ValidationProvider>
                            </v-col>

                            <v-col cols="12" sm="8" class="pa-4">
                                <v-select
                                    label="Social networks"
                                    :items="socialNetworks"
                                    attach
                                    chips
                                    multiple
                                    dense
                                    small-chips
                                    deletable-chips
                                    color="secondary"
                                    item-text="name"
                                    return-object
                                    @focus="fetchSocialNetworks"
                                    v-model="userResume.social_networks"
                                >
                                    <template v-slot:selection="data">
                                        <v-chip small :input-value="data.selected" :color="data.item.color" class="chip--select-multi" @input="removeSocialLink(data.item)">
                                            {{ data.item.name }}
                                        </v-chip>
                                    </template>

                                    <font-awesome-icon :icon="['fas', 'hashtag']" slot="prepend" style="margin-top: 4px" />
                                </v-select>
                            </v-col>

                            <v-col cols="12" sm="4" class="px-4" v-for="(social_network, index) of userResume.social_networks" :key="index">
                                <v-text-field
                                    :label="`${social_network.name} link`"
                                    :name="social_network.slug"
                                    hint="Don't forget protocol (https://) for url"
                                    :data-vv-as="social_network.name"
                                    v-model="userResume.social_networks[index]['link']"
                                >
                                    <font-awesome-icon :icon="['fab', `${social_network.icon}`]" slot="prepend" style="margin-top: 4px" />
                                </v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <br />

        <v-row no-gutters class="pa-2">
            <v-col cols="12">
                <v-card :elevation="12">
                    <v-card-title class="justify-center">
                        <h2 class="headline mb-0">More about you</h2>
                    </v-card-title>

                    <v-card-text>
                        <v-row no-gutters class="mb-4" v-if="userResume.personal_data">
                            <v-col cols="12" sm="4" class="px-3">
                                <v-autocomplete
                                    label="Country of residence"
                                    :items="countries"
                                    item-text="name"
                                    :return-object="true"
                                    chips
                                    small-chips
                                    :deletable-chips="true"
                                    color="secondary"
                                    @focus="fetchCountries"
                                    v-model="userResume.personal_data.country"
                                >
                                    <font-awesome-icon :icon="['fas', 'globe-europe']" slot="prepend" style="margin-top: 4px" />
                                    <template v-slot:selection="data">
                                        <v-chip close :input-value="data.selected" class="chip--select-multi" @click:close="removeCountryOfResidence(data.item)">
                                            <v-avatar left>
                                                <v-img :src="`/images/countries/${data.item.flag}`"></v-img>
                                            </v-avatar>
                                            {{ data.item.name }}
                                        </v-chip>
                                    </template>
                                    <template v-slot:item="data">
                                        <template>
                                            <v-list-item-avatar>
                                                <img :src="`/images/countries/${data.item.flag}`" />
                                            </v-list-item-avatar>
                                            <v-list-item-content>
                                                <v-list-item-title v-html="data.item.name"></v-list-item-title>
                                            </v-list-item-content>
                                        </template>
                                    </template>
                                </v-autocomplete>
                            </v-col>

                            <v-col cols="12" sm="4" class="px-3">
                                <!-- <ValidationProvider v-slot="{ errors }" vid="PersonalData_City" name="city" :rules="{ required: true, max: 5 }"> -->
                                <ValidationProvider v-slot="{ errors }" vid="personal_data.city" name="city" :rules="rules.personal_data.city">
                                    <v-text-field :counter="rules.personal_data.city.max" data-vv-name="City" :error-messages="errors" v-model="userResume.personal_data.city">
                                        <template v-slot:label> City (State, Region) </template>
                                        <font-awesome-icon :icon="['fas', 'city']" slot="prepend" style="margin-top: 4px" />
                                    </v-text-field>
                                </ValidationProvider>
                            </v-col>

                            <v-col cols="12" sm="4" class="px-3">
                                <v-dialog ref="menu" v-model="menu" :return-value.sync="userResume.personal_data.birthday" :persistent="false" width="290px">
                                    <template v-slot:activator="{ on }">
                                        <v-text-field label="Birthday date" readonly v-on="on" v-model="userResume.personal_data.birthday">
                                            <font-awesome-icon :icon="['fas', 'birthday-cake']" slot="prepend" style="margin-top: 4px" />
                                        </v-text-field>
                                    </template>
                                    <v-date-picker
                                        ref="picker"
                                        :max="new Date().toISOString().substr(0, 10)"
                                        min="1900-01-01"
                                        v-model="userResume.personal_data.birthday"
                                        @change="saveBirthdayDate"
                                    ></v-date-picker>
                                </v-dialog>
                            </v-col>
                        </v-row>

                        <v-row no-gutters class="mb-4" v-if="userResume.personal_data">
                            <v-col cols="12" sm="4" class="px-3">
                                <v-autocomplete
                                    label="Nationality-ies"
                                    :items="countries"
                                    item-text="name"
                                    :return-object="true"
                                    multiple
                                    chips
                                    small-chips
                                    hint="Order matters"
                                    persistent-hint
                                    :deletable-chips="true"
                                    color="secondary"
                                    @focus="fetchCountries"
                                    v-model="userResume.personal_data.nationalities"
                                >
                                    <font-awesome-icon :icon="['fas', 'flag-usa']" slot="prepend" style="margin-top: 4px" />
                                    <template v-slot:selection="data">
                                        <v-chip :input-value="data.selected" close class="chip--select-multi" @click:close="removeNationality(data.item)">
                                            <v-avatar left>
                                                <v-img :src="`/images/countries/${data.item.flag}`"></v-img>
                                            </v-avatar>
                                            {{ data.item.name }}
                                        </v-chip>
                                    </template>
                                    <template v-slot:item="data">
                                        <template>
                                            <v-list-item-avatar>
                                                <img :src="`/images/countries/${data.item.flag}`" />
                                            </v-list-item-avatar>
                                            <v-list-item-content>
                                                <v-list-item-title v-html="data.item.name"></v-list-item-title>
                                            </v-list-item-content>
                                        </template>
                                    </template>
                                </v-autocomplete>
                            </v-col>

                            <v-col cols="8" sm="5" class="px-3">
                                <v-autocomplete
                                    label="Languages"
                                    :items="languages"
                                    item-text="name"
                                    :return-object="true"
                                    multiple
                                    chips
                                    small-chips
                                    hint="Click checkbox to display levels. Order matters."
                                    persistent-hint
                                    :deletable-chips="true"
                                    color="secondary"
                                    @focus="fetchLanguages"
                                    v-model="userResume.languages"
                                >
                                    <font-awesome-icon :icon="['fas', 'language']" slot="prepend" style="margin-top: 4px" />
                                    <template v-slot:selection="data">
                                        <v-chip :input-value="data.selected" close class="chip--select-multi" @click:close="removeLanguage(data.item)">
                                            <v-avatar left>
                                                <v-img :src="`/images/languages/${data.item.flag}`"></v-img>
                                            </v-avatar>
                                            {{ data.item.name }}
                                        </v-chip>
                                    </template>
                                    <template v-slot:item="data">
                                        <template>
                                            <v-list-item-avatar>
                                                <img :src="`/images/languages/${data.item.flag}`" />
                                            </v-list-item-avatar>
                                            <v-list-item-content>
                                                <v-list-item-title v-html="data.item.name"></v-list-item-title>
                                            </v-list-item-content>
                                        </template>
                                    </template>
                                </v-autocomplete>
                            </v-col>

                            <v-col xs="4" sm="3" class="px-3" v-if="userResume.parameters">
                                <v-checkbox label="Display language level" color="secondary" v-model="userResume.parameters.show_language_level"></v-checkbox>
                            </v-col>
                        </v-row>

                        <v-row no-gutters justify="center" class="mb-4" v-if="userResume.parameters && userResume.parameters.show_language_level">
                            <v-col cols="12" sm="6" md="4" class="pa-3" v-for="(language, index) in userResume.languages" :key="index" style="border: 1px solid red; border-radius: 10px">
                                <v-row no-gutters center class="my-0 pl-3">
                                    <v-col class="text-left">
                                        <span>{{ language.name }}</span>
                                    </v-col>
                                    <v-col class="text-right">
                                        <span>{{ language.value }}%</span>
                                    </v-col>
                                </v-row>
                                <v-slider v-model="language.value" label="" min="0" max="100" step="10" color="secondary" class="mt-0 pl-3"></v-slider>
                                <v-text-field :label="`Info ${language.name} (certificate, travel, etc.)`" v-model="language.info">
                                    <font-awesome-icon :icon="['fas', 'info']" slot="prepend" class="mt-1" />
                                </v-text-field>
                            </v-col>
                        </v-row>

                        <v-row no-gutters class="mt-10" style="">
                            <v-col cols="12" class="">
                                <profile-picture-upload :resumeSlug="resumeSlug"></profile-picture-upload>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <br />

        <v-row no-gutters class="pa-2">
            <v-col cols="12">
                <component :is="dynamicComponent" :resumeSlug="resumeSlug" :newPersonalData="null" v-if="dynamicComponent" />
            </v-col>
        </v-row>

        <v-row no-gutters class="pa-2">
            <v-col cols="12">
                <v-card :elevation="12" class="white--text" style="border-radius: 0px">
                    <v-card-title class="error lighten-1 justify-center" style="">
                        <h2 class="headline mb-0">Privacy & Security</h2>
                    </v-card-title>

                    <v-card-text class="border-error">
                        <v-row no-gutters justify="center">
                            <div class="justify-center">
                                <v-radio-group row name="visibility" data-vv-as="Privacy" v-model="userResume.visibility">
                                    <v-radio label="Public resume" value="public" color="success"></v-radio>
                                    <v-radio label="Semi-private resume" value="semi-private" color="info"></v-radio>
                                    <v-radio label="Private resume" value="private" color="warning"></v-radio>
                                </v-radio-group>
                            </div>
                        </v-row>
                        <v-row no-gutters justify="center">
                            <v-alert prominent color="success" icon="mdi-checkbox-marked-circle" v-if="userResume.visibility === 'public'">
                                <span class="subheading font-weight-medium">An excerpt of your resume with direct access to the data it contains is available on the website. (Recommanded for maximum visibility).</span>
                            </v-alert>
                            <v-alert prominent color="info" icon="mdi-information" v-if="userResume.visibility === 'semi-private'">
                                <span class="subheading font-weight-medium"
                                    >An excerpt of your resume appears on the website. However to gain full access, visitors <u>will be</u> prompted to
                                    enter the password you specify below.</span
                                >
                            </v-alert>
                            <v-alert prominent color="warning" icon="mdi-alert" v-if="userResume.visibility === 'private'">
                                <span class="subheading font-weight-medium"
                                    >Your resume is hidden, <i>i.e.</i> visitors will NOT be able to find you on the website. To gain access to your resume, visitors <u>will be</u> prompted to enter the password you specify below. (Recommanded for maximum privacy).</span
                                >
                            </v-alert>
                        </v-row>

                        <v-row no-gutters justify="center" v-if="userResume.visibility != 'public'" style="margin-top: 20px">
                            <v-col cols="12" class="text-center mb-2">
                                <div>Provide password for visitors' access:</div>
                                <small>(You will have to transmit this password to your guests for access)</small>
                            </v-col>
                            <v-col cols="12" sm="6" class="mx-5">
                                <ValidationProvider v-slot="{ errors }" vid="password" name="Password" :rules="rules.password">
                                    <v-text-field
                                        :type="showPassword ? 'text' : 'password'"
                                        name="password"
                                        :label="resumeSlug ? 'New password' : 'Password'"
                                        prepend-icon="mdi-lock"
                                        :hint="`At least ${rules.password.min} characters`"
                                        :counter="rules.password.max"
                                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                        :error-messages="errors"
                                        data-vv-as="Password"
                                        ref="password"
                                        @click:append="showPassword = !showPassword"
                                        v-model="userResume.password"
                                    ></v-text-field>
                                </ValidationProvider>
                            </v-col>
                            <v-col cols="12" sm="6" class="mx-5">
                                <ValidationProvider vid="password_confirmation" name="Password confirmation" :rules="rules.password_confirmation" v-slot="{ errors }">
                                    <v-text-field
                                        type="password"
                                        name="password_confirmation"
                                        :label="resumeSlug ? 'New Password confirmation' : 'Password confirmation'"
                                        :error-messages="errors"
                                        prepend-icon="mdi-lock"
                                        data-vv-as="Password"
                                        v-model="userResume.password_confirmation"
                                    ></v-text-field>
                                </ValidationProvider>
                            </v-col>
                        </v-row>

                        <v-row no-gutters style="display: none" v-if="resumeSlug">
                            <v-col xs="10" offset-xs="1">
                                <v-row no-gutters justify="center">
                                    <div>
                                        <v-switch v-model="userResume.updateResumeSlug" label="Modify resume identifier" color="secondary"></v-switch>
                                    </div>
                                </v-row>

                                <v-row no-gutters v-if="userResume.updateResumeSlug">
                                    <v-col cols="12" sm="8" md="4" class="mx-3">
                                        <v-text-field
                                            label="New resume identifier*"
                                            name="new_slug"
                                            hint="Must be unique."
                                            :persistent-hint="true"
                                            data-vv-as="Resume identifier"
                                            v-model="userResume.new_slug"
                                        >
                                            <font-awesome-icon :icon="['fas', 'id-badge']" slot="prepend" style="margin-top: 4px" />
                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="12" sm="8" class="px-3">
                                        <v-text-field label="New path to your resume" :value="userResume.new_slug ? `https://www.loginmycv.com/resume/${userResume.new_slug}` : ''" readonly>
                                            <font-awesome-icon :icon="['fab', 'chrome']" slot="prepend" style="margin-top: 4px" />
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import moment from 'moment'
// import { ValidationProvider } from 'vee-validate'
// import { clientRules } from '../../api/utils/rules'
// import validationRulesClient from '@/api/utils/validationRulesClient'

export default {
    components: {
        'profile-picture-upload': () => import('~/components/resume/stepSpecificComponents/ProfilePictureUpload'),
    },
    props: ['errors', 'rules'],
    async created() {
        console.log('PersonalDataComponent created')
        const resumeSlug = this.$route.params.slug
        console.log('resumeSlug: ', resumeSlug)
        if (resumeSlug != undefined) {
            this.resumeSlug = resumeSlug
        }
        // this.rules = validationRulesClient
    },
    async mounted() {
        try {
            // console.log('rules2: ', validationRulesClient)
            // this.originalVisibility = JSON.parse(JSON.stringify(this.userResume.visibility))
            // if (this.userResume.uploads) {
            //     const picture = this.userResume.uploads.find(upload => upload.type === 'profile_picture' && upload.new)
            //     if (picture) {
            //         this.imageName = picture.name
            //         const fileReader = new FileReader()
            //         fileReader.readAsDataURL(picture.file)
            //         fileReader.addEventListener('load', () => {
            //             this.imageUrl = fileReader.result
            //         })
            //     }
            // }
            // this.loadDynamicComponent()
            // 	.then(() => {
            // 		this.dynamicComponent = () => this.loadDynamicComponent()
            // 	})
            // 	.catch(() => {
            // 		this.dynamicComponent = null
            // 	})
            // if (this.step === 2 && this.$store.getters['countries/countries'].length < 1) {
            //     await this.$store.dispatch('countries/fetchCountries')
            // }
            // if (this.step === 2 && this.$store.getters['languages/languages'].length < 1) {
            //     await this.$store.dispatch('languages/fetchLanguages')
            // }
            this.profilePicture = this.userResume?.uploads?.find((upload) => upload.category === 'profile_picture')
        } catch (error) {
            console.log('error: ', error)
        }
    },
    data() {
        return {
            dynamicComponent: null,
            resumeSlug: '',
            imageName: '',
            imageUrl: '',
            imageFile: '',
            uploadingNewImage: false,
            modalDate: false,
            showPassword: false,
            originalVisibility: '', // Do not erase
            date: null,
            menu: false,
            profilePicture: null,
            newProfilePicture: null,
            // rules: {}
            // rules: {
            //     job_title: {
            //         required: true,
            //         max: 3
            //     }
            // }
        }
    },
    computed: {
        // errors () {
        //     return this.$store.getters['errors']
        // },
        loadDynamicComponent() {
            console.log('this.userResume: ', this.userResume)
            return () => import(`~/components/resume/dynamicTemplatesComponents/${this.userResume.template.id}/PersonalDataComponent`)
        },
        authUser() {
            return this.$store.getters['auth/authUser']
        },
        userResume() {
            if (this.$route.params.slug) {
                return this.$store.getters['resumes/userResumes'].find(resume => resume.slug === this.$route.params.slug)
            } else {
                // return this.$store.getters['resumesModels/resumesModels'][0]
                // return this.$store.getters['resumes/userResume']
                return this.$store.getters['resumes/userResumes'].find(resume => resume.status === 'new')
            }
        },
        // userResume() {
        //     if (this.$route.params.slug) {
        //         return this.$store.getters['resumes/userResumes'].find((resume) => resume.slug === this.$route.params.slug)
        //     } else {
        //         return this.$store.getters['resumesModels/resumesModels'][0]
        //     }
        // },
        // loadedNewResume() {
        //     return this.$store.getters['resumes/loadedNewResume']
        // },
        countries() {
            return this.$store.getters['countries/countries']
        },
        languages() {
            return this.$store.getters['languages/languages']
        },
        socialNetworks() {
            return this.$store.getters['socialNetworks/socialNetworks']
        },
        competences() {
            return this.$store.getters['competences/competences']
        },
        getCurrentPicture() {
            if (this.userResume.uploads) {
                return this.userResume.uploads.find((upload) => upload.type === 'profile_picture')
            }
            return null
        },
        isPasswordRequired() {
            if (this.userResume.updateResumeSlug) {
                if (this.userResume.visibility !== 'public') {
                    return true
                }
                return false
            }
            if (this.userResume.visibility !== this.originalVisibility && this.originalVisibility === 'public') {
                return true
            }
            return false
        },
        // resumePortrait () {
        //     const profilePicture = this.userResume.uploads.find(upload => upload.category == 'profile_picture')
        //     if (profilePicture) {
        //         return profilePicture
        //     } else {
        //         return null
        //     }
        // }
    },
    methods: {
        abc() {
            console.log('abc')
        },
        fetchCountries() {
            console.log('fetchCountries')
            if (this.$store.getters['countries/countries'].length < 1) {
                this.$store.dispatch('countries/fetchCountries')
            }
        },
        fetchLanguages() {
            console.log('fetchLanguages')
            if (this.$store.getters['languages/languages'].length < 1) {
                this.$store.dispatch('languages/fetchLanguages')
            }
        },
        fetchSocialNetworks() {
            console.log('fetchSocialNetworks')
            if (this.$store.getters['socialNetworks/socialNetworks'].length < 1) {
                this.$store.dispatch('socialNetworks/fetchSocialNetworks')
            }
        },
        // validate() {
        // 	// console.log('validate')
        // 	this.$validator.validateAll()
        // },
        saveBirthdayDate(date) {
            this.$refs.menu.save(date)
        },
        // saveDate() {
        //     // console.log('saveDate')
        //     this.modalDate = false
        // },
        removeCountryOfResidence(item) {
            console.log('removeCountryOfResidence: ', item)
            this.userResume.personal_data.country = null
        },
        removeNationality(item) {
            console.log('removeNationality: ', item, item._id)
            const index = this.userResume.personal_data.nationalities.findIndex((x) => x._id == item._id)
            console.log('index: ', index)
            if (index >= 0) {
                this.userResume.personal_data.nationalities.splice(index, 1)
            }
        },
        removeLanguage(item) {
            console.log('removeLanguage: ', item, item._id)
            const index = this.userResume.personal_data.languages.findIndex((x) => x._id == item._id)
            console.log('index: ', index)
            if (index >= 0) {
                this.userResume.personal_data.languages.splice(index, 1)
            }
            // const index = this.userResume.languages.indexOf(item)
            // if (index >= 0) {
            //     this.userResume.languages.splice(index, 1)
            // }
        },
        TOBEDELETED_pickFile() {
            console.log('pickFile')
            this.$refs.image.click()
        },

        onFileChanged(file) {
            console.log('onFileChanged: ', file)
            if (file) {
                const profilePictureIndex = this.userResume.uploads.findIndex((upload) => upload.category === 'profile_picture')
                console.log('profilePictureIndex: ', profilePictureIndex)
                if (profilePictureIndex != -1) {
                    this.userResume.uploads.splice(profilePictureIndex, 1, {
                        file,
                        name: file.name,
                        title: 'Profile picture',
                        category: 'profile_picture',
                        type: file.type,
                        size_in_bytes: parseInt(file.size),
                        status: 'new',
                    })
                } else {
                    this.userResume.uploads.push({
                        file,
                        name: file.name,
                        title: 'Profile picture',
                        category: 'profile_picture',
                        type: file.type,
                        size_in_bytes: parseInt(file.size),
                        status: 'new',
                    })
                }
                // this.imageName = file.name

                // Display new profile picture
                const fileReader = new FileReader()
                fileReader.readAsDataURL(file)
                fileReader.addEventListener('load', () => {
                    this.newProfilePicture = fileReader.result
                    this.uploadingNewImage = false
                })
            } else {
                this.newProfilePicture = null
            }
        },
        onFileChanged2(e) {
            const files = e.target.files
            // console.log('files: ', files)
            if (files[0]) {
                this.uploadingNewImage = true
                this.userResume.uploads = this.userResume.uploads.filter((upload) => upload.type !== 'profile_picture')
                this.userResume.uploads.push({
                    file: files[0],
                    name: files[0].name,
                    category: 'profile_picture',
                    size_in_bytes: parseInt(files[0].size),
                    new: true,
                })

                this.imageName = files[0].name
                const fileReader = new FileReader()
                fileReader.readAsDataURL(files[0])
                fileReader.addEventListener('load', () => {
                    this.imageUrl = fileReader.result
                    this.uploadingNewImage = false
                })
            }
        },
        // onChange (color) {
        //     console.log(color)
        // },
        // addUpload () {
        //     this.userResume.uploads = [{ name: 'abc'}]
        // },
        removeCurrentPicture() {
            this.userResume.uploads = this.userResume.uploads.filter((upload) => upload.category !== 'profile_picture')
            // this.imageName = ''
        },
        removeCurrentPicture2() {
            this.userResume.uploads = this.userResume.uploads.filter((upload) => upload.type !== 'profile_picture')
            this.imageUrl = ''
            this.imageName = ''
        },
    },
    watch: {
        menu(val) {
            val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
        },
    },
}
</script>

<style scoped>
.v-input__slot {
    padding-top: 12px;
}
.valign-top {
    vertical-align: top;
}
.red-border {
    border: 3px solid var(--v-error-lighten1);
}
.v-icon:hover {
    color: var(--v-error-base);
}
.border-error {
    border-right: 2px solid var(--v-error-lighten1);
    border-bottom: 2px solid var(--v-error-lighten1);
    border-left: 2px solid var(--v-error-lighten1);
}
.border-primary {
    border: 2px solid var(--v-primary-base);
    border-radius: 1em;
    padding: 1em;
}

::v-deep .no-underline.v-text-field > .v-input__control > .v-input__slot:before {
    border-style: none;
}
::v-deep .no-underline.v-text-field > .v-input__control > .v-input__slot:after {
    border-style: none;
}
</style>
