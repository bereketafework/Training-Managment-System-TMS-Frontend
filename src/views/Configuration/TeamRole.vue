<!-- <!-- <template>
    <div class="flex flex-col w-full h-full">
        <div class="flex mt-2">
            <!-- Button to toggle overlay -->
            <v-btn color="blue" icon="mdi-plus" size="large" variant="text" @click="toggleForm"></v-btn>
            <!-- Overlay with Form 
            <v-overlay v-model="overlay" class="!flex !justify-center items-center">
                <v-card flat class="bg-slate-300">
                    <span class="flex justify-center border-b-[1px] text-3xl p-4">Team Roles Registration Form</span>
                    <v-snackbar v-model="snackbar" absolute top right color="success" timeout="3000" @timeout="snackbar = false">
                        <span>{{ snackbarMessage }}</span>
                        <v-icon dark>mdi-checkbox-marked-circle</v-icon>
                    </v-snackbar>
                    <v-snackbar v-model="snackbarError" absolute top right color="red" timeout="3000" @timeout="snackbarError = false">
                        <span>{{ snackbarMessageError }}</span>
                        <v-icon dark>mdi-alert-circle-outline</v-icon>
                    </v-snackbar>
                    <v-form ref="form" @submit.prevent="submit" v-model="formValid">
                        <v-container fluid class="border-[1px] border-gray-200 !w-[900px]">
                            <v-row class="!flex !flex-row">
                                <v-col cols="8" sm="4">
                                    <v-text-field v-model="form.Role" :rules="rules.required" color="black darken-2" label="Role" required></v-text-field>
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
            <span class="flex justify-center border-b-[1px] text-3xl">List of Team Roles</span>
            <v-spacer></v-spacer>
            <v-text-field v-model="searchQuery" append-inner-icon="mdi-magnify" color="primary" density="compact" label="Search" variant="solo" hide-details single-line clearable></v-text-field>
            <v-btn icon="mdi-filter-outline" color="Primary" size="large" variant="text" @click="toggleFilterDialog"></v-btn>
        </div>
        <!-- Training List
        <div>
            <v-table density="compact">
                <thead>
                    <tr>
                        <th class="text-left">Role</th>
                        <th class="text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in paginatedTraining" :key="index">
                        <td>{{ item.Role }}</td>
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
            <v-pagination v-model="currentPage" :length="Math.ceil(filteredTraining.length / itemsPerPage)" class="mt-4"></v-pagination>
        </div>
        <!-- Delete Confirmation Dialog
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
        <!-- Filter Dialog 
        <v-dialog v-model="filterDialog" max-width="500px" class="!flex !justify-center !items-center">
            <v-card>
                <v-card-title class="headline">Filter Trainings</v-card-title>
                <v-card-text>
                    <v-form ref="filterForm" @submit.prevent="applyFilter">
                        <v-container>
                            <v-row>
                                <v-col cols="12" sm="6">
                                    <v-text-field v-model="filter.Role" label="Role"></v-text-field>
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
import api from '@/service/api'
export default {
  data: () => ({
    overlay: false,
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
      Role: '',
    },
    filter: {
      Role: '',
    },
    rules: {
      required: [(v) => !!v || 'This field is required.'],
    },
    training: [],
    items: []
  }),
  computed: {
    filteredTraining() {
      let results = this.training;
      if (this.searchQuery) {
        results = results.filter((item) =>
          Object.values(item).some((value) =>
            String(value).toLowerCase().includes(this.searchQuery.toLowerCase())
          )
        );
      }
      if (this.filter.Role) {
        results = results.filter(item => item.Role.includes(this.filter.Role));
      }
      return results;
    },
    paginatedTraining() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredTraining.slice(start, start + this.itemsPerPage);
    },
  },
  methods: {
    toggleForm() {
      this.overlay = !this.overlay;
    },
    resetForm() {
      this.form = { Role: '' };
      if (this.$refs.form) {
        this.$refs.form.reset();
      }
      this.editIndex = null;
    },
    async fetchTeamRoles() {
      try {
        // Fetch team roles from the server
        const response = await api.get('/teamrole');
        // Assume response.data is an array of team roles.
        this.items= response.data;
      } catch (error) {
        this.snackbarError = true;
        this.snackbarMessageError = error.response?.data?.message || 'Failed to load team roles.';
      }
    },
    async submit() {
      if (!this.form.Role) {
        this.snackbarError = true;
        this.snackbarMessageError = 'Role is required.';
        return;
      }
      try {
        if (this.editIndex !== null) {
          // Editing an existing team role. Assuming each team role has an "id" field.
          const roleId = this.training[this.editIndex].id;
          const response = await api.put(`/teamroles/${roleId}`, this.form);
          // Update the team role in the list.
          this.$set(this.training, this.editIndex, response.data);
          this.snackbarMessage = 'Team role updated successfully!';
        } else {
          // Creating a new team role.
          const response = await api.post('/teamroles', this.form);
          // Append the new team role to the list.
          this.training.push(response.data);
          this.snackbarMessage = 'Team role added successfully!';
        }
        this.snackbar = true;
        this.resetForm();
        this.overlay = false;
      } catch (error) {
        this.snackbarError = true;
        this.snackbarMessageError = error.response?.data?.message || 'Operation failed.';
      }
    },
    editItem(index) {
      const item = this.training[index];
      this.form = { ...item };
      this.overlay = true;
      this.editIndex = index;
    },
    confirmDelete(index) {
      this.deleteIndex = index;
      this.deleteDialog = true;
    },
    deleteItem() {
      this.training.splice(this.deleteIndex, 1);
      this.deleteDialog = false;
    },
    toggleFilterDialog() {
      this.filterDialog = !this.filterDialog;
    },
    applyFilter() {
      this.filterDialog = false;
    },
    clearFilters() {
      this.filter = {
        Role: '',
      };
      this.searchQuery = '';
    },
  },
};
</script> --

