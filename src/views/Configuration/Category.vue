<template>
  <div class="flex flex-col w-full h-full">
    <div class="flex mt-2">
      <v-overlay
        v-model="overlay"
        persistent
        class="!flex !justify-center items-center"
      >
        <v-card flat class="bg-slate-300">
          <span class="flex justify-center border-b-[1px] text-3xl p-4"
            >Category Registration Form</span
          >
          <v-form
            ref="form"
            @submit.prevent="CreateCategory"
            v-model="formValid"
          >
            <v-container fluid class="border-[1px] border-gray-200 !w-[900px]">
              <v-row class="!flex !flex-row">
                <v-col cols="8" sm="4">
                  <v-text-field
                    v-model="form.Category"
                    :rules="rules.required"
                    color="black darken-2"
                    label="Category Name *"
                    variant="outlined"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-card-actions>
                <v-btn text @click="goBack">Back</v-btn>
                <v-btn text @click="resetForm">Clear</v-btn>
                <v-spacer></v-spacer>
                <v-btn
                 :loading="loading"
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
    </div>
    <div>
      <v-data-table
        :headers="headers"
        :items="Categories"
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
              List of Category
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
          <v-btn color="red" text @click="DeleteCategory" :loading="loading">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- form for apply updates -->
    <v-overlay
      v-model="overlayUpdate"
      class="!flex !justify-center items-center"
      persistent
    >
      <v-card flat class="bg-slate-300">
        <span class="flex justify-center border-b-[1px] text-3xl p-4"
          >Category Update Form</span
        >
        <v-form ref="form" @submit.prevent="UpdateCategory" v-model="formValid">
          <v-container fluid class="border-[1px] border-gray-200 !w-[900px]">
            <v-row class="!flex !flex-row">
              <v-col cols="8" sm="4">
                <v-text-field
                  v-model="form.CategoryUpdate"
                  :rules="rules.required"
                  color="black darken-2"
                  label="Category Name *"
                  variant="outlined"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-card-actions>
              <v-btn text @click="goBack">Back</v-btn>
              <v-btn text @click="resetForm">Clear</v-btn>
              <v-spacer></v-spacer>
              <v-btn  text color="primary" type="submit" :loading="loading" >
              Update</v-btn
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
import { mapActions } from "pinia";
import { useCategoryStore } from "@/stores/categoryStore";

export default {
  data() {
    return {
      headers: [
        { title: "Category", value: "Name" },
        { title: "Actions", value: "actions", sortable: false },
      ],
      Categories: [],
      loading: false,
      overlayUpdate: false,
      snackbarMessage1: "",
      snackbarColor1: "",
      snackbar1: false,
      overlay: false,
      snackbarMessageError: "",
      deleteDialog: false,
      searchQuery: "",
      selectedItem: null,
      formValid: false,

      form: {
        Category: "",
        CategoryUpdate: "",
      },
      rules: {
        required: [(v) => !!v || "This field is required."],
      },
    };
  },

  methods: {
    ...mapActions(useCategoryStore, [
      "createCategory",
      "updateCategories",
      "deleteCategory",
      "fetchCategories",
    ]),
    Category() {
      this.fetchCategories()
        .then((response) => {
          this.Categories = response.data;
        })

        .catch((error) => {
          console.log("error:", error);
        });
    },
  async CreateCategory() {
      const validation = await this.$refs.form.validate();
      if (!validation.valid) {
        this.snackbarMessage1 = "Please fill all required fields correctly.";
        this.snackbarColor1 = "red";
        this.snackbar1 = true;
        return;
      }
      this.loading = true;
      this.createCategory(this.form.Category)

        .then((res) => {
          this.snackbarMessage1 = "Category Has Been Created Successfully";
          this.snackbarColor1 = "green";
          this.snackbar1 = true;
          console.log(res);
        })
        .catch((err) => {
          this.snackbarMessage1 = err.response.data.error;
          this.snackbarColor1 = "red";
          this.snackbar1 = true;
          console.log(":::: ", err.response.data.error);
        })
        .finally(() => {
          this.loading = false;
          this.Category();
          this.overlay = null;
          this.form.Category = null;
        });
    },
   async UpdateCategory() {
      const validation = await this.$refs.form.validate();
      if (!validation.valid) {
        this.snackbarMessage1 = "Please fill all required fields correctly.";
        this.snackbarColor1 = "red";
        this.snackbar1 = true;
        return;
      }
      this.loading = true;
      this.updateCategories([this.form.CategoryUpdate, this.selectedItem.id])
        .then((response) => {
          this.snackbarMessage1 = "Category Has Been updated successfully!";
          this.snackbarColor1 = "green";
          this.snackbar1 = true;
          this.overlayUpdate = false;
          this.Category(); // Refresh the category list
        })
        .catch((error) => {
          this.snackbarMessage1 =
            error.response?.data || "Error updating category.";
          this.snackbarColor1 = "red";
          this.snackbar1 = true;
        })
        .finally(() => {
          this.loading = false;
          this.overlay = null;
        });
    },

    DeleteCategory() {
      this.loading = true;
      this.deleteCategory(this.selectedItem.id)
        .then((res) => {
          this.snackbarMessage1 = "Category Has Been Deleted successfully!";
          this.snackbarColor1 = "green";
          this.snackbar1 = true;
          this.deleteDialog = false;
        })
        .catch((error) => {
          console.error(error);
          this.snackbarMessage1 = error.response;
          this.snackbarColor1 = "red";
          this.snackbar1 = true;
        })
        .finally(() => {
          this.loading = false;
          this.Category();
        });
    },
    goBack() {
      this.overlay = false;
      this.overlayUpdate = false;
    },
    toggleForm() {
      this.overlay = !this.overlay;
    },
    resetForm() {
      this.form = {
        Role: "",
      };
      this.$refs.form.reset();
    },

    selectItem(item) {
      this.overlayUpdate = true;
      this.selectedItem = item;
      this.form.CategoryUpdate = item.Name;
    },

    confirmDelete(item) {
      this.deleteDialog = true;
      this.selectedItem = item;
      console.log(this.selectedItem.id);
    },
  },
  mounted() {
    this.Category();
  },
};
</script>
