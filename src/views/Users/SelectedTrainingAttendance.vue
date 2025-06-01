<template>

  
  <div class=" !rounded-lg">
      <v-data-table
        :headers="headersAttendance"
        :items="EnrollmentList"
        :search="searchQuery"
        density="compact"
        
      >
        <template v-slot:top>
          <div
            class="flex justify-between gap-4 bg-neutral-50 h-fit items-center p-4"
          >
            <v-row>
             
              <v-col>
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
              </v-col>
              <v-col>
                <v-select
                  density="comfortable"
                  chips
                  label="Select Session"
                  :items="SessionList"
                  item-title="Topic"
                  item-value="id"
                  variant="outlined"
                  v-model="SelectedSessionIdForAttendance"
                  :rules="required"
                ></v-select>
              </v-col>
              <v-col>
                <v-text-field
                  density="comfortable"
                  v-model="selectedDate"
                  label="Select Date"
                  outlined
                  type="date"
                  @change="logDate"
                  variant="outlined"
                ></v-text-field>
              </v-col>
            </v-row>
          </div>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-list-item
            class="!stroke-black w-fit rounded-lg !border-[0.2px] !border-blue-700 m-1"
            :prepend-icon="item.isAttended ? '' : null"
            :loading="item.loading"
            @click="Attendance(item)"
          >
            <template v-if="item.isAttended">
              <v-icon icon="mdi-check-all" />
            </template>
            <template v-else> Attend </template>
          </v-list-item>
        </template>
      </v-data-table>
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
import { useEnrollmentStore } from '@/stores/enrollmentStore';
import { mapActions } from 'pinia';
import { useSessionStore } from '@/stores/sessionStore';
export default {
  components: { PrimaryButton },
  data() {
    return {
      selectedDate: new Date().toISOString().substr(0, 10), // Default to today's date
      SelectedSessionIdForAttendance: [],
      SessionList: [],
      ParticipantList: [],
      EnrollmentList: [],
      overlay: false,
      searchQuery: "",
   
      loading: false,
      
      rules: {
        required: [(v) => !!v || "This field is required"],
      },
      
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
    attendanceFormIsValid() {
      return  this,this.SelectedSessionIdForAttendance&&
      this.selectedDate;
    },
  
    required() {
      return [
        (v) =>
          (Array.isArray(v) ? v.length > 0 : !!v) ||
          "This field is required.",
      ];
    },
   


  },

  methods: {
    ...mapActions(useSessionStore,(["selectedSessionForTraining"])),
     ...mapActions(useEnrollmentStore, [
      "enrolledForTraining",
    ]),
    sessions(){
 this.selectedSessionForTraining(this.$route.params.id).then((res)=>{
  this.SessionList=res.data
 }).catch((err)=>{
         this.snackbarMessage1 = err.response.data;
          this.snackbarColor1 = "red";
          this.snackbar1 = true;
 })
    },
      EnrollLists() {
      this.enrolledForTraining(this.$route.params.id)
        .then((res) => {
          this.EnrollmentList = res.data;
        })
        .catch((err) => {
          this.snackbarMessage1 = err.response.data;
          this.snackbarColor1 = "red";
          this.snackbar1 = true;
        });
    },
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
    

    toggleForm() {
      this.overlay = !this.overlay;
    },
    resetForm() {
      this.$refs.form.reset();
    },
   
    goBack() {
      this.$router.go(-1);
    },
   
  },

  mounted() {
    this.  EnrollLists()
    this.sessions()
  },
};
</script>

<style>

</style>