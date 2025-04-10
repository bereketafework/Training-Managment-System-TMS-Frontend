
<template>
    <div class="flex flex-col">
      <!-- Navigation Buttons -->
   
      <!-- Overlay Section -->
      <div class="flex flex-row mt-2">
        <!-- Button to toggle overlay -->
        <router-view />
        <v-btn
          color="blue"
          icon="mdi-plus"
          size="large"
          variant="text"
          @click="overlay = !overlay"
        ></v-btn>
        <v-btn
          color="blue"
          
          size="large"
          variant="text"
          @click="overlap = !overlap"
        > Assign</v-btn>
  
        <!-- Overlay with Form -->
        <v-overlay v-model="overlay" class="!flex !justify-center items-center">
          <v-card flat class="bg-slate-300">
            <span class="flex justify-center border-b-[1px] text-3xl">
              Course Registration Form
            </span>
            <v-snackbar v-model="snackbar" absolute top right color="success">
              <span>Registration successful!</span>
              <v-icon dark>mdi-checkbox-marked-circle</v-icon>
            </v-snackbar>
            <v-form ref="form" @submit.prevent="submit">
              <v-container
                fluid
                class="border-[1px] border-gray-200 !w-[900px]"
              >
                <v-row class="!flex !flex-col !col-span-2">
                  <v-col cols="14" sm="10">
                    <v-text-field
                      v-model="form.Title"
                      :rules="rules.Titile"
                      color="black darken-2"
                      label="Team Name"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="14" sm="10">
                    <v-select
  clearable
  :rules="rules.Titile"
  label="Select Training"
  :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
  
></v-select>
                  </v-col>
                  <v-col cols="14" sm="10">
                    <v-select
  clearable
  label="Select Team Members"
  :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
  multiple
></v-select>
                  </v-col>
                  <v-col cols="14" sm="10">
                    <v-textarea
                      v-model="form.Objective"
                      :rules="rules.Objective"
                      label="Course Objective"
                      row-height="20"
                      rows="2"
                      variant="filled"
                      auto-grow
                    ></v-textarea>
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
                    >
                      Register
                    </v-btn>
                  </v-card-actions>
                </v-row>
              </v-container>
            </v-form>
          </v-card>
        </v-overlay>
   <!-- Overlay with Form -->
   <v-overlay v-model="overlap" class="!flex !justify-center items-center">
          <v-card flat class="bg-slate-300">
            <span class="flex justify-center items-center border-b-[1px] text-3xl p-4">
              Team Assign  Form
            </span>
            <v-snackbar v-model="snackbar" absolute top right color="success">
              <span>Registration successful!</span>
              <v-icon dark>mdi-checkbox-marked-circle</v-icon>
            </v-snackbar>
            <v-form ref="form" @submit.prevent="submit">
              <v-container
                fluid
                class="border-[1px] border-gray-200 !w-[900px]"
              >
                <v-row class="!flex !flex-col !col-span-2">
                  <v-col cols="14" sm="10">
                    <v-select
  clearable
  label="Select Training"
  :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
  
></v-select>
                  </v-col>
                  <v-col cols="14" sm="10">
                    <v-select
  clearable
  label="Select Team "
  :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
  
