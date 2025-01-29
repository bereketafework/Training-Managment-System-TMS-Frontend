<!-- <template>
  

  <div class="flex flex-row mt-2">
      <!-- Button to toggle overlay 
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
          <span class="flex justify-center border-b-[1px] text-3xl p-4">
            Training Registration Form
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
              <v-row class="!flex !flex-row !row-span-3">
                <v-col cols="8" sm="4">
                  <v-text-field
                    v-model="form.Title"
                    :rules="rules.Titile"
                    color="black darken-2"
                    label="Training Title"
                    required
                  ></v-text-field>

                </v-col>
                <v-col cols="8" sm="4">
                  <v-select
  clearable
  chips
  label="Training Mode"
  :items="['Online', 'Face to Face', ]"
  variant="solo-filled"
></v-select>
                  
                </v-col>
                <v-col cols="8" sm="4">
                  <v-text-field
                    v-model="form.Title"
                    :rules="rules.Titile"
                    color="black darken-2"
                    label="Training Start Date"
                    type="date"
                  ></v-text-field>
                  
                </v-col>
            
                
                <v-col cols="8" sm="4">
                  <v-text-field
                    v-model="form.Title"
                    :rules="rules.Titile"
                    color="black darken-2"
                    label="Training End Date"
                    type="date"
                    
                  ></v-text-field>
                  
                </v-col>
                <v-col cols="8" sm="4">
                  <v-text-field
                    v-model="form.Title"
                    :rules="rules.Titile"
                    color="black darken-2"
                    label="Enrollment Deadline"
                    type="date"
                    value="10/10/1990"
                    readonly
                  ></v-text-field>
                  
                </v-col>
      
                <v-col cols="12" sm="6">
                  <v-select
  clearable
  chips
  label="Select Course"
  :items="['Online', 'Face to Face', ]"
  variant="solo-filled"
></v-select>
                  
                </v-col>
                
               
              
              </v-row>
              <v-card-actions >
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
            </v-container>
          </v-form>
        </v-card>
      </v-overlay>

      <v-spacer></v-spacer>
      <span class="flex justify-center border-b-[1px] text-3xl">
        List of Training
      </span>
      <v-spacer></v-spacer>
      <v-text-field
        
        append-inner-icon="mdi-magnify"
        color="primary"
        density="compact"
        label="Search"
        variant="solo"
        hide-details
        single-line
        @click:append-inner="onClick"
        clearable
         ></v-text-field>
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
            <th class="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in desserts" :key="item.name">
            <td>{{ item.name }}</td>
            <td> ETB  {{ item.price }}</td>
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
      <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ dialogTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-form ref="form" v-model="formValid">
            <v-text-field
              label="Name"
              v-model="form.name"
              :rules="[rules.required]"
            ></v-text-field>

            <v-textarea
              label="Description"
              v-model="form.description"
              :rules="[rules.required]"
            ></v-textarea>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="saveItem">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          class="!text-xs"
        >
        
          <v-list-item-title class="!text-sm" @click="addItem">{{ item.title }}


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
    addItem() {
      this.dialogTitle = 'Add Item';
      this.form.name = '';
      this.form.description = '';
      this.editIndex = null;
      this.dialog = true;
    },
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
    onClick() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 3000);
    },
  },
};
</script>


<style>

