
<template>
  <div>
    <!-- Training Registration Form -->
    <div class="flex flex-row mt-2">
      <v-overlay v-model="overlay" class="!flex !justify-center items-center">
        <v-card flat class="bg-slate-300">
          <v-form ref="form" @submit.prevent="submit" v-model="formValid">
            <v-container fluid class="border-[1px] border-gray-200 !w-[900px]">
              <v-row class="!flex !flex-row">
                <v-col cols="8" sm="4">
                  <v-text-field
                    v-model="form.Title"
                    :rules="rules.required"
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
                    :items="['Online', 'Face to Face']"
                    variant="solo-filled"
                    v-model="form.Mode"
                    :rules="rules.required"
                  ></v-select>
                </v-col>
                <v-col cols="8" sm="4">
                  <v-text-field
                    v-model="form.StartDate"
                    :rules="[rules.required, rules.date]"
                    color="black darken-2"
                    label="Training Start Date"
                    type="date"
                  ></v-text-field>
                </v-col>
                <v-col cols="8" sm="4">
                  <v-text-field
                    v-model="form.EndDate"
                    :rules="[rules.required, rules.date, rules.endDate]"
                    color="black darken-2"
                    label="Training End Date"
                    type="date"
                  ></v-text-field>
                </v-col>
                <v-col cols="8" sm="4">
                  <v-text-field
                    v-model="form.EnrollmentDeadline"
                    :rules="[rules.required, rules.date]"
                    color="black darken-2"
                    label="Enrollment Deadline"
                    type="date"
                  ></v-text-field>
                </v-col>
                <v-col cols="8" sm="4">
                  <v-text-field
                    v-model="form.Price"
                    :rules="[rules.required, rules.numeric]"
                    color="black darken-2"
                    label="Price"
                    type="number"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    clearable
                    chips
                    label="Select Course"
                    :items="Courses"
                    item-title="Course_title"
                    item-value="id"
                    variant="solo-filled"
                    v-model="SelectedCourseId"
                    :rules="rules.required"
                  ></v-select>
                </v-col>
                <v-col cols="8" sm="3">
                  <v-text-field
                    v-model="form.Location"
                    :rules="rules.required"
                    color="black darken-2"
                    label="Training Location"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="6" sm="3">
                  <v-text-field
                    v-model="form.Capacity"
                    :rules="[rules.required, rules.numeric]"
                    color="black darken-2"
                    label="Capacity"
                    type="number"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-card-actions>
                <v-btn text @click="goBack">Back</v-btn>
                <v-btn text @click="resetForm">Clear</v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  :disabled="!formValid"
                  text
                  color="primary"
                  type="submit"
                  @click="createTraining"
                  >Register</v-btn
                >
              </v-card-actions>
            </v-container>
          </v-form>
        </v-card>
      </v-overlay>
    </div>
