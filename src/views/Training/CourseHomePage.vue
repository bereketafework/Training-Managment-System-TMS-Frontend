
<template>
  <div class="w-full">
    <!-- Overlay Section -->
    <div class="flex flex-row mt-2">
      <v-overlay
        v-model="overlay"
        persistent
        class="!flex !justify-center items-center"
      >
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
                  <template v-if="loading">
    <v-progress-circular
      indeterminate
      size="20"
      color="primary"
    ></v-progress-circular>
  </template>
  <template v-else>
    Register
  </template>
                  </v-btn>
                </v-card-actions>
              </v-row>
            </v-container>
          </v-form>
        </v-card>
      </v-overlay>

      <v-overlay
        v-model="overlayUpdate"
        class="!flex !justify-center items-center"
      >
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
                  <v-btn text color="primary" type="submit" @click="editItem">
                    <template v-if="loading">
    <v-progress-circular
      indeterminate
      size="20"
      color="primary"
    ></v-progress-circular>
  </template>
  <template v-else>
    Update
  </template>
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
        <v-btn color="red" text @click="deleteItem">
          <template v-if="loading">
    <v-progress-circular
      indeterminate
      size="20"
      color="primary"
    ></v-progress-circular>
  </template>
  <template v-else>
    Delete
  </template>
  </v-btn
        >
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
      { title: "Course Title", value: "Course_title", sortable: true },
      { title: "Prerequests", value: "Prerequests" },
      { title: "Course Objective", value: "Course_objective" },
      { title: "Actions", value: "actions", sortable: false },
    ],
    items: [],
    selectedItem: null,
    overlayUpdate: false,
    loading: false,
    overlay: false,
    filterDialog: false,
    snackbar1: false,
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
      return this.form.Title && this.form.Description && this.form.Objectives;
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
        const token = localStorage.getItem("token"); 

        if (token) {
          try {
            this.loading = true;
            const decodedToken = jwtDecode(token);

            const userId = decodedToken.id;

            const response = await api.post("/course/create", {
              Course_title: this.form.Title,
              Course_description: this.form.Description,
              Course_objective: this.form.Objectives,
              Prerequests: this.form.Prerequisites,
            });

            this.snackbarMessage1 = "Successfully Created ";
            this.snackbarColor1 = "green";
            this.snackbar1 = true;
            this.overlay = null;
            this.fetchData();
          } catch (error) {
            console.error("Error decoding token:", error);
            this.snackbarMessage1 = error.response.data;
            this.snackbarColor1 = "red";
            this.snackbar1 = true;
          }
        } else {
          this.snackbarMessage1 = error.response.data;
          this.snackbarColor1 = "red";
          this.snackbar1 = true;
        }
      } catch (error) {
        console.error(error);
        this.snackbarMessage1 = error.response.data;
        this.snackbarColor1 = "red";
        this.snackbar1 = true;
      } finally {
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
      this.selectedItem = item;
      this.form.TitleUpdate = item.Course_title;
      this.form.DescriptionUpdate = item.Course_description;
      this.form.PrerequisitesUpdate = item.Prerequests;
      this.form.ObjectivesUpdate = item.Course_objective;
    },

    async editItem() {
      try {
        this.loading = true;

        const response = await api.post(
          `/Course/update/${this.selectedItem.id}`,
          {
            Course_title: this.form.TitleUpdate,
            Prerequests: this.form.PrerequisitesUpdate,
            Course_description: this.form.DescriptionUpdate,
            Course_objective: this.form.ObjectivesUpdate,
          },
        );

        this.snackbarMessage1 = response.data.message;
        this.snackbarColor1 = "green";
        this.snackbar1 = true;

        this.overlayUpdate = false;
        this.fetchData();
      } catch (error) {
        console.error(error);
        this.snackbarMessage1 = error.response.data;
        this.snackbarColor1 = "red";
        this.snackbar1 = true;
      } finally {
        this.loading = false;
      }
    },

    confirmDelete(item) {
      this.deleteDialog = true;
      this.selectedItem = item;
    },

    async deleteItem() {
      try {
        this.loading = true;

        const response = await api.post(
          `/course/delete/${this.selectedItem.id}`,
          {},
        );

        this.snackbarMessage1 = response.data;
        this.snackbarColor1 = "green";
        this.snackbar1 = true;
        this.deleteDialog = false;
        this.fetchData();
      } catch (error) {
        console.error(error);
        this.snackbarMessage1 = error.response.data;
        this.snackbarColor1 = "red";
        this.snackbar1 = true;
      } finally {
        this.loading = false;
      }
    },

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
    this.fetchData(); 
  },
};
</script>
