<!-- 
<template>
    <div class="flex flex-col">
      <!-- Navigation Buttons -->
   
      <!-- Overlay Section 
      <div class="flex flex-row mt-2">
        <!-- Button to toggle overlay 
        <router-view />
        <v-btn
          color="blue"
          icon="mdi-plus"
          size="large"
          variant="text"
          @click="overlay = !overlay"
        ></v-btn>
  
        <!-- Overlay with Form
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
                      label="Course Title"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="14" sm="10">
                    <v-textarea
                      v-model="form.Description"
                      :rules="rules.Description"
                      label="Course Descriptions"
                      row-height="30"
                      rows="3"
                      variant="filled"
                      auto-grow
                    ></v-textarea>
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
          List of sessions
        </span>
        <v-spacer></v-spacer>
        <v-btn icon="mdi-filter-outline" color="Primary" size="large" variant="text"></v-btn>
      </div>
  
      <!-- Training List 
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
              <td>
              
    
              <div class="text-center">
                
                <v-menu :location="location">
                  <template v-slot:activator="{ props }">
                    <v-btn
                    
                    color="gray-lighten-2"
                    icon="mdi-dots-vertical"
                    variant="text"
                    v-bind="props"
                  ></v-btn>
                  </template>
            
                  <v-list>
                    
                    
                      <v-list-item-title class="!text-sm flex flex-col" @click="overlays=!overlays"  >{{ item.title }}
            
                     <VBtn click="overlays=!overlays"  variant="text">edit</VBtn>
                     <VBtn click="overlays=!overlays" variant="text">Delete</VBtn>
                      </v-list-item-title>
                      <v-overlay v-model="overlay" class="!flex !justify-center items-center"></v-overlay>
                    
                  </v-list>
                </v-menu>
              </div>
                        </td>
            </tr>
          </tbody>
        </v-table>
        
      </div>
    </div>
  </template>
  
  <script>
  
  export default {
    data: () => ({
      items: [
        { title: 'Edit' },
        { title: 'Delete' },
     
      ],
      locations: [
        'top',
        'bottom',
        'start',
        'end',
        'center',
      ],
      location: 'end',
      overlays:false,
      overlay: false,
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
   -->
   <template>
    <div class="w-full ">
      <!-- Overlay Section -->
      <div class="flex flex-row mt-2">
        <!-- Button to toggle overlay -->
        <router-view />
        <v-btn
          color="blue"
          icon="mdi-plus"
          size="large"
          variant="text"
          @click="toggleOverlay"
        ></v-btn>
  
        <!-- Overlay with Form -->
        <v-overlay v-model="overlay" class="!flex !justify-center items-center">
          <v-card flat class="bg-slate-300">
            <span class="flex justify-center border-b-[1px] text-3xl">
              Training Session Form
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
                          readonly
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
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="form.sessions_end_date"
                          
                          label="Session End Date"
                          readonly
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
          List of Training Sessions
        </span>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="searchQuery"
          append-inner-icon="mdi-magnify"
          color="primary"
          density="compact"
          label="Search"
          variant="solo"
          hide-details
          single-line
          clearable
          @input="applyFilters"
        ></v-text-field>
        <v-btn icon="mdi-filter-outline" color="Primary" size="large" variant="text" @click="toggleFilterDialog"></v-btn>
      </div>
  
      <!-- Training List -->
      <div>
        <v-dialog v-model="filterDialog" max-width="500">
          <v-card>
            <v-card-title class="headline">Filter Options</v-card-title>
            <v-card-text>
              <!-- Add filter fields here as needed -->
              <v-text-field
                v-model="filterForm.training_id"
                label="Training ID"
                clearable
              ></v-text-field>
              <v-text-field
                v-model="filterForm.duration"
                label="Duration"
                clearable
              ></v-text-field>
              <v-card-actions>
            <v-btn text @click="clearFilters">Clear Filters</v-btn>
            <v-btn type="submit" text color="primary">Apply Filter</v-btn>
          </v-card-actions>
            </v-card-text>
          </v-card>
        </v-dialog>
      
        <v-table density="compact">
          <thead>
            <tr>
              <th class="text-left">Training ID</th>
              <th class="text-left">Duration</th>
              <th class="text-left">Topic</th>
              <th class="text-left">Session Start Date</th>
              <th class="text-left">Session End Date</th>
              <th class="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in filteredCourses" :key="index">
              <td>{{ item.training_id }}</td>
              <td>{{ item.duration }}</td>
              <td>{{ item.topic }}</td>
              <td>{{ item.sessions_start_date }}</td>
              <td>{{ item.sessions_end_date }}</td>
              <td>
                <div class="text-center">
                  <v-menu :location="location">
                    <template v-slot:activator="{ props }">
                      <v-btn
                        color="gray-lighten-2"
                        icon="mdi-dots-vertical"
                        variant="text"
                        v-bind="props"
                      ></v-btn>
                    </template>
                    <v-list>
                      <v-list-item @click="editCourse(index)">
                        <v-list-item-title class="!text-sm">Edit</v-list-item-title>
                      </v-list-item>
                      <v-list-item @click="confirmDelete(index)">
                        <v-list-item-title class="!text-sm">Delete</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </div>
              </td>
            </tr>
          </tbody>
        </v-table>
        <v-pagination v-model:page="page" :length="pageCount"></v-pagination>
      </div>
  
      <!-- Delete Confirmation Dialog -->
      <v-dialog v-model="deleteDialog" max-width="500">
        <v-card>
          <v-card-title class="headline">Are you sure?</v-card-title>
          <v-card-text>Do you really want to delete this training session? This action cannot be undone.</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="deleteCourse">Yes</v-btn>
            <v-btn color="primary" text @click="deleteDialog = false">No</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <cards/>
  </template>
  <script>
  export default {
    data: () => ({
      overlay: false,
      filterDialog: false,
      snackbar: false,
      deleteDialog: false,
      form: {
        training_id: '',
        duration: '',
        topic: '',
        sessions_start_date: '',
        sessions_end_date: '',
      },
      filterForm: {
        training_id: '',
        duration: '',
      },
      searchQuery: '',
      menu: false,
      menuEnd: false,
      rules: {
        training_id: [(val) => !!val || 'This field is required'],
        duration: [(val) => !!val || 'This field is required'],
        topic: [(val) => !!val || 'This field is required'],
      },
      courses: [],
      menuItems: [
        { title: 'Edit' },
        { title: 'Delete' },
      ],
      location: 'end',
      page: 1,
      itemsPerPage: 5,
      selectedIndex: -1,
    }),
    computed: {
      formIsValid() {
        return (
          this.form.training_id &&
          this.form.duration &&
          this.form.topic &&
          this.form.sessions_start_date &&
          this.form.sessions_end_date
        );
      },
      pageCount() {
        return Math.ceil(this.filteredCourses.length / this.itemsPerPage);
      },
      filteredCourses() {
        const start = (this.page - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.filtered.slice(start, end);
      },
      filtered() {
        return this.courses.filter((course) => {
          return (
            (!this.filterForm.training_id || course.training_id.includes(this.filterForm.training_id)) &&
            (!this.filterForm.duration || course.duration.includes(this.filterForm.duration)) &&
            (course.training_id.includes(this.searchQuery) || course.duration.includes(this.searchQuery))
          );
        });
      },
      SessionStartDateRules() {
        return (v)=> {
        if (!v) return "This field is required";
        if (isNaN(Date.parse(v))) return "Must be a valid date.";
        if (new Date(v) < new Date()) return "Date must be in the future.";
        return true;
      };
      },
      SessionEndDateRules() {
        return (v) => {
        if (!v) return "This field is required";
        if (isNaN(Date.parse(v))) return "Must be a valid date.";
        if (new Date(v) <= new Date(this.form.StartDate)) return "End Date must be after Start Date.";
        if (new Date(v) - new Date(this.form.StartDate) < 86400000) return "End Date must be at least one day after Start Date.";
        return true;
      };  },
    },
    methods: {
      resetForm() {
        this.form = {
          training_id: '',
          duration: '',
          topic: '',
          sessions_start_date: '',
          sessions_end_date: '',
        };
        this.$refs.form.reset();
      },
      submit() {
        if (this.selectedIndex === -1) {
          this.courses.push({ ...this.form });
        } else {
          this.courses.splice(this.selectedIndex, 1, { ...this.form });
          this.selectedIndex = -1;
        }
        this.snackbar = true;
        this.overlay = false;
        this.resetForm();
      },
      toggleOverlay() {
        this.overlay = !this.overlay;
        this.resetForm();
        this.selectedIndex = -1;
      },
      toggleFilterDialog() {
        this.filterDialog = !this.filterDialog;
      },
      applyFilters() {
        this.page = 1;
      },
      clearFilters() {
        this.filterForm = {
          training_id: '',
          duration: '',
        };
        this.applyFilters();
      },
      editCourse(index) {
        this.selectedIndex = index;
        this.form = { ...this.courses[index] };
        this.overlay = true;
      },
      confirmDelete(index) {
        this.selectedIndex = index;
        this.deleteDialog = true;
      },
      deleteCourse() {
        this.courses.splice(this.selectedIndex, 1);
        this.selectedIndex = -1;
        this.deleteDialog = false;
      },
      goBack() {
        this.$router.go(-1);
      },
    },
  };
  </script>
  