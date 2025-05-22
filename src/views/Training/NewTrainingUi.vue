<template>
  <div>
    <div class="flex flex-row ">
      <v-overlay v-model="overlay" persistent class="!flex !justify-center items-center w">
        <v-card flat class="bg-slate-300">
          <v-form ref="form" @submit.prevent="trainingCreate" v-model="formValid">
            <span class="flex justify-center border-b-[1px] text-3xl ">Training Registration Form</span>
           
              <v-container fluid  class="border-[1px] border-gray-200 !w-[900px]"  >
              <v-row class="!flex !flex-row">
                <v-col cols="8" sm="4">
                  <v-text-field
                    v-model="form.Title"
                    :rules="rules.required"
                    color="black darken-2"
                    label="Training Title *"
                    required
                    variant="outlined"
                  ></v-text-field>
                </v-col>
                <v-col cols="8" sm="4">
                  <v-select
                    
                    label="Training Mode *"
                    :items="['Online', 'Face to Face']"
           variant="outlined"
                    v-model="form.Mode"
                    :rules="rules.required"
                    
                  ></v-select>
                </v-col>
                <v-col cols="8" sm="4">
                  <v-text-field
                    v-model="form.StartDate"
                    :rules="[dateRules]"
                    color="black darken-2"
                    label="Training Start Date *"
                    type="date"
                    variant="outlined"
                  ></v-text-field>
                </v-col>
                <v-col cols="8" sm="4">
                  <v-text-field
                    v-model="form.EndDate"
                    :rules="[endDateRules]"
                    color="black darken-2"
                    label="Training End Date  *"
                    type="date"
                    variant="outlined"
                  ></v-text-field>
                </v-col>
                <v-col cols="8" sm="4">
                  <v-text-field
                    v-model="form.EnrollmentDeadline"
                    :rules="[enrollmentDeadlineRules]"
                    color="black darken-2"
                    label="Enrollment Deadline *"
                    type="date"
                    variant="outlined"
                  ></v-text-field>
                </v-col>
                <v-col cols="8" sm="4">
                  <v-text-field
                    v-model="form.Price"
                    :rules="[numericRules]"
                    color="black darken-2"
                    label="Price *"
                    type="number"
                    variant="outlined"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                   
                    label="Select Course *"
                    :items="Courses"
                    item-title="Course_title"
                    item-value="id"
               variant="outlined"
                    v-model="SelectedCourseId"
                    :rules="rules.required"
                  ></v-select>
                </v-col>
                <v-col cols="8" sm="3">
                  <v-text-field
                    v-model="form.Location"
                    :rules="rules.required"
                    color="black darken-2"
                    label="Training Location *"
                    required
                    variant="outlined"
                  ></v-text-field>
                </v-col>
                <v-col cols="6" sm="3">
                  <v-text-field
                    v-model="form.Capacity"
                    :rules="[numericRules]"
                    color="black darken-2"
                    label="Capacity   *"
                    type="number"
                    variant="outlined"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-card-actions>
                <v-btn text @click="goBack">Back</v-btn>
                <v-btn text @click="resetForm">Clear</v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  
                  text
                  color="primary"
                  type="submit"   >Register</v-btn
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
          <v-form ref="form" @submit.prevent="trainingUpdate" v-model="formValid">
            <v-container fluid class="border-[1px] border-gray-200 !w-[900px]">
              <v-row class="!flex !flex-row">
                <v-col cols="8" sm="4">
                  <v-text-field
                    v-model="form.TitleUpdate"
                    :rules="rules.required"
                    color="black darken-2"
                    label="Training Title *"
                    required
                    variant="outlined"
                  ></v-text-field>
                </v-col>
                <v-col cols="8" sm="4">
                  <v-select
                  
                    label="Training Mode *"
                    :items="['Online', 'Face to Face']"
                    variant="outlined"
                    v-model="form.ModeUpdate"
                    :rules="rules.required"
                  ></v-select>
                </v-col>
                <v-col cols="8" sm="4">
                  <v-text-field
                    v-model="form.StartDateUpdate"
                    :rules="[dateRules]"
                    color="black darken-2"
                    label="Training Start Date *"
                    type="date"
                    variant="outlined"
                  ></v-text-field>
                </v-col>
                <v-col cols="8" sm="4">
                  <v-text-field
                    v-model="form.EndDateUpdate"
                     :rules="[endDateRules]"
                    color="black darken-2"
                    label="Training End Date *"
                    type="date"
                    variant="outlined"
                  ></v-text-field>
                </v-col>
                <v-col cols="8" sm="4">
                  <v-text-field
                    v-model="form.EnrollmentDeadlineUpdate"
                      :rules="[enrollmentDeadlineRules]"
                    color="black darken-2"
                    label="Enrollment Deadline *"
                    type="date"
                    variant="outlined"
                  ></v-text-field>
                </v-col>
                <v-col cols="8" sm="4">
                  <v-text-field
                    v-model="form.PriceUpdate"
                 :rules="[numericRules]"
                    color="black darken-2"
                    label="Price *"
                    type="number"
                    variant="outlined"
                  ></v-text-field>
                </v-col>
                <!-- <v-col cols="12" sm="6">
                  <v-select
                    label="Select Course  *"
                    :items="Courses"
                    item-title="Course_title"
                    item-value="id"
                   variant="outlined"
                    v-model="SelectedCourseIdUpdate"
                    :rules="rules.required"
                  ></v-select>
                </v-col> -->
                <v-col cols="8" sm="3">
                  <v-text-field
                    v-model="form.LocationUpdate"
                    :rules="rules.required"
                    color="black darken-2"
                    label="Training Location *"
                    required
                    variant="outlined"
                  ></v-text-field>
                </v-col>
                <v-col cols="6" sm="3">
                  <v-text-field
                    v-model="form.CapacityUpdate"
                   :rules="[numericRules]"
                    color="black darken-2"
                    label="Capacity *"
                    type="number"
                    variant="outlined"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-card-actions>
                <v-btn text @click="goBack">Back</v-btn>
                <v-btn text @click="resetForm">Clear</v-btn>
                <v-spacer></v-spacer>
                <v-btn
                 
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
<v-toolbar flat>
            <v-btn
            color="blue"
              prepend-icon="mdi-plus"
              size="large"
              variant="elevated"
              @click="toggleForm"
            >
              Create</v-btn
            >
            <v-toolbar-title class=" md:flex hidden justify-center items-center !text-4xl">
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
          
          </v-toolbar>

  <div class="!flex mt-3 w-full h-full">
    
   <v-row>
      <v-col
 v-for="(training,id) in allTrainings" :key="id"
        cols="12"
        md="6"
        lg="4"
      >
        <v-card
       
          color="grey-lighten-5"
          class="h-full w-full flex flex-col border-2 border-gray-200  "
          :elevation="2"
          hover
        >
          <v-card-item>
            <div class="d-flex justify-space-between align-start mb-2">
              <v-card-title>{{ training.Training_name }} </v-card-title>
              <v-chip
          :color="training.Training_mode == 'Online' ? 'green' : 'blue'"
                size="small"
                class="text-capitalize"
              >
                 {{ training.Training_mode}}
              </v-chip>
            
            </div>
            
            <v-card-text>
              <p class="mb-4 text-body-1"> {{ training.Courses.Course_description }} </p>

              <div class="d-flex align-center mb-2">
                <v-icon size="small" class="mr-2">mdi-clock-outline</v-icon>
                <span class="text-body-2">
                  Duration: {{ training.durationInDays }} days 
                </span>
              </div>

              <div class="d-flex align-center mb-2">
                <v-icon size="small" class="mr-2">mdi-calendar</v-icon>
                <span class="text-body-2">
                  Starts: {{ training.Training_start_date }}
                </span>
              </div>

              <div class="d-flex align-center mb-4">
                <v-icon size="small" class="mr-2">mdi-map-marker-radius-outline</v-icon>
                <span class="text-body-2">
                 {{ training.Training_location }}
                </span>
              </div>
              
           
            </v-card-text>
          </v-card-item>

          <v-card-actions>
         
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
              <v-list-item @click="selectItem(training)">Edit</v-list-item>
              <v-list-item @click="confirmDelete(training)">Delete</v-list-item>
            </v-list>
          </v-menu>
       
            <v-spacer></v-spacer>
            <v-btn
              variant="text"
              color="primary"
              @click="trainingDetails(training)"
            >
              View Details
              <v-icon end>mdi-eye</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="deleteDialog" max-width="500px">
      <v-card>
        <v-card-title class="headline"
          >Are you sure you want to delete?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="deleteDialog = false">Cancel</v-btn>
          <v-btn color="red" text @click="trainingDelete">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
   
    
    <v-snackbar v-model="snackbar1" :color="snackbarColor1">
      {{ snackbarMessage1 }}
    </v-snackbar>
  </div>
