<template>
 <div v-if="tab === 'Details'" class="pt-[5px] !rounded-lg">
      <v-card
        class="!border-[1.5px] !shadow-sm !shadow-slate-600 !rounded-xl flex overflow-hidden !border-blue-500 !border-l-8 h-full"
        v-for="item in items"
        :key="item"
      >
        <div>
          <div class="flex justify-between">
            <h2
              class="top-0 flex justify-center border-t-0 w-fit border-l-0 border-[1px] text-sm mr-2 rounded-b-md border-black bg-green-400 h-fit p-[1px]"
            >
              <p class="m-[1px] flex flex-row justify-start items-center">
                {{ item.Training_mode }}
              </p>
            </h2>
            <h2
              class="top-0 flex justify-center border-t-0 w-20 border-r-0 border-[1px] ml-2 rounded-b-md border-blue-500 h-fit p-[1px]"
            >
              <p class="m-[1px] flex flex-row justify-start items-center">
                Details
              </p>
            </h2>
          </div>
          <div>
            <p class="m-2">
              <strong>Training Name:</strong> {{ item.Training_name }}
            </p>
          </div>
          <div class="flex flow-row justify-between m-2">
            <p><strong>Location:</strong>{{ item.Training_location }}</p>
            <p><strong>Capacity:</strong> {{ item.Capacity }}</p>
            <p>
              <strong>Cost:</strong> {{ item.Cost }}
              <span class="font-bold">ETB</span>
            </p>
          </div>
          <div class="flex flex-col justify-between m-2">
            <p>
              <strong> Descriptions:</strong>
              {{ item.Courses.Course_description }}
            </p>
            <p>
              <strong> Objectives:</strong>
              {{ item.Courses.Course_objective }}
            </p>
          </div>
          <div class="flex flow-row justify-between m-2">
            <p>
              <strong>Created by:</strong> {{ item.CreatedBy.First_name }}
              {{ item.CreatedBy.Middle_name }} {{ item.CreatedBy.Last_name }}
            </p>

            <p>
              <strong>Created at:</strong>
              {{ formatDate(item.Courses.Created_at) }}
            </p>

            <p>
              <strong>{{ assignGuestList.length }}:</strong>

              {{ assignGuestList.length > 1 ? "Guests" : "Guest" }}
            </p>

            <div>
              <strong class="m-3">Enrollment</strong>
              <div class="relative flex justify-center items-center">
                <v-progress-circular
                  :model-value="(EnrollmentList.length / item.Capacity) * 100"
                  color="green"
                  size="70"
                  width="10"
                >
                </v-progress-circular>
                <span
                  class="absolute text-sm font-bold"
                  style="color: var(--v-primary-base)"
                >
                  {{
                    Math.round((EnrollmentList.length / item.Capacity) * 100)
                  }}%
                </span>
              </div>
            </div>
          </div>
        </div>
        <!-- <h2 class="flex flex-row border-blue-500 p-10 rounded-tr-md rounded-bl-lg px-3 py-1 text-whit border-[1px] border-b-[2px] border-t-0 border-r-0 border--500 shadow"> Training Name: <h4> {{  item.Training_name  }}</h4></h2> -->
      </v-card>
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
export default {
  components: { PrimaryButton },
  data() {
    return {
      selectedDate: new Date().toISOString().substr(0, 10), // Default to today's date
      SelectedSessionIdForAttendance: [],
      SelectedSessionIdForTeam: [],
      SelectedSessionIdForGuest: [],
      SelectedSessionIdForResource: [],

      SessionList: [],
      ParticipantList: [],
      SelectedTeamRoleId: [],
      Allusers: [],
      selecteditem: [],
      ResourceList: [],
      EnrollmentList: [],
      assignGuestList: [],
      attendParticipant: [],
      TeamList: [],
      TeamRoleList: [],
      ResourceAllocationList: [],
      overlay: false,
      searchQuery: "",
      SelectedSessionId: [],
      SelectedResourceId: [],
      SelectedUserId: [],
      SelectedParticipantId: [],
      GuestList: [],
      SelectedGuestId: [],
      training: null,
      tab: "",
      loading: false,
      form: {
        training_id: "",
        duration: "",
        topic: "",
        sessions_start_date: "",
        sessions_end_date: "",
        Provider: "",
        Quantity: "",
        SingleCost: "",
      },
      rules: {
        required: [(v) => !!v || "This field is required"],
        training_id: [(val) => !!val || "This field is required"],
        duration: [(val) => !!val || "This field is required"],
        topic: [(val) => !!val || "This field is required"],
      },
      headersSessions: [
        { title: "Topic", value: "Topic" },
        { title: "Session Start Date", value: "Session_start_date" },
        { title: "Session End Date", value: "Session_end_date" },
        { title: "Duration (days)", value: "diff" },
        { title: "Actions", value: "actions", sortable: false },
      ],
      headersGuest: [
        { title: "First Name", value: "Guest.First_name" },
        { title: "Middle Name", value: "Guest.Middle_name" },
        { title: "Last Name", value: "Guest.Last_name" },
        { title: "Qualification", value: "Guest.Qualification" },
        { title: "Session", value: "Session.Topic" },
       
      ],
      headersResource: [
        { title: "Resource", value: "Resource.Name" },
        { title: "Session", value: "Session.Topic" },
        { title: "Provider", value: "Provider" },
        { title: "Quantity", value: "Quantity" },
        { title: "Single Cost", value: "Single_amount" },
        { title: "Total Cost", value: "total" },
        { title: "Actions", value: "actions", sortable: false },
      ],
      headersTeam: [
        { title: "Name", value: "username" },
        { title: "Session", value: "Session.Topic", sortable: true },
        { title: "Role", value: "TeamRole.Team_role" },
        { title: "Actions", value: "actions", sortable: false },
      ],
      headersEnrollment: [
        { title: "Name", value: "fullname" },
        { title: "Enroll Date", value: "Created_at", sortable: true },
      ],
      headersAttendance: [
        { title: "First Name", value: "Participant.First_name" ,sortable: true },
        { title: "Middle Name", value: "Participant.Middle_name" },
        { title: "Last Name", value: "Participant.Last_name" },
        { title: "Phone Number", value: "Participant.Phone" },
        { title: "Actions", value: "actions", sortable: false }, // Add actions column
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
    formIsValid() {
      return (
        this.form.topic &&
        this.form.sessions_start_date &&
        this.form.sessions_end_date
      );
    },
    attendanceFormIsValid() {
      return  this,this.SelectedSessionIdForAttendance&&
      this.selectedDate;
    },
    guestName() {
      return (item) =>
        `${item.First_name} ${item.Middle_name} ${item.Last_name}`;
    },
  startDateRules() {
      return [
        (v) => !!v || "Session start date is required.",
        (v) => new Date(v) >= new Date() || "Start date must be today or later.",
      ];
    },
  endDateRules() {
      return [
        (v) => !!v || "Session end date is required.",
        (v) =>
          new Date(v) >= new Date(this.form.sessions_start_date) ||
          "End date must be after the start date.",
      ];
    },
    required() {
      return [
        (v) =>
          (Array.isArray(v) ? v.length > 0 : !!v) ||
          "This field is required.",
      ];
    },
    numberRules() {
      return [
        (v) => !!v || "This field is required.",

        (v) => {
          if (!/^\d+/.test(v)) return "Only numeric values allowed";
          return true;
        },
        (v) => v >= 0 || "Value must be non-negative",

      ];
    },

  },

  methods: {
    async Attendance(item) {
      try {
        const SelectedParticipantId = item.Participant.id;
        const session = this.SelectedSessionIdForAttendance;
        const date = this.selectedDate;

        this.loading = true;

        // for( resourceId of this.SelectedResourceId){
        const response = await api.post("/attendance/create", {
          Session_id: session,
          Participant_id: SelectedParticipantId,
          Status: "true",
          Date: date,
        });
        this.snackbarMessage1 = "Successfully Created ";
        this.snackbarColor1 = "green";
        this.snackbar1 = true;
        this.overlay = null;
        item.isAttended = true;
        this.attendanceFormIsValid();
        this.resetForm();
        this.fetchSession();
        this.fetchResourceAllocation();
      } catch (error) {
        console.error(error);
        this.snackbarMessage1 = error.response.data;
        this.snackbarColor1 = "red";
        this.snackbar1 = true;
        this.loading = false;
      } finally {
        this.loading = false;
      }
    },
    async fetchEnrollment() {
      try {
        const tid = this.$route.params.id;
        const response = await api.post("/enrollment/select", { tid: tid });
        this.EnrollmentList = response.data;
      } catch (error) {
        console.error(error);
        this.snackbarMessage1 = error.response.data;
        this.snackbarColor1 = "red";
        this.snackbar1 = true;
      }
    },
    async fetchParticipant() {
      try {
        const response = await api.get("/participant/allparticipant");
        this.ParticipantList = response.data;
      } catch (error) {
        console.error(error);
        this.snackbarMessage1 = error.response.data;
        this.snackbarColor1 = "red";
        this.snackbar1 = true;
      }
    },
    async fetchUsers() {
      try {
        const response = await api.get("/User/all");
        this.Allusers = response.data;
      } catch (error) {
        console.error(error);
        this.snackbarMessage1 = error.response.data;
        this.snackbarColor1 = "red";
        this.snackbar1 = true;
      }
    },
    async fetchTeams() {
      try {
        const tid = this.$route.params.id;

        const response = await api.post("/team/select", { tid: tid });

        this.TeamList = response.data;

      } catch (error) {
        console.error(error);
        this.snackbarMessage1 = error.response.data;
        this.snackbarColor1 = "red";
        this.snackbar1 = true;
      }
    },
    async fetchResourceAllocation() {
      try {
        const tid = this.$route.params.id;
        const response = await api.post(
          "/resourceallocation/allallocatedresource",
          { tid: tid },
        );
        const totalcoast = response.data.map((item) => {
          return {
            ...item,
            total: item.Quantity * item.Single_amount,
          };
        });
        const alldata = response.data && totalcoast;
        this.ResourceAllocationList = alldata;
      } catch (error) {
        console.error(error);
        this.snackbarMessage1 = error.response.data;
        this.snackbarColor1 = "red";
        this.snackbar1 = true;
      }
    },
    async assignTeam() {
      try {
        this.loading = true;
        const sessionId = this.SelectedSessionIdForTeam;
        const userId = this.SelectedUserId;
        const teamRoleId = this.SelectedTeamRoleId;
      for (const sessionId of this.SelectedSessionIdForTeam) {
          const response = await api.post("/team/create", {
            Session_id: sessionId,
            User_id: userId,
            Team_role_id: teamRoleId,
            
          });
    
        }

        this.snackbarMessage1 = "Successfully Created ";
        this.snackbarColor1 = "green";
        this.snackbar1 = true;
        this.overlay = null;
        this.fetchSession();
        this.fetchTeams();
      } catch (error) {
        console.error(error);
        console.log(error)
        this.snackbarMessage1 = error?.response?.data;
        this.snackbarColor1 = "red";
        this.snackbar1 = true;
        this.loading = false;
      } finally {
        this.loading = false;
        this.fetchTeams();
      }
    },
    async fetchTeamRoleList() {
      try {
        const tid = this.$route.params.id;
        const response = await api.get("/teamrole/allteamroles", { tid: tid });
        this.TeamRoleList = response.data;
      } catch (error) {
        console.error(error);
        this.snackbarMessage1 = error.response.data;
        this.snackbarColor1 = "red";
        this.snackbar1 = true;
      }
    },

    async fetchResource() {
      try {
        const response = await api.get("/resource/all");

        this.ResourceList = response.data;
      } catch (error) {
        console.error(error);
        this.snackbarMessage1 = error.response.data;
        this.snackbarColor1 = "red";
        this.snackbar1 = true;
      }
    },
    async createEnrollment() {
      try {
        this.loading = true;

        const Training_id = this.$route.params.id;
        const participantId = this.SelectedParticipantId;
        for (const participantId of this.SelectedParticipantId) {
          const response = await api.post("/enrollment/create", {
            Training_id: Training_id,
            Participant_id: participantId,
          });
        }
        this.snackbarMessage1 = "Successfully Created ";
        this.snackbarColor1 = "green";
        this.snackbar1 = true;
        this.overlay = null;
        this.resetForm();
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

    async ResourceAllocation() {
      try {
        this.loading = true;
        const resourceId = this.SelectedResourceId;
        for (const sessionId of this.SelectedSessionIdForResource) {
          // for( resourceId of this.SelectedResourceId){
          const response = await api.post("/resourceallocation/create", {
            Session_id: sessionId,
            Resource_id: resourceId,
            Quantity: this.form.Quantity,
            Single_amount: this.form.SingleCost,
            Provider: this.form.Provider,
          });
        }
        this.snackbarMessage1 = "Successfully Created ";
        this.snackbarColor1 = "green";
        this.snackbar1 = true;
        this.overlay = null;
        this.resetForm();
        this.fetchSession();
        this.fetchResourceAllocation();
      } catch (error) {
        console.error(error);
        this.snackbarMessage1 = error.response.data;
        this.snackbarColor1 = "red";
        this.snackbar1 = true;
        this.loading = false;
      } finally {
        this.loading = false;
      }
    },
    async assignGuest() {
      try {
        this.loading = true;
       const sessionId = this.SelectedSessionIdForGuest;
        const guestId = this.SelectedGuestId;
        const id = this.$route.params.id;
         for (const sessionId of this.SelectedSessionIdForGuest) {
          // for (const guestId of this.SelectedGuestId) {
          const response = await api.post("/guestassign/assignguest", {
            Sessions_id: sessionId,
            Guest_id: guestId,
            Training_id: id,
          });
        }
        
        this.snackbarMessage1 = "Successfully Created ";
        this.snackbarColor1 = "green";
        this.snackbar1 = true;
        this.overlay = null;
        this.fetchSession();
        this.fetchAssignedGuest();
      } catch (error) {
        console.log("Erroers"+error)
        this.snackbarMessage1 = error.response.data;
        this.snackbarColor1 = "red";
        this.snackbar1 = true;
        this.loading = false;
      } finally {
        this.loading = false;
      }
    },
    async createTraining() {
      try {
        this.loading = true;
        const id = this.$route.params.id;
        const start = new Date(this.form.sessions_start_date);
        const end = new Date(this.form.sessions_end_date);

        const response = await api.post("/session/create", {
          Training_id: id,
          Topic: this.form.topic,
          Session_start_date: start,
          Session_end_date: end,
        });

        this.snackbarMessage1 = "Successfully Created ";
        this.snackbarColor1 = "green";
        this.snackbar1 = true;
        this.overlay = null;
        this.fetchSession();
      } catch (error) {
        console.error(error);
        this.snackbarMessage1 = error.response.data;
        this.snackbarColor1 = "red";
        this.snackbar1 = true;
        this.loading = false;
      } finally {
        this.loading = false;
      }
    },
    async fetchAssignedGuest() {
      try {
        const tid = this.$route.params.id;
        const response = await api.post("/guestassign/selectedassignedguests", {
          tid: tid,
        });
        this.assignGuestList = response.data;
      } catch (error) {
        console.error(error);
        this.snackbarMessage1 = error.response.data;
        this.snackbarColor1 = "red";
        this.snackbar1 = true;
      }
    },

    async fetchGuest() {
      try {
        const tid = this.$route.params.id;

        const response = await api.get("/guest/all", { tid: tid });
        this.GuestList = response.data;
      } catch (error) {
        console.error(error);
        this.snackbarMessage1 = error.response.data;
        this.snackbarColor1 = "red";
        this.snackbar1 = true;
      }
    },

    async fetchSession() {
      try {
        const tid = this.$route.params.id;
        const response = await api.post("/session/select", { tid: tid });
        const newResponse = response.data.map((item) => {
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
    
        this.SessionList = response.data && newResponse;
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
    submit() {
      if (this.selectedIndex === -1) {
        this.courses.push({ ...this.form });
      } else {
        this.courses.splice(this.selectedIndex, 1, { ...this.form });
        this.selectedIndex = -1;
      }
      this.snackbar = true;
      this.overlay = false;
      this.resetForm();
    },
    goBack() {
      this.$router.go(-1);
    },

    async fetchTrainingDetails() {
      try {
        const id = this.$route.params.id;
        const response = await api.get(`/training/search/${id}`);
        this.items = response.data;
      } catch (error) {
        console.error("Failed to fetch training details:", error);
      }
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
    this.fetchTrainingDetails();
    this.fetchSession();
    this.fetchGuest();
    this.fetchResource();
    this.fetchResourceAllocation();
    this.fetchAssignedGuest();
    this.fetchTeamRoleList();
    this.fetchUsers();
    this.fetchTeams();
    this.fetchParticipant();
    this.fetchEnrollment();
  },
};
</script>
<style>

</style>