<template>
  <div class="!rounded-lg">
    <div>
      <v-data-table
        :headers="headersEnrollment"
        :items="allEnrollmentList"
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
              Enroll Participant
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
        <template v-slot:item.fullname="{ item }">
          <div class="flex flex-row gap-2">
            <p>{{ item.Participant.First_name }}</p>
            <p>{{ item.Participant.Middle_name }}</p>
            <p>{{ item.Participant.Last_name }}</p>
          </div>
        </template>
        <template v-slot:item.Created_at="{ item }">
          <div class="flex flex-row gap-2">
            <p>{{ formatDate(item.Created_at) }}</p>
          </div>
        </template>
      </v-data-table>
      <v-overlay v-model="overlay" class="!flex !justify-center items-center">
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
                  <v-autocomplete
            hide-selected
                    class="w-[700px]"
                    clearable
                    chips
                    label="Select Participant"
                    :items="allParticipantList"
                    item-title="Fullname"
                    item-value="id"
                    variant="outlined"
                    v-model="SelectedParticipantId"
                    :rules="required"
                    multiple
                  > </v-autocomplete> 
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
                    Enroll
                  </v-btn>
                </v-card-actions>
              </v-row>
            </v-container>
          </v-form>
        </v-card>
      </v-overlay>
    </div>
    <div>
      <v-snackbar v-model="snackbar1" :color="snackbarColor1">
        {{ snackbarMessage1 }}
      </v-snackbar></div
    >
  </div>
</template>

<script>
import api from "@/service/api";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault("Africa/Nairobi");
import PrimaryButton from "@/components/PrimaryButton.vue";
import { mapActions } from "pinia";
import { useEnrollmentStore } from "@/stores/enrollmentStore";
import { useParticipantStore } from "@/stores/participantStore";
export default {
  components: { PrimaryButton },
  data() {
    return {
      allEnrollmentList: [],
      allParticipantList: [],
      overlay: false,
      searchQuery: "",
      snackbar1: false,
      SelectedParticipantId: [],
      loading: false,
      rules: {
        required: [(v) => !!v || "This field is required"],
      },
      headersEnrollment: [
        { title: "Name", value: "fullname" },
        { title: "Enroll Date", value: "Created_at", sortable: true },
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

    required() {
      return [
        (v) =>
          (Array.isArray(v) ? v.length > 0 : !!v) || "This field is required.",
      ];
    },
  },

  methods: {
    ...mapActions(useParticipantStore, ["allParticipant"]),
    ...mapActions(useEnrollmentStore, [
      "enrolledForTraining",
      "createEnrollment",
    ]),
    enrollParticipants() {
      this.createEnrollment([this.$route.params.id, this.SelectedParticipantId])
        .then((res) => {
          this.snackbarMessage1 = "Participants Successfully Enrolled  ";
          this.snackbarColor1 = "green";
          this.snackbar1 = true;
        })
        .catch((err) => {
          this.snackbarMessage1 = err.response.data.error;
          this.snackbarColor1 = "red";
          this.snackbar1 = true;
        })
        .finally(() => {
          this.overlay = false;
          this.EnrollLists();
        });
    },
    participants() {
      this.allParticipant()
        .then((res) => {
          this.allParticipantList = res.data;
        })
        .catch((err) => {
          this.snackbarMessage1 = err.response.data;
          this.snackbarColor1 = "red";
          this.snackbar1 = true;
        });
    },
    EnrollLists() {
      this.enrolledForTraining(this.$route.params.id)
        .then((res) => {
          this.allEnrollmentList = res.data;
        })
        .catch((err) => {
          this.snackbarMessage1 = err.response.data;
          this.snackbarColor1 = "red";
          this.snackbar1 = true;
        });
    },

    toggleForm() {
      this.overlay = !this.overlay;
    },
    resetForm() {
      this.$refs.form.reset();
    },

    goBack() {
      this.overlay = false;
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
    this.EnrollLists();
    this.participants();
  },
};
</script>

<style></style>
