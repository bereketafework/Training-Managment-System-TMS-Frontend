<!-- <template>
    <div class="flex flex-col w-full h-full">
        <div class="flex mt-2">
            <!-- Button to toggle overlay -->
            <v-btn color="blue" icon="mdi-plus" size="large" variant="text" @click="toggleForm"></v-btn>
            <!-- Overlay with Form 
            <v-overlay v-model="overlay" class="!flex !justify-center items-center">
                <v-card flat class="bg-slate-300">
                    <span class="flex justify-center border-b-[1px] text-3xl p-4">Category Registration Form</span>
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
                                    <v-text-field v-model="form.Role" :rules="rules.required" color="black darken-2" label="Category" required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                <v-select clearable chips label="Select Type" :items="['Course', 'Training']" variant="solo-filled" v-model="form.type" :rules="rules.required"></v-select>
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
            <span class="flex justify-center border-b-[1px] text-3xl">List of Roles</span>
            <v-spacer></v-spacer>
            <v-text-field v-model="searchQuery" append-inner-icon="mdi-magnify" color="primary" density="compact" label="Search" variant="solo" hide-details single-line clearable></v-text-field>
            <v-btn icon="mdi-filter-outline" color="Primary" size="large" variant="text" @click="toggleFilterDialog"></v-btn>
        </div>
        <!-- Training List 
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
                        <td>{{ item.type }}</td>
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
      type:'',
    },
    filter: {
      Role: '',
      type: '',
    },
    rules: {
      required: [(v) => !!v || 'This field is required.'],
    },
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
      if (this.filter.type) {
        results = results.filter(item => item.Role.includes(this.filter.Role));
      }
      return results
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
      this.form = {
        Role: '',
      };
      this.$refs.form.reset();
      this.editIndex = null;
    },
    submit() {
      if (!this.form.Role) {
        this.snackbarError = true;
        this.snackbarMessageError = 'Role is required.';
        return;
      }
      if (this.editIndex !== null) {
        Object.assign(this.training[this.editIndex], this.form);
        this.snackbarMessage = 'Training updated successfully!';
      } else {
        this.training.push({ ...this.form });
        this.snackbarMessage = 'Training added successfully!';
      }
      this.snackbar = true;
      this.resetForm();
      this.overlay = false;
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
</script> -->
<template>
    <div class="flex flex-col w-full h-full">
        <div class="flex mt-2">
            <!-- Button to toggle overlay -->
            <v-btn color="blue" icon="mdi-plus" size="large" variant="text" @click="toggleForm"></v-btn>
            <!-- Overlay with Form -->
            <v-overlay v-model="overlay" class="!flex !justify-center items-center">
                <v-card flat class="bg-slate-300">
                    <span class="flex justify-center border-b-[1px] text-3xl p-4">Category Registration Form</span>
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
                                    <v-text-field v-model="form.Role" :rules="rules.required" color="black darken-2" label="Category" required></v-text-field>
                                </v-col>
                                <v-col cols="8" sm="4">
                                    <v-select v-model="form.RoleType" :items="roleTypes" :rules="rules.required" color="black darken-2" label="Category Type" required></v-select>
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
            <span class="flex justify-center border-b-[1px] text-3xl">List of Categories</span>
            <v-spacer></v-spacer>
            <v-text-field v-model="searchQuery" append-inner-icon="mdi-magnify" color="primary" density="compact" label="Search" variant="solo" hide-details single-line clearable></v-text-field>
            <v-btn icon="mdi-filter-outline" color="Primary" size="large" variant="text" @click="toggleFilterDialog"></v-btn>
        </div>
        <!-- Training List -->
        <div>
            <v-table density="compact">
                <thead>
                    <tr>
                        <th class="text-left">Category</th>
                        <th class="text-left">Category Type</th>
                        <th class="text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in paginatedTraining" :key="index">
                        <td>{{ item.Role }}</td>
                        <td>{{ item.RoleType }}</td>
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
        <v-dialog v-model="filterDialog" max-width="500px" class="!flex !justify-center !items-center">
            <v-card>
                <v-card-title class="headline">Filter Categories</v-card-title>
                <v-card-text>
                    <v-form ref="filterForm" @submit.prevent="applyFilter">
                        <v-container>
                            <v-row>
                                <v-col cols="12" sm="6">
                                    <v-text-field v-model="filter.Role" label="Category"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-select v-model="filter.RoleType" :items="roleTypes" label="Category Type"></v-select>
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
      RoleType: '',
    },
    filter: {
      Role: '',
      RoleType: '',
    },
    rules: {
      required: [(v) => !!v || 'This field is required.'],
    },
    roleTypes: ['Course',  'Training','Resource', ], // Add your role types here
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
      if (this.filter.RoleType) {
        results = results.filter(item => item.RoleType.includes(this.filter.RoleType));
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
      this.form = {
        Role: '',
        RoleType: '',
      };
      this.$refs.form.reset();
      this.editIndex = null;
    },
    submit() {
      if (!this.form.Role || !this.form.RoleType) {
        this.snackbarError = true;
        this.snackbarMessageError = 'All fields are required.';
        return;
      }
      if (this.editIndex !== null) {
        Object.assign(this.training[this.editIndex], this.form);
        this.snackbarMessage = 'Training updated successfully!';
      } else {
        this.training.push({ ...this.form });
        this.snackbarMessage = 'Training added successfully!';
      }
      this.snackbar = true;
      this.resetForm();
      this.overlay = false;
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
        RoleType: '',
      };
      this.searchQuery = '';
    },
  },
};
</script>
