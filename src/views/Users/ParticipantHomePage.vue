<template>
  <div class="w-full">
    <div class="flex flex-row mt-2">
      <!-- Overlay with Form -->
      <v-overlay v-model="overlay" class="!flex !justify-center items-center" :persistent="true">
        <v-card flat class="bg-slate-300">
          <span class="flex justify-center border-b-[1px] text-3xl p-4"
            >Participant Registration Form</span
          >
         
          <v-form
            ref="form"
            @submit.prevent="createParticipant"
            v-model="formValid"
          >
            <v-container fluid class="border-[1px] border-gray-200 !w-[900px]">
              <v-row class="!flex !flex-row">
                <v-col cols="8" sm="4">
                  <v-text-field
                    v-model="form.first_name"
                    :rules="rules.required"
                    color="black darken-2"
                    variant="outlined"
                    label="First Name"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="8" sm="4">
                  <v-text-field
                    v-model="form.middle_name"
                    :rules="rules.required"
                    color="black darken-2"
                    label="Middle Name"
                    variant="outlined"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="8" sm="4">
                  <v-text-field
                    v-model="form.last_name"
                    :rules="rules.required"
                    color="black darken-2"
                    label="Last Name"
                    variant="outlined"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="8" sm="4">
                  <v-text-field
                    v-model="form.email"
                    :rules="[rules.required, rules.email]"
                    color="black darken-2"
                    label="Email"
                    type="email"
                    variant="outlined"
                  ></v-text-field>
                </v-col>
                <v-col cols="8" sm="4">
                  <v-text-field
                    v-model="form.phone"
                    :rules="[rules.required, rules.numeric]"
                    color="black darken-2"
                    label="Phone"
                    variant="outlined"
                    type="number"
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
                  variant="outlined"
                >
                  <v-progress-circular
                    v-if="loading"
                    indeterminate
                    size="20"
                
                  ></v-progress-circular>
                  Register</v-btn
                >
              </v-card-actions>
            </v-container>
          </v-form>
        </v-card>
      </v-overlay>

      <v-overlay
        v-model="overlayUpdate"
        class="!flex !justify-center items-center"
      >
        <v-card flat class="bg-slate-300">
          <span class="flex justify-center border-b-[1px] text-3xl p-4"
            >Participant Update Form</span
          >
          <v-form ref="form" @submit.prevent="editItem" v-model="formValid">
            <v-container fluid class="border-[1px] border-gray-200 !w-[900px]">
              <v-row class="!flex !flex-row">
                <v-col cols="8" sm="4">
                  <v-text-field
                    v-model="form.first_nameUpdate"
                    :rules="rules.required"
                    color="black darken-2"
                    label="First Name"
                    variant="outlined"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="8" sm="4">
                  <v-text-field
                    v-model="form.middle_nameUpdate"
                    :rules="rules.required"
                    color="black darken-2"
                    label="Middle Name"
                    variant="outlined"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="8" sm="4">
                  <v-text-field
                    v-model="form.last_nameUpdate"
                    :rules="rules.required"
                    color="black darken-2"
                    label="Last Name"
                    variant="outlined"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="8" sm="4">
                  <v-text-field
                    v-model="form.emailUpdate"
                    :rules="[rules.required, rules.email]"
                    color="black darken-2"
                    label="Email"
                    variant="outlined"
                    type="email"
                  ></v-text-field>
                </v-col>
                <v-col cols="8" sm="4">
                  <v-text-field
                    v-model="form.phoneUpdate"
                    :rules="[rules.required, rules.numeric]"
                    color="black darken-2"
                    label="Phone"
                    variant="outlined"
                    type="number"
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
                 variant="outlined"
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
    </div>

    <!-- Participants List -->

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
              class=" rounded-lg"
              variant="outlined"
              @click="toggleForm"
            >
              Create</v-btn
            >
            <v-toolbar-title class="flex justify-center items-center !text-4xl">
              List of Participant
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
              <v-list-item @click="confirmenroll(item)">Enrollment</v-list-item>
              <v-list-item @click="selectItem(item)">Edit</v-list-item>
              <v-list-item @click="confirmDelete(item)">Delete</v-list-item>
            </v-list>
          </v-menu>
        </template></v-data-table
      >
    </div>
