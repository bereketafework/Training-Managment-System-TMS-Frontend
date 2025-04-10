<!-- <template>
  <div class="flex flex-col">
    <div>
  <v-card>
    
    
    <v-btn class="m-2  " color="primary" variant="text   " :to="{ path: '/training/courseHome' }">Course</v-btn>
    
    <v-btn class="m-2  " color="primary" variant="text " >Training Session</v-btn>
    
    <v-btn class="m-2  " color="primary" variant="text ">Team</v-btn>
    

    
  </v-card>
  </div>
        
  <div class="flex flex-row mt-2 ">
      <!-- Button to toggle overlay 
      <router-view/>
      <v-btn
              color="blue"
              v-bind="props"
              icon="mdi-plus"
              size="large"
              variant="text"
               @click="overlay = !overlay"
            >
            </v-btn>
  
      <!-- Overlay with form
      <v-overlay v-model="overlay" class="!flex !justify-center items-center ">
       
        <v-card flat class="bg-slate-300 " >
      <span class="flex justify-center border-b-[1px] text-3xl ">Course Registration Form</span>
      <v-snackbar
        v-model="snackbar"
        absolute
        top
        right
        color="success"
       
      >
        <span>Registration successful!</span>
        <v-icon dark>
          mdi-checkbox-marked-circle
        </v-icon>
      </v-snackbar>
      <v-form
        ref="form"
        @submit.prevent="submit"
      
      >
        <v-container fluid  class="border-[1px] border-gray-200 !w-[900px]"  >
          
          <v-row   class="!flex !flex-col  !col-span-2   ">
            <v-col
            cols="14"
            sm="10">
              <v-text-field
                v-model="form.Title"
                :rules="rules.Titile"
                color="black darken-2"
                label="Course Title"
                required
              ></v-text-field>
             </v-col>
             <v-col
        cols="14"
        sm="10"
      >
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
      <v-col
        cols="14"
        sm="10"
      >
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
      <v-col
        cols="14"
        sm="10"
      >
        <v-textarea
        v-model="form.Objective"
        :rules="rules.Objective"
          label="Course Objective"
          row-height="20"
          rows="2"
          variant="filled"
          auto-grow
        ></v-textarea>
      </v-col> <v-card-actions>
        <v-btn
            text
            @click="goBack"
          >
            Back
          </v-btn>
          <v-btn
            text
            @click="resetForm"
          >
            Clear
          </v-btn>
         
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
      <span class="flex justify-center border-b-[1px] text-3xl ">List of Training</span>
      <v-spacer></v-spacer>
      <v-btn icon="mdi-filter-outline" color="Primary" size="large" variant="text">
      </v-btn>

     

    </div>
   
  <div>

    
  <v-table density="compact">
    <thead>
      <tr>
        <th class="text-left">
          Training Name
        </th>
        <th class="text-left">
          Price 
        </th>
        <th class="text-left">
          Status
        </th><th class="text-left">
          Venue
        </th><th class="text-left">
          Capacity
        </th><th class="text-left">
          No. Tranee
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in desserts"
        :key="item.name"
      >
        <td>{{ item.name }}</td>
        <td>{{ item.price }} ETB</td>
        <td>
          <v-chip color="green">
      
    {{ item.status }}</v-chip></td>
        <td>{{ item.Venue }}</td>
        <td>{{ item.capacity }}</td>
        <td>{{ item.tranee }}</td>
        
      </tr>
    </tbody>
  </v-table>
  <router-view></router-view>
  </div>
</div>

</template>
<script>
import CourseHomePage from './CourseHomePage.vue';
import TraininigRegistration from './TraininigRegistration.vue'
const defaultForm = Object.freeze({
          Titile: '',
          Description: '',
          Prerequest: '',
          Objective: '',
          
        })

  export default {
    
  components: { TraininigRegistration },
    data: () => ({
      overlay: false,
          form: Object.assign({}, defaultForm),
          rules: {
           
            Description: [val => (val || '').length > 0 || 'This field is required'],
            Titile: [val => (val || '').length > 0 || 'This field is required'],
            Objective: [val => (val || '').length > 0 || 'This field is required'],
            Prerequest: [val => (val || '').length > 0 || 'This field is required'],
        
          },
          snackbar: false,
      currentItem: 'tab-Web',
      items: [
        'Course', 'Training Session', 'Team', 'Images',
        
      ],
      desserts: [
          {
            name: 'Frozen Yogurt',
            price: 200,
            status: 'Active',
            Venue: 'AAU',
            capacity: 100,
            tranee:70,

          },
          {
            
            name: 'Frozen Yogurt',
            price: 300,
            status: 'Active',
            Venue: 'TASH',
            capacity: 50,
            tranee:50,
          },
          ]
    
    }),
    computed: {
        formIsValid () {
          return (
            this.form.Description &&
            this.form.Prerequest &&
            this.form.Objective
          )
        },
        
     
      },

    methods: {
      resetForm () {
          this.form = Object.assign({}, this.defaultForm)
          this.$refs.form.reset()
        },
        submit () {
          this.snackbar = true
           this.$refs.form.reset();
        },
        goBack() {
             this.$router.go(-1)},
      addItem (item) {
        const removed = this.items.splice(0, 1)
        this.items.push(
          ...this.more.splice(this.more.indexOf(item), 1),
        )
        this.more.push(...removed)
        this.$nextTick(() => { this.currentItem = 'tab-' + item })
      },
    },
  }