</div>
</template>

<script>
import api from "@/service/api";
import Cards from '@/components/Cards.vue';
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useTrainingStore } from "@/stores/TrainingStore";
import { mapActions } from "pinia";
dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault("Africa/Nairobi");

export default {
  components: { Cards },
  data: () => ({
    rules: {
      required: [(v) => !!v || "This field is required."],   },
    formValid: false,
    items: [],
    allTrainings:[],
    overlay: false,
    overlayUpdate:false,
    snackbar: false,
   snackbar1 : false,
    snackbarMessage1: "",
    snackbarColor1: "",
    selectedItem: null,
    deleteDialog: false,
    Courses: [],
    SelectedCourseId: null,
    SelectedCourseIdupdate: null,
    searchQuery: "",
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
    session: [],
    drawers: false,
  }),
 computed: {
  numericRules() {
      return (v) => {
        if (!v) return "This field is required";
        if (!/^\d+$/.test(v)) return "Only numeric values allowed";
        return true;
      };
    },
    dateRules() {
      return (v)=> {
        if (!v) return "This field is required";
        if (isNaN(Date.parse(v))) return "Must be a valid date.";
        if (new Date(v) < new Date()) return "Date must be in the future.";
        return true;
      };
    },
    endDateRules() {
      return (v) => {
        if (!v) return "This field is required";
        if (isNaN(Date.parse(v))) return "Must be a valid date.";
        if (new Date(v) <= new Date(this.form.StartDate)) return "End Date must be after Start Date.";
        if (new Date(v) - new Date(this.form.StartDate) < 86400000) return "End Date must be at least one day after Start Date.";
        return true;
      };
    },
    enrollmentDeadlineRules() {
      return (v) => {
        if (!v) return "This field is required";
        if (isNaN(Date.parse(v))) return "Must be a valid date.";
        if (new Date(v) < new Date()) return "Enrollment Deadline must be in the future.";
        if (new Date(v) >= new Date(this.form.StartDate)) return "Enrollment Deadline must be before Start Date.";
        return true;
      };
    }
  },
  mounted() {
this.fetchedTraining();
    this.fetchData(); // Fetch data when the component is mounted
  this.fetchSession();
  this.courseData();
  },
  methods: {
    validateForm() {
      return this.$refs.form.validate();
    },
    goBack() {
      this.overlay = false;
    },

    resetForm() {
  
      this.$refs.form.reset();
      this.editIndex = null;
    },
    async courseData() {
      try {
        const response = await api.get("/course/all");
        this.Courses = response.data;
      } catch (error) {
        console.error(error);
        this.snackbarMessage1 = error.response.data;
        this.snackbarColor1 = "red";
        this.snackbar1 = true;
      }
    },
       
    toggleForm() {
      this.overlay = !this.overlay;
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

    selectItem(item) {
this.overlayUpdate = true;
this.selectedItem=item;
 this.SelectedCourseIdUpdate =item.Course_id
          this.form.TitleUpdate= item.Training_name
          this.form.ModeUpdate=item.Training_mode
         this.form.LocationUpdate= item.Training_location
   this.form.StartDateUpdate=     item.Training_start_date
          this.form.EndDateUpdate =item.Training_end_date
         this.form.EnrollmentDeadlineUpdate= item.Enrolment_deadline
       this.form.CapacityUpdate=item.Capacity
           this.form.PriceUpdate=item.Cost
           
},
// async  editItem() {
//       try{  
//         this.loading = true;
//          const response = await api.post(`/training/update/${this.selectedItem.id}`, {
//           Course_id: this.SelectedCourseIdUpdate,
//           Training_name: this.form.TitleUpdate,
//           Training_mode: this.form.ModeUpdate,
//           Training_location: this.form.LocationUpdate,
//           Training_start_date: this.form.StartDateUpdate,
//           Training_end_date: this.form.EndDateUpdate,
//           Enrolment_deadline: this.form.EnrollmentDeadlineUpdate,
//           Capacity: this.form.CapacityUpdate,
//           Cost: this.form.PriceUpdate,
//          });
          
//           this.snackbarMessage1 =" Training Updated Successfully";
//           this.snackbarColor1 = 'green';
//           this.snackbar1 = true;
//           this.overlayUpdate = false;
//           this.fetchData();

//   }catch (error) {
//           console.error(error);
//           this.snackbarMessage1 = error.response.data;
//             this.snackbarColor1 = 'red';
//             this.snackbar1 = true;
//             this.overlayUpdate = false;
//         }
//         finally {
//           this.loading = false;
//         }},
    confirmDelete(item) {
      this.deleteDialog = true;
this.selectedItem=item;

    },
  //   async  deleteItem() {
  //     try{  
  //       this.loading = true;
  //       const response = await api.post(`/training/delete/${this.selectedItem.id}`,{});
  //           this.snackbarMessage1 = "Training Deleted Successfully";
  //         this.snackbarColor1 = 'green';
  //         this.snackbar1 = true;
  //         this.deleteDialog = false;
  //         this.fetchData();
  // }

  //        catch (error) {
  //         console.error(error);
  //         this.snackbarMessage1 = error.response.data;
  //           this.snackbarColor1 = 'red';
  //           this.snackbar1 = true;
  //       }
  //       finally {
  //         this.loading = false;
  //       }},
       

    async fetchData() {
      try {
        const response = await api.get("/training/all");
        this.items = response.data;

        // Iterate over each item to calculate durations
        this.allTrainings = this.allTrainings.map((item) => {
          const startDate = dayjs(item.Training_start_date).tz("Africa/Nairobi");
          const endDate = dayjs(item.Training_end_date).tz("Africa/Nairobi");

          // Calculate duration in days and hours
          const durationInDays = endDate.diff(startDate, "days");
          // const durationInHours = endDate.diff(startDate, "hours") % 24;

          // Add calculated durations to the item
          return {
            ...item,
            durationInDays,
            // durationInHours,
          };
        });

      } catch (error) {
        console.error(error);
        this.snackbarMessage1 = error.response?.data || "An error occurred";
        this.snackbarColor1 = "red";
        this.snackbar1 = true;
      }
    },
    async fetchSession() {
      try {
        const response = await api.get("/session/all");
        this.session = response.data;
      } catch (error) {
        console.error(error);
        this.snackbarMessage1 = error.response.data;
        this.snackbarColor1 = "red";
        this.snackbar1 = true;
        console.log(item.id)
      }
    },
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
      
...mapActions(useTrainingStore,  ["createTraining","allTraining","updateTraining","deleteTraining","selectedTrainingDetail"]),
trainingDetails(item) {
    this.selectedTrainingDetail(item.id)
      .then((response) => {
        console.log(response)
         this.$router.push({ 
      name: 'TrainingDetails', 
      params: { id: item.id } // Now 'item' is defined
    });
      })
      .catch((error) => {
        console.log(error)
      })
  },
fetchedTraining(){
  this.allTraining()
.then((response)=>{
this.allTrainings= response.data
  console.log(response.data)
})
  .catch((error)=>{
    console.log("Error:",error)
  })
},

trainingDelete(){
this.deleteTraining(this.selectedItem.id)
.then((response)=>{
          this.snackbarMessage1 = "Training Deleted Successfully"
      this.snackbarColor1 = "green";
      this.snackbar1 = true;

})
.catch((error)=>{
})
.finally(()=>{
this.fetchedTraining()
this.deleteDialog=false
})
},

trainingCreate(){
   if (!this.validateDates()) {
        this.snackbarMessage1 =
          "Please ensure all data are Correct.";
        this.snackbar = true;
        return;
      }
     this.createTraining([
       this.form.Title,
        this.form.Mode,
       this.form.Location,
          this.form.StartDate,
  this.form.EndDate,
       this.form.EnrollmentDeadline,
         this.form.Capacity,
          this.form.Price,
          this.SelectedCourseId,
 ] )
      .then((res)=>{
          this.snackbarMessage1 = "Category Created Successfully"
      this.snackbarColor1 = "green";
      this.snackbar1 = true;
this.overlay = null;
      })
      .catch((error)=>{
         this.snackbarMessage1 = error.response.data.error
      this.snackbarColor1 = "red";
      this.snackbar1 = true;
        console.log("error",error)
      })
      .finally(()=>{
this.fetchedTraining()
this.overlay=false
})
},


trainingUpdate(){
     this.updateTraining([
    this.selectedItem.id,
         this.form.TitleUpdate,
         this.form.ModeUpdate,
      this.form.LocationUpdate,
          this.form.StartDateUpdate,
          this.form.EndDateUpdate,
      this.form.EnrollmentDeadlineUpdate,
         this.form.CapacityUpdate,
        this.form.PriceUpdate,
        this.SelectedCourseIdUpdate,
 ])
      .then((response)=>{
          this.snackbarMessage1 = "Category Update Successfully"
      this.snackbarColor1 = "green";
      this.snackbar1 = true;
this.overlay = null;

console.log(response)
      })
      .catch((error)=>{
         this.snackbarMessage1 = error.response.data.error
      this.snackbarColor1 = "red";
      this.snackbar1 = true;
        console.log("error",error)
      })
      .finally(()=> {
this.overlayUpdate=false
this.fetchedTraining()
    })
},
    // async createTraining() {
    //   if (!this.validateDates()) {
    //     this.snackbarMessageerror =
    //       "Please ensure all dates are valid and End Date is at least one day after Start Date.";
    //     this.snackbar = true;
    //     return;
    //   }
    //   try {
    //     this.loading = true;
    //     const response = await api.post("/training/create", {
    //       Course_id: this.SelectedCourseId,
    //       Training_name: this.form.Title,
    //       Training_mode: this.form.Mode,
    //       Training_location: this.form.Location,
    //       Training_start_date: this.form.StartDate,
    //       Training_end_date: this.form.EndDate,
    //       Enrolment_deadline: this.form.EnrollmentDeadline,
    //       Capacity: this.form.Capacity,
    //       Cost: this.form.Price,
    //     });

    //     this.snackbarMessage1 = "Tarining Successfully Created ";
    //     this.snackbarColor1 = "green";
    //     this.snackbar1 = true;
    //     this.overlay = null;
    //     this.fetchData();
    //   } catch (error) {
    //     console.error(error);
    //     this.snackbarMessage1 = error.response.data;
    //     this.snackbarColor1 = "red";
    //     this.snackbar1 = true;
    //     this.loading = false;
    //   } finally {
    //     this.loading = false;
    //   }
    // },
    async itemDetails(item) { // Add parameter here

    this.$router.push({ 
      name: 'TrainingDetails', 
      params: { id: item.id } // Now 'item' is defined
    });
  }
  },
};
</script>

