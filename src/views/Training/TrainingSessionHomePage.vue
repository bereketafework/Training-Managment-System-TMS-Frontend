<template>
  <div>
    <v-data-table
      :headers="headersSessions"
      :items="SessionList"
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
            List of Sessions
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
      </template></v-data-table
    >

    <v-overlay v-model="overlay" class="!flex !justify-center items-center">
      <v-card flat class="bg-slate-300">
        <span class="flex justify-center border-b-[1px] text-3xl ml-3">
          Training Session Registration Form
        </span>

        <v-form ref="form" @submit.prevent="sessionCreate" class="m-3">
          <v-container
            fluid
            class="border-[1px] border-gray-200 !w-[900px] !rounded-lg"
          >
            <v-row class="!flex !flex-col !col-span-2">
              <v-col cols="14" sm="10">
                <v-text-field
                  v-model="form.topic"
                  :rules="rules.topic"
                  color="black darken-2"
                  label="Topic"
                  variant="outlined"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="14" sm="10">
                <v-menu
                  v-model="menu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                  variant="outlined"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.sessions_start_date"
                      required
                      label="Session Start Date"
                      variant="outlined"
                      type="datetime-local"
                      v-bind="attrs"
                      v-on="on"
                      :rules="[startDateRules]"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="form.sessions_start_date"
                    variant="outlined"
                    no-title
                    @input="menu = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="14" sm="10">
                <v-menu
                  v-model="menuEnd"
                  :close-on-content-click="true"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.sessions_end_date"
                      variant="outlined"
                      label="Session End Date"
                      type="datetime-local"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="form.sessions_end_date"
                    no-title
                    @input="menuEnd = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-card-actions>
                <v-btn text @click="back">Back</v-btn>
                <v-btn text @click="resetForm">Clear</v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  :disabled="!formIsValid"
                  text
                  color="primary"
                  type="submit"
                >
                  <v-progress-circular
                    v-if="loading"
                    indeterminate
                    size="20"
                  ></v-progress-circular>
                  Register
                </v-btn>
              </v-card-actions>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </v-overlay>
    <div>
      <div>
        <v-overlay
          v-model="overlayUpdate"
          class="!flex !justify-center items-center"
        >
          <v-card flat class="bg-slate-300">
            <span class="flex justify-center border-b-[1px] text-3xl ml-3">
              Training Session Data Update Form
            </span>

            <v-form ref="form" @submit.prevent="sessionUpdate" class="m-3">
              <v-container
                fluid
                class="border-[1px] border-gray-200 !w-[900px] !rounded-lg"
              >
                <v-row class="!flex !flex-col !col-span-2">
                  <v-col cols="14" sm="10">
                    <v-text-field
                      v-model="form.topicUpdate"
                      :rules="rules.topic"
                      color="black darken-2"
                      label="Topic"
                      variant="outlined"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-card-actions>
                    <v-btn text @click="backUpdate">Back</v-btn>
                    <v-btn text @click="resetForm">Clear</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                      :disabled="!formIsValid"
                      text
                      color="primary"
                      type="submit"
                    >
                      <v-progress-circular
                        v-if="loading"
                        indeterminate
                        size="20"
                      ></v-progress-circular>
                      Update
                    </v-btn>
                  </v-card-actions>
                </v-row>
              </v-container>
            </v-form>
          </v-card>
        </v-overlay>
      </div>
      <v-dialog v-model="deleteDialog" max-width="500px">
        <v-card>
          <v-card-title class="headline"
            >Are you sure you want to delete?</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="deleteDialog = false">Cancel</v-btn>
            <v-btn color="red" text @click="sessionDelete">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
  <div>
    <v-snackbar v-model="snackbar1" :color="snackbarColor1" :timeout="timeout">
      {{ snackbarMessage1 }}
    </v-snackbar>
  </div>
</template>

