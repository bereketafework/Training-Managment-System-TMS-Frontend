<template>
    <div> 
        <v-toolbar flat class="overflow-x-auto">
            <v-tabs
      v-model="tab"
      color="primary"
      direction="horizontal"
    
      class="flex h h-full !justify-between"
    >
    <v-tab
        prepend-icon="mdi-eye"
        text="Resource"
        value="Resource"
        :to="{ name: '' }"
        @click="overlay=!overlay"
      ></v-tab>
      <v-tab
        prepend-icon="mdi-account-box-plus-outline"
        text="Guest"
        value="Guest"
        :to="{ name: '' }"
        @click="fetchData"
      ></v-tab>

      <v-tab
        prepend-icon="mdi-account-multiple"
        text="Team"
        value=" Team"
        :to="{ name: '' }"
      ></v-tab>
      <v-tab
        prepend-icon="mdi-account-reactivate"
        text="Enrollments"
        value=" Enrollments"
        :to="{ name: '' }"
      ></v-tab> <v-tab
        prepend-icon="mdi-account-cash"
        text="Sponsor"
        value=" Sponsor"
        :to="{ name: '' }"
      ></v-tab> <v-tab
        prepend-icon="mdi-cash-fast"
        text="Allwoance"
        value=" Allwoance"
        :to="{ name: '' }"
        
      ></v-tab>
 
    </v-tabs>  
          </v-toolbar>
    </div>
    <div v-if="tab === 'Team'" class="m-6">
     <v-overlay v-model="overlay">
      hey
     </v-overlay>
    </div>
    <div v-if="tab === 'Team'" class="m-6">

<v-card flat class="bg-slate-300">
            <span class="flex justify-center border-b-[1px] text-3xl">
              Training Session Form
            </span>
       
            <v-form ref="form" @submit.prevent="submit">
              <v-container
                fluid
                class="border-[1px] border-gray-200 !w-[900px]"
              >
                <v-row class="!flex !flex-col !col-span-2">
                  
               
                  <v-col cols="14" sm="10">
                    <v-text-field
                      v-model="form.topic"
                      :rules="rules.topic"
                      color="black darken-2"
                      label="Topic"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="14" sm="10">
                    <v-text-field
                      v-model="form.duration"
                      :rules="rules.duration"
                      color="black darken-2"
                      label="Duration"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="14" sm="10">
                    <v-menu
                      v-model="menu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="form.sessions_start_date"
                          label="Session Start Date"
                          type="date"
                          
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="form.sessions_start_date" no-title @input="menu = false"></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="14" sm="10">
                    <v-menu
                      v-model="menuEnd"
                      :close-on-content-click="true"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="form.sessions_end_date"
                          label="Session End Date"
                           type="date"
                      
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="form.sessions_end_date" no-title @input="menuEnd = false"></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-card-actions>
                    <v-btn text @click="goBack">Back</v-btn>
                    <v-btn text @click="resetForm">Clear</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                      :disabled="!formIsValid"
                      text
                      color="primary"
                      type="submit"
                      @click="createTraining"
                      
                    > <v-progress-circular
                    v-if="loading"
                    indeterminate
                    size="20"
                  ></v-progress-circular>
                      Register
                    </v-btn>
                  </v-card-actions>
                </v-row>
              </v-container>
            </v-form>
          </v-card>
</div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        tab: 'Details',
      };
    },
  };
  </script>
  
  <style>
  
  </style>