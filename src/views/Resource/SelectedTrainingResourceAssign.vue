<template>
  <div class="!rounded-lg">
    <v-data-table
      :headers="headersResource"
      :items="allResourceAllocateList"
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
            List of Resources
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
        <span class="flex justify-center border-b-[1px] text-3xl">
          Resource Assigning
        </span>

        <v-form
          ref="form"
          @submit.prevent="resourceAllocateForTraining"
          class="m-3"
        >
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
                  v-model="SelectedSessionIdForResource"
                  :rules="required"
                  multiple
                ></v-select> </v-col
              ><v-col cols="20" sm="10">
                <v-select
                  class="w-[700px]"
                  clearable
                  chips
                  label="Select Resource"
                  :items="ResourceList"
                  item-title="Name"
                  item-value="id"
                  variant="outlined"
                  v-model="SelectedResourceId"
                  :rules="required"
                ></v-select>
              </v-col>
              <v-col cols="8" sm="4">
                <v-text-field
                  v-model="form.Quantity"
                  variant="outlined"
                  color="black darken-2"
                  label="Quantity"
                  :rules="numberRules"
                ></v-text-field>
              </v-col>
              <v-col cols="8" sm="4">
                <v-text-field
                  v-model="form.SingleCost"
                  :rules="numberRules"
                  color="black darken-2"
                  variant="outlined"
                  label="Single Cost"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="8" sm="4">
                <v-text-field
                  v-model="form.Provider"
                  :rules="required"
                  color="black darken-5"
                  variant="outlined"
                  label="Provider"
                  required
                ></v-text-field>
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
    <div>
      <v-snackbar v-model="snackbar1" :color="snackbarColor1">
        {{ snackbarMessage1 }}
      </v-snackbar>
    </div>
  </div>
</template>

<script>
import PrimaryButton from "@/components/PrimaryButton.vue";
import { mapActions } from "pinia";
import { useResourceAllocationStore } from "@/stores/resourceAllocationStote";
import { useSessionStore } from "@/stores/sessionStore";
import { useResourceStore } from "@/stores/resourceStore";
export default {
  components: { PrimaryButton },
  data() {
    return {
      allResourceAllocateList: [],

      SelectedSessionIdForResource: [],
      snackbar1: false,
      snackbarColor1: "",
      snackbarMessage1: "",
      SessionList: [],
      selecteditem: [],
      ResourceList: [],
      overlay: false,
      searchQuery: "",
      SelectedResourceId: [],
      loading: false,
      form: {
        Provider: "",
        Quantity: "",
        SingleCost: "",
      },
      rules: {
        required: [(v) => !!v || "This field is required"],
      },

      headersResource: [
        { title: "Resource", value: "Resource.Name" },
        { title: "Session", value: "Session.Topic" },
        { title: "Provider", value: "Provider" },
        { title: "Quantity", value: "Quantity" },
        { title: "Single Cost", value: "Single_amount" },
        { title: "Total Cost", value: "total" },
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

    required() {
      return [
        (v) =>
          (Array.isArray(v) ? v.length > 0 : !!v) || "This field is required.",
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
    ...mapActions(useResourceStore, ["allResource"]),
    ...mapActions(useSessionStore, ["selectedSessionForTraining"]),
    ...mapActions(useResourceAllocationStore, [
      "allResourcesAllocate",
      "AllocateResource",
    ]),
    resources() {
      this.allResource()
        .then((res) => {
          this.ResourceList = res.data;
        })
        .catch((res) => {
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
    resourceAllocateForTraining() {
  
      this.AllocateResource([
         this.SelectedSessionIdForResource,
        this.SelectedResourceId,
        this.form.Quantity,
        this.form.SingleCost,
        this.form.Provider,
      ])
   
        .then((res) => {
          this.snackbarMessage1 = "Resource Allocated Sucessfully!!";
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
          this.allAllocatedResourcesForTraining();
        });
    },
    allAllocatedResourcesForTraining() {
      this.allResourcesAllocate(this.$route.params.id)
        .then((res) => {
          const totalcoast = res.data.map((item) => {
            return {
              ...item,
              total: item.Quantity * item.Single_amount,
            };
          });
          const alldata = res.data && totalcoast;
          this.allResourceAllocateList = alldata;
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
    this.resources();
    this.sessions();
    this.allAllocatedResourcesForTraining();
  },
};
</script>

<style></style>
