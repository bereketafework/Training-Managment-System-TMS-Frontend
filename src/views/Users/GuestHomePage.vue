<template>
  <div class="w-full">
  <div class="flex flex-row mt-2">
    <!-- Button to toggle overlay -->
    <!-- <v-btn color="blue" icon="mdi-plus" size="large" variant="text" @click="toggleForm"></v-btn> -->

    <!-- Table Title Centered
    <v-spacer></v-spacer>
    <span class="flex justify-center border-b-[1px] text-3xl">List of Guests</span>
    <v-spacer></v-spacer>

    <v-text-field v-model="searchQuery" append-inner-icon="mdi-magnify" color="primary" density="compact" label="Search" variant="solo" hide-details single-line clearable></v-text-field>
    <v-btn icon="mdi-filter-outline" color="Primary" size="large" variant="text" @click="toggleFilterDialog"></v-btn> -->
  </div>

  <!-- Overlay with Form -->
  <v-overlay v-model="overlay" persistent class="!flex !justify-center items-center">
    <v-card flat class="bg-slate-300">
      <span class="flex justify-center border-b-[1px] text-3xl p-4">Participant Registration Form</span>
      <v-form ref="form" @submit.prevent="createGuest" v-model="formValid">
        <v-container fluid class="border-[1px] border-gray-200 !w-[900px]">
          <v-row class="!flex !flex-row">
            <v-col cols="8" sm="4">
              <v-text-field v-model="form.first_name" :rules="rules.required" color="black darken-2" label="First Name" required></v-text-field>
            </v-col>
            <v-col cols="8" sm="4">
              <v-text-field v-model="form.middle_name" :rules="rules.required" color="black darken-2" label="Middle Name" required></v-text-field>
            </v-col>
            <v-col cols="8" sm="4">
              <v-text-field v-model="form.last_name" :rules="rules.required" color="black darken-2" label="Last Name" required></v-text-field>
            </v-col>
            <v-col cols="8" sm="4">
              <v-text-field v-model="form.qualification" color="black darken-2" label="Qualification"></v-text-field>
            </v-col>
            <v-col cols="8" sm="4">
              <v-text-field v-model="form.phone" :rules="[rules.required, rules.numeric]" color="black darken-2" label="Phone" type="number"></v-text-field>
              </v-col>
            
            </v-row>
          </v-container>
          <v-card-actions>
            <v-btn text @click="goBack">Back</v-btn>
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
                  >Register</v-btn
                >
          </v-card-actions>
        </v-form>
      </v-card>
    </v-overlay>

    <v-overlay v-model="overlayUpdate"  class="!flex !justify-center items-center">
    <v-card flat class="bg-slate-300">
      <span class="flex justify-center border-b-[1px] text-3xl p-4">Participant Registration Form</span>
      <v-form ref="form" @submit.prevent="editItem" v-model="formValid">
        <v-container fluid class="border-[1px] border-gray-200 !w-[900px]">
          <v-row class="!flex !flex-row">
            <v-col cols="8" sm="4">
              <v-text-field v-model="form.first_nameUpdate" :rules="rules.required" color="black darken-2" label="First Name" required></v-text-field>
            </v-col>
            <v-col cols="8" sm="4">
              <v-text-field v-model="form.middle_nameUpdate" :rules="rules.required" color="black darken-2" label="Middle Name" required></v-text-field>
            </v-col>
            <v-col cols="8" sm="4">
              <v-text-field v-model="form.last_nameUpdate" :rules="rules.required" color="black darken-2" label="Last Name" required></v-text-field>
            </v-col>
            <v-col cols="8" sm="4">
              <v-text-field v-model="form.qualificationUpdate" color="black darken-2" label="Qualification"></v-text-field>
            </v-col>
            <v-col cols="8" sm="4">
              <v-text-field v-model="form.phoneUpdate" :rules="[rules.required, rules.numeric]" color="black darken-2" label="Phone" type="number"></v-text-field>
              </v-col>
             
            </v-row>
          </v-container>
          <v-card-actions>
            <v-btn text @click="goBack">Back</v-btn>
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
        </v-form>
      </v-card>
    </v-overlay>

    <!-- Participants List -->
    <!-- <v-table density="compact">
      <thead>
        <tr>
          <th class="text-left">First Name</th>
          <th class="text-left">Middle Name</th>
          <th class="text-left">Last Name</th>
          <th class="text-left">Qualification</th>
          <th class="text-left">Phone</th>
          <th class="text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in paginatedParticipants" :key="index">
          <td>{{ item.first_name }}</td>
          <td>{{ item.middle_name }}</td>
          <td>{{ item.last_name }}</td>
          <td>{{ item.qualification }}</td>
          <td>{{ item.phone }}</td>
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
    <v-pagination v-model="currentPage" :length="Math.ceil(filteredParticipants.length / itemsPerPage)" class="mt-4"></v-pagination>
   -->
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
              variant="outlined"
              @click="toggleForm"
            >
              Create</v-btn
            >
            <v-toolbar-title class="flex justify-center items-center !text-4xl">
              List of Guests
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
      <v-card-title class="headline">Are you sure you want to delete?</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="deleteDialog = false">Cancel</v-btn>
        <v-btn color="red" text @click="deleteItem">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-snackbar v-model="snackbar1" :color="snackbarColor1">
      {{ snackbarMessage1 }}
    </v-snackbar>
