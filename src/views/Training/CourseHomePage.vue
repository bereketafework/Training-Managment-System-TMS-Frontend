<template>
  <div class="w-full">
    <!-- Overlay Section -->
    <div class="flex flex-row">
      <v-overlay
        v-model="overlay"
        persistent
        class="!flex !justify-center items-center"
      >
        <v-card flat class="bg-slate-300">
          <span class="flex justify-center border-b-[1px] text-3xl">
            Course Registration Form
          </span>

          <v-form ref="form" @submit.prevent="courseCreate">
            <v-container fluid class="border-[1px] border-gray-200 !w-[900px]">
              <v-row class="!flex !flex-col !col-span-2">
                <v-col cols="14" sm="10">
                  <v-text-field
                    v-model="form.Title"
                    :rules="rules.Title"
                    color="black darken-2"
                    label="Course Title *"
                    variant="outlined"
                    required
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="14" sm="10">
                  <v-textarea
                    v-model="form.Description"
                    :rules="rules.Description"
                    label="Course Description *"
                    row-height="30"
                    rows="3"
                    variant="outlined"
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
                    variant="outlined"
                    auto-grow
                  >
                  </v-textarea>
                </v-col>
                <v-col cols="14" sm="10">
                  <v-textarea
                    v-model="form.Objectives"
                    :rules="rules.Objectives"
                    label="Course Objectives *"
                    row-height="20"
                    rows="2"
                    variant="outlined"
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
                    :loading="loading"
                  >
                     Register 
                  </v-btn>
                </v-card-actions>
              </v-row>
            </v-container>
          </v-form>
        </v-card>
      </v-overlay>

      <v-overlay
        v-model="overlayUpdate"
        persistent
        class="!flex !justify-center items-center"
      >
        <v-card flat class="bg-slate-300">
          <span class="flex justify-center border-b-[1px] text-3xl">
            Course Data Update Form
          </span>

          <v-form ref="form" @submit.prevent="courseUpdate">
            <v-container fluid class="border-[1px] border-gray-200 !w-[900px]">
              <v-row class="!flex !flex-col !col-span-2">
                <v-col cols="14" sm="10">
                  <v-text-field
                    v-model="form.TitleUpdate"
                    :rules="rules.Title"
                    color="black darken-2"
                    label="Course Title *"
                    variant="outlined"
                    required
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="14" sm="10">
                  <v-textarea
                    v-model="form.DescriptionUpdate"
                    :rules="rules.Description"
                    label="Course Description *"
                    row-height="30"
                    rows="3"
                    variant="outlined"
                    auto-grow
                  >
                  </v-textarea>
                </v-col>
                <v-col cols="14" sm="10">
                  <v-textarea
                    v-model="form.PrerequisitesUpdate"
                    label="Prerequisites     "
                    row-height="20"
                    rows="2"
                    variant="outlined"
                    auto-grow
                  >
                  </v-textarea>
                </v-col>
                <v-col cols="14" sm="10">
                  <v-textarea
                    v-model="form.ObjectivesUpdate"
                     :rules="rules.Objectives"
                    label="Course Objectives  *"
                    row-height="20"
                    rows="2"
                    variant="outlined"
                    auto-grow
                  >
                  </v-textarea>
                </v-col>
                <v-card-actions>
                  <v-btn text @click="gobackUpdate">Back</v-btn>
                  <v-btn text @click="resetForm">Clear</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" type="submit" :loading=loading>
                     Update 
                  </v-btn>
                </v-card-actions>
              </v-row>
            </v-container>
          </v-form>
        </v-card>
      </v-overlay>
    </div>
    <div>
      <div>
        <v-data-table
          :headers="headers"
          :items="CourseList"
          :search="searchQuery"
          density="compact"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-btn
                color="blue"
                prepend-icon="mdi-plus"
                size="large"
                variant="elevated"
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
        <v-btn color="red" text @click="courseDelete"  :loading=loading>
           Delete 
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-snackbar v-model="snackbar1" :color="snackbarColor1">
    {{ snackbarMessage1 }}
  </v-snackbar>
