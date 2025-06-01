<template>
  <div>
    <v-data-table
      :headers="headersGuest"
      :items="assignGuestList"
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
            @click="toggleForm"
          >
            Add</v-btn
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
    <v-overlay v-model="overlay" class="!flex !justify-center items-center">
      <v-card flat class="bg-slate-300">
        <span class="flex justify-center border-b-[1px] text-3xl">
          Guest Assigning Form
        </span>

        <v-form ref="form" @submit.prevent="assignGuestForTraining" class="m-3">
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
                  label="Select Session"
                  :items="SessionList"
                  item-title="Topic"
                  item-value="id"
                  variant="outlined"
                  v-model="SelectedSessionIdForGuest"
                  :rules="required"
                  multiple
                ></v-select> </v-col
              ><v-col cols="20" sm="10">
                <v-select
                  class="w-[700px]"
                  clearable
                  chips
                  label="Select Guest"
                  :items="GuestList"
                  :item-title="guestName"
                  item-value="id"
                  variant="outlined"
                  v-model="SelectedGuestId"
                  :rules="required"
                ></v-select>
              </v-col>

              <v-card-actions class="flex justify-between !w-[700px]">
                <div>
                  <v-btn text @click="goBack">Back</v-btn>
                  <v-btn text @click="resetForm">Clear</v-btn>
                </div>

                <v-btn text color="primary" type="submit" variant="outlined">
                  <v-progress-circular
                    v-if="loading"
                    indeterminate
                    size="20"
                  ></v-progress-circular>
                  Assign
                </v-btn>
              </v-card-actions>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </v-overlay>
  </div> 
  <v-snackbar v-model="snackbar1" :color="snackbarColor1">
    {{ snackbarMessage1 }}
  </v-snackbar>
</template>

<script>
import api from "@/service/api";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault("Africa/Nairobi");

import Resource from "../Resource/Resource.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import { mapActions } from "pinia";
import { useGuestAssignStore } from "@/stores/guestAssignStore";
import { useTrainingStore } from '@/stores/TrainingStore';
import { useGuestStore } from '@/stores/guestStore';
import { useSessionStore } from '@/stores/sessionStore';
export default {
  components: { PrimaryButton },
  data() {
    return {
      SelectedSessionIdForGuest: [],
      SessionList: [],
   
      selecteditem: [],

      assignGuestList: [],
    
      overlay: false,
      searchQuery: "",
      SelectedSessionId: [],
      GuestList: [],
      SelectedGuestId: [],
      training: null,
      tab: "",
      loading: false,
  
      rules: {
        required: [(v) => !!v || "This field is required"],
        training_id: [(val) => !!val || "This field is required"],
        duration: [(val) => !!val || "This field is required"],
        topic: [(val) => !!val || "This field is required"],
      },
 
      headersGuest: [
        { title: "First Name", value: "Guest.First_name" },
        { title: "Middle Name", value: "Guest.Middle_name" },
        { title: "Last Name", value: "Guest.Last_name" },
        { title: "Qualification", value: "Guest.Qualification" },
        { title: "Session", value: "Session.Topic", sortable:true},
      ],
     
    
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
     guestName() {
      return (item) =>
        `${item.First_name} ${item.Middle_name} ${item.Last_name}`;
    },
    formIsValid() {
      return (
        this.form.topic &&
        this.form.sessions_start_date &&
        this.form.sessions_end_date
      );
    },
   
   
    required() {
      return [
        (v) =>
          (Array.isArray(v) ? v.length > 0 : !!v) || "This field is required.",
      ];
    },
 
  },

  methods: {
    ...mapActions(useSessionStore,(["selectedSessionForTraining"])),
    ...mapActions(useGuestStore,(["allGuest"])),
    ...mapActions(useTrainingStore,(["TrainingDetails"])),
    ...mapActions(useGuestAssignStore, [
      "createGuestAssign",
      "allAssignedGuestForTraining",
    ]),
    listOfAssignedGuests() {
      this.allAssignedGuestForTraining(this.$route.params.id)
        .then((res) => {
          this.assignGuestList = res.data;
        })
        .catch((err) => {
          console.error(err);
          this.snackbarMessage1 = err.response.data;
          this.snackbarColor1 = "red";
          this.snackbar1 = true;
        });
    },
    assignGuestForTraining() {
      this.createGuestAssign([
        this.SelectedGuestId,
        this.SelectedSessionIdForGuest,
        this.$route.params.id,
      ])
      .then((res) => {
         this.snackbarMessage1 = "Successfully Assigned Guests";
          this.snackbarColor1 = "green";
          this.snackbar1 = true;
          this.overlay = false;
        })
        .catch((err) => {
          console.error(err);
          this.snackbarMessage1 = "Error Assigning Guests";
          this.snackbarColor1 = "red";
          this.snackbar1 = true;
        })
        .finally(() => {
          this.loading = false;
          this.resetForm();
          this.overlay = false;
        });
    },
    selectedTraining(){
  this.TrainingDetails(this.$route.params.id)
    .then((res) => {
      this.items = res.data;
    })
    .catch((err) => {
      console.error(err);
      this.snackbarMessage1 = err.response.data;
      this.snackbarColor1 = "red";
      this.snackbar1 = true;
    });
},
guests() {
      this.allGuest()
        .then((res) => {
          this.GuestList = res.data;
        })
        .catch((err) => {
          console.error(err);
          this.snackbarMessage1 = err.response.data;
          this.snackbarColor1 = "red";
          this.snackbar1 = true;
        });
    },
    session(){
      this.selectedSessionForTraining(this.$route.params.id)
        .then((res) => {
          this.SessionList = res.data;
        })
        .catch((err) => {
          console.error(err);
          this.snackbarMessage1 = err.response.data;
          this.snackbarColor1 = "red";
          this.snackbar1 = true;
        });
    },
    toggleForm() {
      this.overlay = !this.overlay;
    },
    resetForm() {
      this.form = {
        training_id: "",
        duration: "",
        topic: "",
        sessions_start_date: "",
        sessions_end_date: "",
        Provider: "",
        Quantity: "",
        SingleCost: "",
      };
      this.$refs.form.reset();
    },
    goBack() {
      this.$router.go(-1);
    },
    formatDate(dateString) {
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      return new Date(dateString).toLocaleDateString("en-US", options);
    },
  },
  mounted() {
    this.listOfAssignedGuests();
    this.guests();
    this.session();
    this.selectedTraining();
   
  },
};
</script>

<style></style>