</script>

<style>

</style>

<template>
  <div>
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
        List of Course
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
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          class="!text-xs"
        >
        
          <v-list-item-title class="!text-sm"  >{{ item.title }}


          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
            </td>
          </tr>
        </tbody>
      </v-table>
      
    </div>
    
  </div>
  <cards/>
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
  <div class="w-full">
    <!-- Overlay Section -->
    <div class="flex flex-row mt-2">
      <!-- Button to toggle overlay -->

      <!-- <v-btn color="blue" icon="mdi-plus" size="large" variant="text" @click="toggleOverlay" >

     </v-btn> Overlay with Form  -->
      <v-overlay v-model="overlay" persistent  class="!flex !justify-center items-center">
        <v-card flat class="bg-slate-300">
          <span class="flex justify-center border-b-[1px] text-3xl">
            Course Registration Form
          </span>

          <v-form ref="form" @submit.prevent="submit">
            <v-container fluid class="border-[1px] border-gray-200 !w-[900px]">
              <v-row class="!flex !flex-col !col-span-2">
                <v-col cols="14" sm="10">
                  <v-text-field
                    v-model="form.Title"
                    :rules="rules.Title"
                    color="black darken-2"
                    label="Course Title"
                    required
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="14" sm="10">
                  <v-textarea
                    v-model="form.Description"
                    :rules="rules.Description"
                    label="Course Description"
                    row-height="30"
                    rows="3"
                    variant="filled"
                    auto-grow
                  >
                  </v-textarea>
                </v-col>
                <v-col cols="14" sm="10">
                  <v-textarea
                    v-model="form.Prerequisites"
                    :rules="rules.Prerequisites"
                    label="Prerequisites"
                    row-height="20"
                    rows="2"
                    variant="filled"
                    auto-grow
                  >
                  </v-textarea>
                </v-col>
                <v-col cols="14" sm="10">
                  <v-textarea
                    v-model="form.Objectives"
                    :rules="rules.Objectives"
                    label="Course Objectives"
                    row-height="20"
                    rows="2"
                    variant="filled"
                    auto-grow
                  >
                  </v-textarea>
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
                    @click="createCourse"
                    
                  >
                  <v-progress-circular v-if="loading" indeterminate size="20"></v-progress-circular>
       
                    Register
                  </v-btn>
                </v-card-actions>
              </v-row>
            </v-container>
          </v-form>
        </v-card>
      </v-overlay>
     
      <v-overlay v-model="overlayUpdate" class="!flex !justify-center items-center">
        <v-card flat class="bg-slate-300">
          <span class="flex justify-center border-b-[1px] text-3xl">
            Course Data Update Form
          </span>

          <v-form ref="form" @submit.prevent="submit">
            <v-container fluid class="border-[1px] border-gray-200 !w-[900px]">
              <v-row class="!flex !flex-col !col-span-2">
                <v-col cols="14" sm="10">
                  <v-text-field
                    v-model="form.TitleUpdate"
                    :rules="rules.Title"
                    color="black darken-2"
                    label="Course Title"
                    required
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="14" sm="10">
                  <v-textarea
                    v-model="form.DescriptionUpdate"
                    :rules="rules.Description"
                    label="Course Description"
                    row-height="30"
                    rows="3"
                    variant="filled"
                    auto-grow
                  >
                  </v-textarea>
                </v-col>
                <v-col cols="14" sm="10">
                  <v-textarea
                    v-model="form.PrerequisitesUpdate"
                
                    label="Prerequisites"
                    row-height="20"
                    rows="2"
                    variant="filled"
                    auto-grow
                  >
                  </v-textarea>
                </v-col>
                <v-col cols="14" sm="10">
                  <v-textarea
                    v-model="form.ObjectivesUpdate"
                    
                    label="Course Objectives"
                    row-height="20"
                    rows="2"
                    variant="filled"
                    auto-grow
                  >
                  </v-textarea>
                </v-col>
                <v-card-actions>
                  <v-btn text @click="goBack">Back</v-btn>
                  <v-btn text @click="resetForm">Clear</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                  
                  
                    text
                    color="primary"
                    type="submit"
                    @click="editItem"
                    
                  >
                  <v-progress-circular v-if="loading" indeterminate size="20"></v-progress-circular>Update
                  </v-btn>
                </v-card-actions>
              </v-row>
            </v-container>
          </v-form>
        </v-card>
      </v-overlay>
      <!-- <span class="flex justify-center border-b-[1px] text-3xl"> List of Courses </span>
                                  <v-spacer></v-spacer> 
                                  <v-text-field v-model="searchQuery" append-inner-icon="mdi-magnify"
                                   color="primary" density="compact" label="Search" 
                                   variant="solo" hide-details single-line clearable @input="applyFilters" >
                                  </v-text-field> 
                                  <v-btn icon="mdi-filter-outline" color="Primary" size="large" variant="text" @click="toggleFilterDialog"></v-btn>  -->
    </div>
    <div>
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
              color="blue"
              prepend-icon="mdi-plus"
              size="large"
              class="rounded-lg"
              variant="outlined"
                @click="toggleOverlay"
              >
                Create</v-btn
              >
              <v-toolbar-title
                class="flex justify-center items-center !text-4xl"
              >
                List of Courses
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
    <!-- Training List <div> <v-dialog v-model="filterDialog" max-width="500">
                                      <v-card> 
                                      <v-card-title class="headline">Filter Options</v-card-title>
                                      <v-card-text>
                                          Add filter fields here as needed
                                        <v-text-field v-model="filterForm.Title" label="Course Title" clearable ></v-text-field>
                                          <v-textarea v-model="filterForm.Description" label="Course Description" auto-grow clearable ></v-textarea> 
                                        <v-card-actions>
                <v-btn text @click="clearFilters">Clear Filters</v-btn>
                <v-btn type="submit" text color="primary">Apply Filter</v-btn>
              </v-card-actions> </v-card-text> </v-card> </v-dialog> 
              <v-table density="compact"> <thead> 
                <tr> <th class="text-left">Course Title</th>
                  <th class="text-left">Course Description</th>
                    <th class="text-left">Prerequisites</th> 
                    <th class="text-left">Course Objectives</th>
                    <th class="text-left">Actions</th> </tr> 
                    </thead> 
                    <tbody>
                      <tr v-for="(item, index) in filteredCourses" :key="index">
                        <td>{{ item.Title }}</td> <td>{{ item.Description }}</td>
                          <td>{{ item.Prerequisites }}</td> <td>{{ item.Objectives }}</td> <td> <div class="text-center">
                            <v-menu :location="location"> <template v-slot:activator="{ props }"> 
                              <v-btn color="gray-lighten-2" icon="mdi-dots-vertical" variant="text" v-bind="props" >

                          </v-btn> 
                        </template> <v-list> <v-list-item @click="editCourse(index)"> 
                          <v-list-item-title class="!text-sm">Edit</v-list-item-title>
                        </v-list-item> <v-list-item @click="confirmDelete(index)"> 
                          <v-list-item-title class="!text-sm">Delete</v-list-item-title>
                        </v-list-item> 
                        </v-list> 
                      </v-menu> 
                    </div> 
                  </td>
                </tr>
                
                </tbody>
                        </v-table> -->
    <v-pagination v-model:page="page" :length="pageCount"></v-pagination>
  </div>
  <!-- Delete Confirmation Dialog -->
  <v-dialog v-model="deleteDialog" max-width="500px">
    <v-card>
      <v-card-title class="headline"
        >Are you sure you want to delete?</v-card-title
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="deleteDialog = false">Cancel</v-btn>
        <v-btn color="red" text @click="deleteItem">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <cards />
  <v-snackbar v-model="snackbar1" :color="snackbarColor1">
      {{ snackbarMessage1 }}
    </v-snackbar>
