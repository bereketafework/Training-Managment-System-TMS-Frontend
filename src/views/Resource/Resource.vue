<template>
  <div class="flex flex-col w-full h-full">
    <div class="flex ">
      <v-overlay v-model="overlay" persistent class="!flex !justify-center items-center">
        <v-card flat class="bg-slate-300">
          <span class="flex justify-center border-b-[1px] text-3xl p-4"
            >Resource Registration Form</span
          >
          <v-form ref="form" @submit.prevent="resourceCreate" v-model="formValid">
            <v-container fluid class="border-[1px] border-gray-200 !w-[900px]">
              <v-row class="!flex !flex-row">
                <v-col cols="8" sm="4">
                  <v-text-field
                    v-model="form.Name"
                    :rules="rules.required"
                    color="black darken-2"
                    label="Name *"
                    variant="outlined"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="8" sm="4">
                  <v-select
                    clearable
                    chips
                    label="Select Category *"
                    :items="Courses"
                    item-title="Name"
                    item-value="id"
                    variant="outlined"
                    v-model="SelectedCategoryId"
                    :rules="rules.required"
                  ></v-select>
                </v-col>
              </v-row>
              <v-card-actions>
                <v-btn text @click="goBack">Back</v-btn>
                <v-btn text @click="resetForm">Clear</v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  :disabled="!formValid || loading"
                  text
                  color="primary"
                  type="submit"
                >
                  <v-progress-circular
                    v-if="loading"
                    indeterminate
                    size="20"
                  ></v-progress-circular>
                  Register
                </v-btn>
              </v-card-actions>
            </v-container>
          </v-form>
        </v-card>
      </v-overlay>
    </div>
    <div>


      <v-data-table
        :headers="headers"
        :items="resourceList"
        :search="searchQuery"
        density="compact"
        sticky
      >
        <template v-slot:top>
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
            <v-toolbar-title class="flex justify-center items-center !text-4xl">
              List of Resource
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
        </template>
      </v-data-table>
    </div>
    <v-dialog v-model="deleteDialog" max-width="500px">
      <v-card>
        <v-card-title class="headline"
          >Are you sure you want to delete?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="deleteDialog = false">Cancel</v-btn>
          <v-btn color="red" text @click="resourceDelete">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- form for apply updates -->
    <v-overlay
      v-model="overlayUpdate"
      class="!flex !justify-center items-center"
    >
      <v-card flat class="bg-slate-300">
        <span class="flex justify-center border-b-[1px] text-3xl p-4"
          >Resource Update Form</span
        >
        <v-form ref="form" @submit.prevent="resourceUpdate" v-model="formValid">
          <v-container fluid class="border-[1px] border-gray-200 !w-[900px]">
            <v-row class="!flex !flex-row">
              <v-col cols="8" sm="4">
                <v-text-field
                  v-model="form.NameUpdate"
                  :rules="rules.required"
                  color="black darken-2"
                  label="Name"
                   variant="outlined"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="8" sm="4">
                <v-select
                  clearable
                  chips
                  label="Select Category"
                  :items="Courses"
                  item-title="Name"
                  item-value="id"
                   variant="outlined"
                  v-model="SelectedCategoryIdUpdate"
                  :rules="rules.required"
                ></v-select>
              </v-col>
            </v-row>
            <v-card-actions>
              <v-btn text @click="gobackUpdate">Back</v-btn>
              <v-btn text @click="resetForm">Clear</v-btn>
              <v-spacer></v-spacer>
              <v-btn
                :disabled="!formValid"
                text
                color="primary"
                type="submit"

              >
                <v-progress-circular
                  v-if="loading"
                  indeterminate
                  size="20"
                ></v-progress-circular
                >Update</v-btn
              >
            </v-card-actions>
          </v-container>
        </v-form>
      </v-card>
    </v-overlay>
    <v-snackbar v-model="snackbar1" :color="snackbarColor1">
      {{ snackbarMessage1 }}
    </v-snackbar>
  </div>
</template>
<script>
import { jwtDecode } from "jwt-decode";