<template>
  <div class="flex flex-col w-full h-full">
    <div class="flex mt-2">
      <!-- Button to toggle overlay --
      <v-btn color="blue" icon="mdi-plus" size="large" variant="text" @click="toggleForm"></v-btn>
      <!-- Overlay with Form --
      <v-overlay v-model="overlay" class="!flex !justify-center items-center">
        <v-card flat class="bg-slate-300">
          <span class="flex justify-center border-b-[1px] text-3xl p-4">Team Roles Registration Form</span>
          <v-snackbar v-model="snackbar" absolute top right color="success" timeout="3000" @timeout="snackbar = false">
            <span>{{ snackbarMessage }}</span>
            <v-icon dark>mdi-checkbox-marked-circle</v-icon>
          </v-snackbar>
          <v-snackbar v-model="snackbarError" absolute top right color="red" timeout="3000" @timeout="snackbarError = false">
            <span>{{ snackbarMessageError }}</span>
            <v-icon dark>mdi-alert-circle-outline</v-icon>
          </v-snackbar>
          <v-form ref="form" @submit.prevent="submit" v-model="formValid">
            <v-container fluid class="border-[1px] border-gray-200 !w-[900px]">
              <v-row class="!flex !flex-row">
                <v-col cols="8" sm="4">
                  <v-text-field v-model="form.Role" :rules="rules.required" color="black darken-2" label="Role" required></v-text-field>
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
      <span class="flex justify-center border-b-[1px] text-3xl">List of Team Roles</span>
      <v-spacer></v-spacer>
      <v-text-field v-model="searchQuery" append-inner-icon="mdi-magnify" color="primary" density="compact" label="Search" variant="solo" hide-details single-line clearable></v-text-field>
      <v-btn icon="mdi-filter-outline" color="Primary" size="large" variant="text" @click="toggleFilterDialog"></v-btn>
    </div>
    <!-- Team Roles List --
    <div>
      <v-table density="compact">
        <thead>
          <tr>
            <th class="text-left">Role</th>
            <th class="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in paginatedTraining" :key="item.id">
            <td>{{ item.Role }}</td>
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
      <v-pagination v-model="currentPage" :length="Math.ceil(filteredTraining.length / itemsPerPage)" class="mt-4"></v-pagination>
    </div>
    <!-- Delete Confirmation Dialog --
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
    <!-- Filter Dialog --
    <v-dialog v-model="filterDialog" max-width="500px" class="!flex !justify-center !items-center">
      <v-card>
        <v-card-title class="headline">Filter Team Roles</v-card-title>
        <v-card-text>
          <v-form ref="filterForm" @submit.prevent="applyFilter">
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="filter.Role" label="Role"></v-text-field>
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


import api from'@/service/api'