<div> 
  <v-overlay v-model="overlayenroll" class="!flex !justify-center items-center">
          <v-card flat class="bg-slate-300">
            <span class="flex justify-center border-b-[1px] text-3xl">
              Enrollment
            </span>

            <v-form ref="form" @submit.prevent="createEnrollment" class="m-3">
              <v-container
                fluid
                class="border-[1px] border-gray-200 !flex !w-[800px] !rounded-lg"
              >
                <v-row>
                  <v-col cols="20" sm="10">
                    <v-select
                      class="w-[700px]"
                      clearable
                      chips
                      label="Select Training"
                      :items="ParticipantList"
                      item-title="Training_name"
                      item-value="id"
                      variant="outlined"
                      v-model="SelectedParticipantId"
                      :rules="rules.required"
                      multiple
                    ></v-select>
                  </v-col>

                  <v-card-actions class="flex justify-between !w-[700px]">
                    <div>
                      <v-btn text @click="goBack">Back</v-btn>
                      <v-btn text @click="resetForm">Clear</v-btn>
                    </div>

                    <v-btn text color="primary" type="submit"variant="outlined">
                      <v-progress-circular
                        v-if="loading"
                        indeterminate
                        size="20"
                      ></v-progress-circular>
                      Enroll
                    </v-btn>
                  </v-card-actions>
                </v-row>
              </v-container>
            </v-form>
          </v-card>
        </v-overlay>
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
    loading: false,
    overlay: false,
    overlayenroll:false,
    overlayUpdate: false,
    selectedItem: null,
    SelectedParticipantId:[],
    snackbar1: false,
    snackbarMessage1: "",
    snackbarError1: false,
    snackbarMessageError1: "",
    deleteDialog: false,
    filterDialog: false,
    deleteIndex: null,
    editIndex: null,
    currentPage: 1,
    itemsPerPage: 5,
    searchQuery: "",
    formValid: false,
    items: [],
    headers: [
      { title: "First Name", value: "First_name" },
      { title: "Middle Name", value: "Middle_name" },
      { title: "Last name", value: "Last_name" },
      { title: "Email", value: "Email" },
      { title: "Phone", value: "Phone" },
      { title: "Actions", value: "actions", sortable: false },
    ],
    form: {
      first_name: "",
      middle_name: "",
      last_name: "",
      email: "",
      phone: "",
      first_nameUpdate: "",
      middle_nameUpdate: "",
      last_nameUpdate: "",
      emailUpdate: "",
      phoneUpdate: "",
    },
    filter: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
    },
    rules: {
      required: [(v) => !!v || "This field is required."],
      email: [(v) => /.+@.+\..+/.test(v) || "Must be a valid email."],
      numeric: [(v) => !isNaN(parseFloat(v)) || "Must be a valid number."],
    },
    participants: [],
  }),
  computed: {
    formValid() {
      return (
        this.form.first_name &&
        this.form.middle_name &&
        this.form.last_name &&
        this.form.email &&
        this.form.phone
      );
    },
   
  },
  mounted() {
    this.fetchData(); // Fetch data when the component is mounted
  
this.fetchParticipant()   },
  methods: {
    confirmenroll(item) {
      this.overlayenroll = true;
      this.selectedItem = item;
    },
    async createEnrollment() {
      try {
        this.loading = true;

   const Participant_id=this.selectedItem.id
        const Training_id = this.SelectedParticipantId;
        for (const Training_id of this.SelectedParticipantId) {
          const response = await api.post("/enrollment/create", {
            Training_id: Training_id,
            Participant_id: Participant_id,
          });
        }
        this.snackbarMessage1 = "Successfully Created ";
        this.snackbarColor1 = "green";
        this.snackbar1 = true;
        this.overlay = null;
        this.resetForm();
        console.log(participantId);
      } catch (error) {
        console.error(error);
        this.snackbarMessage1 = error.response.data.message;
        this.snackbarColor1 = "red";
        this.snackbar1 = true;
        this.loading = false;
      } finally {
        this.loading = false;
        this.fetchEnrollment();
      }
    },

    confirmDelete(item) {
      this.deleteDialog = true;
      this.selectedItem = item;
    },
    async deleteItem() {
      if (!this.confirmDelete) return;

      try {
        this.loading = true;
        const response = await api.post(
          `/participant/delete/${this.selectedItem.id}`,
          {},
        );
        this.snackbarMessage1 = "participant Deleted successfully!";
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
      this.form.first_nameUpdate = item.First_name;
      this.form.middle_nameUpdate = item.Middle_name;
      this.form.last_nameUpdate = item.Last_name;
      this.form.emailUpdate = item.Email;
      this.form.phoneUpdate = item.Phone;
    },

    async editItem() {
      try {
        this.loading = true;
        const response = await api.post(
          `/participant/update/${this.selectedItem.id}`,
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

    async createParticipant() {
      try {
        this.loading = true;
        const response = await api.post("/participant/create", {
          First_name: this.form.first_name,
          Middle_name: this.form.middle_name,
          Last_name: this.form.last_name,
          Email: this.form.email,
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
        const response = await api.get("/participant/allparticipant");
        this.items = response.data;
      } catch (error) {
        console.error(error);
        this.snackbarMessage1 = error.response.data;
        this.snackbarColor1 = "red";
        this.snackbar1 = true;
      }
    },
    async fetchParticipant() {
      try {
        const response = await api.get("/training/all");
        this.ParticipantList = response.data;
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
  },
};
</script>