<!-- Training Update Form -->
<div class="flex flex-row mt-2">
      <v-overlay v-model="overlayUpdate" class="!flex !justify-center items-center">
        <v-card flat class="bg-slate-300">
          <v-form ref="form" @submit.prevent="submit" v-model="formValid">
            <v-container fluid class="border-[1px] border-gray-200 !w-[900px]">
              <v-row class="!flex !flex-row">
                <v-col cols="8" sm="4">
                  <v-text-field
                    v-model="form.TitleUpdate"
                    :rules="rules.required"
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
                    :items="['Online', 'Face to Face']"
                    variant="solo-filled"
                    v-model="form.ModeUpdate"
                    :rules="rules.required"
                  ></v-select>
                </v-col>
                <v-col cols="8" sm="4">
                  <v-text-field
                    v-model="form.StartDateUpdate"
                    :rules="[rules.required, rules.date]"
                    color="black darken-2"
                    label="Training Start Date"
                    type="date"
                  ></v-text-field>
                </v-col>
                <v-col cols="8" sm="4">
                  <v-text-field
                    v-model="form.EndDateUpdate"
                    :rules="[rules.required, rules.date, rules.endDate]"
                    color="black darken-2"
                    label="Training End Date"
                    type="date"
                  ></v-text-field>
                </v-col>
                <v-col cols="8" sm="4">
                  <v-text-field
                    v-model="form.EnrollmentDeadlineUpdate"
                    :rules="[rules.required, rules.date]"
                    color="black darken-2"
                    label="Enrollment Deadline"
                    type="date"
                  ></v-text-field>
                </v-col>
                <v-col cols="8" sm="4">
                  <v-text-field
                    v-model="form.PriceUpdate"
                    :rules="[rules.required, rules.numeric]"
                    color="black darken-2"
                    label="Price"
                    type="number"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    clearable
                    chips
                    label="Select Course"
                    :items="Courses"
                    item-title="Course_title"
                    item-value="id"
                    variant="solo-filled"
                    v-model="SelectedCourseIdUpdate"
                    :rules="rules.required"
                  ></v-select>
                </v-col>
                <v-col cols="8" sm="3">
                  <v-text-field
                    v-model="form.LocationUpdate"
                    :rules="rules.required"
                    color="black darken-2"
                    label="Training Location"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="6" sm="3">
                  <v-text-field
                    v-model="form.CapacityUpdate"
                    :rules="[rules.required, rules.numeric]"
                    color="black darken-2"
                    label="Capacity"
                    type="number"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-card-actions>
                <v-btn text @click="goBack">Back</v-btn>
                <v-btn text @click="resetForm">Clear</v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  :disabled="!formValid"
                  text
                  color="primary"
                  type="submit"
                  @click="editItem"
                  >Update</v-btn
                >
              </v-card-actions>
            </v-container>
          </v-form>
        </v-card>
      </v-overlay>
    </div>
    <!-- Training List -->
    <div>


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

    <!-- <v-snackbar v-model="snackbar1" :color="snackbarColor1">
      {{ snackbarMessage1 }}
    </v-snackbar> -->
  </div>
</template>

<script>
import api from "@/service/api";