</style> -->
<template>
  <div>  <div class="flex flex-row mt-2 ">
    <!-- Button to toggle overlay -->
    <v-btn color="blue" icon="mdi-plus" size="large" variant="text" @click="toggleForm"></v-btn>

    <!-- Overlay with Form -->
    <v-overlay v-model="overlay" class="!flex !justify-center items-center">
      <v-card flat class="bg-slate-300">
        <span class="flex justify-center border-b-[1px] text-3xl p-4">Training Registration Form</span>
        <v-snackbar v-model="snackbar" absolute top right color="success" timeout="3000" @timeout="snackbar = false">
          <span>{{ snackbarMessage }}</span>
          
          <v-icon dark>mdi-checkbox-marked-circle</v-icon>
        </v-snackbar>
        <v-snackbar v-model="snackbar" absolute top right color="red" timeout="3000" @timeout="snackbar = false">
          <span>{{ snackbarMessageerror }}</span>
          
          <v-icon dark> mdi-alert-circle-outline</v-icon>
        </v-snackbar>
        <v-form ref="form" @submit.prevent="submit" v-model="formValid">
          <v-container fluid class="border-[1px] border-gray-200 !w-[900px]">
            <v-row class="!flex !flex-row">
              <v-col cols="8" sm="4">
                <v-text-field v-model="form.Title" :rules="rules.required" color="black darken-2" label="Training Title" required></v-text-field>
              </v-col>
              <v-col cols="8" sm="4">
                <v-select clearable chips label="Training Mode" :items="['Online', 'Face to Face']" variant="solo-filled" v-model="form.Mode" :rules="rules.required"></v-select>
              </v-col>
              <v-col cols="8" sm="4">
                <v-text-field v-model="form.StartDate" :rules="[rules.required, rules.date]" color="black darken-2" label="Training Start Date" type="date"></v-text-field>
              </v-col>
              <v-col cols="8" sm="4">
                <v-text-field v-model="form.EndDate" :rules="[rules.required, rules.date, rules.endDate]" color="black darken-2" label="Training End Date" type="date"></v-text-field>
              </v-col>
              <v-col cols="8" sm="4">
                <v-text-field v-model="form.EnrollmentDeadline" :rules="[rules.required, rules.date]" color="black darken-2" label="Enrollment Deadline" type="date"></v-text-field>
              </v-col>
              <v-col cols="8" sm="4">
                <v-text-field v-model="form.Price" :rules="[rules.required, rules.numeric]" color="black darken-2" label="Price" type="number"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select clearable chips label="Select Course" :items="['Course A', 'Course B']" variant="solo-filled" v-model="form.Course" :rules="rules.required"></v-select>
              </v-col>
            </v-row>
            <v-card-actions>
              <v-btn text @click="goBack">Back</v-btn>
              <v-btn text @click="resetForm">Clear</v-btn>
              <v-spacer></v-spacer>
              <v-btn :disabled="!formValid" text color="primary" type="submit">Register</v-btn>
            </v-card-actions>
          </v-container>
        </v-form>
      </v-card>
    </v-overlay>

    <v-spacer></v-spacer>
    <span class="flex justify-center border-b-[1px] text-3xl">List of Training</span>
    <v-spacer></v-spacer>
    <v-text-field v-model="searchQuery" append-inner-icon="mdi-magnify" color="primary" density="compact" label="Search" variant="solo" hide-details single-line clearable></v-text-field>
    <v-btn icon="mdi-filter-outline" color="Primary" size="large" variant="text" @click="toggleFilterDialog"></v-btn>
  </div>

  <!-- Training List -->
  <div>
    <v-table density="compact">
      <thead>
        <tr>
          <th class="text-left">Training Name</th>
          <th class="text-left">Price</th>
          <th class="text-left">Mode</th>
          <th class="text-left">Start Date</th>
          <th class="text-left">Days Left</th>
          <th class="text-left">Enrollment Deadline</th>
          <th class="text-left">Enrollment Left</th>
          <th class="text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in paginatedDesserts" :key="index">
          <td>{{ item.Title }}</td>
          <td>{{ formatPrice(item.Price) }}</td>
          <td>{{ item.Mode }}</td>
          <td>{{ item.StartDate }}</td>
          <td>{{ calculateDaysLeft(item.StartDate) }}</td>
          <td>{{ item.EnrollmentDeadline }}</td>
          <td>{{ calculateDaysLeft(item.EnrollmentDeadline) }}</td>
          <td>
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" icon="mdi-dots-vertical" variant="text" color="gray-lighten-2"></v-btn>
              </template>
              <v-list>
                <v-list-item @click="editItem(index)">Edit</v-list-item>
                <v-list-item @click="confirmDelete(index)">Delete</v-list-item>
              </v-list>
            </v-menu>
          </td>
        </tr>
      </tbody>
    </v-table>
    <v-pagination v-model="currentPage" :length="Math.ceil(filteredDesserts.length / itemsPerPage)" class="mt-4"></v-pagination>
  </div>

  <!-- Delete Confirmation Dialog -->
  <v-dialog v-model="deleteDialog" max-width="500px">
    <v-card>
      <v-card-title class="headline">Are you sure you want to delete?</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="deleteDialog = false">Cancel</v-btn>
        <v-btn color="red" text @click="deleteItem">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Filter Dialog -->
  <v-dialog v-model="filterDialog" max-width="500px">
    <v-card>
      <v-card-title class="headline">Filter Trainings</v-card-title>
      <v-card-text>
        <v-form ref="filterForm" @submit.prevent="applyFilter">
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field v-model="filter.Title" label="Training Title"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select v-model="filter.Mode" :items="['Online', 'Face to Face']" label="Training Mode"></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="filter.StartDate" label="Start Date" type="date"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="filter.EndDate" label="End Date" type="date"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions>
            <v-btn text @click="clearFilters">Clear Filters</v-btn>
            <v-btn type="submit" text color="primary">Apply Filter</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</div>