</div>
</template>
<script>
import api from "@/service/api";
export default {
  data: () => ({
    overlay: false,
    overlayUpdate: false,
    snackbar: false,
    snackbarMessage: '',
    snackbarError: false,
    snackbarMessageError: '',
    deleteDialog: false,
    filterDialog: false,
    deleteIndex: null,
    editIndex: null,
    currentPage: 1,
    itemsPerPage: 5,
    searchQuery: '',
    formValid: false,
    form: {
      first_name: '',
      middle_name: '',
      last_name: '',
      qualification: '',
      phone: '',
      first_nameUpdate: '',
      middle_nameUpdate: '',
      last_nameUpdate: '',
      qualificationUpdate: '',
      phoneUpdate: '',
    },
    filter: {
      qualification: '',
    },
    rules: {
      required: [(v) => !!v || 'This field is required.'],
      email: [(v) => /.+@.+\..+/.test(v) || 'Must be a valid email.'],
      numeric: [(v) => !isNaN(parseFloat(v)) || 'Must be a valid number.'],
    },
    headers: [
      { title: "First Name", value: "First_name" },
      { title: "Middle Name", value: "Middle_name" },
      { title: "Last name", value: "Last_name" },
      { title: "Qualification", value: "Qualification" },
      { title: "Phone", value: "Phone" },
      { title: "Actions", value: "actions", sortable: false },
    ],
    items: [],
    Courses: [],
    SelectedCourseId: null,
    SelectedCourseIdupdate: null,
  }),
  computed: {
    filteredParticipants() {
      let results = this.participants;
      if (this.searchQuery) {
        results = results.filter((item) =>
          Object.values(item).some((value) =>
            String(value).toLowerCase().includes(this.searchQuery.toLowerCase())
          )
        );
      }
      if (this.filter.qualification) {
        results = results.filter(item => item.qualification.toLowerCase().includes(this.filter.qualification.toLowerCase()));
      }
      return results;
    },
    paginatedParticipants() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredParticipants.slice(start, end);
    },
  },
  mounted() {
    this.fetchData(); // Fetch data when the component is mounted
    this.courseData();
  },
  methods: {

    confirmDelete(item) {
      this.deleteDialog = true;
      this.selectedItem = item;
    },
    async deleteItem() {
      if (!this.confirmDelete) return;

      try {
        this.loading = true;
        const response = await api.post(
          `/guest/delete/${this.selectedItem.id}`,
          {},
        );
        this.snackbarMessage1 = "Guest Deleted successfully!";
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
    
    selectItem(item) {
      this.overlayUpdate = true;
      this.selectedItem = item;
      this.SelectedCourseIdUpdate = item.Session_id;
      this.form.first_nameUpdate = item.First_name;
      this.form.middle_nameUpdate = item.Middle_name;
      this.form.last_nameUpdate = item.Last_name;
      this.form.qualificationUpdate = item.Qualification;
      this.form.phoneUpdate = item.Phone;
    },

    async editItem() {
      try {
        this.loading = true;
        const response = await api.post(
          `/guest/update/${this.selectedItem.id}`,
          {
            First_name: this.form.first_nameUpdate,
            Middle_name: this.form.middle_nameUpdate,
            Last_name: this.form.last_nameUpdate,
            Email: this.form.emailUpdate,
            Phone: this.form.phoneUpdate,
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


    async createGuest() {
      try {
        this.loading = true;
        const response = await api.post("/guest/create", {
          First_name: this.form.first_name,
          Middle_name: this.form.middle_name,
          Last_name: this.form.last_name,
          Qualification: this.form.qualification,
          Phone: this.form.phone,
        });

        this.snackbarMessage1 = "Successfully Created ";
        this.snackbarColor1 = "green";
        this.snackbar1 = true;
        this.overlay = null;
        this.fetchData();
      } catch (error) {
        console.error(error);
        this.snackbarMessage1 = error.response.data || error.response.message;
        this.snackbarColor1 = "red";
        this.snackbar1 = true;
        this.loading = false;
      } finally {
        this.loading = false;
      }
    },

    async fetchData() {
      try {
        const response = await api.get("/guest/all");
        this.items = response.data;
      } catch (error) {
        console.error(error);
        this.snackbarMessage1 = error.response.data;
        this.snackbarColor1 = "red";
        this.snackbar1 = true;
      }
    },
    async courseData() {
      try {
        const response = await api.get("/session/all");

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
    goBack() {
      this.overlay = false;
    },
    resetForm() {
      this.$refs.form.reset();
    },
    submit() {
      if (this.editIndex !== null) {
        // Update participant
        this.participants.splice(this.editIndex, 1, { ...this.form });
        this.snackbarMessage = 'Participant updated successfully!';
      } else {
        // Add new participant
        this.participants.push({ ...this.form });
        this.snackbarMessage = 'Participant registered successfully!';
      }
      this.snackbar = true;
      this.overlay = false;
      this.editIndex = null;
      this.resetForm();
    }, 
    toggleFilterDialog() {
      this.filterDialog = !this.filterDialog;
    },
    clearFilters() {
      this.filter = {
        qualification: '',
      };
    },
    applyFilter() {
      this.filterDialog = false;
    },
  },
};
</script>
