
  

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
          <span class="flex justify-center border-b-[1px] text-3xl ml-3">
            Training Session Registration Form
          </span>

          <v-form ref="form" @submit.prevent="createSession" class="m-3">
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
                  <v-btn text @click="goBack">Back</v-btn>
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
      </div>
    
    </div>
    <div>
      <v-snackbar v-model="snackbar1" :color="snackbarColor1" :timeout="timeout" >
      {{ snackbarMessage1 }}
    </v-snackbar>
    </div>
  </template>
  
  <script>
  import api from '@/service/api.js'
  import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import SnackBar from '@/components/SnackBar.vue';
dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault("Africa/Nairobi");
  export default {
    components: {
      SnackBar
    },
  data(){
    return{
      overlay: false,
      filterDialog: false,
      snackbar: false,
      deleteDialog: false,
      timeout: 1000,
      form: {
        training_id: '',
        duration: '',
        topic: '',
        sessions_start_date: '',
        sessions_end_date: '',
      },
      searchQuery: '',
      menu: false,
      menuEnd: false,
      rules: {
        topic: [(val) => !!val || 'This field is required'],
        duration: [(val) => !!val || 'This field is required'],
      },
      headersSessions: [
        { title: "Topic", value: "Topic" },
        { title: "Session Start Date", value: "Session_start_date" },
        { title: "Session End Date", value: "Session_end_date" },
        { title: "Duration (days)", value: "diff" },
        { title: "Actions", value: "actions", sortable: false },
      ],
      SessionList:[
        
      ],
      selectedItem:null,
      loading:false
    }
 
  },
  methods:{
    confirmDelete(item) {
      this.deleteDialog = true;
      this.selectedItem = item;
    },
    async deleteItem() {
      if (!this.confirmDelete) return;

      try {
        this.loading = true;
        const response = await api.post(
          `/session/delete/${this.selectedItem.id}`,
          {},
        );
        this.snackbarMessage1 = "Deleted successfully!";
        this.snackbarColor1 = "green";
        this.snackbar1 = true;
        this.deleteDialog = false;
        this.fetchSession();
      } catch (error) {
        console.error(error);
        this.snackbarMessage1 = error.response.data;
        this.snackbarColor1 = "red";
        this.snackbar1 = true;
      } finally {
        this.loading = false;
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
        console.log(this.SessionList);
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
    async createSession() {
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
        this.snackbarMessage1 = error.response.data.message || "Failed to create session";
        this.snackbarColor1 = "red";
        this.snackbar1 = true;
        this.loading = false;
      } finally {
        this.loading = false;
      }
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
    this.fetchSession();
  }
  };
  </script>