export default {
  data: () => ({
    overlay: false,
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
      Role: '',
    },
    filter: {
      Role: '',
    },
    rules: {
      required: [(v) => !!v || 'This field is required.'],
    },
    // This array will be populated with the team roles returned from the server.
    training: [],
  }),
  computed: {
    filteredTraining() {
      let results = this.training;
      if (this.searchQuery) {
        results = results.filter((item) =>
          Object.values(item).some((value) =>
            String(value).toLowerCase().includes(this.searchQuery.toLowerCase())
          )
        );
      }
      if (this.filter.Role) {
        results = results.filter(item => item.Role.includes(this.filter.Role));
      }
      return results;
    },
    paginatedTraining() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredTraining.slice(start, start + this.itemsPerPage);
    },
  },
  mounted() {
    this.fetchTeamRoles();
  },
  methods: {
    
    toggleForm() {
      this.overlay = !this.overlay;
    },
    resetForm() {
      this.form = { Role: '' };
      if (this.$refs.form) {
        this.$refs.form.reset();
      }
      this.editIndex = null;
    },
    async fetchTeamRoles() {
      try {
        // Fetch team roles from the server
        const response = await api.get('/teamrole/all');
        // Assume response.data is an array of team roles.
        this.training = response.data;
      } catch (error) {
        this.snackbarError = true;
        this.snackbarMessageError = error|| 'Failed to load team roles.';
      }
    },
    async submit() {
      if (!this.form.Role) {
        this.snackbarError = true;
        this.snackbarMessageError = 'Role is required.';
        return;
      }
      try  {
          // Creating a new team role.
          const response = await api.post('/teamrole/create', {
          Role: this.form.Role,
        });
          // Append the new team role to the list.
          this.training.push(response.data);
          this.snackbarMessage = 'Team role added successfully!';
        
        this.snackbar = true;
        this.resetForm();
        this.overlay = false;
      } catch (error) {
        this.snackbarError = true;
        this.snackbarMessageError = error.response?.data?.message || 'Operation failed.';
      }
    },
    editItem(index) {
      const item = this.training[index];
      this.form = { ...item };
      this.overlay = true;
      this.editIndex = index;
    },
    confirmDelete(index) {
      this.deleteIndex = index;
      this.deleteDialog = true;
    },
    async deleteItem() {
      try {
        const roleId = this.training[this.deleteIndex].id;
        await api.delete(`/teamroles/${roleId}`);
        // Remove the deleted role from the list.
        this.training.splice(this.deleteIndex, 1);
        this.snackbarMessage = 'Team role deleted successfully!';
        this.snackbar = true;
      } catch (error) {
        this.snackbarError = true;
        this.snackbarMessageError = error.response?.data?.message || 'Deletion failed.';
      }
      this.deleteDialog = false;
    },
    toggleFilterDialog() {
      this.filterDialog = !this.filterDialog;
    },
    applyFilter() {
      this.filterDialog = false;
    },
    clearFilters() {
      this.filter = { Role: '' };
      this.searchQuery = '';
    },
    goBack() {
      // Close overlay and reset form
      this.overlay = false;
      this.resetForm();
    },
  },
};


</script> -->


<template>
  <div class="flex flex-col w-full h-full">
    <div class="flex mt-2">
      <v-overlay v-model="overlay" persistent class="!flex !justify-center items-center">
        <v-card flat class="bg-slate-300">
          <span class="flex justify-center border-b-[1px] text-3xl p-4"
            >TeamRole Registration Form</span
          >
          <v-form ref="form" @submit.prevent="createRole" v-model="formValid">
            <v-container fluid class="border-[1px] border-gray-200 !w-[900px]">
              <v-row class="!flex !flex-row">
                <v-col cols="8" sm="4">
                  <v-text-field
                    v-model="form.TeamRole"
                    :rules="rules.required"
                    color="black darken-2"
                    label="Role"
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
        sticky
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-btn
              color="blue"
              prepend-icon="mdi-plus"
              size="large"
              class="rounded-lg"
              variant="outlined"
                @click="toggleForm"
              >
                Create</v-btn
              >
            <v-toolbar-title class="flex justify-center items-center !text-4xl">
              List of Team Roles
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
          >Team Role Update Form</span
        >
        <v-form ref="form" @submit.prevent="editItem" v-model="formValid">
          <v-container fluid class="border-[1px] border-gray-200 !w-[900px]">
            <v-row class="!flex !flex-row">
              <v-col cols="8" sm="4">
                <v-text-field
                  v-model="form.TeamRoleUpdate"
                  :rules="rules.required"
                  color="black darken-2"
                  label="Role"
                  required
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
        { title: "Team Roles", value: "Team_role" },
        { title: "Created By", value: "CreatedBy.Username" },
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
        TeamRole: "",
        TeamRoleUpdate: "",
      },
      rules: {
        required: [(v) => !!v || "This field is required."],
      },

      items: [], // Data fetched from the API
    };
  },
  computed: {
    Search() {
      let results = this.items;
      if (this.searchQuery) {
        results = results.filter((item) =>
          Object.values(item).some((value) =>
            String(value)
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase()),
          ),
        );
      }
      return results;
    },
    paginatedTraining() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredTraining.slice(start, start + this.itemsPerPage);
    },
  },
  methods: {
    goBack() {
      this.overlay = false;
      this.resetForm();
    },
    async fetchData() {
      try {
        const response = await api.get("/teamrole/allteamroles");

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

            const response = await api.post("/teamrole/create", {
              Team_role: this.form.TeamRole,
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
    submit() {
      if (!this.form.TeamRole) {
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
      this.form.TeamRoleUpdate = item.Team_role;
    },

    async editItem() {
      try {
            this.loading = true;
            const response = await api.post(
              `/teamrole/update/${this.selectedItem.id}`,{
                Team_role: this.form.TeamRoleUpdate,
              });
            this.snackbarMessage1 = response.data.message;
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
              `/teamrole/delete/${this.selectedItem.id}`,
              {},
            );

            this.snackbarMessage1 = "Role Deleted successfully!";
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
