<template>
  <div class="flex flex-col w-full h-full">
    <div class="flex mt-2">
      <v-overlay
        v-model="overlay"
        persistent
        class="!flex !justify-center items-center"
      >
        <v-card flat class="bg-slate-300">
          <span class="flex justify-center border-b-[1px] text-3xl p-4"
            >Role Registration Form</span
          >
          <v-form ref="form" @submit.prevent="userRoleCreate" v-model="formValid">
            <v-container fluid class="border-[1px] border-gray-200 !w-[900px]">
              <v-row class="!flex !flex-row">
                <v-col cols="8" sm="4">
                  <v-text-field
                    v-model="form.Role"
                    :rules="rules.required"
                    color="black darken-2"
                    variant="outlined"
                    label="Role *"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-card-actions>
                <v-btn text @click="goBack">Back</v-btn>
                <v-btn text @click="resetForm">Clear</v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  :loading="loading"
                  text
                  color="primary"
                  @click="userRoleCreate"
                >
                 
                  Register
                </v-btn>
              </v-card-actions>
            </v-container>
          </v-form>
        </v-card>
      </v-overlay>
    </div>
    <div>
      <v-data-table
        :headers="headers"
        :items="userRoleList"
        :search="searchQuery"
        density="compact"
        sticky
        :fixed-header="true"
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
              List of Roles
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
      </v-data-table>
    </div>
    <v-dialog v-model="deleteDialog" max-width="500px">
      <v-card>
        <v-card-title class="headline"
          >Are you sure you want to delete?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="deleteDialog = false">Cancel</v-btn>
          <v-btn color="red" text @click="userRoleDelete">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- form for apply updates -->
    <v-overlay
      v-model="overlayUpdate"
      class="!flex !justify-center items-center"
    >
      <v-card flat class="bg-slate-300">
        <span class="flex justify-center border-b-[1px] text-3xl p-4"
          >Role Update Form</span
        >
        <v-form ref="form" @submit.prevent="userRoleUpdate" v-model="formValid">
          <v-container fluid class="border-[1px] border-gray-200 !w-[900px]">
            <v-row class="!flex !flex-row">
              <v-col cols="8" sm="4">
                <v-text-field
                  v-model="form.RoleUpdate"
                  :rules="rules.required"
                  color="black darken-2"
                  variant="outlined"
                  label="Role *"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-card-actions>
              <v-btn text @click="goBack">Back</v-btn>
              <v-btn text @click="resetForm">Clear</v-btn>
              <v-spacer></v-spacer>
              <v-btn text color="primary" type="submit">
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
    <div class="flex flex-wrap justify-start gap-4 mt-4">
      <!-- <MiniCard
        v-for="item in paginatedItems"
        :key="item.id"
        :name="item.Role"
        :Subname="item.CreatedBy.Username"
        :item="item"
        SubnameHeader="Created By"
        SubnameHeader1="Created At"
       :showDeleteDialog="showDeleteDialog"
        
      /> -->
    </div>
    <!-- <v-pagination
      v-model="currentPage"
      :length="pageCount"
      class="mt-4"
      color="primary"
    ></v-pagination> -->

    <v-snackbar v-model="snackbar1" :color="snackbarColor1" :timeout="timeout">
      {{ snackbarMessage1 }}
    </v-snackbar>
  </div>
</template>
<script>