></v-select>
                  </v-col>
                  <v-col cols="14" sm="10">
                    <v-textarea
                      v-model="form.Prerequest"
                      :rules="rules.Prerequest"
                      label="Prerequest"
                      row-height="20"
                      rows="2"
                      variant="filled"
                      auto-grow
                    ></v-textarea>
                  </v-col>
                  <v-col cols="14" sm="10">
                    <v-textarea
                      v-model="form.Objective"
                      :rules="rules.Objective"
                      label="Course Objective"
                      row-height="20"
                      rows="2"
                      variant="filled"
                      auto-grow
                    ></v-textarea>
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
                    >
                      Register
                    </v-btn>
                  </v-card-actions>
                </v-row>
              </v-container>
            </v-form>
          </v-card>
        </v-overlay>
  
        <v-spacer></v-spacer>
        <span class="flex justify-center border-b-[1px] text-3xl">
          List of Teams
        </span>
        <v-spacer></v-spacer>
        <v-btn icon="mdi-filter-outline" color="Primary" size="large" variant="text"></v-btn>
      </div>
  
      <!-- Training List -->
      <div>
        <v-table density="compact">
          <thead>
            <tr>
              <th class="text-left">Training Name</th>
              <th class="text-left">Price</th>
              <th class="text-left">Status</th>
              <th class="text-left">Venue</th>
              <th class="text-left">Capacity</th>
              <th class="text-left">No. Trainee</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in desserts" :key="item.name">
              <td>{{ item.name }}</td>
              <td>{{ item.price }} ETB</td>
              <td>
                <v-chip color="green">{{ item.status }}</v-chip>
              </td>
              <td>{{ item.Venue }}</td>
              <td>{{ item.capacity }}</td>
              <td>{{ item.trainee }}</td>
            </tr>
          </tbody>
        </v-table>
        
      </div>
      <div>
      <v-skeleton-loader
        v-if="loading"
        type="table,table-heading, table-row"
        class="mt-4"
      ></v-skeleton-loader>

      <v-data-table
        :headers="headers"
        :items="items"
        :search="searchQuery"
        density="compact"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-btn
              color="white"
              prepend-icon="mdi-plus"
              size="large"
              class="!bg-blue-500 rounded-lg"
              variant="outlined"
              @click="toggleForm"
            >
              Create</v-btn
            >
            <v-toolbar-title class="flex justify-center items-center !text-4xl">
              List of Trainings
            </v-toolbar-title>
            <v-text-field
              class="bg-transparent"
              v-model="searchQuery"
              append-inner-icon="mdi-magnify"
              color="primary"
              density="comfortable"
              label="Search"
              variant="outlined"
              hide-details
              single-line
              clearable
            ></v-text-field>
            <v-btn
              icon="mdi-filter-outline"
              color="Primary"
              size="large"
              variant="text"
              @click="toggleFilterDialog"
            ></v-btn>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                icon="mdi-dots-vertical"
                variant="text"
                color="gray-lighten-2"
              ></v-btn>
            </template>
            <v-list>
              <v-list-item @click="selectItem(item)">Edit</v-list-item>
              <v-list-item @click="confirmDelete(item)">Delete</v-list-item>
            </v-list>
          </v-menu>
        </template></v-data-table
      >
    </div>
    
    </div>
  </template>
  
  <script>
  
  export default {
    data: () => ({
      overlay: false,
      overlap:false,
      snackbar: false,
      form: {
        Title: '',
        Description: '',
        Prerequest: '',
        Objective: '',
      },
      rules: {
        Description: [(val) => (val || '').length > 0 || 'This field is required'],
        Titile: [(val) => (val || '').length > 0 || 'This field is required'],
        Objective: [(val) => (val || '').length > 0 || 'This field is required'],
        Prerequest: [(val) => (val || '').length > 0 || 'This field is required'],
      },
      desserts: [
        {
          name: 'Frozen Yogurt',
          price: 200,
          status: 'Active',
          Venue: 'AAU',
          capacity: 100,
          trainee: 70,
        },
        {
          name: 'Frozen Yogurt',
          price: 300,
          status: 'Active',
          Venue: 'TASH',
          capacity: 50,
          trainee: 50,
        },
      ],
    }),
    computed: {
      formIsValid() {
        return (
          this.form.Description &&
          this.form.Prerequest &&
          this.form.Objective &&
          this.form.Title
        );
      },
    },
    methods: {
      resetForm() {
        this.form = {
          Title: '',
          Description: '',
          Prerequest: '',
          Objective: '',
        };
        this.$refs.form.reset();
      },
      submit() {
        this.snackbar = true;
        this.resetForm();
      },
      goBack() {
        this.$router.go(-1);
      },
    },
  };
  </script>
  
  <style>
  </style>
  