</template>

<script>
export default {
  data: () => ({
    overlay: false,
    snackbar: false,
    snackbarMessage: '',
    snackbarMessageerror: '',
    deleteDialog: false,
    filterDialog: false,
    deleteIndex: null,
    editIndex: null,
    currentPage: 1,
    itemsPerPage: 5,
    searchQuery: '',
    formValid: false,
    form: {
      Title: '',
      Mode: '',
      StartDate: '',
      EndDate: '',
      EnrollmentDeadline: '',
      Price: '',
    },
    filter: {
      Title: '',
      Mode: '',
      StartDate: '',
      EndDate: '',
    },    rules: {
      required: [(v) => !!v || 'This field is required.'],
      date: [(v) => !isNaN(Date.parse(v)) || 'Must be a valid date.'],
      endDate: [
        (v) => !v || (new Date(v) > new Date(this.form.StartDate)) || 'End Date must be after Start Date.',
        (v) => new Date(v) - new Date(this.form.StartDate) >= 86400000 || 'End Date must be at least one day after Start Date ',
      ],
      numeric: [(v) => !isNaN(parseFloat(v)) || 'Must be a valid number.'],
    },
    desserts: [],
  }),
  computed: {
    filteredDesserts() {
      let results = this.desserts;
      if (this.searchQuery) {
        results = results.filter((item) =>
          Object.values(item).some((value) =>
            String(value).toLowerCase().includes(this.searchQuery.toLowerCase())
          )
        );
      }
      if (this.filter.Title) {
        results = results.filter(item => item.Title.includes(this.filter.Title));
      }
      if (this.filter.Mode) {
        results = results.filter(item => item.Mode === this.filter.Mode);
      }
      if (this.filter.StartDate) {
        results = results.filter(item => item.StartDate >= this.filter.StartDate);
      }
      if (this.filter.EndDate) {
        results = results.filter(item => item.EndDate <= this.filter.EndDate);
      }
      return results;
    },
    paginatedDesserts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredDesserts.slice(start, start + this.itemsPerPage);
    },
  },
  methods: {
    toggleForm() {
      this.overlay = !this.overlay;
    },
    resetForm() {
      this.form = {
        Title: '',
        Mode: '',
        StartDate: '',
        EndDate: '',
        EnrollmentDeadline: '',
        Price: '',
      };
      this.$refs.form.reset();
      this.editIndex = null;
    },
    validateDates() {
      const { StartDate, EndDate, EnrollmentDeadline } = this.form;
      return (
        StartDate &&
        EndDate &&
        EnrollmentDeadline &&
        new Date(EndDate) > new Date(StartDate) &&
        new Date(EndDate) - new Date(StartDate) >= 86400000
      );
    },
    submit() {
      if (!this.validateDates()) {
        this.snackbarMessageerror = 'Please ensure all dates are valid and End Date is at least one day after Start Date.';
        this.snackbar = true;
        return;
      }

      if (this.editIndex !== null) {
        Object.assign(this.desserts[this.editIndex], this.form);
        this.snackbarMessage = 'Training updated successfully!';
      } else {
        this.desserts.push({ ...this.form });
        this.snackbarMessage = 'Training added successfully!';
      }
      this.snackbar = true;
      // Add a timeout to reset the snackbar state
      setTimeout(() => {
        this.snackbar = false;
      }, 3000);
      this.resetForm();
      this.overlay = false;
    },
    editItem(index) {
      const item = this.desserts[index];
      this.form = { ...item };
      this.overlay = true;
      this.editIndex = index;
    },
    confirmDelete(index) {
      this.deleteIndex = index;
      this.deleteDialog = true;
    },
    deleteItem() {
      this.desserts.splice(this.deleteIndex, 1);
      this.deleteDialog = false;
    },
    calculateDaysLeft(date) {
      const diff = new Date(date) - new Date();
      return diff > 0 ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : 'Expired';
    },
    formatPrice(price) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(price);
    },
    toggleFilterDialog() {
      this.filterDialog = !this.filterDialog;
    },
    applyFilter() {
      this.filterDialog = false;
    },
    clearFilters() {
      this.filter = {
        Title: '',
        Mode: '',
        StartDate: '',
        EndDate: '',
      };
      this.searchQuery = '';
    },
  },
};
</script>
