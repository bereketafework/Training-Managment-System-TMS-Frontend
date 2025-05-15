
<template>
  <div class="flex flex-col w-full h-full">
    <div class="flex mt-2">
      <v-overlay v-model="overlay" persistent class="!flex !justify-center items-center">
        <v-card flat class="bg-slate-300">
          <span class="flex justify-center border-b-[1px] text-3xl p-4"
            >Payment Method Registration Form</span
          >
          <v-form ref="form" @submit.prevent="createRole" v-model="formValid">
            <v-container fluid class="border-[1px] border-gray-200 !w-[900px]">
              <v-row class="!flex !flex-row">
                <v-col cols="8" sm="4">
                  <v-text-field
                    v-model="form.PaymentMethod"
                    :rules="rules.required"
                    color="black darken-2"
                    label="Payment Method *"
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
                  :disabled="!formValid || loading"
                  text
                  color="primary"
                  type="submit"
                  @click="createRole"
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
        :items="items"
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
              List of Payment Method
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
          <v-btn color="red" text @click="deleteItem">Delete</v-btn>
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
          >Payment Method Update Form</span
        >
        <v-form ref="form" @submit.prevent="editItem" v-model="formValid">
          <v-container fluid class="border-[1px] border-gray-200 !w-[900px]">
            <v-row class="!flex !flex-row">
              <v-col cols="8" sm="4">
                <v-text-field
                  v-model="form.PaymentMethodupdate"
                  :rules="rules.required"
                  color="black darken-2"
                  label="Payment Method *"
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
           
                text
                color="primary"
                type="submit"
                @click="editItem"
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
    <!-- Filter Dialog -->
    <v-dialog
      v-model="filterDialog"
      max-width="500px"
      class="!flex !justify-center !items-center"
    >
  </v-dialog>
    <v-snackbar v-model="snackbar1" :color="snackbarColor1">
      {{ snackbarMessage1 }}
    </v-snackbar>
  </div>
</template>
<script>
import { jwtDecode } from "jwt-decode";

import api from "@/service/api";
export default {
  data() {
    return {
      headers: [
        { title: "Payment Methods", value: "Methods" },
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
      deleteIndex: null,
      editIndex: null,
      currentPage: 1,
      itemsPerPage: 10,
      searchQuery: "",
      selectedItem: null,
      formValid: false,
      form: {
        PaymentMethod: "",
        PaymentMethodupdate: "",
      },
      filter: {
        Role: "",
      },
      rules: {
        required: [(v) => !!v || "This field is required."],
      },
      training: [],

      items: [], // Data fetched from the API
    };
  },
  
  methods: {
    goBack() {
      this.overlay = false;
      this.overlayUpdate = false;
    },
    async fetchData() {
      try {
        const response = await api.get("/paymentmethod/all");

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
            

            const response = await api.post("/paymentmethod/create", {
         
              Methods: this.form.PaymentMethod,
            });

            this.snackbarMessage1 = "Payment Method Created successfully!";
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
    toggleForm() {
      this.overlay = !this.overlay;
    },
    resetForm() {
      this.form = {
        Role: "",
      };
      this.$refs.form.reset();
      this.editIndex = null;
    },
    
    selectItem(item) {
      this.overlayUpdate = true;
      this.selectedItem = item;
      this.form.PaymentMethodupdate = item.Methods;
     
    },

    async editItem() {
      try {
            this.loading = true;
            const response = await api.post(
              `/paymentmethod/update/${this.selectedItem.id}`,{
                Methods: this.form.PaymentMethodupdate,
              });
            this.snackbarMessage1 ="Payment Method Updated successfully!";
            this.snackbarColor1 = "green";
            this.snackbar1 = true;
            this.overlayUpdate = false;
            this.fetchData();
          }
       catch (error) {
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
        const token = localStorage.getItem("token"); // Adjust if your token is stored elsewhere

        if (token) {
          try {
            this.loading = true;
            const decodedToken = jwtDecode(token);

            const userId = decodedToken.id;

            const response = await api.post(
              `/paymentmethod/delete/${this.selectedItem.id}`,
              {},
            );

            this.snackbarMessage1 = "Payment Method Deleted successfully!";
            this.snackbarColor1 = "green";
            this.snackbar1 = true;

            this.deleteDialog = false;
            this.fetchData();
          } catch (error) {
            console.error("Error decoding token:", error);
          }
        } else {
          this.snackbarMessage1 = error.request.responseText;
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
  },
  mounted() {
    this.fetchData(); // Fetch data when the component is mounted
  },
};
</script>