</template>
<script>
import { useCourseStore } from "@/stores/courseStore";
import { mapActions } from "pinia";
export default {
  data: () => ({
    headers: [
      { title: "Course Title", value: "Course_title", sortable: true },
      { title: "Prerequests", value: "Prerequests" },
      { title: "Course Objective", value: "Course_objective" },
      { title: "Actions", value: "actions", sortable: false },
    ],
    CourseList: [],
    selectedItem: null,
    overlayUpdate: false,
    loading: false,
    overlay: false,
    snackbar1: false,
    snackbarColor1: "",
    deleteDialog: false,
    form: {
      Title: "",
      Description: "",
      Prerequisites: " ",
      Objectives: "",
      TitleUpdate: "",
      DescriptionUpdate: "",
      PrerequisitesUpdate: "",
      ObjectivesUpdate: "",
    },
    searchQuery: "",
    rules: {
      Title: [(val) => !!val || "This field is required"],
      Description: [(val) => !!val || "This field is required"],
      Objectives: [(val) => !!val || "This field is required"],
    },
  }),
  computed: {
    formIsValid() {
      return this.form.Title && this.form.Description && this.form.Objectives;
    },
  },
  methods: {
    ...mapActions(useCourseStore, [
      "allCourse",
      "createCourse",
      "updateCourse",
      "deleteCourse",
      "detailsCourse",
    ]),
    courseDetails() {
      this.loading = true;
      this.detailsCourse(this.selectedItem.id)
        .then(() => {})
        .catch((err) => {});
    },
    courseDelete() {
      this.deleteCourse(this.selectedItem.id)
        .then((res) => {
          this.snackbarMessage1 = "Course has Been Deleted Succesfully!";
          this.snackbarColor1 = "green";
          this.snackbar1 = true;
        })
        .catch((err) => {
          this.snackbarMessage1 = err.response.data.error || "Error";
          this.snackbarColor1 = "red";
          this.snackbar1 = true;
        })
        .finally(() => {
          this.loading = false;
          this.course();
          this.deleteDialog = false;
        });
    },
    async courseUpdate() {
   
      const validation = await this.$refs.form.validate();
      if (!validation.valid) {
        this.snackbarMessage1 = "Please fill all required fields correctly.";
        this.snackbarColor1 = "red";
        this.snackbar1 = true;
      
        return;
      }
         this.loading = true;
      this.updateCourse([
        this.selectedItem.id,
        this.form.TitleUpdate,
        this.form.PrerequisitesUpdate,
        this.form.DescriptionUpdate,
        this.form.ObjectivesUpdate,
      ])
        .then((res) => {
          this.snackbarMessage1 = "Course has Been Updated Succesfully!";
          this.snackbarColor1 = "green";
          this.snackbar1 = true;
        })
        .catch((err) => {
          this.snackbarMessage1 = err.response.data.error || "Error";
          this.snackbarColor1 = "red";
          this.snackbar1 = true;
        })
        .finally(() => {
          this.loading = false;   
          this.course();
          this.overlayUpdate = false;
          this.resetForm();
        });
    },
    async courseCreate() {
      
      const validation = await this.$refs.form.validate();
      if (!validation.valid) {
        this.snackbarMessage1 = "Please fill all required fields correctly.";
        this.snackbarColor1 = "red";
        this.snackbar1 = true;
        return;
      }
      this.loading = true;
      this.createCourse([
        this.form.Title,
        this.form.Prerequestes,
        this.form.Description,
        this.form.Objectives,
      ])
        .then((res) => {
          this.snackbarMessage1 = "Course has Been Created Succesfully!";
          this.snackbarColor1 = "green";
          this.snackbar1 = true;
        })
        .catch((err) => {
          this.snackbarMessage1 = err.response.data.error || "Error";
          this.snackbarColor1 = "red";
          this.snackbar1 = true;
        })
        .finally(() => {
          this.loading = false;
          this.course();
          this.overlay = false;
          this.resetForm();
        });
    },
    course() {
      this.allCourse()
        .then((res) => {
          this.CourseList = res.data;
        })
        .catch((err) => {
          this.snackbarMessage1 = err.response.data.error || "Error";
          this.snackbarColor1 = "red";
          this.snackbar1 = true;
        });
    },

    selectItem(item) {
      this.overlayUpdate = true;
      this.selectedItem = item;
      this.form.TitleUpdate = item.Course_title;
      this.form.DescriptionUpdate = item.Course_description;
      this.form.PrerequisitesUpdate = item.Prerequests;
      this.form.ObjectivesUpdate = item.Course_objective;
    },
    confirmDelete(item) {
      this.deleteDialog = true;
      this.selectedItem = item;
    },
    resetForm() {
      this.$refs.form.reset();
    },
    toggleOverlay() {
      this.overlay = true;
    },
    goBack() {
      this.overlay = false;
    },
    gobackUpdate() {
      this.overlayUpdate = false;
    },
  },
  mounted() {
    this.course();
  },
};
</script>
