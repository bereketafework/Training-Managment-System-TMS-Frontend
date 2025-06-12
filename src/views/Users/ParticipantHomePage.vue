<template>
  <div class="w-full">
    <div class="flex flex-row">
      <!-- Overlay with Form -->
      <v-overlay
        v-model="overlay"
        class="!flex !justify-center items-center"
        persistent
      >
        <v-card flat class="bg-slate-300">
          <span class="flex justify-center border-b-[1px] text-3xl p-4"
            >Participant Registration Form</span
          >

          <v-form
            ref="form"
            @submit.prevent="participantCreate"
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
                    label="First Name *"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="8" sm="4">
                  <v-text-field
                    v-model="form.middle_name"
                    :rules="rules.required"
                    color="black darken-2"
                    label="Middle Name *"
                    variant="outlined"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="8" sm="4">
                  <v-text-field
                    v-model="form.last_name"
                    :rules="rules.required"
                    color="black darken-2"
                    label="Last Name *"
                    variant="outlined"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="8" sm="4">
                  <v-text-field
                    v-model="form.email"
                    :rules="[emailRule]"
                    color="black darken-2"
                    label="Email *"
                    type="email"
                    variant="outlined"
                  ></v-text-field>
                </v-col>
                <v-col cols="8" sm="4">
                  <v-text-field
                    v-model="form.phone"
                    :rules="[phoneRules]"
                    color="black darken-2"
                    label="Phone *"
                    variant="outlined"
                    type="number"
                  ></v-text-field>
                </v-col>

                <v-col cols="8" sm="4">
                  <v-select
                    label="Gender *"
                    :items="['Male', 'Female']"
                    variant="outlined"
                    v-model="form.Gender"
                    :rules="rules.required"
                  ></v-select>
                </v-col>
              </v-row>
              <v-card-actions>
                <v-btn text @click="goBack">Back</v-btn>
                <v-btn text @click="resetForm">Clear</v-btn>
                <v-spacer></v-spacer>
                <v-btn
                :loading=loading
                  text
                  color="primary"
                  type="submit"
                  variant="outlined"
                >
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
        persistent
      >
        <v-card flat class="bg-slate-300">
          <span class="flex justify-center border-b-[1px] text-3xl p-4"
            >Participant Update Form</span
          >
          <v-form
            ref="form"
            @submit.prevent="participantUpdate"
            v-model="formValid"
          >
            <v-container fluid class="border-[1px] border-gray-200 !w-[900px]">
              <v-row class="!flex !flex-row">
                <v-col cols="8" sm="4">
                  <v-text-field
                    v-model="form.first_nameUpdate"
                    :rules="rules.required"
                    color="black darken-2"
                    label="First Name *"
                    variant="outlined"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="8" sm="4">
                  <v-text-field
                    v-model="form.middle_nameUpdate"
                    :rules="rules.required"
                    color="black darken-2"
                    label="Middle Name *"
                    variant="outlined"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="8" sm="4">
                  <v-text-field
                    v-model="form.last_nameUpdate"
                    :rules="rules.required"
                    color="black darken-2"
                    label="Last Name *"
                    variant="outlined"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="8" sm="4">
                  <v-text-field
                    v-model="form.emailUpdate"
                    :rules="[emailRule]"
                    color="black darken-2"
                    label="Email *"
                    variant="outlined"
                    type="email"
                  ></v-text-field>
                </v-col>
                <v-col cols="8" sm="4">
                  <v-text-field
                    v-model="form.phoneUpdate"
                    :rules="[phoneRules]"
                    color="black darken-2"
                    label="Phone *"
                    variant="outlined"
                  ></v-text-field>
                </v-col>
                <v-col cols="8" sm="4">
                  <v-select
                    label="Gender *"
                    :items="['Male', 'Female']"
                    variant="outlined"
                    v-model="form.GenderUpdate"
                    :rules="rules.required"
                  ></v-select>
                </v-col>
              </v-row>
              <v-card-actions>
                <v-btn text @click="goBackUpdate">Back</v-btn>
                <v-btn text @click="resetForm">Clear</v-btn>
                <v-spacer></v-spacer>
                <v-btn text color="primary" type="submit" variant="outlined"  :loading=loading>
                Update</v-btn
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
        :items="allParticipants"
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
      <v-overlay
        v-model="overlayenroll"
        class="!flex !justify-center items-center"
        persistent
      >
        <v-card flat class="bg-slate-300">
          <span class="flex justify-center border-b-[1px] text-3xl">
            Enrollment
          </span>

          <v-form ref="form" @submit.prevent="enrollParticipants" class="m-3">
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
                    label="Select Training *"
                    :items="allTrainingList"
                    item-title="Training_name"
                    item-value="id"
                    variant="outlined"
                    v-model="SelectedTrainingId"
                 :rules="requiredRules"
                    multiple
                  ></v-select>
                </v-col>

                <v-card-actions class="flex justify-between !w-[700px]">
                  <div>
                    <v-btn text @click="goBackENROLL">Back</v-btn>
                    <v-btn text @click="resetForm">Clear</v-btn>
                  </div>

                  <v-btn text color="primary" type="submit" variant="outlined"  :loading=loading>

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
          <v-btn color="red" text @click="participantDelete"  :loading=loading >Delete</v-btn>
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
import { useParticipantStore } from "@/stores/participantStore";
import { mapActions } from "pinia";
import { useEnrollmentStore } from '@/stores/enrollmentStore';
import { useTrainingStore } from '@/stores/TrainingStore';
export default {
  data: () => ({
    loading: false,
    overlay: false,
    overlayenroll: false,
    overlayUpdate: false,
    selectedItem: null,
    SelectedTrainingId: [],
    allTrainingList:[],
    snackbar1: false,
    snackbarMessage1: "",
    snackbarColor1: false,
    deleteDialog: false,
    searchQuery: "",
    // formValid: false,
    items: [],
    headers: [
      { title: "First Name", value: "First_name" },
      { title: "Middle Name", value: "Middle_name" },
      { title: "Last name", value: "Last_name" },
      { title: "Gender", value: "Gender" },
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
      Gender: "",
      first_nameUpdate: "",
      middle_nameUpdate: "",
      last_nameUpdate: "",
      emailUpdate: "",
      phoneUpdate: "",
      GenderUpdate: "",
    },

    rules: {
      required: [(v) => !!v || "This field is required."],
    },
    allParticipants: [],
  }),
  computed: {
    formValid() {
      return (
        this.form.first_name &&
        this.form.middle_name &&
        this.form.last_name &&
        this.form.email &&
        this.form.phone &&
        this.form.Gender
      );
    },
    requiredRules() {
      return [
        (v) =>
          (Array.isArray(v) ? v.length > 0 : !!v) ||
          "This field is required.",
      ];
    },
    emailRule() {
      return (v) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(v) || "Must be a valid email.";
      };
    },
    phoneRules() {
      return (v) => {
        if (!v) return "This field is required";
        if (!/^\d+$/.test(v)) return "Only numeric values allowed";
        if (!v.startsWith("9"&&"7")) return "Phone number must start with '9...'Or '7...'";
        if (v.length < 9 || v.length > 9)
          return "Phone number must be 9 digits long";
        return true;
      };
    },
  },
  mounted() {
    this.participants();
    this.Trainings()
  },
  methods: {
    ...mapActions(useTrainingStore,(["allTraining"])),
    ...mapActions(useEnrollmentStore,(["createEnrollmentForParticipant"])),
    ...mapActions(useParticipantStore, [
      "allParticipant",
      "updateParticipant",
      "createParticipant",
      "deleteParticipant",
      "searchParticipant",
    ]),
    Trainings(){
      this.allTraining()
      .then((res)=>{
        this.allTrainingList=res.data
      }).catch((err)=>{
            this.snackbarMessage1 = err.response.data.error;
        this.snackbarColor1 = "red";
        this.snackbar1 = true;
      })
    },
    async enrollParticipants(){
      const validation = await this.$refs.form.validate();
      if (!validation.valid) {
        this.snackbarMessage1 = "Please fill all required fields correctly.";
        this.snackbarColor1 = "red";
        this.snackbar1 = true;
        return;
      }
     this.loading = true;
      this.createEnrollmentForParticipant([this.SelectedTrainingId,this.selectedItem.id])
      .then((res)=>{
         this.snackbarMessage1 = "Participants Successfully Enrolled  ";
        this.snackbarColor1 = "green";
        this.snackbar1 = true;
      })
      .catch((err)=>{      
          this.snackbarMessage1 = err.response.data.error;
        this.snackbarColor1 = "red";
        this.snackbar1 = true;

      }).finally(() => {
          this.loading = false;
          this.resetForm();
       this.overlayenroll=false
          this.participants();
        });
  
    },
    participantDetails() {
      this.searchParticipant(this.selectedItem.id)
        .then((res) => {})
        .catch((err) => {});
    },
    participantDelete() {
      this.loading = true;
      this.deleteParticipant(this.selectedItem.id)
        .then((res) => {
          (this.snackbarMessage1 = "Participant has Been Deleted Succesfully!"),
            res;
          this.snackbarColor1 = "green";
          this.snackbar1 = true;
        })
        .catch((err) => {
          this.snackbarMessage1 = "Error Deleting ";
          this.snackbarColor1 = "red";
          this.snackbar1 = true;
        })
        .finally(() => {
          this.loading = false;
          this.deleteDialog = false;
          this.participants();
        });
    },

   async participantCreate() {
      const validation = await this.$refs.form.validate();
      if (!validation.valid) {
        this.snackbarMessage1 = "Please fill all required fields correctly.";
        this.snackbarColor1 = "red";
        this.snackbar1 = true;
        return;
      }

      this.loading = true;
      this.createParticipant([
        this.form.first_name,
        this.form.middle_name,
        this.form.last_name,
        this.form.email,
        this.form.phone,
        this.form.Gender,
     ] )
        .then((res) => {
          (this.snackbarMessage1 = "Participant has Been Created Succesfully!"),
            res;
          this.snackbarColor1 = "green";
          this.snackbar1 = true;
        })
        .catch((err) => {
          this.snackbarMessage1 = "Error Creating ";
          this.snackbarColor1 = "red";
          this.snackbar1 = true;
        })
        .finally(() => {
          this.loading = false;
          this.resetForm();
          this.overlay = false;
          this.participants();
        });
    },

  async  participantUpdate() {
      const validation = await this.$refs.form.validate();
      if (!validation.valid) {
        this.snackbarMessage1 = "Please fill all required fields correctly.";
        this.snackbarColor1 = "red";
        this.snackbar1 = true;
        return;
      }
      this.loading = true;
      this.updateParticipant([
        this.selectedItem.id,
        this.form.first_nameUpdate,
        this.form.middle_nameUpdate,
        this.form.last_nameUpdate,
        this.form.emailUpdate,
        this.form.phoneUpdate,
        this.form.GenderUpdate,
      ])
        .then((res) => {
          (this.snackbarMessage1 = "Participant Data Updated Succesfully!"),
            res;
          this.snackbarColor1 = "green";
          this.snackbar1 = true;
        })
        .catch((err) => {
          this.snackbarMessage1 = "Error Updating ";
          this.snackbarColor1 = "red";
          this.snackbar1 = true;
          console.error(err);
        })
        .finally(() => {
          this.loading = false;
          this.resetForm();
          this.overlayUpdate = false;
          this.participants();
        });
    },
    participants() {
      this.allParticipant()
        .then((res) => {
          this.allParticipants = res.data;
        })
        .catch((err) => { this.snackbarMessage1 = err.response.data.error || err.response.data || "Error"
        this.snackbarColor1 = "red";
        this.snackbar1 = true;
      });
    },

    confirmenroll(item) {
      this.overlayenroll = true;
      this.selectedItem = item;
    },
    // async createEnrollment() {
    //   try {
    //     this.loading = true;

    //     const Participant_id = this.selectedItem.id;
    //     const Training_id = this.SelectedParticipantId;
    //     for (const Training_id of this.SelectedParticipantId) {
    //       const response = await api.post("/enrollment/create", {
    //         Training_id: Training_id,
    //         Participant_id: Participant_id,
    //       });
    //     }
    //     this.snackbarMessage1 = "successfully Enrolled!";
    //     this.snackbarColor1 = "green";
    //     this.snackbar1 = true;
    //     this.overlayenroll = false;
    //     this.resetForm();
    //   } catch (error) {
    //     console.error(error);
    //     this.snackbarMessage1 = error.response.data.message;
    //     this.snackbarColor1 = "red";
    //     this.snackbar1 = true;
    //     this.loading = false;
    //   } finally {
    //     this.loading = false;
    //   }
    // },

    confirmDelete(item) {
      this.deleteDialog = true;
      this.selectedItem = item;
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
    toggleForm() {
      this.overlay = !this.overlay;
    },
    goBackENROLL() {
      this.overlayenroll = false;
    },
    goBack() {
      this.overlay = false;
    },
    goBackUpdate() {
      this.overlayUpdate = false;
    },
    resetForm() {
      this.$refs.form.reset();
    },
  },
};
</script>