import api from "@/service/api";
import router from "@/router";
import { mapActions } from 'pinia';
import { useResourceStore } from "@/stores/resourceStore";
export default {
  data() {
    return {
      headers: [
        { title: "Resource", value: "Name" },
        { title: "Category", value: "Category.Name" },

        { title: "Actions", value: "actions", sortable: false },
      ],
      loading: false,
      overlayUpdate: false,
      snackbarMessage1: "",
      snackbarColor1: "",
      snackbar1: false,
      overlay: false,
      snackbar: false,
      snackbarMessage: "",
      snackbarError: false,
      snackbarMessageError: "",
      deleteDialog: false,
      filterDialog: false,
      currentPage: 1,
      itemsPerPage: 10,
      searchQuery: "",
      selectedItem: null,
      formValid: false,
      Courses: [],
      SelectedCategoryId: null,
     SelectedCategoryIdUpdate: null,
      form: {
        Name: "",
        NameUpdate: "",
      },
      rules: {
        required: [(v) => !!v || "This field is required."],
      },
      items: [],
      resourceList:[],
      // Data fetched from the API
    };
  },

  methods: {
    ...mapActions(useResourceStore,(["allResource","createResource","updateResource","deleteResource","detailResource"])),
    resourceDetail(){
      this.detailResource(this.selectedItem.id)
      .then((res)=>{})
      .catch((err)=>{})
    },
    resourceDelete(){
this.deleteResource(this.selectedItem.id)
.then((res)=>{
this.snackbarMessage1="Resource has Been Deleted Succesfully!"
this.snackbarColor1="green"
this.snackbar1=true
})
.catch((err)=>{
this.snackbarMessage1=err.response.data.error||"Error"
this.snackbarColor1="red"
this.snackbar1=true
})
.finally(()=>{
  this.deleteDialog=false
  this.resources()
})
    },
    resourceUpdate(){
      this.updateResource([this.selectedItem.id,this.form.NameUpdate,this.SelectedCategoryIdUpdate])
      .then((res)=>{
        
this.snackbarMessage1="Resource has Been Updated Succesfully!"
this.snackbarColor1="green"
this.snackbar1=true
      })
      .catch((err)=>{
        
this.snackbarMessage1=err.response.data.error||"Error"
this.snackbarColor1="red"
this.snackbar1=true
      })
      .finally(()=>{
  this.overlayUpdate=false
  this.resetForm()
  this.resources()
})
    },
    resourceCreate(){
      this.createResource([this.form.Name,this.SelectedCategoryId])
      .then((res)=>{
this.snackbarMessage1="User has Been Created Succesfully!"
this.snackbarColor1="green"
this.snackbar1=true
      })
      .catch((err)=>{
        
this.snackbarMessage1=err.response.data.error||"Error"
this.snackbarColor1="red"
this.snackbar1=true
      })
      .finally(()=>{
  this.overlay=false
  this.resetForm()
  this.resources()
})
    },
    resources (){
      this.allResource()
      .then((res)=>{
        this.resourceList = res.data
      })
      .catch((err)=>{
        console.error(err)
      })

    },
    gobackUpdate() {
      this.overlayUpdate = false;
    },
    goBack() {
      this.overlay = false;
    },

    async fetchData() {
      try {
        const response = await api.get("/resource/all");

        this.items = response.data;
      } catch (error) {
        console.error(error);
        this.snackbarMessage1 = error.response.data;
        this.snackbarColor1 = "red";
        this.snackbar1 = true;
      }
    },

    async createRole() {
      try {
        const token = localStorage.getItem("token"); // Adjust if your token is stored elsewhere

        if (token) {
          try {
            this.loading = true;

            const response = await api.post("/resource/create", {
              Name: this.form.Category,
              Category_id: this.SelectedCourseId,
            });

            this.snackbarMessage1 = "Successfully Created  ";
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
    async courseData() {
      try {
        const response = await api.get("/category/all");

        this.Courses = response.data;
        console.log(this.SelectedCourseId);
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
    resetForm() {
      this.form = {
        Name: "",
        NameUpdate:""
      };
      this.$refs.form.reset();
      this.editIndex = null;
    },
    submit() {
      if (!this.form.Role) {
        this.snackbarError = true;
        this.snackbarMessageError = "Role is required.";
        return;
      }
      if (this.editIndex !== null) {
        Object.assign(this.items[this.editIndex], this.form);
        this.snackbarMessage = "Training updated successfully!";
      } else {
        this.items.push({ ...this.form });
        this.snackbarMessage = "Training added successfully!";
      }
      this.snackbar = true;
      this.resetForm();
      this.overlay = false;
    },
    selectItem(item) {
      this.overlayUpdate = true;
      this.selectedItem = item;
      this.form.NameUpdate = item.Name;
      this.SelectedCategoryIdUpdate = item.Category_id;
    },

    async editItem() {
      try {
        this.loading = true;
        const response = await api.post(
          `/resource/update/${this.selectedItem.id}`,
          {
            Name: this.form.CategoryUpdate,
            Category_id: this.SelectedCourseIdupdate,
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
      console.log(this.selectedItem.id);
    },
    async deleteItem() {
      if (!this.confirmDelete) return;

      try {
        this.loading = true;
        const response = await api.post(
          `/resource/delete/${this.selectedItem.id}`,
          {},
        );

        this.snackbarMessage1 = "Role Deleted successfully!";
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
  },
  mounted() {
    // this.fetchData(); // Fetch data when the component is mounted
    this.courseData();
    this.resources();

  },
};
</script>