<script>
import api from "@/service/api.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import SnackBar from "@/components/SnackBar.vue";
import { mapActions } from "pinia";
import { useSessionStore } from "@/stores/sessionStore";
dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault("Africa/Nairobi");
export default {
  components: {
    SnackBar,
  },
  data() {
    return {
      overlay: false,
      overlayUpdate: false,
      snackbar1: false,
      snackbarMessage1: "",
      snackbarColor1: "green",
      deleteDialog: false,
      timeout: 1000,
      form: {
        training_id: "",
        duration: "",
        topic: "",
        sessions_start_date: "",
        sessions_end_date: "",
      },
      searchQuery: "",
      menu: false,
      menuEnd: false,
      rules: {
        topic: [(val) => !!val || "This field is required"],
        duration: [(val) => !!val || "This field is required"],
      },
      headersSessions: [
        { title: "Topic", value: "Topic" },
        { title: "Session Start Date", value: "Session_start_date" },
        { title: "Session End Date", value: "Session_end_date" },
        { title: "Duration (days)", value: "diff" },
        { title: "Actions", value: "actions", sortable: false },
      ],
      SessionList: [],
      selectedItem: null,
      loading: false,
    };
  },
  methods: {
    ...mapActions(useSessionStore, [
      "allSessions",
      "searchSession",
      "selectedSessionForTraining",
      "createSession",
      "deleteSession",
      "updateSession",
    ]),
    sessionDelete() {
      this.deleteSession(this.selectedItem.id)
        .then((res) => {
          this.snackbarMessage1 = "Session deleted successfully!";
          this.snackbarColor1 = "green";
          this.snackbar1 = true;
          this.deleteDialog = false;
          this.overlay = false;
        })
        .catch((err) => {
          console.error("Error deleting session:", err);
          this.snackbarMessage1 = "Failed to delete session";
          this.snackbarColor1 = "red";
          this.snackbar1 = true;
        })
        .finally(() => {
          this.loading = false;
          this.sessionForThisTraining();
          this.resetForm();
        });
    },
    sessionUpdate() {
      this.updateSession([
        this.selectedItem.id,
        this.$route.params.id,
        this.form.topicUpdate,
      ])
        .then((res) => {
          this.snackbarMessage1 = "Session updated successfully!";
          this.snackbarColor1 = "green";
          this.snackbar1 = true;
          this.overlayUpdate = false;
        })
        .catch((err) => {
          console.error("Error updating session:", err);
          this.snackbarMessage1 = "Failed to update session";
          this.snackbarColor1 = "red";
          this.snackbar1 = true;
        })
        .finally(() => {
          this.loading = false;
          this.sessionForThisTraining();
          this.resetForm();
        });
    },
    sessionCreate() {
      this.createSession([
        this.$route.params.id,
        this.form.topic,
        this.form.sessions_start_date,
        this.form.sessions_end_date,
      ])
        .then((res) => {
          this.snackbarMessage1 = "Session created successfully!";
          this.snackbarColor1 = "green";
          this.snackbar1 = true;
          this.overlay = false;
        })
        .catch((err) => {
          console.error("Error creating session:", err);
          this.snackbarMessage1 = "Failed to create session";
          this.snackbarColor1 = "red";
          this.snackbar1 = true;
        })
        .finally(() => {
          this.loading = false;
          this.sessionForThisTraining();
        });
    },
    sessionForThisTraining() {
      this.selectedSessionForTraining(this.$route.params.id)
        .then((res) => {
          const newResponse = res.data.map((item) => {
            const sessionStartDate = dayjs.tz(
              item.Session_start_date,
              "Africa/Nairobi",
            );
            const sessionEndDate = dayjs.tz(
              item.Session_end_date,
              "Africa/Nairobi",
            );
            const durationInDays = sessionEndDate.diff(sessionStartDate, "day");
            const durationInHours =
              sessionEndDate.diff(sessionStartDate, "hour") % 24;

            return {
              ...item,
              Session_start_date: sessionStartDate.format("YYYY-MM-DD HH:mm A"),
              Session_end_date: sessionEndDate.format("YYYY-MM-DD HH:mm A"),
              diff: `${durationInDays} days ${durationInHours} hours`,
            };
          });

          this.SessionList = res.data && newResponse;
        })
        .catch((err) => {
          console.error("Error fetching sessions for training:", err);
        });
    },
    selectItem(item) {
      this.overlayUpdate = true;
      this.selectedItem = item;
      this.form.topicUpdate = item.Topic;
    },
    confirmDelete(item) {
      this.deleteDialog = true;
      this.selectedItem = item;
    },

    toggleForm() {
      this.overlay = !this.overlay;
    },
    back() {
      this.overlay = false;
      this.resetForm();
    },
    backUpdate() {
      this.overlayUpdate = false;
      this.resetForm();
    },

    formIsValid() {
      return (
        this.form.topic &&
        this.form.sessions_start_date &&
        this.form.sessions_end_date
      );
    },
  },
  mounted() {
    this.sessionForThisTraining();
  },
};
</script>
