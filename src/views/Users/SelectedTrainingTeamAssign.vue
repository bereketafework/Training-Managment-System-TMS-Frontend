<template>
  <div>
    <div class="!rounded-lg">
      <v-data-table
        :headers="headersTeam"
        :items="allTeamList"
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
              List of Teams
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
        </template>
        <template v-slot:item.username="{ item }">
          <div class="flex flex-row gap-2">
            <p>{{ item.User.First_name }}</p>
            <p>{{ item.User.Middle_name }}</p>
            <p>{{ item.User.Last_name }}</p>
          </div>
        </template>
      </v-data-table>
      <v-overlay v-model="overlay" class="!flex !justify-center items-center">
        <v-card flat class="bg-slate-300">
          <span class="flex justify-center border-b-[1px] text-3xl">
            Team Assigning
          </span>

          <v-form ref="form" @submit.prevent="asignTeams" class="m-3">
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
                    v-model="SelectedSessionIdForTeam"
                    :rules="required"
                    multiple
                  ></v-select> </v-col
                ><v-col cols="14" sm="7">
                  <v-select
                    class=""
                    clearable
                    chips
                    label="Select User"
                    :items="AllusersList"
                    :item-title="UsersName"
                    item-value="id"
                    variant="outlined"
                    v-model="SelectedUserId"
                    :rules="required"
                  ></v-select>
                </v-col>
                <v-col cols="14" sm="5">
                  <v-select
                    class=""
                    clearable
                    chips
                    label="Select Role"
                    :items="allTeamRoleList"
                    item-title="Team_role"
                    item-value="id"
                    variant="outlined"
                    v-model="SelectedTeamRoleId"
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
  </div>
  <v-snackbar v-model="snackbar1" :color="snackbarColor1">
    {{ snackbarMessage1 }}
  </v-snackbar>
</template>

<script>
import PrimaryButton from "@/components/PrimaryButton.vue";
import { mapActions } from "pinia";
import { useTeamStore } from "@/stores/teamSrore";
import { useSessionStore } from "@/stores/sessionStore";
import { useUserStore } from "@/stores/userStore";
import { useTeamRoleStore } from "@/stores/teamRoleStore";
export default {
  components: { PrimaryButton },
  data() {
    return {
      allTeamList: [],
      AllusersList: [],
      SelectedSessionIdForTeam: [],
      SessionList: [],
      selecteditem: [],
      SelectedUserId: [],
      SelectedTeamRoleId: [],
      TeamList: [],
      allTeamRoleList: [],

      overlay: false,
      searchQuery: "",

      loading: false,

      rules: {
        required: [(v) => !!v || "This field is required"],
      },

      headersTeam: [
        { title: "Name", value: "username" },
        { title: "Session", value: "Session.Topic", sortable: true },
        { title: "Role", value: "TeamRole.Team_role" },
        { title: "Actions", value: "actions", sortable: false },
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

    UsersName() {
      return (item) =>
        `${item.First_name} ${item.Middle_name} ${item.Last_name}`;
    },

    required() {
      return [
        (v) =>
          (Array.isArray(v) ? v.length > 0 : !!v) || "This field is required.",
      ];
    },
  },

  methods: {
    ...mapActions(useTeamRoleStore, ["allTeamRole"]),
    ...mapActions(useUserStore, ["allUsers"]),
    ...mapActions(useSessionStore, ["selectedSessionForTraining"]),
    ...mapActions(useTeamStore, [
      "allAsignedTeamsForTraining",
      "createTeamAssign",
    ]),
    teamRole() {
      this.allTeamRole()
        .then((res) => {
          this.allTeamRoleList = res.data;
          console.log(this.allTeamRoleList, "test");
        })
        .catch((err) => {
          this.snackbarMessage1 = err.response.data;
          this.snackbarColor1 = "red";
          this.snackbar1 = true;
        });
    },
    Users() {
      this.allUsers()
        .then((res) => {
          this.AllusersList = res.data;
          console.log("LIst", this.AllusersList);
        })
        .catch((err) => {
          this.snackbarMessage1 = err.response.data;
          this.snackbarColor1 = "red";
          this.snackbar1 = true;
        });
    },
    sessions() {
      this.selectedSessionForTraining(this.$route.params.id)
        .then((res) => {
          this.SessionList = res.data;
        })
        .catch((err) => {
          this.snackbarMessage1 = err.response.data;
          this.snackbarColor1 = "red";
          this.snackbar1 = true;
        });
    },
    asignTeams() {
      this.createTeamAssign([
        this.SelectedUserId,
        this.SelectedSessionIdForTeam,
        this.SelectedTeamRoleId,
      ])
        .then((res) => {
          this.snackbarMessage1 = "Team Assigned Successfully!! ";
          this.snackbarColor1 = "green";
          this.snackbar1 = true;
        })
        .catch((err) => {
          this.snackbarMessage1 = err.response.data;
          this.snackbarColor1 = "red";
          this.snackbar1 = true;
        })
        .finally(() => {
          this.overlay = false;
          this.resetForm();
          this.teams();
        });
    },
    teams() {
      this.allAsignedTeamsForTraining(this.$route.params.id)
        .then((res) => {
          this.allTeamList = res.data;
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
      this.$refs.form.reset();
    },

    goBack() {
      this.overlay = false;
    },
  },

  mounted() {
    this.teamRole();
    this.Users();
    this.sessions();
    this.teams();
  },
};
</script>

<style></style>