</template>
<script>
import api from "@/service/api";
import { jwtDecode } from "jwt-decode";
export default {
  data: () => ({
    
    headers: [
      { title: "Course Title", value: "Course_title" ,sortable: true },
      { title: "Prerequests", value: "Prerequests" },
      { title: "Course Objective", value: "Course_objective" },
      { title: "Actions", value: "actions", sortable: false },
    ],
    items: [],
    selectedItem:null,
    overlayUpdate:false,
    loading:false,
    overlay: false,
    filterDialog: false,
    snackbar1: false,
    deleteDialog: false,
    form: {
      Title: "",
      Description: "",
      Prerequisites: "",
      Objectives: "",
      TitleUpdate: "",
      DescriptionUpdate: "",
      PrerequisitesUpdate: "",
      ObjectivesUpdate: "",
    },
    filterForm: {
      Title: "",
      Description: "",
    },
    searchQuery: "",
    rules: {
      Title: [(val) => !!val || "This field is required"],
      Description: [(val) => !!val || "This field is required"],
      Objectives: [(val) => !!val || "This field is required"],
    },
    courses: [],
    menuItems: [{ title: "Edit" }, { title: "Delete" }],
    location: "end",
    page: 1,
    itemsPerPage: 5,
    selectedIndex: -1,
  }),
  computed: {
    formIsValid() {
      return (
        this.form.Title &&
        this.form.Description &&
        this.form.Objectives
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
          (!this.filterForm.Title ||
            course.Title.includes(this.filterForm.Title)) &&
          (!this.filterForm.Description ||
            course.Description.includes(this.filterForm.Description)) &&
          (course.Title.includes(this.searchQuery) ||
            course.Description.includes(this.searchQuery))
        );
      });
    },
  },
  methods: {
     
    async createCourse() {
      
      try {
        const token = localStorage.getItem('token'); // Adjust if your token is stored elsewhere
        
if (token) {
  
    try{  
      this.loading = true;
      const decodedToken = jwtDecode(token);
      
       const userId = decodedToken.id;

       const response = await api.post('/course/create', {
          Course_title: this.form.Title,
          Course_description:this.form.Description,
          Course_objective: this.form.Objectives,
          Prerequests:this.form.Prerequisites
         });
      
          this.snackbarMessage1 = "Successfully Created ";
        this.snackbarColor1 = 'green';
        this.snackbar1 = true;
        this.overlay=null
        this.fetchData();
      
}
 catch (error) {
          console.error('Error decoding token:', error);
          this.snackbarMessage1 = error.response.data;
          this.snackbarColor1 = 'red';
          this.snackbar1 = true;
        }}

       else {
        this.snackbarMessage1 = error.response.data;
          this.snackbarColor1 = 'red';
          this.snackbar1 = true;
        }
       
      } catch (error) {
        console.error(error);
        this.snackbarMessage1 = error.response.data;
          this.snackbarColor1 = 'red';
          this.snackbar1 = true;
      }
      finally {
        this.loading = false;
      }
    },
    async fetchData() {
      try {
        const response = await api.get("/course/all");

        this.items = response.data;
      } catch (error) {
        console.error(error);
        this.snackbarMessage1 = error.response.data;
        this.snackbarColor1 = "red";
        this.snackbar1 = true;
      }
    },

    selectItem(item) {

this.overlayUpdate = true;
this.selectedItem=item;
this.form.TitleUpdate=item.Course_title
this.form.DescriptionUpdate=item.Course_description
this.form.PrerequisitesUpdate=item.Prerequests
this.form.ObjectivesUpdate = item.Course_objective


},

    async  editItem() {
      try{  
        this.loading = true;
     
  
         const response = await api.post(`/Course/update/${this.selectedItem.id}`, {
          Course_title: this.form.TitleUpdate,
          Prerequests: this.form.PrerequisitesUpdate,
          Course_description:this.form.DescriptionUpdate,
          Course_objective:this.form.ObjectivesUpdate,
         });
          
            this.snackbarMessage1 =response.data.message;
          this.snackbarColor1 = 'green';
          this.snackbar1 = true;
  
          this.overlayUpdate = false;
          this.fetchData();
  }catch (error) {
          console.error(error);
          this.snackbarMessage1 = error.response.data;
            this.snackbarColor1 = 'red';
            this.snackbar1 = true;
        }
        finally {
          this.loading = false;
        }},
        
        
    confirmDelete(item) {

this.deleteDialog = true;
this.selectedItem=item;
},

    async  deleteItem() {
      
      try{  

        this.loading = true;

        const response = await api.post(`/course/delete/${this.selectedItem.id}`,{});

            this.snackbarMessage1 = response.data;
          this.snackbarColor1 = 'green';
          this.snackbar1 = true;
          this.deleteDialog = false;
          this.fetchData();
  }
         
         catch (error) {
          console.error(error);
          this.snackbarMessage1 = error.response.data;
            this.snackbarColor1 = 'red';
            this.snackbar1 = true;
        }
        finally {
          this.loading = false;
        }},
        

    resetForm() {

      this.$refs.form.reset();
      this.editIndex = null;
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
    
  
  

   
    goBack() {
    this.overlay = false;
    },
  },
  mounted() {
    this.fetchData(); // Fetch data when the component is mounted
  },
};
</script>
