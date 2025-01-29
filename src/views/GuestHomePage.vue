<template>
  <div class="w-full">
  <div class="flex flex-row mt-2">
    <!-- Button to toggle overlay -->
    <v-btn color="blue" icon="mdi-plus" size="large" variant="text" @click="toggleForm"></v-btn>

    <!-- Table Title Centered -->
    <v-spacer></v-spacer>
    <span class="flex justify-center border-b-[1px] text-3xl">List of Guests</span>
    <v-spacer></v-spacer>

    <v-text-field v-model="searchQuery" append-inner-icon="mdi-magnify" color="primary" density="compact" label="Search" variant="solo" hide-details single-line clearable></v-text-field>
    <v-btn icon="mdi-filter-outline" color="Primary" size="large" variant="text" @click="toggleFilterDialog"></v-btn>
  </div>

  <!-- Overlay with Form -->
  <v-overlay v-model="overlay" class="!flex !justify-center items-center">
    <v-card flat class="bg-slate-300">
      <span class="flex justify-center border-b-[1px] text-3xl p-4">Participant Registration Form</span>
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
            <v-btn :disabled="!formValid" text color="primary" type="submit">
              {{ editIndex !== null ? 'Update' : 'Register' }}
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-overlay>

    <!-- Participants List -->
    <v-table density="compact">
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
  <v-dialog v-model="filterDialog" max-width="500px">
    <v-card>
      <v-card-title class="headline">Filter Participants</v-card-title>
      <v-card-text>
        <v-form ref="filterForm" @submit.prevent="applyFilter">
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field v-model="filter.qualification" label="Qualification"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions>
            <v-btn text @click="clearFilters">Clear</v-btn>
            <v-btn type="submit" text color="primary">Apply</v-btn>
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
      first_name: '',
      middle_name: '',
      last_name: '',
      qualification: '',
      phone: '',
    },
    filter: {
      qualification: '',
    },
    rules: {
      required: [(v) => !!v || 'This field is required.'],
      email: [(v) => /.+@.+\..+/.test(v) || 'Must be a valid email.'],
      numeric: [(v) => !isNaN(parseFloat(v)) || 'Must be a valid number.'],
    },
    participants: [],
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
  methods: {
    toggleForm() {
      this.overlay = !this.overlay;
    },
    goBack() {
      this.overlay = false;
    },
    resetForm() {
      this.form = {
        first_name: '',
        middle_name: '',
        last_name: '',
        qualification: '',
        phone: '',
      };
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
    },    editItem(index) {
      this.editIndex = index;
      this.form = { ...this.participants[index] };
      this.overlay = true;
    },
    confirmDelete(index) {
      this.deleteIndex = index;
      this.deleteDialog = true;
    },
    deleteItem() {
      this.participants.splice(this.deleteIndex, 1);
      this.deleteDialog = false;
      this.snackbarMessage = 'Participant deleted successfully!';
      this.snackbar = true;
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