import MiniCard from "@/components/MiniCard.vue";
import { mapActions } from "pinia";
import { useUserRoleStore } from "@/stores/userRoleStore";
export default {
  data() {
    return {
      headers: [
        { title: "Roles", value: "Role" },
        { title: "Created By", value: "CreatedBy.Username" },
        { title: "Actions", value: "actions", sortable: false },
      ],
      loading: false,
      timeout: 4000,
      overlayUpdate: false,
      snackbarMessage1: "",
      snackbarColor1: "",
      snackbar1: false,
      overlay: false,
      deleteDialog: false,
      itemsPerPage: this.calculateItemsPerPage(),
      searchQuery: "",
      selectedItem: null,
      formValid: false,
      form: {
        Role: "",
        RoleUpdate: "",
      },
      rules: {
        required: [(v) => !!v || "This field is required."],
      },
      userRoleList: [],
    };
  },
  components: {
    MiniCard,
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
  },
  methods: {
    ...mapActions(useUserRoleStore, [
      "allUserRole",
      "createUserRole",
      "updateUserRole",
      "deleteUserRole",
      "detailsUserRole",
    ]),
    userRoleDetails() {
      this.detailsUserRole(this.selectedItem.id)
        .then((res) => {})
        .catch((err) => {});
    },
    userRoleDelete() {
      this.deleteUserRole(this.selectedItem.id)
        .then((res) => {
          this.snackbarMessage1 = "UserRole has Been Deleted Succesfully!";
          this.snackbarColor1 = "green";
          this.snackbar1 = true;
        })
        .catch((err) => {
          this.snackbarMessage1 =
            err.response.data || err.response.data.error || "Error";
          this.snackbarColor1 = "red";
          this.snackbar1 = true;
        })
        .finally(() => {
          (this.deleteDialog = false), this.userRoles();
        });
    },

    userRoleUpdate() {
      this.updateUserRole([this.selectedItem.id, this.form.RoleUpdate])
        .then((res) => {
          this.snackbarMessage1 = "UserRole has Been Updated Succesfully!";
          this.snackbarColor1 = "green";
          this.snackbar1 = true;
        })
        .catch((err) => {
          this.snackbarMessage1 =
            err.response.data || err.response.data.error || "Error";
          this.snackbarColor1 = "red";
          this.snackbar1 = true;
        })
        .finally(() => {
          (this.overlayUpdate = false), this.userRoles();
        });
    },
    userRoleCreate() {
      this.createUserRole(this.form.Role)
        .then((res) => {
          this.snackbarMessage1 = "UserRole has Been Created Succesfully!";
          this.snackbarColor1 = "green";
          this.snackbar1 = true;
        })
        .catch((err) => {
          this.snackbarMessage1 =
            err.response.data.error || err.response.data || "Error";
          this.snackbarColor1 = "red";
          this.snackbar1 = true;
        })
        .finally(() => {
          (this.overlay = false), this.userRoles();
          this.resetForm();
        });
    },
    userRoles() {
      this.allUserRole()
        .then((res) => {
          this.userRoleList = res.data;
        })
        .catch((err) => {
          this.snackbarMessage1 =
            err.response.data || err.response.data.error || "Error";
          this.snackbarColor1 = "red";
          this.snackbar1 = true;
        });
    },
    goBack() {
      this.overlay = false;
      this.overlayUpdate = false;
    },
   
    toggleForm() {
      this.overlay = !this.overlay;
    },
    resetForm() {
      this.form = {
        Role: "",
      };
      this.$refs.form.reset();
    },

    selectItem(item) {
      this.overlayUpdate = true;
      this.selectedItem = item;
      this.form.RoleUpdate = item.Role;
      console.log(this.selectedItem.id);
    },

   
    confirmDelete(item) {
      this.deleteDialog = true;
      this.selectedItem = item;
      console.log(this.selectedItem.id);
    },
   
    showDeleteDialog(item) {
      this.deleteDialog = true;
      this.selectedItem = item;
      console.log(this.selectedItem.id);
    },
    calculateItemsPerPage() {
      const width = window.innerWidth;
      if (width >= 1200) return 12; // Large screens
      if (width >= 992) return 8; // Medium screens
      if (width >= 768) return 6; // Small screens
      return 4; // Extra small screens
    },
    handleResize() {
      this.itemsPerPage = this.calculateItemsPerPage();
    },
  },
  mounted() {
    this.userRoles();
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>