export default {
  data: () => ({
    headers: [
      { title: "Training Name", value: "Training_name" },
      { title: "Mode", value: "Training_mode" },
      { title: "Location", value: "Training_location" },
      { title: "Enrolment Deadline", value: "Enrolment_deadline" },
      { title: "Capacity", value: "Capacity" },
      { title: "Price", value: "Cost" },
      { title: "Actions", value: "actions", sortable: false },
    ],
    overlay: false,
    overlayUpdate:false,
    snackbar: false,
   snackbar1 : false,
    snackbarMessageerror: "",
    deleteDialog: false,
    filterDialog: false,
    searchQuery: "",
    formValid: false,
    form: {
      Title: "",
      Mode: "",
      StartDate: "",
      UpdateEndDate: "",
      EnrollmentDeadline: "",
      Price: "",
      Location: "",
      TitleUpdate: "",
      ModeUpdate: "",
      StartDateUpdate: "",
      EndDateUpdate: "",
      EnrollmentDeadlineUpdate: "",
      PriceUpdate: "",
      LocationUpdate: "",
   
    },
    filter: {
      Title: "",
      Mode: "",
      StartDate: "",
      EndDate: "",
    },
    rules: {
      required: [(v) => !!v || "This field is required."],
      date: [(v) => !isNaN(Date.parse(v)) || "Must be a valid date."],
      endDate: [
        (v) =>
          !v ||
          new Date(v) > new Date(this.form.StartDate) ||
          "End Date must be after Start Date.",
        (v) =>
          new Date(v) - new Date(this.form.StartDate) >= 86400000 ||
          "End Date must be at least one day after Start Date ",
      ],
      numeric: [(v) => !isNaN(parseFloat(v)) || "Must be a valid number."],
    },
    desserts: [],
    items: [],
    Courses: [],
    SelectedCourseId: null,
    SelectedCourseIdupdate: null,
  }),
 
  mounted() {
    this.fetchData(); // Fetch data when the component is mounted
    this.courseData();
  },
  methods: {
    confirmDelete(item) {
      this.deleteDialog = true;
this.selectedItem=item;
    },

    async  deleteItem() {
      try{  
        this.loading = true;
        const response = await api.post(`/training/delete/${this.selectedItem.id}`,{});
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
       

    selectItem(item) {

this.overlayUpdate = true;
this.selectedItem=item;
 this.SelectedCourseIdUpdate =item.Course_id
          this.form.TitleUpdate= item.Training_name
          this.form.ModeUpdate=item.Training_mode
         this.form.LocationUpdate= item. Training_location
   this.form.StartDateUpdate=     item.   Training_start_date
          this.form.EndDateUpdate =item.Training_end_date
         this.form.EnrollmentDeadlineUpdate= item. Enrolment_deadline
       this.form.CapacityUpdate=item.    Capacity
           this.form.PriceUpdate=item.Cost
           console.log(this.SelectedCourseIdupdate)
},
async  editItem() {
      try{  
        this.loading = true;
         const response = await api.post(`/training/update/${this.selectedItem.id}`, {
          Course_id: this.SelectedCourseIdUpdate,
          Training_name: this.form.TitleUpdate,
          Training_mode: this.form.ModeUpdate,
          Training_location: this.form.LocationUpdate,
          Training_start_date: this.form.StartDateUpdate,
          Training_end_date: this.form.EndDateUpdate,
          Enrolment_deadline: this.form.EnrollmentDeadlineUpdate,
          Capacity: this.form.CapacityUpdate,
          Cost: this.form.PriceUpdate,
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
            this.overlayUpdate = false;
        }
        finally {
          this.loading = false;
        }},
        
    async courseData() {
      try {
        const response = await api.get("/course/all");

        this.Courses = response.data;
        console.log(this.SelectedCourseId);
      } catch (error) {
        console.error(error);
        this.snackbarMessage1 = error.response.data;
        this.snackbarColor1 = "red";
        this.snackbar1 = true;
      }
    },
       
    async fetchData() {
      try {
        const response = await api.get("/training/all");
        this.items = response.data;
      } catch (error) {
        console.error(error);
        this.snackbarMessage1 = error.response.data;
        this.snackbarColor1 = "red";
        this.snackbar1 = true;
      }
    },

    async createTraining() {
      if (!this.validateDates()) {
        this.snackbarMessageerror =
          "Please ensure all dates are valid and End Date is at least one day after Start Date.";
        this.snackbar = true;
        return;
      }
      try {
        this.loading = true;
        const response = await api.post("/training/create", {
          Course_id: this.SelectedCourseId,
          Training_name: this.form.Title,
          Training_mode: this.form.Mode,
          Training_location: this.form.Location,
          Training_start_date: this.form.StartDate,
          Training_end_date: this.form.EndDate,
          Enrolment_deadline: this.form.EnrollmentDeadline,
          Capacity: this.form.Capacity,
          Cost: this.form.Price,
        });

        this.snackbarMessage1 = "Successfully Created ";
        this.snackbarColor1 = "green";
        this.snackbar1 = true;
        this.overlay = null;
        this.fetchData();
      } catch (error) {
        console.error(error);
        this.snackbarMessage1 = error.response.data;
        this.snackbarColor1 = "red";
        this.snackbar1 = true;
        this.loading = false;
      } finally {
        this.loading = false;
      }
    },

    toggleForm() {
      this.overlay = !this.overlay;
    },
    resetForm() {
      this.form = {
        Title: "",
        Mode: "",
        StartDate: "",
        EndDate: "",
        EnrollmentDeadline: "",
        Price: "",
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
        this.snackbarMessageerror =
          "Please ensure all dates are valid and End Date is at least one day after Start Date.";
        this.snackbar = true;
        return;
      }

      if (this.editIndex !== null) {
        Object.assign(this.desserts[this.editIndex], this.form);
        this.snackbarMessage = "Training updated successfully!";
      } else {
        this.desserts.push({ ...this.form });
        this.snackbarMessage = "Training added successfully!";
      }
      this.snackbar = true;
      // Add a timeout to reset the snackbar state
      setTimeout(() => {
        this.snackbar = false;
      }, 3000);
      this.resetForm();
      this.overlay = false;
    },
  
    
    calculateDaysLeft(date) {
      const diff = new Date(date) - new Date();
      return diff > 0 ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : "Expired";
    },
    formatPrice(price) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
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
        Title: "",
        Mode: "",
        StartDate: "",
        EndDate: "",
      };
      this.searchQuery = "";
    },
  },
};
</script>
